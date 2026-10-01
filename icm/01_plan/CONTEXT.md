# ICM — Plan Stage

## 1. Purpose

The Plan stage converts an authorized task into a precise execution contract
for Build and Verify.

Plan exists to answer:

- what are we building,
- why are we building it,
- what already exists,
- what must remain unchanged,
- what risk does the task introduce,
- which security/privacy boundaries apply,
- what implementation approach is appropriate,
- and what evidence will later prove the task is complete.

Plan should remove material uncertainty before Build begins.

Plan does NOT need to resolve every local implementation detail.

The objective is:

> give Build enough accepted context to implement confidently without
> redesigning the product, while giving Verify enough explicit criteria to
> independently prove or disprove success.

---

# 2. Plan Is the Risk Gate

Every meaningful task must receive a risk classification before Build.

Plan owns that classification.

Use the highest applicable tier.

## R0 — Documentation / non-executable

Examples:

- documentation,
- copy,
- comments,
- metadata,
- non-functional configuration notes.

Usually requires minimal verification.

---

## R1 — Low-risk application behavior

Examples:

- UI presentation,
- styling,
- read-only screens,
- ordinary client behavior,
- safe refactors,
- non-sensitive tests.

Usually supports high autonomy.

---

## R2 — Data / API / dependency behavior

Examples:

- persistence,
- database schema,
- APIs,
- server actions,
- data transformations,
- caching,
- background jobs,
- meaningful dependencies.

Requires explicit data-flow reasoning and stronger verification.

---

## R3 — Security-sensitive functionality

Examples:

- authentication,
- authorization,
- user-owned data,
- multi-user / multi-tenant behavior,
- PII,
- private files,
- uploads,
- sessions,
- OAuth,
- webhooks,
- public write endpoints,
- billing,
- external redirects,
- administrative actions,
- AI actions over private/user data,
- secrets.

Requires explicit security planning and negative verification targets.

---

## R4 — High-impact / destructive / irreversible

Examples:

- destructive production migration,
- bulk deletion,
- broad permission changes,
- custom cryptographic design,
- custom authentication protocol design,
- irreversible production action,
- destructive Git history manipulation,
- operation whose failure may expose or destroy large amounts of user data.

The high-impact action requires explicit human approval.

Do not lower a risk tier merely to preserve automation.

---

# 3. Risk Can Escalate During Planning

A task may initially appear low-risk and reveal a higher-risk boundary.

Examples:

- UI work reveals a new API requirement,
- Course creation reveals user-owned database records,
- file display reveals private upload storage,
- integration reveals OAuth,
- analytics reveals PII,
- AI planning requires sending private data to a model.

When a higher-risk boundary appears:

1. reclassify the task;
2. load newly relevant security/privacy context;
3. update acceptance criteria and verification requirements;
4. surface a material decision only if one actually exists.

Do not continue with a stale lower-risk Plan.

---

# 4. Full-Task Automation

A single instruction may authorize one named task through:

Plan  
→ Build  
→ Verify  
→ PASS  
→ task finalization

without another prompt between stages.

Plan must not create an artificial approval checkpoint when:

- requirements are clear,
- risk has been classified,
- relevant security/privacy requirements are already accepted,
- no material product decision remains,
- no material architecture decision remains,
- no security/privacy policy decision remains,
- no blocker exists.

When all are true, Plan should conclude:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

and continue into Build when the active instruction authorizes the full
lifecycle.

If Mike requested planning only:

stop after Plan.

---

# 5. Batch Automation

When Mike explicitly authorizes a bounded task batch, Plan applies independently
to each task.

Do not create one giant Plan covering several unrelated tasks merely to reduce
process overhead.

Each task should still have:

- its own scope,
- risk tier,
- acceptance criteria,
- verification targets,
- completion boundary.

The next authorized task begins only after the previous task satisfies the
batch rules.

---

# 6. Required Entry Context

Before meaningful planning:

