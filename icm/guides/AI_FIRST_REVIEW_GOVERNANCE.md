# AI-first technical review and protected integration

**Accepted direction:** founder, 2026-10-11. **Active live-policy guidance only
after protected integration of this change.** ICM Next remains shadow policy
until its separate cutover. This guide grants no broker, schedule, publisher,
automatic merge, root cutover or Release authority.

## Responsibilities and evidence

- The founder is Product Director/Manager. The founder approves outcomes,
  material scope/risk/cost/security choices and Release, and currently makes
  manual PR integration decisions from visible evidence. Routine code-review
  expertise or a second GitHub user is not a universal prerequisite.
- The Builder implements a bounded work item and supplies a reviewable diff. It
  cannot change frozen acceptance, grant itself privilege, certify its own
  independent review, approve its PR or merge a governance change using that
  change's proposed rules.
- A **separate AI Verifier execution** starts from original frozen acceptance
  and source diff at a pinned exact head. It challenges behavior, regressions,
  authorization, negative security cases, error handling and user readiness.
  It records reproducible findings and limitations. Separation by chat or role
  label is useful review practice, not authenticated host isolation, a GitHub
  `APPROVED` review or trusted machine enforcement.
- Required hosted `verify`, `CodeQL` and `Dependency review` checks must pass
  on the final exact head with the effective branch rule's App identities.
  Missing, failed, stale or wrong-App results block integration. Check or
  acceptance-definition edits receive governance-sensitive review and cannot
  validate themselves merely because the changed workflow reports success.
- Effective live GitHub protection controls whether a native human approval is
  required. If required, only an eligible GitHub review counts; the author or
  PR text saying `APPROVED` does not. A 403 when reading detailed protection is
  `UNKNOWN`; obtain an authorized owner-admin observation before relying on
  an approval count or bypass setting. Never weaken protection to proceed.

## Risk-proportionate integration

| Effect | Minimum technical evidence | Current integration decision |
| --- | --- | --- |
| R0/R1 reversible docs, isolated UI, local tests | Frozen acceptance, clean diff, separate exact-head adversarial review, required hosted checks | Founder may manually integrate when effective GitHub rules permit |
| R2 data/API/dependency behavior | R0/R1 plus integration and negative regressions, blast radius, rollback and downstream Master Verify obligations | Founder manual decision with explicit caveats; unresolved security uncertainty blocks |
| R3 auth, student-private data, owner/RLS, credentials, trusted runner, grants, CI/reviewer policy | Source-independent adversarial security validation with executed negatives, actual trust-boundary proof where applicable, external check evidence | Manual material founder decision; missing independent security proof blocks |
| R4 destructive, irreversible, production-critical action | Dedicated rollback/recovery proof, separately scoped owner authority, external controls and operational observation | Exceptional approval and separate Release; never routine integration |

Classify by the **effect** of a diff, not its filename or claimed risk label.
Edits to `AGENTS.md`, `CONTEXT.md`, `engineering/POLICY.md`, security workflows,
authorization, grants, broker, verifier criteria or Release policy are always
governance/security-sensitive even when Markdown. Cross-user ownership/RLS
negative tests are required when private student data is affected; uploads and
AI require untrusted-input and prompt-injection challenges as applicable.
Passing automated checks is not a compliance or product-launch certificate.

## Review record

Use a `review-evidence.json` or linked protected/signed report containing:

1. Repository, PR, base and **exact head SHA**, branch, diff/content digest,
   observation sources and timestamps.
2. Original approved outcome/milestone/work-item IDs and frozen acceptance
   digest. A changed criterion invalidates the prior review.
3. Review execution ID and observable provenance, with reviewer type
   `AI_REVIEW`, never `GITHUB_APPROVED` unless GitHub separately reports that
   event. State whether evidence is advisory or protected by an actual host.
4. Risk, changed trust/protected-control surfaces, tests attempted with
   `PASS`/`FAIL`/`NOT_RUN`/`UNKNOWN` and evidence refs, abuse hypotheses,
   negative cases, reproducible findings, limitations and verdict
   `AI_REVIEW_PASS`/`AI_REVIEW_FAIL`/`NEEDS_REWORK`/`INSUFFICIENT_EVIDENCE`.
5. Fresh exact-head required check contexts, App IDs and conclusions from an
   independent observation, any actual eligible GitHub approval required by
   live protection, and an immutable artifact reference where available.

Re-review after head, acceptance or check configuration changes. Reject replay,
spoofing and Builder-written assertions of independent approval. If separate
review execution or protected evidence is unavailable, say
`INSUFFICIENT_EVIDENCE`; keep automatic merge disabled. A future required
AI-review status check needs independently protected code/config, authenticated
runner and publisher, pinned context/App identity and fail-closed outages.
Do not mark it required before it exists and succeeds. Do not run untrusted PR
code with privileged `pull_request_target` secrets.

## Distinct gates and current rollout

Work-item independent Verify, exact-head PR/CI integration and milestone Master
Verify are different gates. Master Verify tests the integrated student journey,
including negative/error cases, and can return `NEEDS_WORK` despite green CI.
No PR merge grants write scheduling, dynamic child tasks, owner grants, root
router cutover, student-data production use, payments or Release.

1. Integrate this scoped live governance decision through an existing protected
   main-based PR, with actual required checks and a founder manual decision.
2. Reconcile the new direction into #26's shadow policy without rewriting its
   original history or historical review evidence. Repeat separate exact-head
   technical review and hosted checks on #26's final head, then integrate only
   under effective GitHub rules and founder decision.
3. Reconcile #27, #28 and #29 **in that order** after each parent is integrated.
   Preserve the stacked commits and diffs; use nondestructive branch updates,
   retarget to `main`, and obtain fresh exact-head hosted checks and dedicated
   review evidence on each changed head. A check on a stacked non-main base is
   not the final main-targeting check.
4. Keep #25 separate. Its disabled code has unresolved security-review
   concerns; review and negative-test before any reuse.
   Keep G1–G8 actual-host gates `UNKNOWN`/`BLOCKED` until observed. Root cutover,
   broker installation, grants, live schedules, auto-merge and Release each
   require their own later authorization and proof.

The 2026-10-11 attachment is founder-approved direction, not a trusted writer
grant or instruction to alter branch settings. This guide supersedes any older
unconditional second-human-review wording for routine work; all other live
security, privacy, Verify, protected Git and Release controls remain binding.
