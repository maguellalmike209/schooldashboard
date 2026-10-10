import { sha256Bytes } from './cutover-audit.mjs';
import { ROOT_ROUTER_PATHS } from './cutover-plan.mjs';

// A reverse patch proposal is never an executable rollback capability.
export function proposeRollback(proposal, observed = {}) {
  const blockers = [];
  if (proposal?.mode !== 'PROPOSAL_ONLY' || JSON.stringify(proposal.allowlistedPaths) !== JSON.stringify(ROOT_ROUTER_PATHS)) blockers.push('SCOPE_CONFLICT');
  if (!Array.isArray(observed.dirtyPaths) || observed.dirtyPaths.length) blockers.push('DIRTY_WORKTREE');
  if (observed.unfinishedWork !== false || observed.childTreeStopped !== true) blockers.push('UNFINISHED_WORK');
  if (observed.pendingPr !== false || observed.reviewVerified !== true) blockers.push('INTEGRATION_OR_REVIEW_PENDING');
  if (observed.operatorAuthorized !== true) blockers.push('OPERATOR_AUTHORITY_UNKNOWN');
  const files = {};
  for (const path of ROOT_ROUTER_PATHS) {
    const source = proposal?.files?.[path];
    if (!source || source.beforeSha256 !== sha256Bytes(Buffer.from(source.beforeText)) || source.afterSha256 !== sha256Bytes(Buffer.from(source.proposedText))) blockers.push(`HASH_MISMATCH:${path}`);
    else files[path] = { expectedCurrentSha256: source.afterSha256, restoredSha256: source.beforeSha256, restoredText: source.beforeText };
  }
  return Object.freeze({ mode: 'REVERSE_PROPOSAL_ONLY', proofClass: 'OFFLINE_ONLY', readyForSeparateOperatorReview: blockers.length === 0, blockers, files });
}

export function rehearseRollback(proposal, reverse) {
  if (reverse?.mode !== 'REVERSE_PROPOSAL_ONLY') return { passed: false, reason: 'MISSING_REVERSE_PROPOSAL' };
  for (const path of ROOT_ROUTER_PATHS) {
    const before = proposal.files[path], rollback = reverse.files[path];
    if (!before || !rollback || sha256Bytes(Buffer.from(before.proposedText)) !== rollback.expectedCurrentSha256 ||
        sha256Bytes(Buffer.from(rollback.restoredText)) !== before.beforeSha256) return { passed: false, reason: `BYTE_MISMATCH:${path}` };
  }
  return { passed: true, reason: 'BYTE_IDENTICAL_FIXTURE_REVERSAL' };
}
