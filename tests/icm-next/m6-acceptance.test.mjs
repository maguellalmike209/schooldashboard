import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
import { assessCandidate, assessIntegrationEvidence, acceptsPolicyVersion, digestCandidate, digestEnvelope, selectDelegatedWork, validateV2Envelope } from '../../scripts/icm-next/delegation-v2.mjs';
import { reserveFixture, reconcileFixture } from '../../scripts/icm-next/delegation-ledger.mjs';
import { buildManagementReview, routeFounderFeedback, selectJustifiedCandidates } from '../../scripts/icm-next/management-review.mjs';
import { inspectState } from '../../scripts/icm-automation/core.mjs';
import { scenario as legacyScenario } from '../icm-automation/fixtures.mjs';

const NOW = '2026-10-09T18:00:00Z';
const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const cases = JSON.parse(readFileSync(join(root, 'engineering/tests/M5_M6_CASES.json'), 'utf8')).cases;
const envelope = () => ({ schemaVersion: 2, envelopeId: 'env_demo1', revision: 1, founderApprovalRef: 'fixture:founder:approval',
  sourceKind: 'OWNER_AUTHENTICATED_EXTERNAL', repository: 'maguellalmike209/schooldashboard', canonicalBranch: 'main',
  outcomeId: 'OUT-001', outcomeCriteriaDigest: 'a'.repeat(64), approvedMilestones: [{ milestoneId: 'MS-001', criteriaDigest: 'b'.repeat(64) }],
  allowedTaskKinds: ['DOCS_LOCAL', 'TEST_LOCAL'], allowedPaths: ['docs/**', 'tests/**'], deniedPaths: ['docs/private/**'],
  allowedOperations: ['plan', 'build', 'verify', 'read-ci'], maxRisk: 'R1', maxTasksTotal: 3, maxTasksPerRun: 1,
  maxDepth: 1, maxConcurrentWriters: 1, maxRetriesTotal: 1, maxWallSecondsTotal: 3600,
  startsAt: '2026-10-01T00:00:00Z', expiresAt: '2026-11-01T00:00:00Z', paused: false, revoked: false,
  reviewPolicyRef: 'fixture:protected-review', requiredChecks: ['verify', 'CodeQL', 'Dependency review'].map(name => ({ name, appId: 15368 })),
  publisherMode: 'NONE', releaseAllowed: false, grantKeyId: 'fixture-key' });
function fixture() {
  const env = envelope();
  const candidate = { candidateId: 'WI-001', parentOutcomeId: 'OUT-001', milestoneId: 'MS-001', parentCriterionIds: ['C1'],
    evidenceRefs: ['fixture:failed-criterion'], taskKind: 'DOCS_LOCAL', allowedPathsRequested: ['docs/help.md'], riskRequested: 'R0',
    operationsRequested: ['plan', 'build', 'verify'], workBudgetRequested: { wallSeconds: 300 }, dependencies: [],
    createdBy: 'manager', proposedAt: NOW, acceptancePositive: ['Docs explain course flow'],
    acceptanceNegative: ['No private course data exposed'], reasonExistingItemsInsufficient: 'Existing work omitted documentation' };
  candidate.proposalDigest = digestCandidate(candidate);
  return { envelope: env, candidate, authenticatedBindingObservation: { proofClass: 'OFFLINE_FIXTURE', issuer: 'INDEPENDENT_FIXTURE',
    envelopeDigest: digestEnvelope(env), envelopeId: env.envelopeId, revision: env.revision, founderApprovalRef: env.founderApprovalRef,
    revocationEpoch: 0, valid: true }, parentRecords: { repository: env.repository, branch: 'main', outcome: { id: 'OUT-001', criteriaDigest: env.outcomeCriteriaDigest, state: 'ACTIVE' },
    milestone: { id: 'MS-001', criteriaDigest: env.approvedMilestones[0].criteriaDigest, criteriaIds: ['C1'], state: 'ACTIVE' }, completedItemIds: [] },
  evidenceObservation: { proofClass: 'OFFLINE_FIXTURE', candidateDigest: candidate.proposalDigest, verifiedRefs: ['fixture:failed-criterion'],
    existingItemsInsufficient: true, effectTags: [], scopeProven: true, independentClassification: true,
    pathFacts: { 'docs/help.md': { withinRoot: true, symlink: false, junction: false, proofClass: 'OFFLINE_FIXTURE' } } },
  resources: { known: true, tasksUsed: 0, tasksThisRun: 0, retriesUsed: 0, wallSecondsReserved: 0, concurrentWriters: 0 }, now: NOW };
}
const refresh = f => { f.candidate.proposalDigest = digestCandidate(f.candidate); f.evidenceObservation.candidateDigest = f.candidate.proposalDigest;
  if (f.authenticatedBindingObservation) f.authenticatedBindingObservation.envelopeDigest = digestEnvelope(f.envelope); return f; };
