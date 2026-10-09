import { readFile, realpath, lstat } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assessOfflineSnapshot } from './engine.mjs';

export async function loadSyntheticFixture(path) {
  const allowedRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../tests/icm-next/fixtures');
  const target = resolve(path);
  if (!target.startsWith(allowedRoot + sep) || !target.endsWith('.json')) throw new Error('Only tests/icm-next/fixtures/*.json is allowed');
  const actual = await realpath(target);
  if (!actual.startsWith(allowedRoot + sep) || (await lstat(target)).isSymbolicLink()) throw new Error('Fixture symlink or traversal denied');
  const raw = await readFile(actual);
  if (raw.length > 2 * 1024 * 1024) throw new Error('Fixture exceeds 2 MiB');
  const value = JSON.parse(raw.toString('utf8'));
  if (value.fixtureKind !== 'SYNTHETIC_ICM_NEXT' || !/^synthetic:/.test(value.fixtureId ?? '') || !value.snapshot) throw new Error('Synthetic fixture marker required');
  return value.snapshot;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length !== 3 || args[0] !== 'simulate' || args[1] !== '--fixture') {
    process.stderr.write('Usage: node scripts/icm-next/cli.mjs simulate --fixture tests/icm-next/fixtures/<synthetic>.json\n');
    process.exitCode = 2;
  } else {
    try { process.stdout.write(`${JSON.stringify(assessOfflineSnapshot(await loadSyntheticFixture(args[2])))}\n`); }
    catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 2; }
  }
}
