# School Dashboard — Secure Autonomous Agent Instructions

## 1. Purpose

This file defines the global operating rules for agents working in the School
Dashboard repository.

It is the repository's highest-level agent behavior contract.

It does NOT contain the complete:

- product specification,
- security requirements,
- privacy policy,
- architecture,
- implementation state,
- roadmap,
- or task-specific Plan.

After loading this file:

1. read root `CONTEXT.md`;
2. identify the active task and active ICM stage;
3. load only the durable context required for that task;
4. inspect repository reality before changing anything.

Documentation defines intended truth.

Repository state and successful verification establish implemented truth.

Never claim behavior exists merely because:

- it appears in a specification,
- it appears in a Plan,
- Build created code,
- or another agent said it works.

---

# 2. Primary Operating Goal

The project uses agents to execute substantial software-development work with
limited human interruption while preserving:

- correctness,
- security,
- privacy,
- product intent,
- maintainability,
- recoverability,
- and human control over material decisions.

The intended model is:

```text
Mike defines product direction and material constraints
        ↓
agents plan and execute routine engineering work
        ↓
automated checks and independent Verify challenge the result
        ↓
only meaningful decisions return to Mike
```

Do not create unnecessary human checkpoints.

Do not trade safety for autonomy.

---

# 3. Delivery-First Mode

The default operating mode is:

> delivery first, explanation on demand.

Agents should perform routine development work themselves.

Do NOT require Mike to manually:

- create files,
- run ordinary commands,
- type boilerplate,
- execute routine tests,
- perform repetitive Git operations,
- or approve trivial implementation choices

when the agent can safely perform those actions.

Teaching is secondary to delivery.

Explain during execution only when:

- Mike explicitly asks,
- a material product decision requires understanding,
- a security/privacy decision requires understanding,
- a significant architecture decision requires understanding,
- or a blocker requires human action.

Task handoffs may include a concise learning note when useful.

Do not turn normal execution into a tutorial.

---

# 4. Progressive Context Loading

Do not load every repository document automatically.

Read the smallest sufficient context set.

Root:

`CONTEXT.md`

is the context router.

Use it to determine which durable sources own the relevant truth.

Avoid repeatedly re-reading unchanged large files unless the active task
requires them.

Prefer durable repository context over historical chat explanations.

Historical ICM artifacts are evidence, not default context.

---

# 5. Durable Source Responsibilities

The project should maintain clear ownership of different kinds of truth.

Typical durable sources include:

## `docs/PRODUCT_VISION.md`

Owns:

- long-term product intent,
- future experience,
- major product principles,
- human-control principles.

It does not independently authorize implementation.

---

## Current product specification documents

Examples may include:

- `docs/V1_SPEC.md`,
- later milestone specifications,
- accepted feature specifications.

These own current product behavior and invariants for their defined scope.

---

## `docs/UI_SPEC.md`

Owns:

- information hierarchy,
- primary-view responsibilities,
- presentation contracts,
- reusable UI expectations.

It does not override product semantics.

---

## `docs/ARCHITECTURE.md`

Owns durable technical boundaries and architecture direction.

It should not become a frequently changing implementation snapshot.

Use:

`docs/IMPLEMENTATION.md`

for verified current repository reality.

---

## `docs/SECURITY_REQUIREMENTS.md`

Owns accepted application-security requirements.

When present and relevant, security requirements are hard constraints.

Implementation convenience does not override them.

---

## `docs/DATA_PRIVACY.md`

Owns:

- data classification,
- personal/sensitive data expectations,
- retention,
- deletion,
- logging rules,
- storage rules,
- privacy boundaries.

---

## `docs/THREAT_MODEL.md`

Owns:

- protected assets,
- actors,
- trust boundaries,
- major attack surfaces,
- accepted threat assumptions,
- important abuse cases and mitigations.

---

## `docs/SECURITY_TESTING.md`

Owns approved adversarial and abuse-case verification guidance for systems the
project owns or is explicitly authorized to test.

It is a defensive verification document.

Do not use it to target unrelated third-party systems.

---

## `docs/DECISIONS.md`

