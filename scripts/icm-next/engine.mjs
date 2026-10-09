import { validatePortfolio, validUtc } from './schemas.mjs';
import { assessAdmissionFixture } from './admission-fixture.mjs';
import { planCandidates } from './planner.mjs';
import { assessMasterVerify } from './master-verify.mjs';
import { deepFreeze, sha256 } from './records.mjs';
import { assessTransition } from './transitions.mjs';

const DECISIONS = new Set(['STOP', 'RECOVER', 'WAIT_PR_CI', 'PLAN_CANDIDATE', 'SELECT_BOUND_ITEM', 'MASTER_VERIFY_PENDING', 'MILESTONE_NEEDS_WORK', 'OUTCOME_COMPLETE', 'NO_AUTHORIZED_WORK']);
const SHA40 = /^[a-f0-9]{40}$/;
const REQUIRED_CHECKS = [{ name: 'verify', appId: 15368 }, { name: 'CodeQL', appId: 15368 }, { name: 'Dependency review', appId: 15368 }];
const stageOf = x => x?.state === 'PLAN' ? 'Plan' : x?.state === 'BUILD' ? 'Build' : x?.state === 'VERIFY' ? 'Verify' : null;
const recordReason = error => /digest/i.test(error.message) ? 'TASK_DIGEST_MISMATCH' : 'JOURNAL_CONTRADICTION';

function journal(events, items) {
  if (!Array.isArray(events) || events.length > 2000) throw new Error('journal: invalid size');
  const ids = new Set(), last = new Map();
  const known = new Map(items.map(x => [x.id, x]));
  for (const event of events) {
    if (!event || Object.keys(event).sort().join('|') !== 'at|from|id|ref|sourceRef|to|workItemId' ||
        typeof event.id !== 'string' || !event.id || ids.has(event.id) || !known.has(event.workItemId) ||
        !validUtc(event.at) || !event.sourceRef || !event.ref || typeof event.from !== 'string' || typeof event.to !== 'string') throw new Error('journal: malformed or duplicate event');
    ids.add(event.id);
    if (last.has(event.workItemId) && (last.get(event.workItemId).to !== event.from || Date.parse(event.at) < Date.parse(last.get(event.workItemId).at))) throw new Error('journal: contradictory prior state');
    if (!assessTransition({ kind: 'WorkItem', from: event.from, to: event.to,
      evidence: { sourceKind: 'SYNTHETIC_EXTERNAL_OBSERVATION', ref: event.ref, actorRef: event.sourceRef,
        exactHeadIntegrated: event.to === 'INTEGRATED', repairRevision: event.to === 'BUILD' } }).allowed) throw new Error('journal: illegal transition');
    last.set(event.workItemId, event);
  }
  for (const [id, event] of last) if (known.get(id).state !== event.to) throw new Error('journal: record contradicts final event');
}

function prProof(item, snapshot) {
  const pr = snapshot.githubFixture?.items?.[item.id];
  if (!pr || pr.repository !== snapshot.source.repository || !SHA40.test(pr.head ?? '') ||
      (item.state === 'PR_CI_PENDING' && pr.head !== snapshot.workspace.head) || pr.base !== snapshot.source.canonicalBranch) return { ready: false, code: 'PR_HEAD_PENDING' };
  const required = snapshot.githubFixture?.requiredChecks;
  if (!Array.isArray(required) || required.length !== REQUIRED_CHECKS.length ||
      !REQUIRED_CHECKS.every(expected => required.some(x => x.name === expected.name && x.appId === expected.appId)) ||
      !Array.isArray(pr.checks) || !required.every(({ name, appId }) =>
    typeof name === 'string' && Number.isSafeInteger(appId) && appId > 0 &&
    pr.checks.some(c => c.name === name && c.appId === appId && c.head === pr.head && c.conclusion === 'success'))) return { ready: false, code: 'CI_PENDING' };
  if (!Array.isArray(pr.reviews) || !pr.reviews.some(r => r.state === 'APPROVED' && r.head === pr.head &&
      r.actorId && r.actorId !== pr.builderActorId && r.sourceKind === 'GITHUB_FIXTURE')) return { ready: false, code: 'REVIEW_PENDING' };
  if (item.state === 'INTEGRATED' && (pr.canonicalAncestor !== true || pr.merged !== true || !SHA40.test(pr.canonicalHead ?? ''))) return { ready: false, code: 'PR_HEAD_PENDING' };
  return { ready: true, code: 'ADMITTED_BOUND_ITEM', head: pr.canonicalHead ?? pr.head };
}

