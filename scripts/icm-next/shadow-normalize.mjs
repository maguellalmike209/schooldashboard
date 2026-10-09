const oldValues = { STOP: 'DENY', 'NO AUTHORIZED WORK': 'DENY', RECOVER: 'RECOVER', SELECT: 'SELECT_BOUND',
  'INTEGRATION PENDING': 'WAIT', 'INTEGRATION BLOCKED': 'WAIT' };
const newValues = { STOP: 'DENY', NO_AUTHORIZED_WORK: 'DENY', PLAN_CANDIDATE: 'DENY', RECOVER: 'RECOVER',
  WAIT_PR_CI: 'WAIT', MASTER_VERIFY_PENDING: 'WAIT', MILESTONE_NEEDS_WORK: 'WAIT',
  SELECT_BOUND_ITEM: 'SELECT_BOUND', OUTCOME_COMPLETE: 'DENY_NEW_WORK' };

export function normalizeDecisions(legacy, next) {
  return { legacy: oldValues[legacy?.state] ?? 'UNKNOWN', next: newValues[next?.decision] ?? 'UNKNOWN' };
}

export function classifyDifference({ legacy, next, mapping, comparable = true }) {
  const normalized = normalizeDecisions(legacy, next);
  if (!comparable) return { normalized, classification: 'NOT_COMPARABLE', productivityImpact: 'UNKNOWN' };
  if (Object.values(normalized).includes('UNKNOWN')) return { normalized, classification: 'UNKNOWN', productivityImpact: 'UNKNOWN' };
  const old = normalized.legacy, current = normalized.next;
  if (current === 'SELECT_BOUND' && old !== 'SELECT_BOUND') return { normalized, classification: 'UNSAFE_REGRESSION', productivityImpact: 'new execution authority' };
  if (old === 'SELECT_BOUND' && current === 'SELECT_BOUND') {
    const same = mapping?.legacyId === legacy.taskId && mapping?.workItemId === next.workItemId && mapping?.bound === true;
    return { normalized, classification: same ? 'EQUIVALENT_SAFE' : 'UNSAFE_REGRESSION', productivityImpact: same ? 'none' : 'different bound item or digest' };
  }
  if (old === 'RECOVER' && current === 'RECOVER') {
    const same = mapping?.legacyId === legacy.taskId && mapping?.workItemId === next.workItemId;
    return { normalized, classification: same ? 'EQUIVALENT_SAFE' : 'UNSAFE_REGRESSION', productivityImpact: same ? 'none' : 'different recovery item' };
  }
  if (old === 'RECOVER' && current !== 'DENY' && current !== 'WAIT') return { normalized, classification: 'UNSAFE_REGRESSION', productivityImpact: 'recovery bypass' };
  if (old === 'SELECT_BOUND' && current !== 'SELECT_BOUND') return { normalized, classification: 'STRICTER_SAFE', productivityImpact: 'authorized work delayed' };
  if (old === 'RECOVER' && current !== 'RECOVER') return { normalized, classification: 'STRICTER_SAFE', productivityImpact: 'recovery delayed' };
  if (old === 'WAIT' && current === 'DENY' || old === 'WAIT' && current === 'DENY_NEW_WORK') return { normalized, classification: 'STRICTER_SAFE', productivityImpact: 'integration wait converted to denial' };
  if (old === 'DENY' && current === 'WAIT') return { normalized, classification: 'EQUIVALENT_SAFE', productivityImpact: 'new evidence obligation; no execution' };
  if (old === 'DENY' && current === 'DENY_NEW_WORK') return { normalized, classification: 'EQUIVALENT_SAFE', productivityImpact: 'outcome completion reported; no execution' };
  return { normalized, classification: old === current || old === 'WAIT' && current === 'WAIT' ? 'EQUIVALENT_SAFE' : 'STRICTER_SAFE',
    productivityImpact: old === current ? 'none' : 'additional wait or denial' };
}
