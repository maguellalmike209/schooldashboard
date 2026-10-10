# M6 — Founder-approved bounded delegation, **V2 proposed contract**

**Status: NOT an active grant.** A dynamic child can only become **admitted** when an externally protected trusted broker independently validates a founder-signed/approved outcome envelope, allowed work classes, exact inherited constraints, provenance and budget. `accepted: true` in a model-generated file, README, chat message or GitHub comment has no such authority.

## Who controls what

- Founder approves outcome(s), outcome criteria digest, allowed milestones/task families, risk and budgets, expiry, permitted operations, exclusions and revocation through an independently authenticated owner channel.
- Engineering Manager proposes 1–5 initial candidates per current milestone, then 0–N genuinely necessary work items supported by evidence after progress; only current work is detailed. It cannot write the grant or widen it.
- Trusted **admission service** accepts/rejects each candidate against a real verified parent envelope and independently enforced rules. It does NOT use model free-text reasoning as authorization.
- QA independently binds frozen acceptance and negative criteria; PR/CI and Master Verify remain separate, with no fake reviewers.
- Worker receives only a one-item, single-use, short-lived narrowed capability for an isolated workspace; no parent authority material or publisher/Release secrets.

## Admissible V2 work classes (conservative starting point)

`DOCS_LOCAL`, `TEST_LOCAL`, `REFACTOR_WITHOUT_BEHAVIOR_CHANGE`, `FIX_REGRESSION_WITHIN_SCOPE` are the initial proposed permit-list classes. Each must be tied to explicit folder/path glob allowlists and frozen outcome/milestone criteria. **Anything involving auth, RLS, new data flows, integrations, secrets, billing, deployment, provider selection, migrations, user-content ingestion, changing security gates, CI/reviewer protections, branch rules or runtime authority is denied or elevated for separate founder approval.** These are example class semantics; no class may be active until the external, technically enforceable validator and negatives exist.

Higher-risk work can still be planned and proposed, and can be executed with an **exact-ID individually approved grant**, not by laundering the risk into an allowed class.

## Minimum envelope fields

`schemaVersion=2`, `envelopeId`, `revision`, `founderApprovalRef`, `sourceKind` (authenticated external), `repo`, `canonicalBranch`, `acceptedOutcomeId`, `outcomeCriteriaDigest`, `approvedMilestoneIds` and frozen `milestoneCriteriaDigests`, `allowedTaskKinds`, `allowedPaths`, `deniedPaths`, `allowedOperations`, `maxRisk`, `maxTasksTotal`, `maxTasksPerRun`, `maxDepth`, `maxConcurrentWriters`, `maxRetriesTotal`, `maxWallSecondsTotal`, `expiresAt`, `startsAt`, `paused`, `revoked`, `reviewPolicyRef`, `requiredCheckIdentities`, `publisherMode` (initially `NONE` or `DRAFT_ONLY`), `releaseAllowed=false`, `grantKeyId`. All bounded limits are positive; unknown budget state causes STOP.

Prohibit unknown top-level keys and user-selected grant paths. This description is **not** a substitute for the included closed JSON Schema, identity signature, or host path/ACL proof. Schema-valid is not authenticated. Embed schema tests into M6 implementation.

## Child request — untrusted input, NEVER a grant

`candidateId`, `parentOutcomeId`, `milestoneId`, `parentCriterionIds`, `evidenceRefs`, `taskKind`, `proposalDigest`, `allowedPathsRequested`, `riskRequested`, `operationsRequested`, `workBudgetRequested`, `dependencies`, `createdBy`, `proposedAt`, `acceptancePositive`, `acceptanceNegative`, `reasonExistingItemsInsufficient`.

The manager can propose; broker checks each field independently against frozen parent metadata, trusted evidence references and allowed bounded fields; an unverified evidence reference does not prove the claim. Both positive and negative acceptance targets must be non-empty and immutable after admission without a new reviewed revision.

## Immutable narrower child token (future trusted host only)

A broker-issued admission **receipt** binds `envelopeId@revision`, candidate ID/digest, parent milestone+criteria, exact repo/branch, path-operation-risk intersection, allowed wall/retry budget slice, one invocation ID, generation and expiry, current revocation epoch, trusted issuer and independently stored reservation ID. Child cannot further delegate. Receipt cannot be minted by model or code in worker repository. Replay, duplicate reservation, forged issuer, extension or changed candidate -> DENY.

## Definition of successful delegation

A low-risk in-scope child can progress to Plan/Build/Verify only after real external validation. No new outcome; no new risk/trust boundary; no unlimited descendants; no arbitrary file/CI/GitHub permissions. At milestone completion run Master Verify; continue within still-valid founder outcome only when allowed. On full outcome completion cease new selections and propose new direction.

If semantic relevance cannot be determined independently, keep `CANDIDATE` and request exact task approval. Never auto-approve because the Manager called it necessary.