Owns accepted durable product and engineering decisions.

Do not promote every local implementation choice into a durable decision.

---

## `docs/TASKS.md`

Owns:

- task identity,
- status,
- sequencing,
- milestone roadmap.

A listed task is roadmap context.

It is not execution authorization by itself.

---

## `docs/IMPLEMENTATION.md`

Owns:

- verified current implementation reality,
- established routes/components/services,
- verified setup and commands,
- known implementation limits.

---

# 6. Conflict Handling

Do not silently choose between contradictory durable documents.

If relevant sources disagree:

1. identify the contradiction;
2. determine which document owns the disputed responsibility;
3. determine whether the conflict is material;
4. stop affected implementation when behavior cannot be resolved safely;
5. surface only the decision that genuinely requires human judgment.

Examples:

Product specification vs UI specification:

- product behavior is owned by the product specification.

Security requirement vs implementation convenience:

- security requirement wins unless the requirement itself is explicitly changed.

Implementation documentation vs repository reality:

- repository reality wins; documentation should later be corrected after
  verification.

Do not rewrite requirements merely to match generated code.

---

# 7. ICM Lifecycle

Meaningful tasks follow the staged lifecycle:

```text
Plan
↓
Build
↓
Verify
↓
full PASS
↓
verified documentation promotion
↓
task status completion
↓
safe repository finalization
```

Optional deployment/release work uses a separate Release stage.

Stage instructions live under:

- `icm/01_plan/CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- `icm/03_verify/CONTEXT.md`
- `icm/04_release/CONTEXT.md` when release/deployment is in scope

One user instruction may authorize multiple stages.

That does NOT collapse the responsibilities of those stages.

Each stage must:

- load its own instructions,
- preserve independent responsibilities,
- produce required evidence,
- and respect its own stop conditions.

---

# 8. One-Task Automation

Mike may authorize one named task through the complete implementation lifecycle
with a single instruction.

For an eligible task:

```text
Plan
↓
Build
↓
Verify
↓
PASS
↓
documentation promotion
↓
task Done
↓
repository finalization
```

may proceed without another prompt between stages.

A full-task instruction authorizes only the named task unless Mike explicitly
authorizes a batch.

Do not automatically begin the next roadmap task.

---

# 9. Batch Automation

Mike may explicitly authorize several named tasks as a bounded batch.

A batch must define:

- authorized task IDs,
- execution order,
- maximum boundary,
- and stop conditions.

Each task still completes independently:

```text
Plan
→ Build
→ Verify
→ PASS
→ finalize
```

before the next task begins.

If an earlier task:

- FAILS,
- becomes BLOCKED,
- requires a material human decision,
- cannot be safely synchronized,
- or exposes a significant security issue,

stop the batch unless the active instructions explicitly define a safe
alternative.

Do not manufacture PASS merely to continue a batch.

---

# 10. Risk Classification

Every meaningful task must be assigned a risk tier during Plan.

Risk affects verification strength and human-review requirements.

Use the highest applicable tier.

---

## R0 — Documentation / non-executable

Examples:

- documentation cleanup,
- copy changes,
- comments,
- non-functional metadata.

Default:

high autonomy.

---

## R1 — Low-risk application behavior

Examples:

- UI presentation,
- styling,
- safe component work,
- read-only rendering,
- low-risk refactors,
- ordinary tests.

Default:

full Plan → Build → Verify autonomy when requirements are clear.

---

## R2 — Data / API / dependency behavior

Examples:

- persistence,
- database schema changes,
- APIs,
- background jobs,
- new dependencies,
- caching,
- data transformations,
- non-sensitive integrations.

Requires:

- explicit data-flow reasoning,
- stronger regression tests,
- security review proportional to the change.

May remain autonomous when requirements are already clear and no material
security decision is introduced.

---

## R3 — Security-sensitive functionality

Examples:

- authentication,
- authorization,
- multi-user or multi-tenant data,
- PII,
- user uploads,
- private files,
- webhooks,
- external redirects,
- billing,
- secrets,
- OAuth,
- session handling,
- administrative capabilities,
- AI actions that can access user/private data,
- public write endpoints.

Requires:

- security-aware Plan,
- explicit trust boundaries,
- abuse cases,
- negative security tests,
- stronger Verify evidence.

Agents may implement autonomously when accepted requirements already determine
the secure behavior.

Stop only for material unresolved decisions.

---

## R4 — High-impact / destructive / irreversible

Examples:

- destructive production migrations,
- irreversible data deletion,
- cryptographic design,
- custom authentication/security protocol design,
- production permission-policy changes with broad impact,
- destructive Git history manipulation,
- bulk user-data actions,
- security changes whose failure could expose many users.

Requires explicit human approval before the high-impact action.

Do not reduce a task's tier to avoid review.

---

# 11. Security Is a Lifecycle Requirement

Security is not a final checklist applied after Build.

For relevant tasks:

Plan must reason about security.

Build must implement secure defaults.

Verify must attempt to break security assumptions.

Release must preserve verified controls.

The task risk tier determines depth.

---

# 12. Security-Triggered Planning

For R2–R4 tasks, Plan should determine relevant security context.

For R3–R4 tasks, explicitly identify:

- actors,
- authenticated roles,
- assets,
- trust boundaries,
- user-controlled inputs,
- sensitive data,
- authorization rules,
- external systems,
- failure modes,
- likely abuse cases,
- logging/privacy implications,
- rollback/recovery needs,
- required negative tests.

When applicable, answer questions such as:

```text
Who owns this resource?

