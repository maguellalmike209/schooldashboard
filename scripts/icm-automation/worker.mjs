import { spawn } from 'node:child_process';
import { basename, isAbsolute } from 'node:path';

const ALLOWED_ENV = new Set(['PATH', 'Path', 'SystemRoot', 'WINDIR', 'TEMP', 'TMP',
  'CODEX_HOME', 'USERPROFILE', 'HOMEDRIVE', 'HOMEPATH']);

export function codexExecArgs(workspace) {
  if (typeof workspace !== 'string' || !isAbsolute(workspace)) throw new Error('worker workspace must be absolute');
  return ['exec', '--cd', workspace, '--sandbox', 'workspace-write',
    '--ignore-user-config', '--strict-config', '-c', 'approval_policy=never',
    '-c', 'sandbox_workspace_write.network_access=false', '--json', '--ephemeral', '-'];
}

export function limitedWorkerEnv(source = process.env) {
  return Object.fromEntries(Object.entries(source).filter(([key]) => ALLOWED_ENV.has(key)));
}

// Development test adapter only. Installed Codex launch must be wired by a
// separately protected launcher after OS identity, connector, code and child
// containment attestation. Merely passing an option or env var cannot enable it.
export async function runFakeCodexExec({ executable, executableArgs = [], workspace, prompt,
  maxWallMs, envSource = process.env, signal, maxOutputBytes = 256 * 1024 }) {
  if (!isAbsolute(executable) || /^(?:codex|codex\.exe|codex\.cmd)$/i.test(basename(executable)) ||
      !Array.isArray(executableArgs) || executableArgs.some(x => typeof x !== 'string') ||
      typeof prompt !== 'string' || Buffer.byteLength(prompt) > 20_000 ||
      !Number.isSafeInteger(maxWallMs) || maxWallMs < 1000 || maxWallMs > 86_400_000 ||
      !Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 1024 || maxOutputBytes > 1024 * 1024) {
    throw new Error('STOP_ENVIRONMENT_UNVERIFIED');
  }
  const args = [...executableArgs, ...codexExecArgs(workspace)];
  const child = spawn(executable, args, {
    cwd: workspace, env: limitedWorkerEnv(envSource), shell: false,
    windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'],
  });
  child.stdin.on('error', () => {}); // A failed/early-exiting child can close stdin before prompt delivery.
  const events = [];
  let bytes = 0;
  let buffer = '';
  let outputOverflow = false;
  let stderrBytes = 0;
  const consume = chunk => {
    bytes += chunk.length;
    if (bytes > maxOutputBytes) { outputOverflow = true; child.kill(); return; }
    buffer += chunk.toString('utf8');
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        // Do not retain model messages, command arguments, tool output or
        // private data. Only bounded event class and terminal usage survive.
        if (typeof entry.type !== 'string' || !/^(thread|turn|item|error)\.[a-z.]+$/.test(entry.type)) throw new Error();
        events.push({ type: entry.type,
          usage: entry.type === 'turn.completed' && entry.usage ? {
            input_tokens: entry.usage.input_tokens ?? null,
            output_tokens: entry.usage.output_tokens ?? null,
          } : undefined });
      } catch { outputOverflow = true; child.kill(); }
      if (events.length > 2000) { outputOverflow = true; child.kill(); }
    }
  };
  child.stdout.on('data', consume);
  child.stderr.on('data', chunk => { stderrBytes += chunk.length; if (stderrBytes > maxOutputBytes) { outputOverflow = true; child.kill(); } });
  const completion = new Promise(resolve => {
    child.once('error', error => resolve({ error: error.code ?? 'spawn-error' }));
    child.once('close', (code, terminationSignal) => resolve({ code, terminationSignal }));
  });
  child.stdin.end(prompt);
  let timedOut = false;
  let cancelled = false;
  let stopResolve;
  const stoppedOrGraceExpired = new Promise(resolve => { stopResolve = resolve; });
  let graceTimer;
  const requestStop = () => {
    child.kill();
    if (!graceTimer) graceTimer = setTimeout(() => stopResolve({ error: 'child-did-not-stop' }), 2000);
  };
  const timer = setTimeout(() => { timedOut = true; requestStop(); }, maxWallMs);
  const onAbort = () => { cancelled = true; requestStop(); };
  signal?.addEventListener('abort', onAbort, { once: true });
  if (signal?.aborted) onAbort();
  const result = await Promise.race([completion, stoppedOrGraceExpired]);
  clearTimeout(timer);
  if (graceTimer) clearTimeout(graceTimer);
  signal?.removeEventListener('abort', onAbort);
  // Parent exit cannot prove a spawned descendant stopped. Installed broker
  // must use an OS job/process-group lease and retain its lock until proved.
  return { ...result, events, timedOut, cancelled, outputOverflow,
    ok: result.code === 0 && !timedOut && !cancelled && !outputOverflow && buffer.trim() === '',
    childTreeProvenStopped: false };
}

export async function runCodexExec() {
  throw new Error('STOP_ENVIRONMENT_UNVERIFIED: installed host isolation is not implemented');
}
