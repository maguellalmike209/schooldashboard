import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readOnlyHostInventory } from './host-inventory.mjs';
import { probeDisposableCanary } from './canary-probe.mjs';

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  try {
    if (args.length === 1 && args[0] === 'inventory') process.stdout.write(`${JSON.stringify(await readOnlyHostInventory())}\n`);
    else if (args.length === 5 && args[0] === 'probe' && args[1] === '--canary' && args[3] === '--identity') {
      const host = await readOnlyHostInventory({ canaryPath: args[2] });
      process.stdout.write(`${JSON.stringify(await probeDisposableCanary({ directory: args[2], namedIdentity: args[4], observedIdentity: host.identitySid }))}\n`);
    } else throw new Error('Usage: m3-cli.mjs inventory | probe --canary <disposable path> --identity <observed SID>');
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 2; }
}