const assess = mutate => { const f = fixture(); mutate?.(f); return assessCandidate(refresh(f)); };
const ledger = f => ({ proofClass: 'OFFLINE_FIXTURE', known: true, sequence: 0, envelopeId: f.envelope.envelopeId,
  revision: f.envelope.revision, revocationEpoch: 0, reservations: [], tasksUsed: 0, tasksThisRun: 0,
  wallSecondsReserved: 0, retriesUsed: 0, activeWriters: 0 });
const reserve = (f, l = ledger(f), id = 'invoke_001', seq = l.sequence) => reserveFixture({ ledger: l, envelope: f.envelope,
  candidate: f.candidate, admission: assessCandidate(f), invocationId: id, expectedSequence: seq, now: NOW });
const select = (f, state = {}) => selectDelegatedWork({ envelope: f.envelope, state: { hostVerified: true, grantCurrent: true,
  lockExclusive: true, childTreeStopped: true, ledgerCurrent: true, githubCurrent: true, networkCurrent: true, items: [], ...state },
  candidates: [f.candidate], assessmentInputs: [f], now: NOW });
const pr = () => ({ headSha: 'a'.repeat(40), canonicalHead: 'b'.repeat(40), base: 'main', canonicalAncestor: true, merged: true,
  checks: ['verify', 'CodeQL', 'Dependency review'].map(name => ({ name, appId: 15368, headSha: 'a'.repeat(40), conclusion: 'success' })) });
const integration = options => assessIntegrationEvidence({ pr: pr(), requiredChecks: envelope().requiredChecks,
  reviewer: { actor: 'reviewer', source: 'GITHUB', headSha: 'a'.repeat(40), state: 'APPROVED' }, builderActor: 'builder',
  milestone: { studentJourneyPassed: true, negativeCriteriaPassed: true, criteriaDigest: 'b'.repeat(64), frozenCriteriaDigest: 'b'.repeat(64), codeSha: 'b'.repeat(40) }, ...options });

test('catalog has exactly M5-01..24 and M6-01..50 once', () => {
  assert.equal(cases.length, 74); assert.equal(new Set(cases.map(x => x.id)).size, 74);
  for (let i = 1; i <= 24; i++) assert.ok(cases.some(x => x.id === `M5-${String(i).padStart(2, '0')}`));
  for (let i = 1; i <= 50; i++) assert.ok(cases.some(x => x.id === `M6-${String(i).padStart(2, '0')}`));
});
test('baseline simulated admission is explicitly offline only', () => { const result = assess(); assert.equal(result.decision, 'ADMIT_FIXTURE'); assert.equal(result.launchCapability, false); assert.equal(result.proofClass, 'OFFLINE_ONLY'); });
test('M6-01 valid shape without issuer observation denies', () => assert.equal(assess(f => { f.authenticatedBindingObservation = null; }).code, 'ISSUER_UNAUTHENTICATED'));
test('M6-02 missing founder-approved parent denies', () => assert.equal(assess(f => { f.parentRecords.outcome = null; }).code, 'PARENT_OUTCOME_MISMATCH'));
test('M6-03 unapproved milestone denies', () => assert.equal(assess(f => { f.candidate.milestoneId = 'MS-999'; }).code, 'PARENT_MILESTONE_MISMATCH'));
test('M6-04 frozen milestone digest mutation denies', () => assert.equal(assess(f => { f.parentRecords.milestone.criteriaDigest = 'f'.repeat(64); }).code, 'PARENT_MILESTONE_MISMATCH'));
test('M6-05 frozen outcome digest mutation denies', () => assert.equal(assess(f => { f.parentRecords.outcome.criteriaDigest = 'f'.repeat(64); }).code, 'PARENT_OUTCOME_MISMATCH'));
test('M6-06 model-added task kind denied by closed schema', () => assert.equal(assess(f => { f.envelope.allowedTaskKinds.push('NEW_FEATURE'); }).code, 'SCHEMA_INVALID'));
test('M6-07 new feature called docs denied by effect classification', () => assert.equal(assess(f => { f.evidenceObservation.effectTags = ['NEW_PROVIDER']; }).code, 'FORBIDDEN_EFFECT'));
test('M6-08 traversal and symlink escape denied', () => { assert.equal(assess(f => { f.candidate.allowedPathsRequested = ['docs/../secrets.md']; }).code, 'PATH_DENIED');
  assert.equal(assess(f => { f.evidenceObservation.pathFacts['docs/help.md'].symlink = true; }).code, 'PATH_SAFETY_UNKNOWN'); });