export function assessOfflineSnapshot(snapshot) {
  let hash;
  try {
    hash = sha256(snapshot);
    if (JSON.stringify(snapshot).length > 2 * 1024 * 1024) throw new Error('snapshot oversized');
  } catch { return deepFreeze({ decision: 'STOP', reasonCode: 'AUTHORITY_UNKNOWN', outcomeId: null, milestoneId: null,
    workItemId: null, stage: null, requiredEvidence: [], proposedChanges: [], observations: { mode: 'OFFLINE_SIMULATION', externalAuthorization: 'UNVERIFIED' },
    confidence: 'UNKNOWN', sourceHashes: {} }); }
  const base = { outcomeId: null, milestoneId: null, workItemId: null, stage: null, requiredEvidence: [], proposedChanges: [],
    observations: { mode: 'OFFLINE_SIMULATION', externalAuthorization: 'UNVERIFIED' }, confidence: 'UNKNOWN', sourceHashes: { snapshotSha256: hash } };
  const out = (decision, reasonCode, detail = {}) => {
    if (!DECISIONS.has(decision)) throw new Error('engine: internal decision enum');
    return deepFreeze({ decision, reasonCode, ...base, ...detail });
  };
  if (!snapshot || typeof snapshot !== 'object' || snapshot.schemaVersion !== 1 || !validUtc(snapshot.now) ||
      !snapshot.source || !Array.isArray(snapshot.portfolio) || !Array.isArray(snapshot.milestones) || !Array.isArray(snapshot.workItems) ||
      !snapshot.workspace || !snapshot.resources || !Array.isArray(snapshot.events ?? [])) return out('STOP', 'AUTHORITY_UNKNOWN');
  const topKeys = ['schemaVersion', 'now', 'source', 'portfolio', 'milestones', 'workItems', 'legacy', 'events', 'workspace', 'externalAdmissionFixture', 'githubFixture', 'resources', 'proposedFeedback', 'masterVerifyFixture', 'outcomeCompletionFixture'];
  if (Object.keys(snapshot).some(key => !topKeys.includes(key))) return out('STOP', 'AUTHORITY_UNKNOWN');
  if (snapshot.portfolio.some(x => x.state === 'REVOKED' || x.state === 'PAUSED') || snapshot.externalAdmissionFixture?.revoked === true || snapshot.externalAdmissionFixture?.paused === true) return out('STOP', 'REVOKED');
  if (snapshot.portfolio.some(x => validUtc(x.expiresAt) && Date.parse(snapshot.now) >= Date.parse(x.expiresAt))) return out('STOP', 'EXPIRED');
  if (snapshot.externalAdmissionFixture && validUtc(snapshot.externalAdmissionFixture.expiresAt) && Date.parse(snapshot.now) >= Date.parse(snapshot.externalAdmissionFixture.expiresAt)) return out('STOP', 'EXPIRED');
  if (snapshot.externalAdmissionFixture && snapshot.resources.allowance !== 'available') return out('STOP', 'USAGE_UNKNOWN');
  let byId;
  try { byId = validatePortfolio(snapshot.portfolio, snapshot.milestones, snapshot.workItems); journal(snapshot.events, snapshot.workItems); }
  catch (error) { return out('STOP', recordReason(error), { observations: { ...base.observations, validationError: error.message } }); }
  const { source, workspace } = snapshot;
  if (!SHA40.test(source.head ?? '') || source.repository !== workspace.repository || source.branch !== workspace.branch ||
      source.head !== workspace.head || workspace.remoteStatus !== 'CURRENT' || typeof workspace.dirty !== 'boolean') return out('STOP', 'WORKSPACE_CONFLICT');
  if (workspace.lock !== 'HELD' || workspace.child !== 'STOPPED' || workspace.hostPermission !== 'VERIFIED_FIXTURE') return out('STOP', 'HOST_UNVERIFIED');
  const activeOutcomes = snapshot.portfolio.filter(x => ['ACTIVE', 'MASTER_VERIFY', 'VERIFIED_COMPLETE'].includes(x.state));
  if (activeOutcomes.length > 1) return out('STOP', 'AUTHORITY_UNKNOWN', { requiredEvidence: ['one unambiguous active outcome'] });
  const outcome = activeOutcomes[0];
  if (!outcome) return out('NO_AUTHORIZED_WORK', 'NO_ELIGIBLE_WORK');
  const milestones = snapshot.milestones.filter(x => x.parentId === outcome.id).sort((a, b) =>
    outcome.milestoneIds.indexOf(a.id) - outcome.milestoneIds.indexOf(b.id) || a.id.localeCompare(b.id));
  const current = milestones.find(x => ['ACTIVE', 'MASTER_VERIFY', 'NEEDS_WORK', 'ACCEPTED'].includes(x.state)) ?? milestones.find(x => x.state === 'COMPLETE');
  if (!current) return out('NO_AUTHORIZED_WORK', 'NO_ELIGIBLE_WORK', { outcomeId: outcome.id });
  const ids = { outcomeId: outcome.id, milestoneId: current.id };
  const items = snapshot.workItems.filter(x => x.parentId === current.id).sort((a, b) => a.id.localeCompare(b.id));
  if (outcome.state === 'VERIFIED_COMPLETE' && items.some(x => x.state !== 'INTEGRATED')) return out('MASTER_VERIFY_PENDING', 'MASTER_EVIDENCE_MISSING', { ...ids, requiredEvidence: ['completion contradicts unfinished milestone'] });
  const unfinished = items.find(x => ['PLAN', 'BUILD', 'VERIFY', 'BLOCKED'].includes(x.state));
  if (unfinished) {
    if (unfinished.state === 'BLOCKED') return out('STOP', 'RECOVER_SAME_WORK', { ...ids, workItemId: unfinished.id, requiredEvidence: ['blocker resolution'] });
    const admission = assessAdmissionFixture(snapshot.externalAdmissionFixture, unfinished, { now: snapshot.now, source, outcome, milestone: current, resources: snapshot.resources, requiredOperation: stageOf(unfinished).toLowerCase() });
    if (!admission.admitted) return out('STOP', admission.code, { ...ids, workItemId: unfinished.id });
    if (workspace.dirty && !snapshot.events.some(x => x.workItemId === unfinished.id && x.to === unfinished.state)) return out('STOP', 'JOURNAL_CONTRADICTION', { ...ids, workItemId: unfinished.id });
    return out('RECOVER', 'RECOVER_SAME_WORK', { ...ids, workItemId: unfinished.id, stage: stageOf(unfinished), confidence: 'VERIFIED_FIXTURE' });
  }
  if (workspace.dirty) return out('STOP', 'WORKSPACE_CONFLICT');
  for (const item of items.filter(x => ['PR_CI_PENDING', 'INTEGRATED'].includes(x.state))) {
    const proof = prProof(item, snapshot);
    if (!proof.ready || item.state === 'PR_CI_PENDING') return out('WAIT_PR_CI', proof.ready ? 'PR_HEAD_PENDING' : proof.code,
      { ...ids, workItemId: item.id, requiredEvidence: ['exact-head hosted checks', 'independent review', 'canonical integration'] });
  }
  if (items.length && items.every(x => x.state === 'INTEGRATED')) {
    const integratedHead = snapshot.githubFixture?.items?.[items.at(-1).id]?.canonicalHead;
    const master = assessMasterVerify(current, outcome, snapshot.masterVerifyFixture, integratedHead);
    if (master.verdict === 'NEEDS_WORK') return out('MILESTONE_NEEDS_WORK', master.code, { ...ids,
      proposedChanges: planCandidates(snapshot.proposedFeedback, current), observations: { ...base.observations, failedCriteria: master.failedCriteria }, confidence: 'VERIFIED_FIXTURE' });
    if (master.verdict !== 'PASS') return out('MASTER_VERIFY_PENDING', master.code, { ...ids, requiredEvidence: ['frozen end-to-end positive and negative journey', 'independent reviewer', 'exact integrated SHA'] });
    if (outcome.state === 'VERIFIED_COMPLETE' && milestones.every(x => x.state === 'COMPLETE')) {
      const proof = snapshot.outcomeCompletionFixture;
      const single = milestones.length === 1;
      const allProof = single || proof?.kind === 'SYNTHETIC_EXTERNAL_OUTCOME_VERIFY' && proof.outcomeId === outcome.id &&
        proof.criteriaDigest === outcome.criteriaDigest && proof.codeSha === integratedHead &&
        proof.reviewerActorId && proof.builderActorId && proof.reviewerActorId !== proof.builderActorId &&
        Array.isArray(proof.milestoneIds) && proof.milestoneIds.join('|') === outcome.milestoneIds.join('|') &&
        Array.isArray(proof.positiveRefs) && proof.positiveRefs.length && Array.isArray(proof.negativeRefs) && proof.negativeRefs.length;
      if (allProof) return out('OUTCOME_COMPLETE', 'MASTER_PASS', { ...ids, confidence: 'VERIFIED_FIXTURE' });
      return out('MASTER_VERIFY_PENDING', 'MASTER_EVIDENCE_MISSING', { ...ids, requiredEvidence: ['outcome-wide frozen acceptance proof'] });
    }
    return out('MASTER_VERIFY_PENDING', 'MASTER_PASS', { ...ids, requiredEvidence: ['milestone and outcome completion observation'], confidence: 'VERIFIED_FIXTURE' });
  }
  if (outcome.state === 'VERIFIED_COMPLETE') return out('MASTER_VERIFY_PENDING', 'MASTER_EVIDENCE_MISSING', { ...ids, requiredEvidence: ['completion contradicts unfinished milestone'] });
  const candidates = planCandidates(snapshot.proposedFeedback, current);
  const depth = (item, seen = new Set()) => {
    if (seen.has(item.id)) return 0;
    seen.add(item.id);
    return item.dependsOn.length ? 1 + Math.max(...item.dependsOn.map(id => depth(byId.get(id), seen))) : 0;
  };
  const selectable = items.filter(x => ['CANDIDATE', 'ELIGIBLE'].includes(x.state)).sort((a, b) => depth(a) - depth(b) || a.id.localeCompare(b.id));
  for (const item of selectable) {
    if (snapshot.externalAdmissionFixture?.workItemId !== item.id) continue;
    if (!item.dependsOn.every(dep => byId.get(dep)?.state === 'INTEGRATED')) return out('STOP', 'UNMET_DEPENDENCY', { ...ids, workItemId: item.id });
    const admission = assessAdmissionFixture(snapshot.externalAdmissionFixture, item, { now: snapshot.now, source, outcome, milestone: current, resources: snapshot.resources });
    if (admission.admitted) return out('SELECT_BOUND_ITEM', 'ADMITTED_BOUND_ITEM', { ...ids, workItemId: item.id, stage: 'Plan', confidence: 'VERIFIED_FIXTURE', observations: { ...base.observations, policyDecision: 'SIMULATED_BOUND_SELECTION' } });
    if (['EXPIRED', 'REVOKED', 'BUDGET_EXHAUSTED', 'USAGE_UNKNOWN', 'WORKSPACE_CONFLICT', 'TASK_DIGEST_MISMATCH', 'RISK_EXCEEDS_LIMIT'].includes(admission.code)) return out('STOP', admission.code, { ...ids, workItemId: item.id });
  }
  if (candidates.length) return out('PLAN_CANDIDATE', 'CANDIDATE_ONLY', { ...ids, proposedChanges: candidates });
  return out('NO_AUTHORIZED_WORK', 'NO_ELIGIBLE_WORK', ids);
}