1. read root `AGENTS.md`;
2. read root `CONTEXT.md`;
3. read this Plan-stage context;
4. identify the explicitly authorized task;
5. inspect `docs/TASKS.md` when sequencing/status matters;
6. inspect `docs/IMPLEMENTATION.md` when current behavior matters;
7. inspect relevant repository code/configuration;
8. inspect Git state when local work may affect planning safety;
9. load only additional durable sources relevant to this task.

Do not automatically load all documentation.

Do not automatically load all previous Plan/Verify artifacts.

---

# 7. Plan From Repository Reality

When implementation already exists:

inspect it.

Determine:

- relevant routes,
- components,
- services,
- data structures,
- dependencies,
- tests,
- configuration,
- established patterns,
- verified behavior,
- known limits.

Do not design a replacement for functionality that already satisfies the task.

Do not assume documentation proves implementation.

---

# 8. Durable Context Selection

Depending on the task, Plan may need:

## Product specifications

Use when behavior or invariants are affected.

Examples:

- `docs/V1_SPEC.md`
- future accepted milestone specifications

---

## `docs/UI_SPEC.md`

Use when presentation or interaction responsibilities matter.

---

## `docs/ARCHITECTURE.md`

Use when technical boundaries, data ownership, services, persistence,
integrations, or deployment architecture matter.

---

## `docs/IMPLEMENTATION.md`

Use to understand verified current reality.

Then inspect code.

---

## `docs/DECISIONS.md`

Use when durable accepted decisions may constrain the task.

---

## `docs/SECURITY_REQUIREMENTS.md`

Use for R2+ when security requirements are relevant.

Required for R3/R4 unless the task genuinely does not touch application
security.

---

## `docs/DATA_PRIVACY.md`

Use when user/personal/sensitive data is collected, stored, transmitted,
logged, exposed, deleted, exported, or retained.

---

## `docs/THREAT_MODEL.md`

Use when:

- task is R3/R4,
- attack surface changes,
- trust boundaries change,
- new actors/services appear.

---

## `docs/SECURITY_TESTING.md`

Primarily a Verify document, but Plan should inspect relevant sections when
security acceptance criteria must be designed in advance.

---

# 9. Security-Foundation Transition Rule

If an R3/R4 task requires security/privacy documents that do not yet exist or
are materially incomplete:

do NOT invent a security policy inside the feature task.

Instead:

- identify the missing durable foundation,
- determine whether the feature can safely proceed without it,
- stop before Build when policy would otherwise be invented ad hoc.

Example:

If adding authentication requires deciding:

- account deletion behavior,
- session policy,
- user data ownership,

and these decisions are not established:

surface those decisions before implementation.

---

# 10. Planning Workflow

For meaningful tasks, Plan should reason through the following sequence.

The artifact does not need excessive prose.

Use the smallest amount of detail necessary to remove material uncertainty.

---

## Step 1 — Define Objective

State:

- what problem is being solved,
- which user/system behavior changes,
- what successful completion means.

Avoid vague goals.

Weak:

> Add database support.

Better:

> Replace the static Course source with authenticated user-owned persisted
> Courses while preserving the existing five-view behavior and preventing
> cross-user access.

---

## Step 2 — Establish Current State

Inspect and summarize only relevant existing reality.

Determine:

- current implementation,
- current constraints,
- existing tests,
- existing security boundaries,
- prior verified behavior that must remain intact.

---

## Step 3 — Define Required Behavior

Separate:

### Required

Must exist for task completion.

### Optional

May be included only if low-risk and naturally required by the accepted
implementation.

### Out of scope

Explicitly excluded.

Aggressively prevent future-feature leakage.

---

## Step 4 — Identify Product Invariants

List only invariants that materially constrain this task.

Do not reproduce the entire product specification.

---

## Step 5 — Assign Risk Tier

State:

`Risk Tier: R0 / R1 / R2 / R3 / R4`

Then provide a brief rationale.

Example:

`R3 — introduces authenticated user-owned Course records and therefore creates
authorization and tenant-isolation boundaries.`

---

# 11. Data-Flow Planning

For R2+ tasks, describe relevant data flow.

Identify:

- data origin,
- validation boundary,
- processing location,
- storage,
- reads,
- writes,
- external transfer,
- output.

Example:

