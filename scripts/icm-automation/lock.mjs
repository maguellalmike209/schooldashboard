import { randomUUID } from 'node:crypto';
import { mkdir, readFile, realpath, rm, rmdir, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// A leftover lock is never stolen by PID or age. Installed use also needs an OS
// lease/child-lifetime proof; this primitive is process-tested only.
export async function acquireBrokerLock(stateRoot, name = 'writer.lock') {
  const root = await realpath(stateRoot);
  if (!/^[a-z0-9.-]+\.lock$/.test(name)) throw new Error('lock name invalid');
  const path = join(root, name);
  const token = randomUUID();
  try { await mkdir(path); } catch (error) {
    if (error.code === 'EEXIST') throw new Error('STOP_LOCK_UNCERTAIN');
    throw error;
  }
  try { await writeFile(join(path, 'owner'), token, { flag: 'wx', mode: 0o600 }); }
  catch (error) { throw new Error(`STOP_LOCK_UNCERTAIN: owner record failed: ${error.code ?? error.message}`); }
  let released = false;
  return {
    path, token,
    async release({ childrenStopped = false } = {}) {
      if (released) return;
      if (!childrenStopped) throw new Error('STOP_LOCK_UNCERTAIN: child lifetime not proven stopped');
      if (resolve(await realpath(path)) !== resolve(path) || !(await stat(path)).isDirectory() ||
          (await readFile(join(path, 'owner'), 'utf8')) !== token) {
        throw new Error('STOP_LOCK_UNCERTAIN: ownership changed');
      }
      await rm(join(path, 'owner'));
      await rmdir(path);
      released = true;
    },
  };
}
