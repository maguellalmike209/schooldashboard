import { open } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertCanaryDirectory } from './canary-probe.mjs';

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, directory] = process.argv.slice(2);
  try {
    const actual = await assertCanaryDirectory(directory);
    const lock = join(actual, 'fixture.lock');
    if (mode === 'parent') {
      const child = spawn(process.execPath, [fileURLToPath(import.meta.url), 'hold', actual], { stdio: ['ignore', 'pipe', 'pipe'], detached: true, windowsHide: true });
      const ready = await new Promise((resolveReady, rejectReady) => {
        child.stdout.once('data', () => resolveReady(true)); child.once('exit', code => rejectReady(new Error(`fake child exited ${code}`)));
      });
      if (ready) { child.stdout.destroy(); child.stderr.destroy(); child.unref(); process.stdout.write(`${child.pid}\n`); }
    } else if (mode === 'hold' || mode === 'try') {
      const handle = await open(lock, 'wx', 0o600); await handle.writeFile(`synthetic:${process.pid}`); await handle.close();
      if (mode === 'hold') { process.stdout.write('READY\n'); setInterval(() => {}, 1000); }
      else process.stdout.write('ACQUIRED\n');
    } else throw new Error('fake worker mode denied');
  } catch (error) { process.stderr.write(`${error.code ?? error.message}\n`); process.exitCode = 2; }
}
