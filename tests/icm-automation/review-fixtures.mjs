import { taskDigest } from '../../scripts/icm-automation/core.mjs';

export function scenario(count = 20) {
  const taskIds = Array.from({ length: count }, (_, i) => `SD-${String(i + 100).padStart(3, '0')}`);
  const tasks = taskIds.map((id, i) => ({
    id, accepted: true, result: `Synthetic task ${id}`, priority: i + 1,
    dependencies: i ? [taskIds[i - 1]] : [], scope: `Synthetic bounded work ${id}`,
    exclusions: ['production release'], risk: 'R1',
    acceptance: ['Observable accepted outcome'], verification: ['Independent checks'],
    status: 'Not started', completion: 'Verified and protected integration',
  }));
  const now = '2026-10-08T22:00:00.000Z';
  const grant = {
    schemaVersion: 1, id: 'GRANT-EXAMPLE-001', revision: 1,
    repository: 'maguellalmike209/schooldashboard', outcome: 'Synthetic approved phase',
    taskIds, taskDigests: Object.fromEntries(tasks.map(t => [t.id, taskDigest(t)])),
    order: taskIds, maxRisk: 'R1', operations: ['plan', 'build', 'verify', 'pr'],
    startsAt: '2026-10-08T00:00:00.000Z', expiresAt: '2026-10-15T00:00:00.000Z',
    paused: false, revoked: false, budgets: { maxRuns: 100, maxRetries: 3, maxTasksPerRun: 3 },
    decisionBoundaries: ['No product pivots', 'No release'], blockedPolicy: 'stop-batch',
    completion: 'verified-and-integrated',
  };
  return {
    repo: { repository: grant.repository, branch: 'feat/automation-test', head: 'a'.repeat(40), checkout: '/tmp/automation-test', dirty: false, remoteStatus: 'CURRENT' },
    tasks, legacyCompletedIds: [], grant, checkpoint: null, evidence: {},
    usage: { runs: 1, retries: 0, tasksThisRun: 0, allowance: 'available' }, now,
  };
}

export function markDone(s, index) {
  const t = s.tasks[index];
  t.status = 'Done';
  s.evidence[t.id] = { plan: true, build: true, verify: 'PASS', ci: 'PASS', integrated: true, head: s.repo.head };
  return s;
}

export function checkpoint(s, index, stage = 'Build') {
  return {
    grantId: s.grant.id, grantRevision: s.grant.revision,
    taskId: s.tasks[index].id, stage, repository: s.repo.repository,
    branch: s.repo.branch, head: s.repo.head, checkout: s.repo.checkout,
    lastStep: 'Verified synthetic handoff', evidence: ['Plan artifact'],
    pending: ['Independent Verify'], blockers: [], nextAction: 'Inspect current state',
    timestamp: s.now, result: 'active',
  };
}
