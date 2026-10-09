import { validUtc } from './schemas.mjs';

export function assessMasterVerify(milestone, outcome, observation, integratedHead) {
  if (!observation || observation.kind !== 'SYNTHETIC_EXTERNAL_MASTER_VERIFY' || observation.milestoneId !== milestone.id ||
      observation.outcomeId !== outcome.id || observation.criteriaDigest !== milestone.criteriaDigest || observation.codeSha !== integratedHead ||
      !validUtc(observation.observedAt) || !observation.environment || !observation.reviewerRef ||
      !observation.reviewerActorId || !observation.builderActorId || observation.reviewerActorId === observation.builderActorId ||
      !Array.isArray(observation.positiveRefs) || !observation.positiveRefs.length || !Array.isArray(observation.negativeRefs) || !observation.negativeRefs.length ||
      !Array.isArray(observation.failedCriteria) || !Array.isArray(observation.blockers)) return { verdict: 'PENDING', code: 'MASTER_EVIDENCE_MISSING' };
  if (observation.blockers.length) return { verdict: 'PENDING', code: 'MASTER_EVIDENCE_MISSING' };
  if (observation.failedCriteria.some(id => !milestone.acceptance.some(x => x.id === id))) return { verdict: 'PENDING', code: 'MASTER_EVIDENCE_MISSING' };
  if (observation.failedCriteria.length) return { verdict: 'NEEDS_WORK', code: 'MASTER_FAILED', failedCriteria: [...observation.failedCriteria] };
  if (!milestone.acceptance.some(x => x.negative)) return { verdict: 'PENDING', code: 'MASTER_EVIDENCE_MISSING' };
  return { verdict: 'PASS', code: 'MASTER_PASS' };
}
