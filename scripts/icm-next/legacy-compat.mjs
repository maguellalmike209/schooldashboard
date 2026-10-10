const STATES = new Set(['Not started', 'In progress', 'Ready for verification', 'Done', 'Blocked']);
const ID = /^SD-\d{3}$/;

export function mapLegacySnapshot({ tasks, mappings = {}, prObservations = {}, sourceSha, gitObservation = {}, knownLegacyIds = [] }) {
  if (!Array.isArray(tasks) || typeof sourceSha !== 'string' || !/^[a-f0-9]{64}$/.test(sourceSha)) throw new Error('missing legacy source hash');
  if (!Array.isArray(knownLegacyIds) || new Set(knownLegacyIds).size !== knownLegacyIds.length ||
      Object.keys(mappings).some(id => !tasks.some(task => task?.id === id))) throw new Error('unknown or duplicate mapping source');
  const ids = new Set(), workIds = new Set();
  return tasks.map(task => {
    if (!ID.test(task?.id ?? '') || ids.has(task.id)) throw new Error('duplicate or invalid legacy identity');
    ids.add(task.id);
    const proposedWorkItemId = mappings[task.id] ?? null;
    if (proposedWorkItemId !== null && (!/^[A-Za-z0-9_-]{3,100}$/.test(proposedWorkItemId) || workIds.has(proposedWorkItemId))) throw new Error('duplicate or invalid new identity');
    if (proposedWorkItemId) workIds.add(proposedWorkItemId);
    const conflicts = [];
    if (!STATES.has(task.status)) conflicts.push('UNKNOWN_LEGACY_STATUS');
    if (!knownLegacyIds.length) conflicts.push('KNOWN_REGISTRY_UNKNOWN');
    else if (!knownLegacyIds.includes(task.id)) conflicts.push('UNKNOWN_LEGACY_ID');
    if (gitObservation.remoteCurrent !== true) conflicts.push('REMOTE_UNKNOWN');
    const pr = prObservations[task.id];
    if (task.status === 'Done' && (!pr || pr.merged !== true || pr.canonicalAncestor !== true || pr.checksExactHead !== true)) conflicts.push('DONE_WITHOUT_INTEGRATION_PROOF');
    const pending = ['In progress', 'Ready for verification'].includes(task.status) || pr?.merged === false;
    const mappingStatus = conflicts.length ? 'UNRESOLVED' : pending ? 'PR_PENDING' : proposedWorkItemId ? 'MAPPED_EVIDENCE' : 'HISTORICAL_ONLY';
    return Object.freeze({ legacyId: task.id, proposedWorkItemId, mappingStatus,
      evidenceRefs: [sourceSha, ...(task.evidenceRefs ?? [])], authorizationStatus: 'NOT_AUTHORIZED_BY_MIGRATION', unresolvedConflicts: conflicts });
  });
}