user form  
→ server validation  
→ authenticated ownership resolution  
→ database write  
→ authorized database read  
→ UI

Do not create detailed diagrams when a short flow is sufficient.

---

# 12. Trust Boundaries

For R3+ tasks, explicitly identify trust boundaries.

Examples:

- browser → server,
- unauthenticated → authenticated,
- application → database,
- application → object storage,
- application → AI provider,
- provider → webhook endpoint,
- public NFC user → ReviewTap backend.

At each relevant boundary ask:

> What can the less-trusted side control?

> What must the trusted side verify?

---

# 13. Actors and Authorization

For R3+ tasks identify relevant actors.

Examples:

- anonymous visitor,
- authenticated student,
- business owner,
- administrator,
- external provider,
- background worker.

For protected resources define:

- who owns it,
- who may read it,
- who may create it,
- who may modify it,
- who may delete it.

Do not use client-side visibility as authorization.

---

# 14. Data Classification

When persistent user data is involved, classify relevant information according
to `docs/DATA_PRIVACY.md`.

Until the project-specific taxonomy is finalized, Plan should at minimum
identify whether data is:

- public,
- internal/non-public,
- personal,
- sensitive,
- secret/credential,
- private uploaded content.

This classification should influence:

- storage,
- logging,
- access,
- test data,
- external transfer,
- deletion.

---

# 15. Abuse Cases

For R3+ tasks, identify realistic abuse cases.

Do not brainstorm unlimited theoretical attacks.

Focus on likely, high-value cases.

Examples:

- user changes a Course ID to another user's Course,
- attacker calls API without authentication,
- malicious upload bypasses UI restrictions,
- forged webhook is submitted,
- public review endpoint is spammed,
- unsafe external redirect is configured,
- AI prompt attempts to override authorization,
- sensitive information leaks in errors.

Every important abuse case should map to:

- a prevention/control,
- and a Verify target.

---

# 16. Security Requirements Mapping

For R3+ tasks, identify the relevant accepted security rules.

Example:

Requirement:

> private Course records require server-side ownership authorization.

Implementation consequence:

> every Course read/write must bind resource ownership to the authenticated
> user.

Verification consequence:

> User A accessing User B's Course ID must fail.

Security requirements should flow:

requirement  
→ design control  
→ negative test

---

# 17. Privacy Planning

When privacy is relevant, determine:

- what data is collected,
- why it is required,
- where it is stored,
- whether it leaves the system,
- whether logs may contain it,
- who may access it,
- deletion/retention implications.

Do not collect data merely because it might become useful later.

If privacy policy decisions are unresolved:

surface them before Build.

---

# 18. Dependency Planning

If a new dependency may be required:

first determine whether:

- platform/framework capability already exists,
- existing dependency solves it,
- a small local solution is safer,
- the dependency materially increases attack surface.

For meaningful dependencies consider:

- package purpose,
- maintenance,
- ecosystem maturity,
- security implications,
- transitive impact.

Do not choose a dependency solely because generated examples commonly use it.

---

# 19. External-Service Planning

When introducing an external provider, determine:

- what data is sent,
- what credentials are required,
- what trust is delegated,
- failure behavior,
- vendor-specific lock-in,
- security implications,
- privacy implications,
- cost implications where material.

Provider selection is a material decision when multiple choices significantly
affect architecture, cost, privacy, or maintainability.

---

# 20. AI Planning

For tasks involving AI/models, Plan must identify:

- input data,
- private/sensitive data sent externally,
- model/provider,
- prompt-injection exposure,
- source-grounding requirements,
- allowed tool/actions,
- approval boundaries,
- failure behavior,
- rate/cost controls,
- output validation.

AI output is untrusted.

Do not let model output become authoritative or privileged merely because it was
generated successfully.

---

# 21. File-Upload Planning

File upload tasks are at least R3.

Plan must address:

- ownership,
- access control,
- allowed file types,
- maximum size,
- validation,
- storage,
- public/private visibility,
- download authorization,
- deletion,
- retention,
- processing,
- malicious-content considerations.

Do not rely only on file extensions.

---

# 22. API Planning

For APIs, consider:

