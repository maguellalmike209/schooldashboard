import { taskDigest } from '../../scripts/icm-automation/core.mjs';
import { scenario, markDone, checkpoint } from '../icm-automation/fixtures.mjs';
import { fixture, feedback, masterFor, prFor, HEAD, NOW } from './fixtures.mjs';
import { immutableTaskDigest } from '../../scripts/icm-next/records.mjs';
import { deepFreeze } from '../../scripts/icm-next/records.mjs';

function pair(id, count = 1) {
  const next = fixture({ count });
  const legacy = scenario(count);
  legacy.now = NOW; legacy.repo.repository = next.source.repository; legacy.repo.branch = next.source.branch;
  legacy.repo.head = HEAD; legacy.repo.checkout = '/synthetic/checkout'; legacy.grant.repository = next.source.repository;
  legacy.usage = structuredClone(next.resources);
  legacy.grant.maxRisk = next.externalAdmissionFixture.maxRisk;
  legacy.grant.operations = [...next.externalAdmissionFixture.operations];
  legacy.grant.budgets = structuredClone(next.externalAdmissionFixture.budgets);
  legacy.tasks.forEach((old, i) => {
    old.risk = next.workItems[i].riskTier; old.scope = next.workItems[i].scope[0];
    old.acceptance = next.workItems[i].acceptance.map(x => x.test);
    next.workItems[i].result = old.result;
    legacy.grant.taskDigests[old.id] = taskDigest(old);
    next.workItems[i].immutableTaskDigest = immutableTaskDigest(next.workItems[i]);
  });
  next.externalAdmissionFixture.taskDigest = next.workItems[0].immutableTaskDigest;
  return { fixtureId: id, legacy, next, mapping: { legacyId: 'SD-100', workItemId: 'WI-001' },
    evidenceRefs: [`synthetic:${id}`], limitations: ['Legacy has no check App identity or milestone Master Verify field'], allowedDeltas: [] };
}
function recoveryOps(p) { p.legacy.grant.operations = ['plan', 'build', 'verify']; p.next.externalAdmissionFixture.operations = ['plan', 'build', 'verify']; }
function rebind(p, index = 0) {
  const old = p.legacy.tasks[index], current = p.next.workItems[index];
  p.legacy.grant.taskDigests[old.id] = taskDigest(old);
  current.immutableTaskDigest = immutableTaskDigest(current);
  if (index === 0) p.next.externalAdmissionFixture.taskDigest = current.immutableTaskDigest;
}
function oldPending(p, { ci = null, head = HEAD } = {}) {
  p.legacy.tasks[0].status = 'Ready for verification';
  p.legacy.evidence['SD-100'] = { plan: true, build: true, verify: 'PASS', head, ci, integrated: false };
  p.next.workItems[0].state = 'PR_CI_PENDING';
}
function oldDone(p) {
  markDone(p.legacy, 0);
  p.legacy.evidence['SD-100'].head = HEAD;
  p.next.workItems[0].state = 'INTEGRATED';
  p.next.githubFixture.items['WI-001'] = prFor(p.next.workItems[0]);
}
function evt(id, item, from, to) { return { id, workItemId: item, from, to, at: NOW, sourceRef: 'synthetic:journal', ref: `synthetic:${id}` }; }