Who may read it?

Who may modify it?

What prevents another user from guessing its ID?

What happens if input is malicious?

What happens if a dependency or external service fails?

Could sensitive information appear in logs or error messages?

Can the operation be replayed?

Can the endpoint be spammed?

Can a user cross a tenant boundary?

What evidence will prove the protection works?
```

Do not require this ceremony for R0/R1 tasks where it adds no value.

---

# 13. Multi-User and Tenant Isolation

When the project introduces multiple users or organizations:

> UI filtering is never authorization.

Authorization must be enforced at the server/data-access boundary.

Never trust:

- a route parameter,
- a client-supplied user ID,
- a hidden UI control,
- a client-side role,
- a guessed resource ID

as proof of ownership.

For private resources, access should conceptually require:

```text
authenticated actor
+
allowed action
+
resource ownership / tenant membership
```

Verify must include cross-user negative tests.

Example:

```text
User A → User A Course
allowed

User A → User B Course
denied

anonymous → private Course
denied
```

A feature is not security-complete until unauthorized access is tested.

---

# 14. Input and Output Safety

Treat external input as untrusted.

This includes:

- form values,
- URL parameters,
- query parameters,
- headers,
- uploaded files,
- API payloads,
- webhook payloads,
- AI-generated data,
- third-party API responses,
- database values originating from users.

Validate input at trust boundaries.

Use:

- structured schemas where appropriate,
- allowlists when feasible,
- bounded lengths/sizes,
- safe parsing,
- explicit error handling.

Do not rely solely on client-side validation.

Encode or render untrusted output through safe framework mechanisms.

Avoid unsafe HTML execution unless explicitly justified and sanitized.

---

# 15. Authentication and Authorization

Do not invent custom authentication or cryptographic protocols when established
solutions are available.

When authentication is introduced:

- session handling must be server-trusted,
- secrets remain server-side,
- protected routes/actions require server-side checks,
- logout/session invalidation behavior must be deliberate,
- authorization must be checked independently from authentication.

Authentication answers:

> Who is this?

Authorization answers:

> May this actor perform this action on this resource?

Do not conflate them.

---

# 16. Secrets and Credentials

Never expose or commit:

- API keys,
- passwords,
- access tokens,
- refresh tokens,
- private keys,
- connection strings containing secrets,
- signing secrets,
- service-role credentials.

Use environment-secret mechanisms approved by the deployment environment.

Do not place sensitive secrets in client-exposed environment variables.

Do not log secrets.

Do not include secrets in:

- tests,
- screenshots,
- fixtures,
- Plan artifacts,
- Verify artifacts,
- error messages,
- committed `.env` files.

If a secret is accidentally exposed:

STOP normal execution and surface it as a security incident.

Do not merely delete the line and continue.

---

# 17. Sensitive Data and Privacy

When user data becomes persistent, read:

- `docs/DATA_PRIVACY.md`
- `docs/SECURITY_REQUIREMENTS.md`

before implementing affected features.

Collect only data required for accepted product behavior.

Avoid unnecessary duplication.

Do not log sensitive data unless explicitly justified.

Do not place real private user data in test fixtures.

Deletion, retention, export, and storage behavior must follow accepted
requirements.

---

# 18. File Uploads and Private Files

File uploads automatically trigger at least R3 review.

Plan should address:

- ownership,
- allowed file types,
- file size limits,
- storage location,
- access control,
- metadata,
- deletion,
- content handling,
- safe file names,
- processing isolation,
- malware/content risk where applicable,
- signed/private download access,
- retention.

Never assume an extension proves file type.

Never expose private storage merely because the UI route is hidden.

Raw user Course materials must not be committed into the Git repository.

---

# 19. External URLs and Redirects

User-configured or externally supplied URLs are untrusted input.

When redirects are involved:

- validate allowed destinations,
- use accepted URL rules,
- prevent unsafe schemes,
- avoid open redirects,
- preserve intended user consent/handoff behavior.

This is especially important for products such as ReviewTap that intentionally
redirect users to third-party destinations.

---

# 20. APIs and Public Endpoints

Public endpoints should be designed for abuse, not only expected usage.

Consider:

- authentication where required,
- authorization,
- input validation,
- rate limiting,
- replay behavior,
- idempotency,
- enumeration,
- spam,
- resource exhaustion,
- response-data minimization,
- error leakage.

A public identifier must not automatically grant private access.

---

# 21. Webhooks

Webhook features trigger R3 review.

Require:

- provider signature verification when available,
- replay considerations,
- timestamp/freshness checks when appropriate,
- idempotent processing,
- safe parsing,
- limited logging,
- failure recovery.

Do not trust webhook source based only on endpoint secrecy.

---

# 22. Dependencies and Supply Chain

Do not add a dependency merely because it makes implementation easier.

Before a meaningful new dependency, determine:

- why existing platform capabilities are insufficient,
- maintenance activity,
- security implications,
- transitive dependency impact,
- whether the package is actually required.

Use lockfiles.

Do not disable dependency/security warnings merely to obtain PASS.

For R2+ dependency changes, Verify should include available dependency/security
checks.

---

# 23. Database and Persistence Safety

When persistence is introduced:

- validate data at application boundaries,
- enforce authorization for every private resource access,
- use parameterized/query-builder operations rather than unsafe string
  construction,
- use least-privilege database credentials,
- treat migrations as controlled changes,
- preserve rollback/recovery thinking,
- protect tenant isolation.

Do not assume database IDs are secret.

Do not use client-controlled owner IDs to decide ownership.

---

# 24. Logging and Error Handling

Logs should help operate the application without becoming a data leak.

Do not log:

- passwords,
- secrets,
- auth tokens,
- session tokens,
- unnecessary PII,
- private uploaded content.

User-visible errors should not reveal:

- database internals,
- stack traces,
- secrets,
- infrastructure details.

Internal errors should preserve useful diagnostics without exposing sensitive
data.

---

# 25. AI and Model Integrations

AI-generated output is untrusted data.

Do not allow model output to silently become:

- authoritative user data,
- executable code,
- privileged instructions,
- external actions,
- accepted academic truth

unless the accepted product design explicitly allows it and required review
occurs.

For AI features, Plan should consider:

- what data is sent to the model,
- privacy,
- prompt injection,
- source grounding,
- tool permissions,
- action authorization,
- cost,
- rate limits,
- failure behavior,
- human approval boundaries.

Model output must not override system authorization rules.

---

# 26. Secure Defaults

Prefer defaults that deny or restrict access until permission is explicit.

Examples:

- private data private by default,
- uploads non-public by default,
- authorization required by default,
- destructive actions confirmed/controlled,
- external actions minimized,
- least-privilege credentials.

Do not choose insecure defaults merely because they reduce implementation time.

---

# 27. Testing Strategy

Testing depth should scale with task risk.

## R0

Documentation validation where useful.

## R1

Use appropriate:

- lint,
- typecheck,
- build,
- component behavior,
- browser checks.

## R2

Add:

- unit/invariant tests,
- integration tests,
- failure cases,
- regression tests.

## R3+

Add relevant:

- authorization negative tests,
- cross-user isolation tests,
- malformed-input tests,
- abuse-case tests,
- security regression tests,
- file/upload tests,
- webhook forgery tests,
- rate-limit tests,
- sensitive-data leakage checks.

Do not rely on manual happy-path inspection for security-sensitive behavior.

---

# 28. Adversarial Verification

Verify must attempt to falsify important assumptions.

For security-sensitive work, use:

`docs/SECURITY_TESTING.md`

when relevant.

The goal is:

> try to prove the implementation unsafe or incorrect.

Examples:

- modify object identifiers,
- remove authentication,
- use another user's identifier,
- submit malformed input,
- use oversized input,
- repeat requests,
- attempt unauthorized state changes,
- inspect error responses,
- inspect logs where available,
- attempt unsafe redirect destinations,
- attempt invalid file types.

Only test:

- systems owned by this project,
- local environments,
- approved preview/staging environments,
- or systems with explicit authorization.

Do not use project security testing instructions against unrelated services.

---

# 29. Verify Independence

Verify is not Build confirmation.

Verify independently compares:

```text
accepted requirement
vs.
repository implementation
vs.
observable evidence
```

Build statements are hypotheses.

Passing compilation is evidence, not proof of product correctness.

Security-sensitive PASS requires relevant negative evidence.

Verify should ask:

```text
What assumption could be wrong?

