const SHA = /^[a-f0-9]{40}$/;
const REPO = /^[a-z\d_.-]+\/[a-z\d_.-]+$/i;
const result = (status, reason) => ({ status, reason });

// All arguments here are observations or a trusted expected identity. A PR
// comment, workflow title, journal line or worker output grants no authority.
export function validateExactHeadPR({ expectedRepo, expectedBase = 'main', expectedHead,
  requiredChecks, pr, checks, observedBranchHead, observedBaseContainsMerge = false }) {
  if (!REPO.test(expectedRepo) || !SHA.test(expectedHead ?? '') || !Array.isArray(requiredChecks) ||
      requiredChecks.length === 0 || new Set(requiredChecks.map(x => x.name)).size !== requiredChecks.length ||
      requiredChecks.some(x => typeof x.name !== 'string' || !Number.isSafeInteger(x.appId))) {
    return result('BLOCKED', 'trusted GitHub expectation invalid');
  }
  if (!pr || pr.base?.repo?.full_name?.toLowerCase() !== expectedRepo.toLowerCase() ||
      pr.head?.repo?.full_name?.toLowerCase() !== expectedRepo.toLowerCase() ||
      pr.base?.ref !== expectedBase || pr.head?.sha !== expectedHead) {
    return result('BLOCKED', 'PR repository, base or exact head mismatch');
  }
  if (!checks || !Array.isArray(checks.check_runs)) return result('PENDING', 'check evidence unavailable');
  for (const required of requiredChecks) {
    const candidates = checks.check_runs.filter(c => c.name === required.name &&
      c.app?.id === required.appId && c.head_sha === expectedHead);
    if (!candidates.length) return result('PENDING', `required check ${required.name} missing at exact head`);
    if (candidates.some(c => c.status !== 'completed' || c.conclusion !== 'success')) {
      return result('BLOCKED', `required check ${required.name} has no unambiguous success`);
    }
  }
  if (pr.merged === true && pr.state === 'closed' && SHA.test(pr.merge_commit_sha ?? '') &&
      observedBaseContainsMerge === true) {
    return result('INTEGRATED', 'exact-head checks passed and PR reports merged');
  }
  if (pr.merged === true) return result('PENDING', 'merge reported but canonical base ancestry unverified');
  if (pr.state === 'open' && observedBranchHead === expectedHead) {
    return result('PR_CI_PENDING', 'exact-head checks passed; independent review and merge pending');
  }
  return result('BLOCKED', 'PR closure is not a verified merge');
}

export async function fetchExactHeadPR({ repository, prNumber, headBranch, fetchImpl = fetch,
  token = null }) {
  if (!REPO.test(repository) || !Number.isSafeInteger(prNumber) || prNumber < 1 ||
      !/^codex\/[a-z0-9][a-z0-9-]{0,62}$/.test(headBranch)) throw new Error('GitHub request identity invalid');
  const headers = { accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28' };
  if (token) headers.authorization = `Bearer ${token}`;
  const base = `https://api.github.com/repos/${repository}`;
  const get = async suffix => {
    const response = await fetchImpl(`${base}/${suffix}`, { method: 'GET', headers, redirect: 'error', signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`GitHub read failed: HTTP ${response.status}`);
    return response.json();
  };
  // Re-read PR after checks to catch an ordinary force-push race. A later
  // transition must fetch again; this observation is never a durable grant.
  const first = await get(`pulls/${prNumber}`);
  if (!SHA.test(first.head?.sha ?? '')) throw new Error('GitHub PR head invalid');
  const [branch, checks] = await Promise.all([
    first.merged === true ? Promise.resolve(null) : get(`branches/${headBranch.split('/').map(encodeURIComponent).join('/')}`),
    get(`commits/${first.head.sha}/check-runs?per_page=100`),
  ]);
  const second = await get(`pulls/${prNumber}`);
  if (second.head?.sha !== first.head.sha || second.state !== first.state || second.merged !== first.merged) {
    throw new Error('GitHub PR changed during observation');
  }
  let observedBaseContainsMerge = false;
  if (second.merged === true && SHA.test(second.merge_commit_sha ?? '')) {
    const compare = await get(`compare/${second.merge_commit_sha}...${encodeURIComponent(second.base.ref)}`);
    observedBaseContainsMerge = ['identical', 'ahead'].includes(compare.status);
  }
  return { pr: second, checks, observedBranchHead: branch?.commit?.sha ?? null,
    observedBaseContainsMerge };
}
