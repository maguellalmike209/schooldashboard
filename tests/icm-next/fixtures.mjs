import { criteriaDigest, immutableTaskDigest } from '../../scripts/icm-next/records.mjs';

export const NOW = '2026-10-09T18:00:00Z';
export const HEAD = 'a'.repeat(40);
export const CANONICAL = 'b'.repeat(40);
const common = (id, kind, parentId, state) => ({ schemaVersion: 1, id, kind, parentId, revision: 1, state,
  criteriaDigest: '', sourceRef: 'synthetic:founder-accepted-v1', createdAt: '2026-10-01T00:00:00Z', updatedAt: NOW,
  riskTier: 'R1', scope: ['scripts/icm-next'], exclusions: ['Release'], evidenceRefs: [], observedActorRef: 'synthetic:actor', note: '' });
const acceptance = [{ id: 'C1', test: 'A student can save a Course', negative: false }, { id: 'C2', test: 'A second student cannot read it', negative: true }];
export function fixture({ count = 1, state = 'CANDIDATE', admitted = true } = {}) {
  const outcome = { ...common('OUT-001', 'Outcome', null, 'ACTIVE'), productResult: 'Course persistence works', studentPersona: 'Student',
    milestoneIds: ['MS-001'], acceptance: structuredClone(acceptance), expiresAt: '2026-12-01T00:00:00Z', decisionBoundaries: ['Release'] };
  const milestone = { ...common('MS-001', 'Milestone', outcome.id, 'ACTIVE'), result: 'Course persistence', outcomeId: outcome.id,
    acceptance: structuredClone(acceptance), workItemIds: [], dependsOn: [], masterVerifyRef: null };
  const workItems = Array.from({ length: count }, (_, i) => {
    const id = `WI-${String(i + 1).padStart(3, '0')}`;
    const item = { ...common(id, 'WorkItem', milestone.id, state), result: `Synthetic task ${i + 1}`, milestoneId: milestone.id,
      necessityEvidence: ['synthetic:criterion:C1'], notCoveredByExisting: 'Requires a distinct implementation', acceptance: structuredClone(acceptance),
      dependsOn: [], legacyId: null, planDepth: i === 0 ? 'CURRENT_FULL' : 'NEXT_PROVISIONAL', immutableTaskDigest: '' };
    item.criteriaDigest = criteriaDigest(item); item.immutableTaskDigest = immutableTaskDigest(item);
    return item;
  });
  milestone.workItemIds = workItems.map(x => x.id);
  outcome.criteriaDigest = criteriaDigest(outcome); milestone.criteriaDigest = criteriaDigest(milestone);
  const externalAdmissionFixture = admitted ? grantFor(workItems[0]) : null;
  return { schemaVersion: 1, now: NOW, source: { repository: 'synthetic/schooldashboard', branch: 'synthetic/m2-m4', canonicalBranch: 'main', head: HEAD },
    portfolio: [outcome], milestones: [milestone], workItems, legacy: null, events: [],
    workspace: { repository: 'synthetic/schooldashboard', branch: 'synthetic/m2-m4', head: HEAD, dirty: false,
      remoteStatus: 'CURRENT', lock: 'HELD', child: 'STOPPED', hostPermission: 'VERIFIED_FIXTURE' },
    externalAdmissionFixture, githubFixture: { requiredChecks: [
      { name: 'verify', appId: 15368 }, { name: 'CodeQL', appId: 15368 }, { name: 'Dependency review', appId: 15368 }], items: {} },
    resources: { runs: 0, retries: 0, tasksThisRun: 0, allowance: 'available' }, proposedFeedback: [], masterVerifyFixture: null };
}
export function grantFor(item) {
  return { kind: 'SYNTHETIC_EXTERNAL_ADMISSION', id: 'synthetic:grant', revision: 1, repository: 'synthetic/schooldashboard', branch: 'synthetic/m2-m4',
    outcomeId: 'OUT-001', milestoneId: 'MS-001', workItemId: item.id, taskDigest: item.immutableTaskDigest,
    criteriaDigest: item.criteriaDigest, maxRisk: 'R1', operations: ['plan'], scope: ['scripts/icm-next'],
    startsAt: '2026-10-01T00:00:00Z', expiresAt: '2026-11-01T00:00:00Z', paused: false, revoked: false,
    budgets: { maxRuns: 10, maxRetries: 2, maxTasksPerRun: 1 } };
}
export function feedback(criterionId = 'C1') { return { cause: 'FAILED_CRITERION', milestoneId: 'MS-001', criterionId,
  evidenceRef: 'synthetic:failed-browser-journey', notCoveredByExisting: 'Integrated task lacks this repair', result: 'Repair persistence',
  riskTier: 'R1', scope: ['scripts/icm-next'], exclusions: ['Release'] }; }
export function prFor(item, { head = HEAD, canonicalHead = CANONICAL, reviews = true, checks = true, merged = true } = {}) {
  return { repository: 'synthetic/schooldashboard', base: 'main', head, canonicalHead, merged, canonicalAncestor: merged,
    builderActorId: 'builder', checks: checks ? ['verify', 'CodeQL', 'Dependency review'].map(name => ({ name, appId: 15368, head, conclusion: 'success' })) : [],
    reviews: reviews ? [{ actorId: 'reviewer', state: 'APPROVED', head, sourceKind: 'GITHUB_FIXTURE' }] : [] };
}
export function masterFor(snapshot, { failedCriteria = [], negativeRefs = ['synthetic:cross-user-denied'], criteriaDigest: digest, codeSha = CANONICAL } = {}) {
  return { kind: 'SYNTHETIC_EXTERNAL_MASTER_VERIFY', milestoneId: 'MS-001', outcomeId: 'OUT-001',
    criteriaDigest: digest ?? snapshot.milestones[0].criteriaDigest, codeSha, observedAt: NOW, environment: 'synthetic:test',
    reviewerRef: 'synthetic:external-review', reviewerActorId: 'reviewer', builderActorId: 'builder',
    positiveRefs: ['synthetic:course-saved'], negativeRefs, failedCriteria, blockers: [] };
}
