import { validUtc } from './schemas.mjs';

const risk = ['R0', 'R1', 'R2', 'R3', 'R4'];
const keys = ['kind', 'id', 'revision', 'repository', 'branch', 'outcomeId', 'milestoneId', 'workItemId', 'taskDigest', 'criteriaDigest', 'maxRisk', 'operations', 'scope', 'startsAt', 'expiresAt', 'paused', 'revoked', 'budgets'];
const operations = new Set(['plan', 'build', 'verify', 'git-branch', 'git-commit', 'git-push', 'pr']);
const fail = code => ({ admitted: false, code });

// The caller can forge this object. It is deliberately a simulation of a separate
// authority system, never a real authentication or executable grant API.
export function assessAdmissionFixture(fixture, item, context) {
  if (fixture == null) return fail('AUTHORITY_UNKNOWN');
  if (!fixture || typeof fixture !== 'object' || Array.isArray(fixture) || Object.keys(fixture).sort().join('|') !== [...keys].sort().join('|') ||
      fixture.kind !== 'SYNTHETIC_EXTERNAL_ADMISSION' || typeof fixture.id !== 'string' || !Number.isSafeInteger(fixture.revision) || fixture.revision < 1 ||
      !validUtc(fixture.startsAt) || !validUtc(fixture.expiresAt) || Date.parse(fixture.expiresAt) <= Date.parse(fixture.startsAt) ||
      typeof fixture.paused !== 'boolean' || typeof fixture.revoked !== 'boolean' || !Array.isArray(fixture.operations) || fixture.operations.some(x => !operations.has(x)) || new Set(fixture.operations).size !== fixture.operations.length || !Array.isArray(fixture.scope) ||
      !risk.includes(fixture.maxRisk) || !fixture.budgets || Object.keys(fixture.budgets).sort().join('|') !== 'maxRetries|maxRuns|maxTasksPerRun' ||
      Object.values(fixture.budgets).some(x => !Number.isSafeInteger(x) || x < 0)) return fail('AUTHORITY_UNKNOWN');
  if (fixture.revoked || fixture.paused) return fail('REVOKED');
  if (Date.parse(context.now) < Date.parse(fixture.startsAt) || Date.parse(context.now) >= Date.parse(fixture.expiresAt)) return fail('EXPIRED');
  if (fixture.repository !== context.source.repository || fixture.branch !== context.source.branch) return fail('WORKSPACE_CONFLICT');
  if (fixture.outcomeId !== context.outcome.id || fixture.milestoneId !== context.milestone.id || fixture.workItemId !== item.id ||
      fixture.taskDigest !== item.immutableTaskDigest || fixture.criteriaDigest !== item.criteriaDigest) return fail('TASK_DIGEST_MISMATCH');
  if (risk.indexOf(item.riskTier) > risk.indexOf(fixture.maxRisk) || risk.indexOf(context.milestone.riskTier) > risk.indexOf(fixture.maxRisk) ||
      risk.indexOf(context.outcome.riskTier) > risk.indexOf(fixture.maxRisk)) return fail('RISK_EXCEEDS_LIMIT');
  if (!fixture.operations.includes(context.requiredOperation ?? 'plan') || item.scope.some(x => !fixture.scope.includes(x))) return fail('TASK_DIGEST_MISMATCH');
  const { runs, retries, tasksThisRun, allowance } = context.resources ?? {};
  if (![runs, retries, tasksThisRun].every(x => Number.isSafeInteger(x) && x >= 0) || allowance !== 'available') return fail('USAGE_UNKNOWN');
  if (runs >= fixture.budgets.maxRuns || retries > 0 && retries >= fixture.budgets.maxRetries || tasksThisRun >= fixture.budgets.maxTasksPerRun) return fail('BUDGET_EXHAUSTED');
  return { admitted: true, code: 'ADMITTED_BOUND_ITEM' };
}
