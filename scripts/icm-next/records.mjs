import { createHash } from 'node:crypto';

export function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
  return value;
}

export const stableJSON = value => JSON.stringify(canonical(value));
export const sha256 = value => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : stableJSON(value)).digest('hex');
export const criteriaDigest = record => sha256(record.acceptance);

// Mutable lifecycle fields and commentary never enter an admission digest.
export function immutableTaskDigest(item) {
  const { id, kind, parentId, milestoneId, revision, criteriaDigest: criteria,
    riskTier, scope, exclusions, result, acceptance, dependsOn, legacyId } = item;
  return sha256({ id, kind, parentId, milestoneId, revision, criteriaDigest: criteria,
    riskTier, scope, exclusions, result, acceptance, dependsOn, legacyId });
}

export function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