- authentication,
- authorization,
- request validation,
- response minimization,
- error handling,
- rate/abuse control,
- idempotency where relevant,
- enumeration risk,
- logging.

Public endpoints must be designed assuming hostile inputs.

---

# 23. Webhook Planning

Webhook tasks require:

- provider authenticity verification,
- replay considerations,
- idempotency,
- safe parsing,
- failure recovery,
- sensitive logging rules.

Endpoint secrecy alone is not authentication.

---

# 24. Persistence Planning

When introducing persistence:

do not automatically convert mock objects into production schema.

Plan should determine:

- product concepts that actually require persistence,
- ownership,
- relationships,
- integrity constraints,
- authorization boundaries,
- migration needs,
- delete behavior,
- indexes/performance requirements where meaningful.

Use the prototype as evidence, not as a locked schema.

---

# 25. Multi-Tenant Planning

For multi-user/multi-tenant features, Plan must make isolation explicit.

For each private entity define:

- owner/tenant relationship,
- server-side authorization point,
- database/data-access enforcement strategy,
- negative test.

Never assume unpredictable IDs provide isolation.

---

# 26. Logging Planning

When meaningful server behavior is added, decide:

- what events need logs,
- what must never be logged,
- what identifiers are sufficient,
- what errors need diagnostics.

Avoid logging complete sensitive payloads.

---

# 27. Failure and Recovery Planning

For meaningful R2+ tasks consider:

- provider failure,
- database failure,
- partial operation,
- duplicate request,
- timeout,
- invalid state,
- retry behavior,
- recovery.

Do not over-engineer failure recovery for trivial local UI behavior.

---

# 28. Deployment Impact

Plan should identify whether the task affects:

- environment variables,
- migrations,
- build configuration,
- production infrastructure,
- external service configuration,
- deployment sequence.

Implementation authorization does not automatically authorize production
deployment.

If Release work is needed:

record it as a separate stage requirement.

---

# 29. Smallest Secure Coherent Solution

Choose the simplest solution that fully satisfies:

- product requirements,
- risk requirements,
- security requirements,
- privacy requirements,
- acceptance criteria.

Avoid:

- speculative infrastructure,
- unnecessary services,
- premature abstraction,
- unnecessary dependencies,
- security theater.

Smallest means:

> no unnecessary system.

It does NOT mean:

> remove required security controls to reduce code.

---

# 30. Impact Map

Identify:

## Expected to change

Likely implementation areas.

## Must inspect

Existing areas required to understand the change.

## Should remain untouched

Explicit scope boundaries.

Example:

Expected to change:
- Course persistence layer
- authenticated Course actions
- Course queries

Must inspect:
- existing Course UI
- auth/session utilities
- database schema

Should remain untouched:
- uploads
- AI planning
- billing

---

# 31. Acceptance Criteria

Every meaningful task needs observable acceptance criteria.

Acceptance criteria describe behavior, not coding effort.

Weak:

> Add authorization.

Better:

> Authenticated users can read their own Courses; attempting to read another
> user's Course through a modified resource ID is denied server-side.

Criteria must be specific enough for independent Verify.

---

# 32. Positive and Negative Acceptance Criteria

For R3+ tasks include both.

Positive:

> owner can access own Course.

Negative:

> another authenticated user cannot access that Course.

Also include relevant malformed/failure behavior.

Security-sensitive work should not PASS based only on a happy path.

---

# 33. Verification Is Designed During Plan

Plan defines what evidence Verify should later gather.

Possible evidence:

- unit tests,
- integration tests,
- E2E tests,
- API tests,
- database assertions,
- browser inspection,
- static analysis,
- dependency checks,
- code scanning,
- security negative tests,
- logs,
- build output,
- CI.

Use the strongest practical evidence proportional to risk.

Do not leave Verify with:

> test security.

Specify what should be challenged.

---

# 34. Adversarial Verification Targets

For R3+ tasks Plan should identify likely adversarial checks.

Examples:

- substitute another user's ID,
- omit authentication,
- modify role,
- submit malformed payload,
- send oversized input,
- use disallowed redirect,
- forge webhook signature,
- retry/replay request,
- upload invalid file.

