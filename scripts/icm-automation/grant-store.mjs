import { createHash } from 'node:crypto';
import { lstat, readFile, realpath } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { validateGrant } from './core.mjs';

const SHA = /^[a-f0-9]{64}$/;
const HEAD = /^[a-f0-9]{40}$/;
const exact = (object, keys) => object && typeof object === 'object' && !Array.isArray(object) &&
  Object.keys(object).sort().join('|') === [...keys].sort().join('|');
export const inside = (parent, child) => {
  const part = relative(parent, child);
  return part === '' || (part !== '..' && !part.startsWith(`..${sep}`) && !isAbsolute(part));
};

// The binding must come from an independently protected installation. A mutable
// checkout can exercise this loader only as a fixture; it cannot authenticate it.
export function validateBinding(binding) {
  const keys = ['schemaVersion', 'grantPath', 'grantSha256', 'grantRevision', 'repository',
    'branch', 'checkout', 'workerRoot', 'stateRoot', 'maxWallMs', 'codeSha256', 'requiredChecks'];
  if (!exact(binding, keys) || binding.schemaVersion !== 1 || !SHA.test(binding.grantSha256) ||
      !SHA.test(binding.codeSha256) || !Number.isSafeInteger(binding.grantRevision) || binding.grantRevision < 1 ||
      !Number.isSafeInteger(binding.maxWallMs) || binding.maxWallMs < 1000 || binding.maxWallMs > 86_400_000 ||
      !Array.isArray(binding.requiredChecks) || binding.requiredChecks.length === 0 ||
      new Set(binding.requiredChecks.map(x => x.name)).size !== binding.requiredChecks.length ||
      binding.requiredChecks.some(x => !exact(x, ['name', 'appId']) || typeof x.name !== 'string' ||
        !x.name || x.name.length > 100 || !Number.isSafeInteger(x.appId) || x.appId < 1) ||
      !/^[\w.-]+\/[\w.-]+$/.test(binding.repository) ||
      !/^codex\/[a-z0-9][a-z0-9-]{0,62}$/.test(binding.branch) ||
      [binding.grantPath, binding.checkout, binding.workerRoot, binding.stateRoot].some(p =>
        typeof p !== 'string' || !isAbsolute(p) || resolve(p) !== p)) {
    throw new Error('installation binding invalid');
  }
  return binding;
}

export async function loadBoundGrant(binding, { requestedPath } = {}) {
  validateBinding(binding);
  if (requestedPath !== undefined && resolve(requestedPath) !== resolve(binding.grantPath)) {
    throw new Error('grant source is not installation-bound');
  }
  const [grantStat, grantPath, checkout, workerRoot, stateRoot] = await Promise.all([
    lstat(binding.grantPath), realpath(binding.grantPath), realpath(binding.checkout),
    realpath(binding.workerRoot), realpath(binding.stateRoot),
  ]);
  if (!grantStat.isFile() || grantStat.isSymbolicLink() ||
      [grantPath, checkout, workerRoot, stateRoot].some((p, i) =>
        resolve(p) !== resolve([binding.grantPath, binding.checkout, binding.workerRoot, binding.stateRoot][i])) ||
      inside(checkout, grantPath) || inside(workerRoot, grantPath) ||
      inside(checkout, stateRoot) || inside(stateRoot, checkout) ||
      inside(workerRoot, stateRoot) || inside(stateRoot, workerRoot) ||
      inside(checkout, workerRoot) || inside(workerRoot, checkout)) {
    throw new Error('grant or state path crosses a worker/checkout boundary');
  }
  const raw = await readFile(binding.grantPath);
  if (raw.length > 64 * 1024 || createHash('sha256').update(raw).digest('hex') !== binding.grantSha256) {
    throw new Error('protected grant content does not match installation binding');
  }
  let grant;
  try { grant = JSON.parse(raw.toString('utf8')); } catch { throw new Error('protected grant JSON invalid'); }
  validateGrant(grant);
  if (grant.revision !== binding.grantRevision || grant.repository !== binding.repository) {
    throw new Error('protected grant revision or repository changed');
  }
  return grant;
}

export function validateRepositoryIdentity(binding, repo) {
  validateBinding(binding);
  if (!repo || repo.repository !== binding.repository || repo.branch !== binding.branch ||
      repo.checkout !== binding.checkout || !HEAD.test(repo.head ?? '') || repo.dirty !== false ||
      repo.remoteStatus !== 'CURRENT' || repo.remoteHead !== repo.head) {
    throw new Error('repository identity, clean state or live remote head unverified');
  }
}
