const CAUSES = new Set(['FAILED_CRITERION', 'MASTER_FAILURE', 'PROVEN_PREREQUISITE', 'VERIFIED_REGRESSION', 'FOUNDER_CORRECTION']);

export function planCandidates(feedback, milestone) {
  if (!Array.isArray(feedback)) return [];
  const criteria = new Set(milestone.acceptance.map(x => x.id));
  return feedback.filter(x => x && CAUSES.has(x.cause) && x.milestoneId === milestone.id && criteria.has(x.criterionId) &&
      typeof x.evidenceRef === 'string' && x.evidenceRef.trim() && typeof x.notCoveredByExisting === 'string' && x.notCoveredByExisting.trim() &&
      typeof x.result === 'string' && x.result.trim() && /^R[0-4]$/.test(x.riskTier) && Array.isArray(x.scope) && Array.isArray(x.exclusions))
    .sort((a, b) => a.criterionId.localeCompare(b.criterionId) || a.evidenceRef.localeCompare(b.evidenceRef))
    .slice(0, 5).map(x => ({ kind: 'CANDIDATE_PROPOSAL', milestoneId: milestone.id, criterionId: x.criterionId,
      cause: x.cause, evidenceRef: x.evidenceRef, notCoveredByExisting: x.notCoveredByExisting,
      result: x.result, riskTier: x.riskTier, scope: [...x.scope], exclusions: [...x.exclusions], executable: false }));
}