These become Verify targets.

Use `docs/SECURITY_TESTING.md` when available.

---

# 35. Test Strategy

Plan should determine what testing is justified.

## R0

Usually formatting/document inspection.

## R1

Typical:

- lint,
- typecheck,
- build,
- UI/runtime checks.

## R2

Typically add:

- unit/invariant tests,
- integration tests,
- failure cases.

## R3+

Typically add:

- automated authorization/security tests,
- negative cases,
- E2E or integration coverage,
- adversarial tests,
- security tooling where applicable.

Do not add a large framework solely for one trivial task.

But do not avoid test infrastructure when the project now genuinely needs it.

---

# 36. CI Requirements

If repository CI exists:

Plan should identify required checks relevant to the task.

If a meaningful task introduces behavior that currently cannot be automatically
protected, Plan may identify CI/test infrastructure as required scope.

Do not bypass failing CI as a completion strategy.

---

# 37. Human Decisions

Surface a decision only when it materially affects:

- product behavior,
- architecture,
- security policy,
- privacy policy,
- provider/vendor selection,
- significant dependency,
- data retention,
- authorization model,
- irreversible operation,
- R4 action,
- task scope.

Do not ask Mike to choose:

- helper names,
- local component placement,
- equivalent framework syntax,
- small styling decisions,
- ordinary reversible implementation details.

---

# 38. Recommendation When Human Decision Is Required

When human judgment is required:

do not merely ask:

> What do you want?

Provide:

- decision,
- viable options,
- recommended option,
- important tradeoff,
- consequence of each choice.

Keep it concise.

---

# 39. Decisions Agents May Resolve

Plan may automatically resolve:

- low-risk implementation structure,
- conventional framework usage,
- safe local refactors,
- test organization,
- local type organization,
- ordinary accessibility implementation,
- small reusable helpers.

Record meaningful choices when useful.

Do not promote them to `DECISIONS.md` unless genuinely durable.

---

# 40. Durable Decision Candidates

Identify choices that may deserve durable documentation.

Examples:

- authentication provider,
- tenant ownership model,
- storage provider,
- route convention,
- security boundary,
- retention rule,
- major architectural split.

Do not automatically write them to `DECISIONS.md`.

They become durable after acceptance.

---

# 41. Documentation Planning

Plan may identify documentation updates required after successful Verify.

Do not update:

`docs/IMPLEMENTATION.md`

to claim planned functionality already exists.

Do not mark the task Done during Plan.

Do not promote security controls as implemented before Verify proves them.

---

# 42. Plan Output Artifact

For meaningful tasks create a task-specific artifact under:

`icm/01_plan/output/`

Use a descriptive name.

Example:

`SD-012-authenticated-course-persistence-plan.md`

Do not use:

- `plan.md`
- `notes.md`

Trivial R0/R1 work may omit a durable Plan artifact when it adds no value.

---

# 43. Plan Artifact Structure

A substantial artifact should normally contain:

# <Task ID> — <Task Name>

## Human Review Summary

## Objective

## Current State

## Risk Classification

## Requirements

## Non-Goals

## Relevant Product Invariants

## Security / Privacy Context

## Proposed Approach

## Impact Map

## Acceptance Criteria

## Verification Plan

## Risks / Open Questions

## Build Readiness

Include only relevant sections.

For R0/R1 tasks, security sections may simply state:

`No new security boundary introduced.`

Do not create fake threat analysis.

---

# 44. Human Review Summary

The artifact should start with a concise review section.

Use:

## Mike's Required Actions

Only genuine required actions.

If none:

`None.`

## Decisions Requiring Mike

Only material decisions.

If none:

`None.`

## Risk Tier

State:

`R0`, `R1`, `R2`, `R3`, or `R4`

with one-sentence reasoning.

## Current Blockers

Only real blockers.

If none:

`None.`

## Automation Status

Use one:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

`READY FOR BUILD AFTER LISTED APPROVAL`

`BLOCKED`

---

# 45. Security Summary for R3+

For R3/R4 include concise:

## Protected Assets

What must be protected.