test('M6-09 protected policy, test gates and workflows denied', () => {
  for (const path of ['AGENTS.md', '.github/workflows/ci.yml', 'docs/SECURITY_REQUIREMENTS.md', 'tests/icm-next/engine.test.mjs'])
    assert.equal(assess(f => { f.candidate.allowedPathsRequested = [path]; }).code, 'PATH_DENIED');
});
test('M6-10 new provider is proposal only when manager feedback', () => { assert.equal(routeFounderFeedback({ kind: 'BRAINSTORM', scopeExpansion: true }).status, 'PROPOSED_ONLY');
  assert.equal(assess(f => { f.evidenceObservation.effectTags = ['NEW_PROVIDER']; }).decision, 'DENY'); });
test('M6-11 auth/RLS effect cannot launder R0', () => assert.equal(assess(f => { f.evidenceObservation.effectTags = ['RLS']; }).code, 'FORBIDDEN_EFFECT'));
test('M6-12 missing negative acceptance denies', () => assert.equal(assess(f => { f.candidate.acceptanceNegative = []; }).code, 'CANDIDATE_INVALID'));
test('M6-13 fabricated evidence ref remains candidate only', () => assert.equal(assess(f => { f.candidate.evidenceRefs = ['model:invented']; }).decision, 'CANDIDATE_ONLY'));
test('M6-14 insufficient evidence existing tasks inadequate remains candidate', () => assert.equal(assess(f => { f.evidenceObservation.existingItemsInsufficient = false; }).code, 'NECESSITY_UNPROVEN'));
test('M6-15 two justified items do not fill five-slot quota', () => assert.equal(selectJustifiedCandidates([{ id: 'A', evidenceRef: 'e', parentCriterionId: 'C1', reasonExistingItemsInsufficient: 'x' }, { id: 'B', evidenceRef: 'e', parentCriterionId: 'C2', reasonExistingItemsInsufficient: 'x' }]).length, 2));
test('M6-16 only current justified item detailed', () => assert.deepEqual(selectJustifiedCandidates([{ id: 'A', evidenceRef: 'e', parentCriterionId: 'C1', reasonExistingItemsInsufficient: 'x' }, { id: 'B', evidenceRef: 'e', parentCriterionId: 'C2', reasonExistingItemsInsufficient: 'x' }]).map(x => x.detailLevel), ['CURRENT_DETAILED', 'PROVISIONAL']));
test('M6-17 interrupted task recovered before new child', () => assert.equal(select(fixture(), { items: [{ id: 'WI-OLD', state: 'BUILD' }] }).decision, 'RECOVER_OR_STOP'));
test('M6-18 task B integration does not resolve task A', () => assert.equal(select(fixture(), { items: [{ id: 'WI-A', state: 'VERIFY' }, { id: 'WI-B', state: 'INTEGRATED' }] }).workItemId, 'WI-A'));
test('M6-19 revocation after reservation stops new effects', () => { const f = fixture(), first = reserve(f); assert.equal(first.decision, 'RESERVED_FIXTURE');
  f.envelope.revoked = true; assert.equal(assessCandidate(refresh(f)).code, 'REVOKED_OR_PAUSED'); });
