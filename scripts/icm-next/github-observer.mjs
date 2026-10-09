const REQUIRED = [{ name: 'verify', appId: 15368 }, { name: 'CodeQL', appId: 15368 }, { name: 'Dependency review', appId: 15368 }];

// Accepts only read-only API snapshots supplied by caller; no GitHub credentials
// or mutation API is available to this module.
export function assessGitHubObservation({ repository, pr, checks, reviews, branch, ruleset } = {}) {
  const base = { repository: repository ?? null, prId: pr?.number ?? null, base: pr?.base ?? null, head: pr?.headSha ?? null,
    requiredCheckContextsWithAppIds: REQUIRED, observedChecks: [], reviewEvidence: [],
    rulesetPolicyEvidence: ruleset?.status ?? 'UNKNOWN', bypassActorsVisibility: ruleset?.bypassActorsVisible === true ? 'OBSERVED' : 'UNKNOWN',
    canonicalAncestry: pr?.canonicalAncestor === true ? 'OBSERVED' : 'UNKNOWN', limitations: [] };
  if (!repository || !pr || !/^[a-f0-9]{40}$/.test(pr.headSha ?? '') || pr.repository !== repository) return { ...base, verdict: 'UNKNOWN', limitations: ['PR identity unavailable'] };
  const observed = Array.isArray(checks) ? checks.filter(c => c.headSha === pr.headSha).map(c => ({ name: c.name, appId: c.appId, conclusion: c.conclusion, headSha: c.headSha })) : [];
  base.observedChecks = observed;
  const checksPass = REQUIRED.every(req => observed.some(c => c.name === req.name && c.appId === req.appId && c.conclusion === 'success'));
  if (!checksPass) base.limitations.push('Missing or stale required exact-head check/App evidence');
  base.reviewEvidence = Array.isArray(reviews) ? reviews.filter(r => r.headSha === pr.headSha).map(r => ({ actorId: r.actorId, state: r.state, headSha: r.headSha })) : [];
  const reviewPass = base.reviewEvidence.some(r => r.state === 'APPROVED' && r.actorId && r.actorId !== pr.builderActorId);
  if (!reviewPass) base.limitations.push('No independently authenticated GitHub approval on this head');
  if (!branch?.protected || ruleset?.status !== 'OBSERVED' || ruleset.bypassActorsVisible !== true || ruleset.forcePushDenied !== true) base.limitations.push('Detailed branch reviewer/bypass/force-push policy UNKNOWN');
  const verdict = !checksPass ? 'UNKNOWN' : !reviewPass ? 'PENDING_REVIEW' : base.limitations.length ? 'PROTECTION_UNKNOWN' : 'PASS_HOSTED_CHECKS';
  return { ...base, verdict };
}
