const SHA = /^[a-f0-9]{40}$/;

// A reviewable proposal only. No GitHub write capability is imported or
// accepted by this module; a later trusted publisher needs separate approval.
export function draftPRProposal({ repository, base, headBranch, headSha, taskId,
  verificationRef }) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || base !== 'main' ||
      !/^codex\/[a-z0-9][a-z0-9-]{0,62}$/.test(headBranch) ||
      !SHA.test(headSha ?? '') || !/^SD-\d{3}$/.test(taskId) ||
      typeof verificationRef !== 'string' || !verificationRef || verificationRef.length > 500) {
    throw new Error('draft PR proposal identity invalid');
  }
  return Object.freeze({ schemaVersion: 1, repository, base, headBranch, headSha,
    taskId, verificationRef, draft: true, publishAllowed: false, mergeAllowed: false });
}