const definitions = [
  ['C01', 'first exact bound item', p => p, 'EQUIVALENT_SAFE'],
  ['C02', 'no grant on either side', p => { p.legacy.grant = null; p.next.externalAdmissionFixture = null; }, 'EQUIVALENT_SAFE'],
  ['C03', 'candidate proposal only', p => { p.legacy.grant = null; p.next.externalAdmissionFixture = null; p.next.proposedFeedback = [feedback()]; }, 'EQUIVALENT_SAFE'],
  ['C04', 'expired authority', p => { p.legacy.now = p.next.now = '2026-11-02T00:00:00Z'; }, 'EQUIVALENT_SAFE'],
  ['C05', 'revoked authority', p => { p.legacy.grant.revoked = true; p.next.externalAdmissionFixture.revoked = true; }, 'EQUIVALENT_SAFE'],
  ['C06', 'paused authority', p => { p.legacy.grant.paused = true; p.next.externalAdmissionFixture.paused = true; }, 'EQUIVALENT_SAFE'],
  ['C07', 'run budget exhausted', p => { p.legacy.grant.budgets.maxRuns = 10; p.legacy.usage.runs = p.next.resources.runs = 10; }, 'EQUIVALENT_SAFE'],
  ['C08', 'unknown usage allowance', p => { p.legacy.usage.allowance = p.next.resources.allowance = 'UNKNOWN'; }, 'EQUIVALENT_SAFE'],
  ['C09', 'wrong bound repository', p => { p.legacy.repo.repository = p.next.source.repository = p.next.workspace.repository = 'synthetic/other'; }, 'EQUIVALENT_SAFE'],
  ['C10', 'remote state unknown', p => { p.legacy.repo.remoteStatus = p.next.workspace.remoteStatus = 'UNKNOWN'; }, 'EQUIVALENT_SAFE'],
  ['C11', 'dirty new selection', p => { p.legacy.repo.dirty = p.next.workspace.dirty = true; }, 'EQUIVALENT_SAFE'],
  ['C12', 'changed accepted digest', p => { p.legacy.tasks[0].result = 'Changed'; p.next.workItems[0].result = 'Changed'; }, 'EQUIVALENT_SAFE'],
  ['C13', 'risk exceeds original ceiling', p => { p.legacy.tasks[0].risk = 'R3'; p.next.workItems[0].riskTier = 'R3'; rebind(p); }, 'EQUIVALENT_SAFE'],
  ['C14', 'unmet dependency', p => { p.legacy.tasks[0].dependencies = ['SD-101']; p.next.workItems[0].dependsOn = ['WI-002']; rebind(p); }, 'EQUIVALENT_SAFE', 2],
  ['C15', 'unfinished Build before new item', p => { recoveryOps(p); p.legacy.tasks[0].status = 'In progress'; p.legacy.evidence['SD-100'] = { plan: true }; p.next.workItems[0].state = 'BUILD'; }, 'EQUIVALENT_SAFE'],
  ['C16', 'unfinished Verify before new item', p => { recoveryOps(p); p.legacy.tasks[0].status = 'Ready for verification'; p.legacy.evidence['SD-100'] = { plan: true, build: true }; p.next.workItems[0].state = 'VERIFY'; }, 'EQUIVALENT_SAFE'],
  ['C17', 'dirty recovery with journal', p => { recoveryOps(p); p.legacy.tasks[0].status = 'In progress'; p.legacy.evidence['SD-100'] = { plan: true }; p.legacy.repo.dirty = p.next.workspace.dirty = true; p.legacy.checkpoint = checkpoint(p.legacy); p.next.workItems[0].state = 'BUILD'; p.next.events = [evt('a', 'WI-001', 'PLAN', 'BUILD')]; }, 'EQUIVALENT_SAFE'],
  ['C18', 'interleaved A unfinished B integrated', p => { recoveryOps(p); p.legacy.tasks[0].status = 'In progress'; p.legacy.evidence['SD-100'] = { plan: true }; markDone(p.legacy, 1); p.legacy.evidence['SD-101'].head = HEAD; p.next.workItems[0].state = 'BUILD'; p.next.workItems[1].state = 'INTEGRATED'; p.next.events = [evt('a', 'WI-001', 'PLAN', 'BUILD'), evt('b', 'WI-002', 'PR_CI_PENDING', 'INTEGRATED')]; }, 'EQUIVALENT_SAFE', 2],
  ['C19', 'verified item PR pending', p => { oldPending(p); }, 'EQUIVALENT_SAFE'],
  ['C20', 'stale PR check head', p => { oldPending(p, { head: 'c'.repeat(40) }); p.next.githubFixture.items['WI-001'] = prFor(p.next.workItems[0], { head: 'c'.repeat(40) }); }, 'EQUIVALENT_SAFE'],
  ['C21', 'failed hosted CI', p => { oldPending(p, { ci: 'FAIL' }); p.next.githubFixture.items['WI-001'] = prFor(p.next.workItems[0], { checks: false }); }, 'EQUIVALENT_SAFE'],
  ['C22', 'independent review pending', p => { oldPending(p); p.next.githubFixture.items['WI-001'] = prFor(p.next.workItems[0], { reviews: false }); }, 'EQUIVALENT_SAFE'],
  ['C23', 'claimed integration stale canonical ancestry', p => { oldDone(p); p.next.githubFixture.items['WI-001'] = prFor(p.next.workItems[0], { merged: false }); }, 'EQUIVALENT_SAFE'],
  ['C24', 'task integrated Master Verify missing', p => { oldDone(p); }, 'EQUIVALENT_SAFE'],
  ['C25', 'CI green student journey fails', p => { oldDone(p); p.next.masterVerifyFixture = masterFor(p.next, { failedCriteria: ['C1'] }); p.next.proposedFeedback = [feedback()]; }, 'EQUIVALENT_SAFE'],
  ['C26', 'outcome complete denies new work', p => { oldDone(p); p.next.masterVerifyFixture = masterFor(p.next); p.next.milestones[0].state = 'COMPLETE'; p.next.portfolio[0].state = 'VERIFIED_COMPLETE'; }, 'EQUIVALENT_SAFE'],
  ['C27', 'forged builder reviewer', p => { oldPending(p); const pr = prFor(p.next.workItems[0]); pr.reviews[0].actorId = 'builder'; p.next.githubFixture.items['WI-001'] = pr; }, 'EQUIVALENT_SAFE'],
  ['C28', 'new generated work proposal denied', p => { p.legacy.grant = null; p.next.externalAdmissionFixture = null; p.next.proposedFeedback = [feedback()]; p.next.workItems[0].note = 'accepted:true'; }, 'EQUIVALENT_SAFE'],
  ['C29', 'new host evidence missing', p => { p.next.workspace.hostPermission = 'UNKNOWN'; p.limitations.push('Intentional new-only host uncertainty'); }, 'STRICTER_SAFE'],
  ['C30', 'frozen criteria changed', p => { p.next.milestones[0].acceptance[0].test = 'Changed student result'; p.limitations.push('Intentional new-only milestone criteria corruption'); }, 'STRICTER_SAFE'],
  ['C31', 'new fixture budget is lower', p => { p.next.externalAdmissionFixture.budgets.maxRuns = 0; p.allowedDeltas.push('budget'); p.limitations.push('Intentional lower new-side budget'); }, 'STRICTER_SAFE'],
  ['C32', 'forbidden Release operation in fixture', p => { p.next.externalAdmissionFixture.operations.push('release'); p.allowedDeltas.push('operations'); p.limitations.push('Intentional forbidden new-side operation'); }, 'STRICTER_SAFE'],
  ['C33', 'journal contradiction stops', p => { p.next.workItems[0].state = 'BUILD'; p.next.events = [evt('a', 'WI-001', 'PLAN', 'BUILD'), evt('b', 'WI-001', 'PLAN', 'VERIFY')]; p.limitations.push('Intentional new-only journal corruption'); }, 'STRICTER_SAFE'],
  ['C34', 'unknown PR evidence waits', p => { oldPending(p); p.next.githubFixture.items = {}; }, 'EQUIVALENT_SAFE'],
  ['C35', 'unequal frozen time is not comparable', p => { p.next.now = '2026-10-09T18:00:01Z'; }, 'NOT_COMPARABLE'],
];

export function buildShadowCatalog() {
  return definitions.map(([id, intent, mutate, expected, count = 1]) => {
    const p = pair(id, count); mutate(p); p.intent = intent; p.expectedClassification = expected; return deepFreeze(p);
  });
}