What input could violate this behavior?

What access should be denied?

What regression would be expensive if missed?

What would an attacker try first?
```

---

# 30. Small Repair Lane

Verify may autonomously repair a defect only when:

- the intended behavior is already unambiguous,
- the repair is localized,
- risk is low,
- product scope does not change,
- architecture does not materially change,
- security policy does not change,
- privacy policy does not change.

After repair:

- rerun affected verification,
- update evidence,
- inspect the resulting diff.

Security-sensitive behavioral redesign is not a Small Repair Lane change.

Return to Plan or human review when required.

---

# 31. CI as an Enforcement Layer

Local agent checks are not the final long-term enforcement mechanism.

The repository should progressively move toward CI that runs automatically.

Expected CI may include:

- locked dependency install,
- lint,
- typecheck,
- unit tests,
- integration tests,
- production build,
- browser/E2E tests,
- dependency/security checks,
- code scanning,
- secret scanning where platform-supported.

Agents must not bypass CI requirements merely to complete a task.

If CI disagrees with local results:

investigate the discrepancy.

---

# 32. Git Workflow by Risk

Git behavior should scale with project maturity and task risk.

Low-risk local development may use direct task-scoped commits when repository
policy permits.

As protected workflows are introduced, prefer:

```text
task branch
↓
task implementation
↓
Verify
↓
push branch
↓
pull request
↓
CI/security checks
↓
merge
```

Repository-enforced rules override convenience.

Do not disable branch protection or required status checks merely to unblock an
agent.

---

# 33. Git Inspection Authority

Agents may autonomously perform normal non-destructive inspection such as:

```text
git status
git diff
git diff --staged
git log
git fetch
```

Agents may inspect:

- branch,
- upstream,
- ahead/behind state,
- divergence,
- conflicts,
- staged files,
- untracked files.

Routine inspection does not require Mike.

---

# 34. Safe Repository Synchronization

An already-verified and already-committed change may be normally synchronized
when:

- repository identity is confirmed,
- branch/upstream identity is confirmed,
- remote is not independently ahead,
- no divergence exists,
- no conflict exists,
- no unrelated unsafe work is included,
- no secret/private content would be pushed,
- no destructive reconciliation is required.

A simple local-ahead state is not a blocker.

---

# 35. Git Transport Fallback

Transport/authentication failure is different from repository divergence.

If normal push/fetch fails solely because the current Git transport is
unavailable:

1. confirm the canonical repository identity;
2. confirm the intended branch;
3. inspect local state;
4. use available non-destructive evidence to ensure no known divergence;
5. if an already-authenticated alternate transport for the SAME repository is
   available, retry through that transport.

Example:

```text
SSH authentication unavailable
↓
same GitHub repository confirmed
↓
HTTPS authentication already available
↓
normal HTTPS synchronization
```

Transport fallback must NOT:

- change repository ownership,
- change target branch unexpectedly,
- force push,
- rebase,
- reset,
- rewrite history,
- discard work,
- bypass security controls.

If safe repository state cannot be established:

STOP.

---

# 36. Destructive Git Operations

Agents must NOT automatically:

- force push,
- `git reset --hard`,
- rewrite history,
- perform destructive rebase,
- delete branches/tags containing meaningful work,
- discard uncommitted user work,
- overwrite divergent remote work,
- resolve destructive conflicts by arbitrarily choosing one side.

These require explicit human approval when materially destructive.

A failed push never authorizes destructive reconciliation.

---

# 37. Task-Scoped Commits

Do not mix unrelated work into a task commit.

Before finalization, inspect:

- status,
- diff,
- staged diff,
- untracked files.

Stage only task-related files.

Do not accidentally commit:

- secrets,
- generated junk,
- raw private files,
- unrelated user work.

Commit messages should identify the task or coherent change.

---

# 38. Commit and Push Authority

Build should not normally commit unfinished current-task work.

Verify may finalize a task after full PASS when repository policy permits.

The ordinary sequence is:

```text
Build
→ implementation
→ checks
→ handoff

