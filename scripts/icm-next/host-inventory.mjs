import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { assertCanaryDirectory } from './canary-probe.mjs';

const run = promisify(execFile);
async function observe(program, args, limit = 1000) {
  try { const { stdout, stderr } = await run(program, args, { timeout: 5000, maxBuffer: 64 * 1024, windowsHide: true });
    return { status: 'OBSERVED', stdout: stdout.slice(0, limit), stderr: stderr.slice(0, limit) }; }
  catch (error) { return { status: 'UNKNOWN', reason: error.code === 'ENOENT' ? 'COMMAND_MISSING' : 'COMMAND_FAILED',
    detail: String(error.stderr ?? error.message).slice(0, 160).replace(/[A-Za-z]:\\[^\s]+/g, '<redacted-path>') }; }
}

export async function readOnlyHostInventory({ canaryPath = null } = {}) {
  const identity = process.platform === 'win32' ? await observe('whoami', ['/user']) : { status: 'UNKNOWN', reason: 'NOT_WINDOWS' };
  const sid = identity.stdout?.match(/S-1-\d+(?:-\d+)+/)?.[0] ?? null;
  const codexVersion = await observe('codex', ['--version'], 200);
  const codexExecHelp = await observe('codex', ['exec', '--help'], 200);
  let acl = { status: 'NOT_TESTED', reason: 'NO_EXPLICIT_CANARY' };
  if (canaryPath) {
    const actual = await assertCanaryDirectory(canaryPath);
    const check = process.platform === 'win32' ? await observe('icacls', [actual], 5000) : { status: 'UNKNOWN', reason: 'NOT_WINDOWS' };
    acl = { status: check.status, canaryPath: actual, inheritedAceObserved: /\(I\)/.test(check.stdout ?? ''),
      sandboxGroupMentioned: /CodexSandboxUsers/i.test(check.stdout ?? ''), reason: check.reason ?? null };
  }
  return { schemaVersion: 1, proofClass: 'READ_ONLY_HOST_OBSERVATION', platform: process.platform, release: os.release(),
    version: os.version(), arch: os.arch(), identitySid: sid, identityStatus: identity.status,
    codexVersion: codexVersion.status === 'OBSERVED' ? codexVersion.stdout.trim() : codexVersion.reason,
    codexExecHelpStatus: codexExecHelp.status, codexExecHelpError: codexExecHelp.status === 'OBSERVED' ? null : codexExecHelp.detail,
    canaryAcl: acl, installationProof: 'UNKNOWN' };
}
