import { taskDigest } from '../../scripts/icm-automation/core.mjs';

export const now = '2026-10-08T18:00:00Z';
export const repo = { repository: 'maguellalmike209/schooldashboard', branch: 'codex/batch', head: 'abc123', checkout: '/fixture/checkout', dirty: false, remoteStatus: 'CURRENT' };
export const task = (number, dependencies = []) => ({
  id: `SD-${String(number).padStart(3, '0')}`, accepted: true,
  result: `Synthetic result ${number}`, priority: number, dependencies,
  scope: 'Synthetic bounded work', exclusions: ['Release'], risk: 'R2',
  acceptance: ['Result is verified'], verification: ['Independent check'],
  status: 'Not started', completion: 'Verified and integrated',
});
export function scenario(count = 1) {
  const tasks = Array.from({ length: count }, (_, i) => task(100 + i));
  const taskIds = tasks.map(t => t.id);
  return {
    repo: { ...repo }, tasks, now,
    grant: {
      schemaVersion: 1, id: 'mike-batch-1', revision: 1,
      repository: repo.repository, outcome: 'Synthetic phase outcome', taskIds,
      taskDigests: Object.fromEntries(tasks.map(t => [t.id, taskDigest(t)])),
      order: [...taskIds], maxRisk: 'R2', operations: ['plan', 'build', 'verify', 'git-branch', 'git-commit', 'git-push', 'pr'],
      startsAt: '2026-10-01T00:00:00Z', expiresAt: '2026-11-01T00:00:00Z',
      paused: false, revoked: false,
      budgets: { maxRuns: 100, maxRetries: 5, maxTasksPerRun: 1 },
      decisionBoundaries: ['product', 'security', 'Release'], blockedPolicy: 'stop-batch',
      completion: 'verified-and-integrated',
    },
    checkpoint: null, evidence: {}, usage: { runs: 0, retries: 0, tasksThisRun: 0, allowance: 'available' },
  };
}
export function markDone(s, index) {
  const item = s.tasks[index];
  item.status = 'Done';
  s.evidence[item.id] = { plan: true, build: true, verify: 'PASS', ci: 'PASS', integrated: true, head: s.repo.head };
}
export function checkpoint(s, index = 0, stage = 'Build') {
  return {
    grantId: s.grant.id, grantRevision: s.grant.revision, taskId: s.tasks[index].id,
    stage, repository: s.repo.repository, branch: s.repo.branch, head: s.repo.head,
    checkout: s.repo.checkout, lastStep: 'Plan accepted', evidence: ['plan.md'],
    pending: ['Verify', 'CI'], blockers: [], nextAction: `Resume ${stage}`,
    timestamp: now, result: 'interrupted',
  };
}