test('M6-20 expired parent denies even inside retries', () => assert.equal(assess(f => { f.envelope.expiresAt = '2026-10-09T17:59:59Z'; }).code, 'EXPIRED_OR_NOT_STARTED'));
test('M6-21 changed revision denies existing ledger reservation', () => { const f = fixture(), l = ledger(f); f.envelope.revision = 2; assert.equal(reserve(f, l).code, 'PARENT_REVOKED_OR_REVISED'); });
test('M6-22 unknown usage denies', () => assert.equal(assess(f => { f.resources.known = false; }).code, 'BUDGET_UNKNOWN'));
test('M6-23 exhausted total cap denies', () => assert.equal(assess(f => { f.resources.tasksUsed = 3; }).code, 'BUDGET_EXHAUSTED'));
test('M6-24 sequential same-child requests reserve once in fixture', () => { const f = fixture(), first = reserve(f); assert.equal(first.decision, 'RESERVED_FIXTURE');
  const second = reserve(f, first.ledger); assert.equal(second.decision, 'REPLAY_NO_NEW_RESERVATION'); assert.equal(second.ledger.tasksUsed, 1); });
test('M6-25 prior receipt revision replay denied', () => { const f = fixture(), first = reserve(f); f.envelope.revision = 2;
  assert.equal(reserve(f, first.ledger).code, 'PARENT_REVOKED_OR_REVISED'); });
test('M6-26 actual V1 grant cannot satisfy V2 schema', () => { assert.equal(acceptsPolicyVersion(1, 2), false); assert.throws(() => validateV2Envelope(legacyScenario().grant)); });
test('M6-27 actual V1 inspector rejects V2 pseudo-token', () => { const s = legacyScenario(); s.grant = envelope();
  assert.equal(acceptsPolicyVersion(2, 1), false); assert.equal(inspectState(s).state, 'STOP'); });
test('M6-28 fake/self reviewer does not establish independent QA', () => assert.equal(integration({ reviewer: { actor: 'builder', source: 'MODEL', headSha: 'a'.repeat(40), state: 'APPROVED' } }).code, 'INDEPENDENT_REVIEW_MISSING'));
test('M6-29 stale PR hosted check does not integrate', () => { const p = pr(); p.checks[0].headSha = 'b'.repeat(40); assert.equal(integration({ pr: p }).code, 'STALE_OR_MISSING_CI'); });
test('M6-30 failed student journey blocks green PR', () => assert.equal(integration({ milestone: { studentJourneyPassed: false, negativeCriteriaPassed: true, criteriaDigest: 'b'.repeat(64), frozenCriteriaDigest: 'b'.repeat(64), codeSha: 'b'.repeat(40) } }).code, 'MASTER_NEEDS_WORK'));
test('M6-31 unmet negative criterion blocks completion', () => assert.equal(integration({ milestone: { studentJourneyPassed: true, negativeCriteriaPassed: false, criteriaDigest: 'b'.repeat(64), frozenCriteriaDigest: 'b'.repeat(64), codeSha: 'b'.repeat(40) } }).code, 'MASTER_NEEDS_WORK'));
test('M6-32 completed outcome selects no new child', () => assert.equal(select(fixture(), { outcomeComplete: true }).code, 'OUTCOME_COMPLETE'));
test('M6-33 publisher NONE denies draft mutation', () => assert.equal(assess(f => { f.candidate.operationsRequested.push('prepare-draft-pr'); f.envelope.allowedOperations.push('prepare-draft-pr'); }).code, 'OPERATION_DENIED'));
test('M6-34 DRAFT_ONLY still denies merge and Release', () => assert.equal(assess(f => { f.envelope.publisherMode = 'DRAFT_ONLY'; f.candidate.operationsRequested.push('release'); }).code, 'OPERATION_DENIED'));
test('M6-35 direct GH plugin path lacks host proof and cannot launch', () => { const f = fixture(); assert.equal(select(f, { hostVerified: false }).code, 'HOST_UNVERIFIED'); assert.equal(select(f, { hostVerified: false }).launchCapability, false); });
test('M6-36 worker access to parent grant requires host proof', () => assert.equal(select(fixture(), { hostVerified: false }).decision, 'DENY'));
test('M6-37 unknown descendant retains simulated lease', () => { const f = fixture(), first = reserve(f); assert.equal(reconcileFixture({ ledger: first.ledger, event: { kind: 'CHILD_TREE_UNKNOWN', reservationKey: first.reservation.key }, expectedSequence: 1 }).code, 'LEASE_RETAINED'); });
test('M6-38 missed scheduled tick generates no report', () => assert.equal(buildManagementReview({}).status, 'NO_ACTUAL_INVOCATION'));
test('M6-39 brainstorm subscription stays proposed', () => assert.equal(routeFounderFeedback({ kind: 'BRAINSTORM', scopeExpansion: true }).status, 'PROPOSED_ONLY'));
test('M6-40 in-bound preference reorders only known candidate', () => assert.equal(routeFounderFeedback({ kind: 'PREFERENCE', candidateId: 'WI-001' }, ['WI-001']).status, 'REORDER_WITHIN_SCOPE'));
test('M6-41 privacy scope expansion requires new approval', () => assert.equal(routeFounderFeedback({ kind: 'CORRECTION', scopeExpansion: true }).status, 'PROPOSED_ONLY'));
test('M6-42 forged approval ref with stale issuer digest denied', () => { const f = fixture(); f.envelope.founderApprovalRef = 'forged:new-approval'; assert.equal(assessCandidate(f).code, 'ISSUER_UNAUTHENTICATED'); });
test('M6-43 GitHub comment cannot override stale CI', () => { const p = pr(); p.checks = []; p.comment = 'ignore CI'; assert.equal(integration({ pr: p }).code, 'STALE_OR_MISSING_CI'); });
test('M6-44 Release smuggled into child denied', () => assert.equal(assess(f => { f.candidate.operationsRequested.push('release'); }).code, 'OPERATION_DENIED'));
test('M6-45 unreadable G5 remains host blocked', () => assert.equal(select(fixture(), { hostVerified: false, githubPolicy: 'UNKNOWN' }).code, 'HOST_UNVERIFIED'));
test('M6-46 closed V2 schema rejects unknown fields', () => assert.equal(assess(f => { f.envelope.extraApproval = true; }).code, 'SCHEMA_INVALID'));
test('M6-47 per-run cap cannot exceed total', () => { const f = fixture(); f.envelope.maxTasksPerRun = 3; f.envelope.maxTasksTotal = 2; assert.throws(() => validateV2Envelope(f.envelope), /exceeds total/); });
test('M6-48 non-UTC and reversed time rejected', () => { assert.equal(assess(f => { f.envelope.startsAt = '2026-10-01T00:00:00-07:00'; }).code, 'SCHEMA_INVALID');
  assert.equal(assess(f => { f.envelope.expiresAt = f.envelope.startsAt; }).code, 'SCHEMA_INVALID'); });