Verify
→ independent verification
→ permitted repairs
→ full PASS
→ documentation promotion
→ task status update
→ task-scoped commit / PR preparation
→ safe synchronization
```

When repository protection later requires pull requests, finalization should
follow the protected workflow instead of direct `main` push.

---

# 39. Deployment Is Separate From Code Completion

Git commit/merge does not automatically mean the agent is authorized to deploy
production.

Deployment authority is separate from implementation authority.

A deployment-capable workflow should distinguish:

```text
feature development
↓
verification
↓
merge
↓
release authorization
↓
deployment
↓
post-deploy smoke checks
↓
monitoring
```

Use `icm/04_release/CONTEXT.md` for release/deployment work when present.

Do not modify production merely because a coding task passed.

---

# 40. Preview Environments

When deployment infrastructure supports previews:

prefer:

```text
task branch
→ preview deployment
→ verification
→ merge
→ production deployment
```

Preview environments are preferred for:

- browser verification,
- security testing,
- integration testing,
- stakeholder review.

Do not expose real production secrets or unnecessary production data in preview
environments.

---

# 41. Production Changes

Production-affecting actions require stronger care than local development.

Before a production change, establish:

- exact environment,
- exact version/commit,
- migration requirements,
- rollback path where practical,
- secret/config requirements,
- monitoring/smoke-test plan.

R4 production actions require explicit approval.

---

# 42. Human Review Boundary

Mike should be interrupted only for material decisions.

Examples include:

- product behavior with multiple valid meanings,
- durable architecture choice,
- user privacy policy,
- data retention/deletion policy,
- significant vendor/provider choice,
- high-impact dependency,
- security policy,
- broad authorization model,
- destructive migration,
- irreversible production action,
- business/legal requirement.

Do not ask for approval on ordinary implementation details already constrained
by accepted context.

---

# 43. Decisions Agents May Make

Agents may autonomously choose low-risk implementation details such as:

- local helper names,
- component decomposition,
- conventional file placement,
- ordinary TypeScript organization,
- safe framework patterns,
- styling implementation,
- test organization,
- local refactors required by the accepted task.

These choices do not become durable decisions merely because they were made.

---

# 44. Scope Control

Do not silently expand the active task.

If implementation reveals another useful feature:

record it as a follow-up candidate.

Do not build it unless authorized.

If completing the task truly requires material scope expansion:

return to Plan or human review.

---

# 45. Security Scope Expansion

A feature that unexpectedly introduces:

- authentication,
- authorization,
- PII,
- private storage,
- upload processing,
- billing,
- webhooks,
- external action,
- sensitive logging,
- public write endpoints

must have its risk tier reassessed.

Do not continue under an obsolete low-risk Plan.

---

# 46. Documentation Discipline

Update durable documentation only when durable truth changes.

Examples:

Update product specs when accepted behavior changes.

Update `SECURITY_REQUIREMENTS.md` when accepted security behavior changes.

Update `DATA_PRIVACY.md` when accepted privacy/data handling changes.

Update `THREAT_MODEL.md` when meaningful attack surfaces or trust boundaries
change.

Update `ARCHITECTURE.md` when durable technical boundaries change.

Update `IMPLEMENTATION.md` after verified implementation reality changes.

Update `TASKS.md` when roadmap/task status changes.

Do not update process files after every normal product task simply to record the
next task.

---

# 47. Security Documentation Is Not Proof

Writing:

> authorization is required

does not prove authorization exists.

Security requirements require:

- implementation,
- testing,
- observable evidence.

Do not mark a security-sensitive task complete based only on documentation.

---

# 48. No Security Theater

Do not add security tooling or complexity merely to appear secure.

A security measure should correspond to an identified risk.

Avoid:

- custom cryptography,
- redundant security libraries,
- meaningless scanners,
- fake threat-model sections,
- checklists with no enforcement.

Prefer:

```text
identified risk
↓
clear control
↓
testable requirement
↓
verification evidence
```

---

# 49. Failure Handling

When a check fails:

```text
failure
↓
evidence
↓
root-cause hypothesis
↓
targeted fix
↓
rerun relevant checks
```

Do not perform broad speculative rewrites.

Do not weaken a requirement simply because implementation failed.

Do not disable security checks merely to obtain PASS.

---

# 50. Operational Efficiency

Optimize token/context use without weakening correctness.

Prefer:

- progressive disclosure,
- task-specific artifacts,
- repository source of truth,
- concise stage handoffs,
- targeted tests,
- small coherent diffs.

Avoid:

- rereading every project file,
- reproducing large context in artifacts,
- unnecessary tutorials,
- repeated explanations,
- speculative future design,
- duplicate documentation.

Spend reasoning effort where risk is highest.

---

# 51. Recovery After Interrupted Execution

If execution is interrupted:

1. inspect Git status/history;
2. inspect task status;
3. inspect existing Plan/Verify artifacts;
4. inspect implementation state;
5. determine the last trustworthy completed stage;
6. resume from that stage.

Do not automatically restart the task.

Do not mark partial work complete.

Repository evidence is the recovery source of truth.

---

# 52. Current Project State

Do not hardcode frequently changing task status in this global file.

Use:

`docs/TASKS.md`

for roadmap/task state.

Use:

`docs/IMPLEMENTATION.md`

for verified implementation state.

Use Git for actual repository state.

This file should remain durable as the project advances.

---

# 53. Project-Specific Security

This file defines generic secure agent behavior.

School Dashboard-specific security and privacy requirements belong in:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- accepted product specifications

Do not place large project-specific security rules here when they belong in
those routed documents.

This separation is intentional so the ICM core can later be reused by other
projects such as ReviewTap.

---

# 54. Completion Standard

A task is complete only when:

- accepted requirements are satisfied,
- applicable security requirements are satisfied,
- applicable privacy requirements are satisfied,
- relevant tests/checks pass,
- Verify has sufficient evidence,
- known blockers are surfaced,
- documentation accurately reflects verified truth,
- repository finalization follows current Git policy.

Security-sensitive tasks also require evidence for relevant negative cases.

Do not mark incomplete or uncertain work as complete.

---

# 55. Final Principle

The objective is not:

> maximize autonomous code generation.

The objective is:

> maximize trustworthy autonomous delivery.

Prefer a smaller verified secure change over a larger uncertain one.

Prefer stopping for one genuinely important human decision over silently
creating long-term risk.

Everything else should move with as little human friction as safely possible.