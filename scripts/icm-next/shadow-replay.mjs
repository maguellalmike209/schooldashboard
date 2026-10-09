import { readFileSync } from 'node:fs';
import { inspectState, taskDigest } from '../icm-automation/core.mjs';
import { assessOfflineSnapshot } from './engine.mjs';
import { sha256, immutableTaskDigest } from './records.mjs';
import { classifyDifference } from './shadow-normalize.mjs';

const legacySourceSha = sha256(readFileSync(new URL('../icm-automation/core.mjs', import.meta.url)));
const nextSourceSha = sha256(readFileSync(new URL('./engine.mjs', import.meta.url)));
const SHA = /^[a-f0-9]{40}$/;

function parity(fixture) {
  const a = fixture?.legacy, b = fixture?.next;
  const issues = [];
  if (!a?.repo || !b?.source || !b.workspace) issues.push('missing source observation');
  else {
    if (a.now !== b.now) issues.push('time differs');
    if (a.repo.repository !== b.source.repository || a.repo.repository !== b.workspace.repository) issues.push('repository differs');
    if (a.repo.branch !== b.source.branch || a.repo.branch !== b.workspace.branch) issues.push('branch differs');
    if (a.repo.head !== b.source.head || a.repo.head !== b.workspace.head || !SHA.test(b.source.head)) issues.push('head differs');
    if (a.repo.dirty !== b.workspace.dirty) issues.push('dirty state differs');
    if (a.repo.remoteStatus !== b.workspace.remoteStatus) issues.push('remote state differs');
    if (a.usage?.runs !== b.resources?.runs || a.usage?.retries !== b.resources?.retries ||
        a.usage?.tasksThisRun !== b.resources?.tasksThisRun || a.usage?.allowance !== b.resources?.allowance) issues.push('usage differs');
  }
  const map = fixture?.mapping;
  if (!map || !Array.isArray(a?.tasks) || !Array.isArray(b?.workItems)) issues.push('task mapping unavailable');
  else {
    const old = a.tasks.find(x => x.id === map.legacyId), next = b.workItems.find(x => x.id === map.workItemId);
    if (!old || !next) issues.push('task mapping differs');
    else if (old.risk !== next.riskTier || old.scope !== next.scope[0] ||
      old.exclusions.join('|') !== next.exclusions.join('|')) issues.push('task risk/scope differs');
  }
  if (Boolean(a?.grant) !== Boolean(b?.externalAdmissionFixture)) issues.push('authority presence differs');
  if (a?.grant && b?.externalAdmissionFixture) {
    if (a.grant.maxRisk !== b.externalAdmissionFixture.maxRisk) issues.push('risk ceiling differs');
    if (JSON.stringify(a.grant.budgets) !== JSON.stringify(b.externalAdmissionFixture.budgets) && !fixture.allowedDeltas?.includes('budget')) issues.push('budget differs');
    if (a.grant.operations.join('|') !== b.externalAdmissionFixture.operations.join('|') && !fixture.allowedDeltas?.includes('operations')) issues.push('operations differ');
  }
  return issues;
}

export function replayFixture(fixture) {
  const fixtureSha256 = sha256(fixture);
  const issues = parity(fixture);
  let legacy, next;
  try { legacy = inspectState(fixture.legacy); }
  catch (error) { legacy = { state: 'UNKNOWN', reason: `Legacy inspector threw: ${error.name}`, taskId: null }; }
  try { next = assessOfflineSnapshot(fixture.next); }
  catch (error) { next = { decision: 'UNKNOWN', reasonCode: `Next engine threw: ${error.name}`, workItemId: null }; }
  const oldTask = fixture.legacy?.tasks?.find(x => x.id === fixture.mapping?.legacyId);
  const newTask = fixture.next?.workItems?.find(x => x.id === fixture.mapping?.workItemId);
  const bound = Boolean(oldTask && newTask && fixture.legacy?.grant?.taskDigests?.[oldTask.id] === taskDigest(oldTask) &&
    fixture.next?.externalAdmissionFixture?.taskDigest === newTask.immutableTaskDigest &&
    immutableTaskDigest(newTask) === newTask.immutableTaskDigest);
  const difference = classifyDifference({ legacy, next, mapping: { ...fixture.mapping, bound }, comparable: issues.length === 0 });
  return { schemaVersion: 1, fixtureId: fixture.fixtureId, fixtureSha256,
    legacy: { decision: legacy.state, reason: legacy.reason, taskId: legacy.taskId, sourceSha: legacySourceSha },
    next: { decision: next.decision, reasonCode: next.reasonCode, workItemId: next.workItemId, sourceSha: nextSourceSha },
    normalized: difference.normalized, classification: difference.classification, productivityImpact: difference.productivityImpact,
    safetyDisposition: difference.classification === 'UNSAFE_REGRESSION' ? 'FAIL_NO_EXECUTION' :
      ['UNKNOWN', 'NOT_COMPARABLE'].includes(difference.classification) ? 'DENY_UNKNOWN' : 'REVIEW_ONLY_NO_EXECUTION',
    evidenceRefs: Array.isArray(fixture.evidenceRefs) ? [...fixture.evidenceRefs] : [],
    limitations: [...issues, ...(fixture.limitations ?? [])] };
}

export function replayCatalog(fixtures) {
  if (!Array.isArray(fixtures) || fixtures.length > 100) throw new Error('replay catalog size invalid');
  const ids = new Set();
  return fixtures.map(fixture => {
    if (!fixture || typeof fixture.fixtureId !== 'string' || ids.has(fixture.fixtureId)) throw new Error('duplicate or invalid replay fixture');
    ids.add(fixture.fixtureId); return replayFixture(fixture);
  });
}

export const replaySourceHashes = Object.freeze({ legacySourceSha, nextSourceSha });
