// Disabled decision fixture for D-067. This file is not a trusted reviewer,
// protected check, GitHub approval, merge service or runtime policy engine.
import test from 'node:test';
import assert from 'node:assert/strict';

const HEAD = 'a'.repeat(40);
const CRITERIA = 'b'.repeat(64);
const REQUIRED = ['verify', 'CodeQL', 'Dependency review'];
const checks = () => REQUIRED.map(name => ({ name, head: HEAD, appId: 15368, conclusion: 'success' }));
const baseline = () => ({
  head: HEAD, criteria: CRITERIA, author: 'actual-author', risk: 'R1', scopeApproved: true,
  protectionKnown: true, requiresGitHubApproval: false, githubReview: null,
  checks: checks(), review: { type: 'AI_REVIEW', execution: 'separate', observed: true,
    head: HEAD, criteria: CRITERIA, verdict: 'AI_REVIEW_PASS' },
  negativeSecurityPassed: true, crossUserPassed: true, protectedControl: false,
  materialApproval: false, founderManualDecision: true, proposedRuleUsed: false,
  hostGatesProven: false, protectedReviewHost: false, masterVerify: 'PASS',
});

function fixtureDecision(x) {
  const reasons = [];
  if (!x.scopeApproved) reasons.push('SCOPE_NOT_APPROVED');
  if (!x.protectionKnown) reasons.push('EFFECTIVE_PROTECTION_UNKNOWN');
  for (const name of REQUIRED) if (!x.checks.some(c => c.name === name && c.head === x.head &&
    c.appId === 15368 && c.conclusion === 'success')) reasons.push(`CHECK_${name}_INVALID`);
  if (x.review?.type !== 'AI_REVIEW' || x.review.execution !== 'separate' ||
    !x.review.observed || x.review.head !== x.head || x.review.criteria !== x.criteria ||
    x.review.verdict !== 'AI_REVIEW_PASS') reasons.push('SEPARATE_REVIEW_INSUFFICIENT');
  if (x.requiresGitHubApproval && !(x.githubReview?.state === 'APPROVED' &&
    x.githubReview.head === x.head && x.githubReview.actor !== x.author &&
    x.githubReview.source === 'GITHUB')) reasons.push('GITHUB_APPROVAL_REQUIRED');
  const effectiveR3 = x.risk === 'R3' || x.risk === 'R4' || x.privateData || x.providerOrAuth;
  if (!x.negativeSecurityPassed || (effectiveR3 && !x.crossUserPassed)) reasons.push('SECURITY_NEGATIVE_FAILED');
  if (x.protectedControl && !x.materialApproval) reasons.push('MATERIAL_POLICY_APPROVAL_REQUIRED');
  if (x.proposedRuleUsed) reasons.push('POLICY_SELF_BOOTSTRAP');
  if (!x.founderManualDecision) reasons.push('FOUNDER_INTEGRATION_DECISION_MISSING');
  return {
    manualIntegrationEligible: reasons.length === 0,
    autonomousMerge: false,
    liveGrantOrSchedule: false,
    milestoneClosed: x.masterVerify === 'PASS' && reasons.length === 0,
    enforceableAIReview: x.protectedReviewHost === true && x.hostGatesProven === true,
    reasons,
  };
}

test('GV01 manual R0/R1 integration needs no invented GitHub approval', () => {
  const r = fixtureDecision(baseline());
  assert.equal(r.manualIntegrationEligible, true); assert.equal(r.autonomousMerge, false);
});
test('GV02 missing, stale, failed or wrong-App required check blocks', () => {
  for (const broken of [[], checks().map(c => ({ ...c, head: 'c'.repeat(40) })),
    checks().map(c => ({ ...c, conclusion: 'failure' })),
    checks().map(c => ({ ...c, appId: 1 }))]) {
    assert.equal(fixtureDecision({ ...baseline(), checks: broken }).manualIntegrationEligible, false);
  }
});
test('GV03 Builder-authored review claim is insufficient', () => assert.ok(
  fixtureDecision({ ...baseline(), review: { ...baseline().review, execution: 'builder' } })
    .reasons.includes('SEPARATE_REVIEW_INSUFFICIENT')));
test('GV04 missed security regression is caught by negative gate', () => assert.ok(
  fixtureDecision({ ...baseline(), negativeSecurityPassed: false }).reasons.includes('SECURITY_NEGATIVE_FAILED')));
test('GV05 protected-control edits escalate', () => assert.ok(
  fixtureDecision({ ...baseline(), protectedControl: true }).reasons.includes('MATERIAL_POLICY_APPROVAL_REQUIRED')));
test('GV06 docs label cannot launder auth/provider effect', () => assert.ok(
  fixtureDecision({ ...baseline(), risk: 'R0', providerOrAuth: true, crossUserPassed: false })
    .reasons.includes('SECURITY_NEGATIVE_FAILED')));
test('GV07 previous-head review is stale', () => assert.ok(
  fixtureDecision({ ...baseline(), review: { ...baseline().review, head: 'c'.repeat(40) } })
    .reasons.includes('SEPARATE_REVIEW_INSUFFICIENT')));
test('GV08 absent founder cannot approve new scope or Release', () => assert.equal(
  fixtureDecision({ ...baseline(), scopeApproved: false, founderManualDecision: false }).manualIntegrationEligible, false));
test('GV09 effective rule requiring GitHub approval is respected', () => assert.ok(
  fixtureDecision({ ...baseline(), requiresGitHubApproval: true }).reasons.includes('GITHUB_APPROVAL_REQUIRED')));
test('GV10 author or text APPROVED is not eligible GitHub approval', () => {
  for (const githubReview of [{ state: 'APPROVED', head: HEAD, actor: 'actual-author', source: 'GITHUB' },
    { state: 'APPROVED', head: HEAD, actor: 'other', source: 'PR_TEXT' }])
    assert.equal(fixtureDecision({ ...baseline(), requiresGitHubApproval: true, githubReview }).manualIntegrationEligible, false);
});
test('GV11 shared workspace AI review is advisory, never unattended enforcement', () => {
  const r = fixtureDecision(baseline()); assert.equal(r.enforceableAIReview, false); assert.equal(r.autonomousMerge, false);
});
test('GV12 R3 private-data cross-user failure blocks', () => assert.ok(
  fixtureDecision({ ...baseline(), risk: 'R3', privateData: true, crossUserPassed: false })
    .reasons.includes('SECURITY_NEGATIVE_FAILED')));
test('GV13 failed student journey blocks milestone closure despite green PR', () => {
  const r = fixtureDecision({ ...baseline(), masterVerify: 'NEEDS_WORK' });
  assert.equal(r.manualIntegrationEligible, true); assert.equal(r.milestoneClosed, false);
});
test('GV14 unavailable AI review is insufficient evidence', () => assert.ok(
  fixtureDecision({ ...baseline(), review: null }).reasons.includes('SEPARATE_REVIEW_INSUFFICIENT')));
test('GV15 unknown host gates grant no writer or schedule', () => {
  const r = fixtureDecision(baseline()); assert.equal(r.liveGrantOrSchedule, false);
});
test('GV16 policy PR cannot use its proposed rule to bootstrap merge', () => assert.ok(
  fixtureDecision({ ...baseline(), protectedControl: true, materialApproval: true, proposedRuleUsed: true })
    .reasons.includes('POLICY_SELF_BOOTSTRAP')));
