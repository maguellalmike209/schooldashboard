import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { collectCutoverSources, auditLegacyControls, integrationPreflight, sha256Bytes } from '../../scripts/icm-next/cutover-audit.mjs';
import { proposeRootRouter } from '../../scripts/icm-next/cutover-plan.mjs';
import { proposeRollback, rehearseRollback } from '../../scripts/icm-next/rollback-plan.mjs';
import { mapLegacySnapshot } from '../../scripts/icm-next/legacy-compat.mjs';
import { replayCatalog } from '../../scripts/icm-next/shadow-replay.mjs';
import { classifyDifference } from '../../scripts/icm-next/shadow-normalize.mjs';
import { buildManagementReview } from '../../scripts/icm-next/management-review.mjs';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const matrix = readFileSync(join(root, 'engineering/migration/LEGACY_CONTROL_MATRIX.md'), 'utf8');
const anchorPaths = [...new Set([...matrix.split('## G. Source-heading coverage ledger')[1].matchAll(/^- `([^`:\r\n]+):(\d+)` — (.+)$/gm)].map(x => x[1]))];
const sources = collectCutoverSources(root, anchorPaths);
const proposal = proposeRootRouter(sources);
const manifest = JSON.parse(readFileSync(join(root, 'engineering/migration/M5_SOURCE_MANIFEST.json'), 'utf8'));
const goodPr = number => ({ state: 'MERGED', canonicalAncestor: true, base: 'main', headSha: String(number).repeat(40).slice(0, 40),
  checks: ['verify', 'CodeQL', 'Dependency review'].map(name => ({ name, appId: 15368, headSha: String(number).repeat(40).slice(0, 40), conclusion: 'success' })),
  reviews: [{ state: 'APPROVED', headSha: String(number).repeat(40).slice(0, 40), actor: 'reviewer', source: 'GITHUB' }], author: 'builder' });
const preflight = x => integrationPreflight({ canonicalMain: 'a'.repeat(40), prs: { 26: goodPr(2), 27: goodPr(7) }, reviewerIdentity: 'reviewer', ...x });
const task = (status = 'Done', id = 'SD-018') => ({ id, status, evidenceRefs: ['stage:verify'] });
const compat = x => mapLegacySnapshot({ tasks: [task()], mappings: { 'SD-018': 'WI-018' }, sourceSha: 'a'.repeat(64),
  gitObservation: { remoteCurrent: true }, knownLegacyIds: ['SD-018'], ...x })[0];
const reverse = (observation = {}) => proposeRollback(proposal, { dirtyPaths: [], unfinishedWork: false, pendingPr: false,
  childTreeStopped: true, reviewVerified: true, operatorAuthorized: true, ...observation });
const catalog = JSON.parse(readFileSync(join(root, 'tests/icm-next/fixtures/shadow-catalog.json'), 'utf8'));

test('M5-01 complete old-router snapshot and exact hash, read only', () => {
  const audit = auditLegacyControls(matrix, sources);
  assert.equal(audit.headingCount, 1105); assert.equal(audit.status, 'PASS_FOR_SHADOW');
  assert.equal(sha256Bytes(readFileSync(join(root, 'AGENTS.md'))), sources['AGENTS.md'].sha256);
  for (const [path, pinned] of Object.entries(manifest.files)) {
    const bytes = readFileSync(join(root, path));
    assert.ok([pinned.sha256, pinned.gitBlobSha256].includes(sha256Bytes(bytes)), `stale source pin: ${path}`);
    const canonical = spawnSync('git', ['show', `:${path}`], { cwd: root, encoding: 'buffer', maxBuffer: 2_000_000 });
    assert.equal(canonical.status, 0, `missing Git blob: ${path}`);
    assert.equal(sha256Bytes(canonical.stdout), pinned.gitBlobSha256, `stale canonical blob pin: ${path}`);
    assert.equal(canonical.stdout.length, pinned.gitBlobBytes, `stale canonical size pin: ${path}`);
  }
});
test('M5-02 unmerged PR26 blocks candidate', () => assert.ok(preflight({ prs: { 26: { ...goodPr(2), state: 'OPEN' }, 27: goodPr(7) } }).blockers.includes('PR26_NOT_INTEGRATED')));
test('M5-03 stacked PR27 without main CI blocks candidate', () => assert.ok(preflight({ prs: { 26: goodPr(2), 27: { ...goodPr(7), state: 'OPEN', checks: [] } } }).blockers.includes('PR27_NOT_INTEGRATED')));
test('M5-04 pending legacy work maps PR_PENDING', () => assert.equal(compat({ tasks: [task('Ready for verification')] }).mappingStatus, 'PR_PENDING'));
test('M5-05 Done without exact-head evidence is unresolved', () => assert.ok(compat().unresolvedConflicts.includes('DONE_WITHOUT_INTEGRATION_PROOF')));
test('M5-06 unknown legacy ID stays unresolved', () => assert.ok(compat({ tasks: [task('Done', 'SD-999')], mappings: {} }).unresolvedConflicts.includes('UNKNOWN_LEGACY_ID')));
test('M5-07 new ID collision fails', () => assert.throws(() => mapLegacySnapshot({ tasks: [task('Done', 'SD-018'), task('Done', 'SD-019')],
  mappings: { 'SD-018': 'WI-001', 'SD-019': 'WI-001' }, sourceSha: 'a'.repeat(64) }), /duplicate/));
test('M5-08 missing RLS/security owner fails parity', () => {
  const broken = { ...sources, 'docs/SECURITY_REQUIREMENTS.md': { ...sources['docs/SECURITY_REQUIREMENTS.md'], text: '' } };
  assert.equal(auditLegacyControls(matrix, broken).status, 'FAIL');
});
test('M5-09 missing Release owner fails parity', () => {
  const broken = { ...sources, 'icm/04_release/CONTEXT.md': { ...sources['icm/04_release/CONTEXT.md'], text: '' } };
  assert.equal(auditLegacyControls(matrix, broken).status, 'FAIL');
});
test('M5-10 missing student value owner fails parity', () => {
  const broken = { ...sources, 'docs/PRODUCT_VISION.md': { ...sources['docs/PRODUCT_VISION.md'], text: '' } };
  assert.equal(auditLegacyControls(matrix, broken).status, 'FAIL');
});
test('M5-11 replay equal baseline never expands authority', () => {
  const results = replayCatalog(catalog.fixtures ?? catalog);
  assert.ok(results.some(x => x.classification === 'EQUIVALENT_SAFE'));
  assert.equal(results.filter(x => x.classification === 'UNSAFE_REGRESSION').length, 0);
});
test('M5-12 stricter replay is explicitly classified', () => assert.ok(replayCatalog(catalog.fixtures ?? catalog).some(x => x.classification === 'STRICTER_SAFE')));
test('M5-13 denied old work selected by new selector is unsafe', () => assert.equal(classifyDifference({ legacy: { state: 'STOP' }, next: { decision: 'SELECT_BOUND_ITEM' } }).classification, 'UNSAFE_REGRESSION'));
test('M5-14 proposal is text only and root hashes stay fixed', () => {
  assert.equal(proposal.mode, 'PROPOSAL_ONLY'); assert.deepEqual(proposal.allowlistedPaths, ['AGENTS.md', 'CONTEXT.md']);
  assert.equal(sha256Bytes(readFileSync(join(root, 'AGENTS.md'))), proposal.files['AGENTS.md'].beforeSha256);
  const document = readFileSync(join(root, 'engineering/migration/M5_ROUTER_PROPOSAL.md'), 'utf8');
  for (const path of proposal.allowlistedPaths) {
    const section = document.split(`## Proposed \`${path}\` bytes`)[1]?.split('```markdown\n')[1]?.split('```')[0];
    assert.equal(section, proposal.files[path].proposedText);
    assert.equal(manifest.proposedRouter[path].afterSha256, proposal.files[path].afterSha256);
  }
});
test('M5-15 disposable copy rollback restores byte-identical roots', () => {
  const dir = mkdtempSync(join(tmpdir(), 'm5-router-'));
  for (const path of proposal.allowlistedPaths) writeFileSync(join(dir, path), proposal.files[path].beforeText);
  for (const path of proposal.allowlistedPaths) writeFileSync(join(dir, path), proposal.files[path].proposedText);
  const rollback = reverse(); assert.equal(rehearseRollback(proposal, rollback).passed, true);
  for (const path of proposal.allowlistedPaths) {
    writeFileSync(join(dir, path), rollback.files[path].restoredText);
    assert.equal(sha256Bytes(readFileSync(join(dir, path))), proposal.files[path].beforeSha256);
  }
});
test('M5-16 dirty root blocks reversal', () => assert.ok(reverse({ dirtyPaths: ['AGENTS.md'] }).blockers.includes('DIRTY_WORKTREE')));
test('M5-17 old inspect CLI remains callable after proposal rehearsal', () => {
  assert.equal(rehearseRollback(proposal, reverse()).passed, true);
  const run = spawnSync(process.execPath, ['scripts/icm-automation/cli.mjs', 'inspect'], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr); assert.match(run.stdout, /"decision"/);
});
test('M5-18 model approval string creates no switch', () => assert.equal(proposal.mode, 'PROPOSAL_ONLY'));
test('M5-19 self review cannot satisfy candidate preflight', () => assert.ok(preflight({ reviewerIdentity: 'SELF' }).blockers.includes('INDEPENDENT_REVIEW_UNPROVEN')));
test('M5-20 host UNKNOWN is separate from simulated policy criteria', () => { assert.equal(preflight().simulatedCriteriaSatisfied, true); assert.equal(preflight().cutoverCandidateEligible, false); });
test('M5-21 no founder decision means no activation endpoint', () => assert.equal(preflight().activationAuthorized, false));
test('M5-22 an undelivered report cannot assert notification', () => assert.equal(buildManagementReview({}).notificationClaim, false));
test('M5-23 stale exact-head CI blocks candidate', () => {
  const pr = goodPr(7); pr.checks = pr.checks.map(x => ({ ...x, headSha: 'f'.repeat(40) }));
  assert.ok(preflight({ prs: { 26: goodPr(2), 27: pr } }).blockers.some(x => x.includes('PR27_verify_PENDING')));
});
test('M5-24 contradictory rollback authority stops proposal readiness', () => assert.ok(reverse({ operatorAuthorized: false }).blockers.includes('OPERATOR_AUTHORITY_UNKNOWN')));