## Trust Boundaries

Where trust changes.

## Primary Abuse Cases

Highest-value realistic attacks.

## Required Controls

Controls Build must implement.

## Negative Verification

What Verify must attempt.

Avoid enormous generic checklists.

---

# 46. Build Readiness

A meaningful Plan is ready when:

1. objective is clear;
2. repository reality was inspected;
3. required behavior is defined;
4. non-goals are defined;
5. relevant product invariants are identified;
6. task risk tier is correct;
7. relevant security/privacy context is understood;
8. architecture approach is coherent;
9. acceptance criteria are observable;
10. verification evidence is planned;
11. unresolved material decisions are surfaced;
12. no blocker remains.

Then state:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

or:

`READY FOR BUILD AFTER LISTED APPROVAL`

or:

`BLOCKED`

---

# 47. Automatic Plan → Build Transition

When:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

and the active instruction authorizes full-task execution:

complete the Plan artifact and handoff, then load:

`icm/02_build/CONTEXT.md`

and continue automatically.

Do not ask Mike:

> Should I start Build?

The authorization already exists.

---

# 48. Planning-Only Requests

If Mike explicitly requested:

- planning,
- architecture exploration,
- risk assessment,
- options analysis

without implementation authorization:

do not enter Build.

Return the Plan and stop.

---

# 49. R4 Approval Boundary

For R4 tasks:

Plan may proceed far enough to understand and design the change.

Do not perform the high-impact action until explicit approval is obtained.

Examples:

- destructive production migration,
- irreversible deletion,
- broad permission rewrite.

Routine local simulation/testing may continue when safe and authorized.

---

# 50. Final Plan Handoff

End meaningful Plan work with:

## Plan Status

One of the accepted statuses.

## Risk Tier

R0–R4.

## What Will Be Built

Concise scope.

## Important Boundaries

What Build must not accidentally change.

## Security / Privacy Requirements

Only relevant requirements.

## Decisions Made Automatically

Meaningful autonomous choices.

If none:

`None.`

## Decisions Requiring Mike

If none:

`None.`

## Verification Targets

Most important positive, regression, and negative evidence.

## Next Stage

If full-task execution is authorized and status is ready:

`Proceed directly to Build.`

Otherwise explain the required next action.

---

# 51. Efficiency Rules

Plan should be rigorous, not verbose.

Avoid:

- copying entire specifications,
- reproducing AGENTS rules,
- generic security checklists,
- giant theoretical threat models,
- tutorials,
- irrelevant future architecture,
- excessive alternatives when one clearly fits.

Prefer:

- explicit scope,
- risk tier,
- concrete security implications,
- testable acceptance criteria,
- small implementation plan.

The goal is high-quality decisions per token.

---

# 52. Plan Self-Review

Before handing off, Plan should challenge itself:

> Did I inspect actual implementation?

> Is the risk tier too low?

> Did I miss a trust boundary?

> Am I assuming the client enforces security?

> Did I invent product behavior?

> Did I accidentally include future scope?

> Can Verify actually prove every important criterion?

> Is there a destructive or irreversible action hidden inside the task?

> Am I asking Mike to decide something an agent can safely decide?

Fix the Plan when the answer reveals a problem.

---

# 53. Scope Failure Rule

If the task cannot be completed without materially expanding accepted scope:

do not quietly absorb the additional feature.

State:

- why scope expansion is required,
- smallest additional scope,
- whether it changes risk tier,
- whether human approval is required.

---

# 54. Plan Does Not Own Release Authorization

Plan may identify deployment implications.

Plan does not automatically authorize production release.

Implementation lifecycle and release lifecycle remain separate.

Use:

`icm/04_release/CONTEXT.md`

when deployment is later authorized.

---

# 55. Final Principle

A good Plan should let Build move quickly because the difficult uncertainty was
resolved before implementation.

For low-risk tasks:

keep Plan lightweight.

For high-risk tasks:

spend more reasoning on:

- ownership,
- trust boundaries,
- abuse cases,
- security controls,
- negative verification.

The goal is:

> minimum planning necessary for maximum trustworthy autonomy.