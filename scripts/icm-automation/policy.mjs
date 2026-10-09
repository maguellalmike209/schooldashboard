import { inspectState } from './core.mjs';
import { validateExactHeadPR } from './github-read.mjs';

const ACTIVE = new Set(['PLAN_STARTED', 'BUILD_STARTED', 'VERIFY_PENDING', 'VERIFY_PASSED_LOCAL',
  'PR_PENDING', 'RECOVERY_REQUIRED', 'VERIFY_FAILED', 'BLOCKED']);
const out = (status, reason, taskId = null, stage = null, requiredEvidence = [], nextAction = 'Stop') =>
  ({ status, reason, taskId, stage, requiredEvidence, nextAction });

export function decideBrokerState(input) {
  const { grant, tasks, repo, now, usage, checkpoint, evidence = {}, journal = [],
    legacyCompletedIds = [], remotePR = null, requiredChecks = [] } = input;
  if (!grant) return out('STOP_GRANT_INVALID', 'No protected grant admitted');
  if (grant.paused || grant.revoked) return out('STOP_GRANT_PAUSED_OR_REVOKED', 'Founder grant paused or revoked');
  if (repo?.remoteStatus !== 'CURRENT') return out('STOP_IDENTITY', 'Live canonical remote evidence unavailable', null, null, ['live GitHub head']);
  const lastActive = [...journal].reverse().find(x => x.taskId && ACTIVE.has(x.event));
  const lastIntegrated = [...journal].reverse().find(x => x.taskId && x.event === 'INTEGRATED');
  const unfinished = lastActive && (!lastIntegrated || lastIntegrated.sequence < lastActive.sequence) ? lastActive : null;
  const remoteDecision = remotePR ? validateExactHeadPR({ ...remotePR,
    expectedRepo: grant.repository, expectedHead: repo.head, requiredChecks }) : null;
  const decision = inspectState({ repo, tasks, legacyCompletedIds, grant, checkpoint, evidence, usage, now });
  if (decision.state === 'STOP') {
    const budget = /budget|bound|usage|allowance/i.test(decision.reason);
    const invalidGrant = /grant|authorization|changed after|exceeds/i.test(decision.reason);
    const identity = /repository|remote|checkout|branch|dirty/i.test(decision.reason);
    return out(budget ? 'STOP_BUDGET' : invalidGrant ? 'STOP_GRANT_INVALID' :
      identity ? 'STOP_IDENTITY' : 'RECOVERY_REQUIRED', decision.reason,
      unfinished?.taskId ?? decision.taskId, null, ['independent checkpoint and source evidence'], 'Reconcile without writes');
  }
  if (unfinished) {
    if (decision.taskId && decision.taskId !== unfinished.taskId) {
      return out('RECOVERY_REQUIRED', 'Unfinished journal task conflicts with selection', unfinished.taskId,
        unfinished.stage, ['journal, task registry, Git and stage evidence'], 'Stop and reconcile same task');
    }
    if (['VERIFY_PASSED_LOCAL', 'PR_PENDING'].includes(unfinished.event)) {
      if (remoteDecision?.status === 'INTEGRATED' && decision.state === 'NO AUTHORIZED WORK') {
        return out('INTEGRATED', 'Exact-head integration independently observed', unfinished.taskId);
      }
      return out(remoteDecision?.status === 'BLOCKED' ? 'INTEGRATION_BLOCKED' : 'PR_CI_PENDING',
        remoteDecision?.reason ?? 'Local Verify does not establish protected integration', unfinished.taskId,
        'Verify', ['exact PR head, required hosted checks, review and merge'], 'Re-read live PR and CI');
    }
    if (decision.state !== 'RECOVER') return out('RECOVERY_REQUIRED', 'Unfinished task needs reconstruction',
      unfinished.taskId, unfinished.stage, ['checkpoint, Git, Plan/Build/Verify evidence'], 'Stop and reconcile same task');
  }
  if (decision.state === 'RECOVER') return out('RECOVERY_REQUIRED', decision.reason, decision.taskId,
    decision.nextStage, ['checkpoint and stage evidence'], `Resume ${decision.nextStage} after reconciliation`);
  if (decision.state === 'INTEGRATION PENDING') return out('PR_CI_PENDING', decision.reason, decision.taskId,
    'Verify', ['exact PR head and hosted checks'], 'Re-read live PR and CI');
  if (decision.state === 'INTEGRATION BLOCKED') return out('INTEGRATION_BLOCKED', decision.reason, decision.taskId);
  if (decision.state === 'SELECT') return out('READY_TO_PLAN', decision.reason, decision.taskId, 'Plan',
    ['bound grant and clean live checkout'], 'Start accepted Plan only');
  return out('NO_AUTHORIZED_WORK', decision.reason);
}
