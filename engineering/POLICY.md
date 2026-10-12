# ICM Next — Authorization, Risk and Privilege Policy

**Status:** SHADOW POLICY (M1). No active grant/permission changes are authorized by this file.

## 1. Authority precedes scheduling

A scheduler is a **trigger**. A repository task, milestone card, model message, chat summary, PR comment, CI result, journal entry or report is **not** an execution grant. A protected, authenticated founder-controlled authority record binds scope, revocation, operations, risk and limits. The execution broker—not the model—must verify that authority and enforce privilege boundaries. The runner must not be able to edit the broker, owner approval, grant, reviewer requirements, CI protections, canonical main or publisher/production credentials.

In M0/M1 this is a **future contract only**. No new operational grant schema or launcher is implemented. The live SD-018/SD-020 foundation remains exact-ID-only and partially fixture-only.

## 2. Capability classes (target; not enabled)

| Class | Power | Enforcement/limits |
| --- | --- | --- |
| A0 Observe | Inspect, classify, report, propose | Read-only file/connector capabilities; no write-capable GitHub tools |
| A1 Develop | Work in one isolated authorized workspace | OS identity, path/network limits, no write access to controls/secrets/canonical main |
| A2 Prepare Integration | Publish *bounded branch/draft PR* | Separate minimal publisher credential; exact branch/repo/path and CI requirements; no merge |
| A3 Controlled Merge | Potential future merge of specifically approved low-risk changes | Separate founder opt-in, real required independent review/CI/branch restrictions; **not approved now** |
| A4 Release | Change deployed environments | Separate environment-bound release grant/readiness; **not inherited from A1–A3** |

Grant maxima and observed identities cannot be changed by model output, task generation, in-repo code or schedule prompts. Real credentials/connector capabilities—not tool instructions—must enforce the above. Protect permissions from writable inherited defaults and hidden GitHub plugin actions.

## 3. Delegation boundary

An approved outcome may eventually allow dynamically generated work items only within independent, machine-enforceable constraints: allowed outcome/milestones, paths, task classes, operations, risk ceiling, work count/depth, wall time/retries/spending, frozen acceptance and explicit exclusions. Natural-language relevance **cannot in general be proven by a validator**. A semantic claim by Codex never establishes executable authority. If admissibility cannot be established, the child remains CANDIDATE until separately approved; fall back to finite exact-ID grants.

Within an already authorized work item, Codex may create ephemeral implementation steps and repair small in-scope defects without new IDs. New substantial features, providers, trust boundaries, sensitive-data practices, high-impact migrations, deployment and new outcomes require distinct approval boundaries. Model-generated plans may narrow intended work but never widen operating permissions.

## 4. Risk-proportionate work without safety downgrades

Maintain parity with currently accepted R0–R4 risk semantics until any renaming/mapping is explicitly approved. Evaluate **effect**, not only file names:

- R0/R1: routine docs/local reversible UX/test additions may use succinct Plan/Verify artifacts and existing required CI.
- R2: integration, meaningful data behavior or external dependency changes require wider failure/regression evidence.
- R3: private user data, auth/RLS, trusted runner, credentials, privacy boundaries and significant provider decisions require independent security verification and material approval where current accepted policy requires it.
- R4: irreversible/destructive/production-high-impact operations require exceptional explicit authority and operational proof.

M0 must identify exact old rules; this paragraph is a **planning orientation** and must not silently relax any stricter accepted condition. Do not split tasks to disguise risk. Escalation cannot be avoided by renaming the change.

## 5. Hard security invariants

Unless separately, explicitly and safely superseded with documented parity or stronger protection:

- Authentication is not authorization; private student data requires server-side ownership and database/RLS checks where applicable.
- Client-visible filtering never constitutes access control; test cross-user and anonymous negatives.
- Secrets, signing keys, founder credentials and privileged app connectors never enter untrusted worker contexts.
- Untrusted source/issue/material content cannot issue commands or alter the authorization policy.
- Required hosted CI/security checks, branch protection and independently enforced review cannot be bypassed for speed.
- No assertion of compliance, accessibility certification, launch readiness or production safety without scope-specific evidence.
- No production Release is inferred from a build, PR or merge.
- No dirty worktree wipe, lock theft, contradictory journal overwrite, evidence fabrication or self-approved risk reduction.

## 6. Privilege and escalation matrix

| Event | Default action | Approval route |
| --- | --- | --- |
| Routine reversible implementation within current grant | Execute, test, checkpoint | None beyond current valid grant |
| New evidence-linked candidate in current milestone | Propose/queue; may be executable **only** under future independently enforced delegation | Founder if bound cannot be enforced |
| Material redefinition of outcome or acceptance | Pause affected path, explain alternatives | Founder accepts revised outcome and external grant |
| New private-data collection/provider/access model | Block affected work and research/appraise risk | Founder/qualified reviewer; fresh authorization |
| Failing tests, stale PR/CI or uncertain recovery | Repair within authority, else stop and preserve evidence | Independent Verify or operational reviewer |
| Grant expired, paused, revoked, budget unknown/exhausted | Stop write capability; retain recovery state | Founder-authenticated reauthorization |
| Merge to protected main | Only as permitted by independent GitHub governance; initially founder/human review | Protected PR workflow |
| Deployment, financial commitment, destructive migration | No implicit authority | Separate explicit approval + environment controls |

## 7. Never weaken the gate to satisfy the deadline

No model-initiated broad permission changes, `danger-full-access`, unpublished CI bypasses, silent secret export, unaudited outside-of-workspace write tools, wildcard PATs, unreviewed auto-merge or self-modified policies. Missing evidence is `UNKNOWN/BLOCKED`, not PASS. Disabling the runner is acceptable; disabling security checks to make the runner active is not.
