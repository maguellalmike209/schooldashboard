import { readFile, realpath, lstat } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { replayCatalog } from './shadow-replay.mjs';
import { summarizeReplay, managerReplaySummary } from './shadow-report.mjs';

export async function loadReplayFixture(path) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../tests/icm-next/fixtures');
  const target = resolve(path);
  if (!target.startsWith(root + sep) || !target.endsWith('.json')) throw new Error('Only tests/icm-next/fixtures/*.json is allowed');
  const actual = await realpath(target);
  if (!actual.startsWith(root + sep) || (await lstat(target)).isSymbolicLink()) throw new Error('Fixture symlink or traversal denied');
  const bytes = await readFile(actual);
  if (bytes.length > 2 * 1024 * 1024) throw new Error('Replay fixture exceeds 2 MiB');
  const input = JSON.parse(bytes.toString('utf8'));
  if (input.fixtureKind !== 'SYNTHETIC_SHADOW_REPLAY' || !Array.isArray(input.fixtures)) throw new Error('Synthetic replay catalog required');
  return input.fixtures;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length !== 3 || args[0] !== 'replay' || args[1] !== '--fixture') {
    process.stderr.write('Usage: node scripts/icm-next/shadow-cli.mjs replay --fixture tests/icm-next/fixtures/<synthetic>.json\n'); process.exitCode = 2;
  } else try {
    const results = replayCatalog(await loadReplayFixture(args[2])); const summary = summarizeReplay(results);
    process.stdout.write(`${JSON.stringify({ results, summary })}\n`);
    process.stderr.write(`${managerReplaySummary(summary)}\n`);
    if (summary.counts.UNSAFE_REGRESSION) process.exitCode = 1;
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 2; }
}
