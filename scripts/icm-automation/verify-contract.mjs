const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^[a-f0-9]{64}$/;

// Local QA decision only. Hosted/independent identity and immutable acceptance
// provenance still require the protected installation/PR workflow.
export function assessIndependentVerify({ acceptedDigest, observedDigest, head, builderId,
  verifierId, checks }) {
  if (!DIGEST.test(acceptedDigest ?? '') || observedDigest !== acceptedDigest ||
      !SHA.test(head ?? '') || typeof builderId !== 'string' || !builderId ||
      typeof verifierId !== 'string' || !verifierId || verifierId === builderId ||
      !Array.isArray(checks) || checks.length === 0 ||
      !checks.some(x => x.kind === 'negative') ||
      checks.some(x => !['positive', 'negative'].includes(x.kind) ||
        typeof x.name !== 'string' || !x.name || typeof x.evidenceRef !== 'string' || !x.evidenceRef)) {
    return { status: 'FAIL', reason: 'frozen acceptance or independent negative evidence missing' };
  }
  const failed = checks.find(x => x.result !== 'PASS');
  return failed ? { status: 'FAIL', reason: `${failed.name} did not pass` } :
    { status: 'PASS_LOCAL', reason: 'local acceptance and negative checks passed; hosted integration remains separate' };
}
