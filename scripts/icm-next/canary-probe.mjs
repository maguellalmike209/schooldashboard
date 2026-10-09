import { readFile, writeFile, rename, unlink, realpath, stat, lstat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';

export const CANARY_ROOT = resolve(tmpdir(), 'icm-next-canaries');
export async function assertCanaryDirectory(directory) {
  const target = resolve(directory);
  if (!target.startsWith(CANARY_ROOT + sep)) throw new Error('Only explicit disposable canary subdirectories are allowed');
  const actual = await realpath(target);
  if (!actual.startsWith(CANARY_ROOT + sep) || !(await stat(actual)).isDirectory()) throw new Error('Canary path changed or is not a directory');
  const markerPath = join(actual, 'SYNTHETIC_CANARY.json');
  if ((await lstat(markerPath)).isSymbolicLink()) throw new Error('Canary marker symlink denied');
  const marker = JSON.parse(await readFile(markerPath, 'utf8'));
  if (marker.kind !== 'SYNTHETIC_CANARY' || marker.disposable !== true) throw new Error('Disposable canary marker required');
  return actual;
}

export async function probeDisposableCanary({ directory, namedIdentity, observedIdentity }) {
  if (typeof namedIdentity !== 'string' || !namedIdentity.trim()) throw new Error('Named test identity required');
  const actual = await assertCanaryDirectory(directory);
  if (!observedIdentity || observedIdentity !== namedIdentity) return { testMode: true, proofClass: 'FIXTURE', identity: namedIdentity,
    observedIdentity: observedIdentity ?? null, verdict: 'UNKNOWN', reason: 'IDENTITY_NOT_CONFIRMED' };
  const first = join(actual, `probe-${randomUUID()}.txt`), second = `${first}.renamed`;
  let write = 'UNKNOWN', read = 'UNKNOWN', move = 'UNKNOWN', remove = 'UNKNOWN';
  try { await writeFile(first, 'synthetic canary only', { flag: 'wx' }); write = 'ALLOWED'; } catch (error) { write = error.code === 'EACCES' || error.code === 'EPERM' ? 'DENIED' : 'UNKNOWN'; }
  if (write === 'ALLOWED') {
    try { read = (await readFile(first, 'utf8')) === 'synthetic canary only' ? 'ALLOWED' : 'UNKNOWN'; } catch (error) { read = error.code === 'EACCES' || error.code === 'EPERM' ? 'DENIED' : 'UNKNOWN'; }
    try { await rename(first, second); move = 'ALLOWED'; } catch (error) { move = error.code === 'EACCES' || error.code === 'EPERM' ? 'DENIED' : 'UNKNOWN'; }
    try { await unlink(move === 'ALLOWED' ? second : first); remove = 'ALLOWED'; } catch (error) { remove = error.code === 'EACCES' || error.code === 'EPERM' ? 'DENIED' : 'UNKNOWN'; }
  }
  return { testMode: true, proofClass: 'FIXTURE', identity: namedIdentity, observedIdentity, verdict: 'OBSERVED_CANARY_ONLY',
    operations: { write, read, rename: move, delete: remove }, canaryPath: actual };
}
