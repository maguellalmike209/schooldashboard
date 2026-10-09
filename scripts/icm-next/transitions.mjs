const edges = {
  Outcome: { PROPOSED: ['APPROVED'], APPROVED: ['ACTIVE'], ACTIVE: ['MASTER_VERIFY', 'PAUSED', 'BLOCKED', 'REVOKED'], MASTER_VERIFY: ['VERIFIED_COMPLETE', 'PAUSED', 'BLOCKED', 'REVOKED'], PAUSED: ['ACTIVE'] },
  Milestone: { CANDIDATE: ['ACCEPTED'], ACCEPTED: ['ACTIVE'], ACTIVE: ['MASTER_VERIFY', 'BLOCKED'], MASTER_VERIFY: ['COMPLETE', 'NEEDS_WORK', 'BLOCKED'], NEEDS_WORK: ['ACTIVE'] },
  WorkItem: { CANDIDATE: ['ELIGIBLE'], ELIGIBLE: ['PLAN'], PLAN: ['BUILD', 'BLOCKED', 'CANCELLED'], BUILD: ['VERIFY', 'BLOCKED', 'CANCELLED'], VERIFY: ['BUILD', 'PR_CI_PENDING', 'BLOCKED', 'CANCELLED'], PR_CI_PENDING: ['INTEGRATED', 'BLOCKED', 'CANCELLED'] },
  Invocation: { REQUESTED: ['ADMITTED', 'DENIED'], ADMITTED: ['RUNNING'], RUNNING: ['RECONCILING', 'INTERRUPTED'], INTERRUPTED: ['RECONCILING'], RECONCILING: ['STOPPED'] },
};

export function assessTransition({ kind, from, to, evidence = {} }) {
  if (!edges[kind]?.[from]?.includes(to)) return { allowed: false, code: 'ILLEGAL_TRANSITION' };
  const external = evidence.sourceKind === 'SYNTHETIC_EXTERNAL_OBSERVATION' && evidence.ref && evidence.actorRef;
  if ((kind === 'Outcome' && ['APPROVED', 'ACTIVE', 'VERIFIED_COMPLETE'].includes(to) ||
    kind === 'Milestone' && ['ACCEPTED', 'ACTIVE', 'COMPLETE'].includes(to) ||
    kind === 'WorkItem' && ['ELIGIBLE', 'INTEGRATED'].includes(to)) && !external) return { allowed: false, code: 'EXTERNAL_EVIDENCE_REQUIRED' };
  if (kind === 'Milestone' && to === 'COMPLETE' && !evidence.masterVerifyPass) return { allowed: false, code: 'MASTER_VERIFY_REQUIRED' };
  if (kind === 'WorkItem' && to === 'INTEGRATED' && !evidence.exactHeadIntegrated) return { allowed: false, code: 'EXACT_HEAD_REQUIRED' };
  if (kind === 'WorkItem' && to === 'BUILD' && from === 'VERIFY' && !evidence.repairRevision) return { allowed: false, code: 'REPAIR_EVIDENCE_REQUIRED' };
  if (kind === 'Outcome' && from === 'PAUSED' && to === 'ACTIVE' && !evidence.newOwnerRevision) return { allowed: false, code: 'NEW_OWNER_REVISION_REQUIRED' };
  return { allowed: true, code: 'ALLOWED' };
}

export const transitionStates = Object.freeze(edges);
