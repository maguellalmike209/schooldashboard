const known = value => value === undefined || value === null ? 'UNKNOWN' : value;
const justified = candidate => candidate?.evidenceRef && candidate?.parentCriterionId && candidate?.reasonExistingItemsInsufficient;

export function selectJustifiedCandidates(candidates = []) {
  if (!Array.isArray(candidates)) return [];
  return candidates.filter(justified).sort((a, b) => a.id.localeCompare(b.id)).map((candidate, index) => ({
    ...candidate, status: 'CANDIDATE', detailLevel: index === 0 ? 'CURRENT_DETAILED' : 'PROVISIONAL',
  }));
}

export function routeFounderFeedback(feedback, approvedCandidateIds = []) {
  if (!feedback || !['BRAINSTORM', 'OBSERVATION', 'PREFERENCE', 'CORRECTION', 'DECISION', 'OUTCOME_APPROVAL', 'PAUSE-REVOKE'].includes(feedback.kind))
    return { status: 'UNKNOWN', authorityEffect: false };
  if (feedback.kind === 'PAUSE-REVOKE') return { status: 'REQUIRES_PROTECTED_OWNER_CHANNEL', authorityEffect: false };
  if (feedback.kind === 'PREFERENCE' && feedback.scopeExpansion !== true && approvedCandidateIds.includes(feedback.candidateId))
    return { status: 'REORDER_WITHIN_SCOPE', candidateId: feedback.candidateId, authorityEffect: false };
  if (feedback.kind === 'BRAINSTORM' || feedback.scopeExpansion === true || feedback.kind === 'OUTCOME_APPROVAL')
    return { status: 'PROPOSED_ONLY', authorityEffect: false };
  return { status: 'REVIEW_WITHIN_EXISTING_AUTHORITY', authorityEffect: false };
}

// Read-only report of observed events. It never issues authority or delivery.
export function buildManagementReview({ invocation, outcome, milestone, delivery = [], candidates = [], resources = {}, decisions = [], health = [] } = {}) {
  if (!invocation || invocation.occurred !== true || !invocation.id || !invocation.observedAt)
    return Object.freeze({ status: 'NO_ACTUAL_INVOCATION', report: null, authorityEffect: false, notificationClaim: false });
  const verified = delivery.filter(x => x.integrated === true && x.studentJourneyPassed === true && x.exactHeadChecks === true);
  const selected = selectJustifiedCandidates(candidates);
  const report = {
    outcome: outcome?.id ?? 'UNKNOWN', milestone: milestone?.id ?? 'UNKNOWN',
    verifiedStudentValue: verified.map(x => ({ pr: x.pr, head: x.head, journey: x.journey, evidenceRef: x.evidenceRef })),
    currentWork: invocation.recoveryItemId ? `RECOVERING ${invocation.recoveryItemId}` : invocation.admittedItemId ? `ADMITTED ${invocation.admittedItemId}` : 'NO AUTHORIZED WORK',
    newCandidates: selected.map(x => ({ id: x.id, criterion: x.parentCriterionId, evidence: x.evidenceRef,
      reason: x.reasonExistingItemsInsufficient, risk: x.risk, status: 'CANDIDATE', detailLevel: x.detailLevel })),
    health, resources: { actualRuns: known(resources.actualRuns), usage: known(resources.usage), cost: known(resources.cost) },
    decisions: decisions.filter(x => x?.material === true).slice(0, 3),
    nextSafeAction: invocation.recoveryItemId ? 'RECOVER_EXISTING' : invocation.admittedItemId ? 'CONTINUE_ADMITTED' : 'WAIT_FOR_AUTHORITY',
    invocationId: invocation.id, observedAt: invocation.observedAt,
    notificationDelivery: invocation.notificationEvidence?.delivered === true ? 'OBSERVED' : 'UNVERIFIED',
  };
  return Object.freeze({ status: 'FACTUAL_FIXTURE_REPORT', report, authorityEffect: false, notificationClaim: report.notificationDelivery === 'OBSERVED' });
}