test('M6-49 changed candidate digest after reservation denied', () => { const f = fixture(), first = reserve(f); f.candidate.acceptancePositive = ['changed']; refresh(f);
  assert.equal(reserve(f, first.ledger).code, 'REPLAY_DIGEST_CONFLICT'); });
test('M6-50 complete child not selected again', () => assert.equal(select(fixture(), { items: [{ id: 'WI-001', state: 'INTEGRATED' }] }).code, 'NO_ADMISSIBLE_CHILD'));
test('always-on outage denies unsupported writes', () => assert.equal(select(fixture(), { networkCurrent: false }).code, 'EXTERNAL_EVIDENCE_UNKNOWN'));
test('overlapping trigger without exclusive lease cannot select', () => assert.equal(select(fixture(), { lockExclusive: false }).code, 'HOST_UNVERIFIED'));
test('restart recovers same unfinished item before new selection', () => assert.equal(select(fixture(), { items: [{ id: 'WI-OLD', state: 'PLAN' }] }).workItemId, 'WI-OLD'));
test('founder silence does not renew expiry', () => { const f = fixture(); f.envelope.expiresAt = NOW; assert.equal(select(f).code, 'REVOKED_EXPIRED_OR_TIME_UNKNOWN'); });
test('revocation retains fixture lease until child death is proven', () => { const f = fixture(), first = reserve(f); const stopped = reconcileFixture({ ledger: first.ledger,
  event: { kind: 'REVOKED', reservationKey: first.reservation.key }, expectedSequence: 1 });
  assert.equal(stopped.code, 'LEASE_RETAINED'); assert.equal(stopped.ledger.activeWriters, 1); });
test('periodic report includes only an observed actual invocation', () => {
  const report = buildManagementReview({ invocation: { occurred: true, id: 'run_001', observedAt: NOW }, resources: {} });
  assert.equal(report.report.resources.actualRuns, 'UNKNOWN'); assert.equal(report.report.notificationDelivery, 'UNVERIFIED');
});
