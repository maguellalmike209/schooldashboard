# School Dashboard — Durable Decisions

## 1. Purpose

This document records accepted decisions that should continue to constrain
future School Dashboard work.

Only durable decisions belong here.

Task-local implementation choices remain in:

- task Plans,
- implementation,
- Verify artifacts,
- Release artifacts.

Future possibilities are not decisions.

A roadmap item is not a decision merely because it may eventually be built.

---

# 2. Decision IDs

Durable decisions use stable IDs:

`D-XXX`

Once established, avoid renumbering existing decisions.

Future Plan, Build, Verify, architecture, and security artifacts may reference
these IDs directly.

If a decision is replaced:

do not silently reuse its ID for a different meaning.

Record the superseding decision explicitly.

---

# 3. Product Decisions

## D-001 — Product Focus

School Dashboard is a personal academic planning application centered on helping
the student answer:

> What should I do today to stay on track in my classes?

Basis:

- `docs/PRODUCT_VISION.md`

---

## D-002 — Milestone 1 Scope

Milestone 1 uses mock/hardcoded academic data in a read-only UI.

Milestone 1 excludes:

- persistence,
- uploads,
- authentication,
- multiple-user behavior,
- external research/integrations,
- AI planning,
- dynamic ingestion,
- task mutation.

Basis:

- approved Milestone 1 scope
- `docs/V1_SPEC.md`

---

## D-003 — Primary Milestone 1 Views

The five required primary views are:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Weekly Plan and Today remain dedicated views rather than only Dashboard
sections.

Basis:

- approved five-view UX
- `docs/V1_SPEC.md`

---

## D-004 — Current-Course Source Authority

For academic Course Facts:

current instructor/current-course sources outrank historical or general sources.

Future external research may enrich understanding but must not silently replace
authoritative current-course material.

Basis:

- `docs/PRODUCT_VISION.md`

---

## D-005 — Provenance and Uncertainty

Important academic information should preserve meaningful origin/provenance.

The product should distinguish among:

- current-course facts,
- supplemental research,
- AI inference,
- personal-plan suggestions.

Do not invent certainty or unsupported numerical confidence.

Basis:

- `docs/PRODUCT_VISION.md`

---

## D-006 — Human Control Over Generated Plans

Future AI-generated plans and revisions remain advisory.

The student may:

- accept,
- edit,
- reject,
- regenerate

generated planning suggestions.

Generated content does not silently replace the student's accepted plan.

Basis:

- `docs/PRODUCT_VISION.md`

---

## D-007 — Product Model Before Production Schema

Academic concepts, relationships, and product behavior should be defined before
locking production persistence architecture.

Milestone 1 fixture objects do not automatically establish:

- database tables,
- ORM models,
- API contracts,
- production infrastructure.

The prototype provides evidence for later data design.

It is not the production schema.

Basis:

- `docs/V1_SPEC.md`
- `docs/ARCHITECTURE.md`

---

## D-008 — Initial Application Stack

The initial application stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS

A later dependency or service should be introduced because a real task requires
it, not merely because it is common.

Basis:

- `docs/ARCHITECTURE.md`

---

# 4. ICM Architecture Decisions

## D-009 — Secure Autonomous ICM

School Dashboard uses an ICM workflow designed to maximize:

> trustworthy autonomous delivery

rather than maximum autonomous code generation.

Routine engineering should require little human interaction.

Material product, architecture, privacy, security, destructive, or irreversible
decisions remain under human control.

Basis:

- `AGENTS.md`

---

## D-010 — Delivery-First Operation

Agents operate in delivery-first mode.

Routine development should be executed rather than turned into a tutorial.

Agents should explain during execution primarily when:

- Mike asks,
- a material product decision is required,
- a material architecture decision is required,
- a security/privacy decision is required,
- a blocker requires human action.

Routine commands, boilerplate, and low-risk implementation decisions should be
handled autonomously when possible.

Basis:

- `AGENTS.md`

---

## D-011 — Progressive Context Loading

Agents should load the smallest sufficient context for the active task.

Context depth should increase with:

- task complexity,
- risk,
- trust boundaries.

A harmless UI task should not automatically load the full security system.

A security-sensitive task must not omit relevant security/privacy context.

Basis:

- root `CONTEXT.md`

---

## D-012 — Four-Stage Lifecycle

The complete ICM lifecycle is:

```text
Plan
↓
Build
↓
Verify
↓
Release when authorized
```

Plan, Build, and Verify are normal development stages.

Release is a separate optional deployment stage.

Each stage retains a distinct responsibility even when one instruction
authorizes several stages.

Basis:

- `icm/01_plan/CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- `icm/03_verify/CONTEXT.md`
- `icm/04_release/CONTEXT.md`

---

## D-013 — Risk-Tier Model

Meaningful tasks are classified using the highest applicable tier:

- `R0` — documentation / non-executable
- `R1` — low-risk application behavior
- `R2` — data / API / dependency behavior
- `R3` — security-sensitive functionality
- `R4` — high-impact / destructive / irreversible functionality

Risk controls:

- context depth,
- testing depth,
- security analysis,
- human approval requirements.

A task must not be deliberately under-classified to preserve automation.

Basis:

- `AGENTS.md`
- `icm/01_plan/CONTEXT.md`

---

## D-014 — Plan Owns Risk and Execution Contract

Plan determines:

- scope,
- risk tier,
- relevant requirements,
- trust boundaries when applicable,
- abuse cases when applicable,
- acceptance criteria,
- verification targets,
- material decisions.

Build should not need to invent major product or security behavior after Plan is
complete.

Basis:

- `icm/01_plan/CONTEXT.md`

---

## D-015 — Build Implements Rather Than Redesigns

Build executes the accepted Plan.

Build may autonomously decide low-risk task-local implementation details.

Build must return to Plan when implementation reveals a material change to:

- product behavior,
- architecture,
- security policy,
- privacy policy,
- authorization,
- accepted scope,
- significant provider/dependency strategy.

Basis:

- `icm/02_build/CONTEXT.md`

---

## D-016 — Verify Is Independent and Adversarial

Verify does not exist to confirm Build.

Verify independently attempts to falsify important implementation assumptions.

Build claims and Build-created tests are evidence, not automatic proof.

For applicable tasks, Verify tests:

- expected behavior,
- forbidden behavior,
- regressions,
- authorization,
- tenant isolation,
- malformed input,
- abuse paths,
- security boundaries.

Basis:

- `icm/03_verify/CONTEXT.md`

---

## D-017 — Verify Must Validate Tests

Important Build-created tests are themselves subject to verification.

Verify should determine whether tests:

- exercise the real control,
- contain meaningful assertions,
- avoid mocking away the trusted boundary,
- could falsely pass while the feature is broken.

A passing invalid test is not sufficient evidence.

Basis:

- `icm/03_verify/CONTEXT.md`

---

## D-018 — Small Repair Lane

Verify may autonomously repair a defect only when:

- expected behavior is already unambiguous,
- the change is localized,
- scope does not expand,
- architecture does not materially change,
- security/privacy policy does not change,
- risk does not materially increase.

Verify must rerun affected evidence after repair.

The Small Repair Lane cannot be used to redesign authorization, weaken security,
change privacy policy, or weaken valid tests.

Basis:

- `icm/03_verify/CONTEXT.md`

---

# 5. Automation Decisions

## D-019 — One-Prompt Task Automation

One explicit instruction may authorize a single named task through:

```text
Plan
→ Build
→ Verify
→ PASS
→ verified project-state promotion
→ task completion
→ repository finalization
```

without a separate prompt between stages.

The authorization applies only to the named task.

It does not automatically authorize the next roadmap task.

Basis:

- `AGENTS.md`
- ICM stage instructions

---

## D-020 — Automatic Plan-to-Build Transition

When Plan reaches:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

and full-task execution has already been authorized:

Plan proceeds directly to Build.

Planning-only requests still stop after Plan.

Basis:

- `icm/01_plan/CONTEXT.md`

---

## D-021 — Automatic Build-to-Verify Transition

When Build reaches:

`READY FOR VERIFY`

and full-task execution has already been authorized:

Build proceeds directly into Verify.

No ceremonial human checkpoint is required.

Basis:

- `icm/02_build/CONTEXT.md`

---

## D-022 — Explicit Bounded Batch Automation

Several tasks may be automated together only when Mike explicitly authorizes a
bounded batch.

The batch must have:

- named tasks,
- defined order,
- a maximum boundary,
- stop conditions.

Each task still completes its own Plan → Build → Verify lifecycle.

A failed or materially blocked task stops unsafe continuation.

Basis:

- `AGENTS.md`
- `icm/01_plan/CONTEXT.md`

---

# 6. Security Architecture Decisions

## D-023 — Security Is a Lifecycle Property

Security is considered during:

- Plan,
- Build,
- Verify,
- Release

rather than being applied only at the end.

Relevant security controls must have:

```text
requirement
→ implementation
→ verification evidence
```

Basis:

- `AGENTS.md`
- `docs/SECURITY_REQUIREMENTS.md`

---

## D-024 — Durable Security Contract

`docs/SECURITY_REQUIREMENTS.md` owns School Dashboard's durable application
security requirements.

Security-sensitive Plans should reference stable requirement IDs rather than
copying the full security document.

Example:

`SEC-AUTHZ-004`

Basis:

- `docs/SECURITY_REQUIREMENTS.md`

---

## D-025 — Security Requirement IDs Remain Stable

Security requirement identifiers should remain stable after establishment.

Do not renumber them casually because Plans, tests, and Verify artifacts may
reference them.

If a requirement is replaced:

document the replacement rather than silently assigning the old ID a different
meaning.

Basis:

- security traceability model

---

## D-026 — Server-Side Authorization

Private-resource access must be enforced at trusted server/data boundaries.

UI filtering, hidden controls, client state, and difficult-to-guess resource IDs
do not constitute authorization.

Basis:

- `docs/SECURITY_REQUIREMENTS.md`

---

## D-027 — Multi-User Isolation Is a Required Security Property

When multiple users are introduced:

User A must not be able to access User B's private resources unless an explicit
accepted sharing/administrative rule grants that access.

Cross-user negative tests are required for important private resource classes.

Basis:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`

---

## D-028 — Established Security Providers Over Custom Protocols

School Dashboard should prefer established authentication, cryptography,
session, and security mechanisms rather than inventing custom protocols.

Custom cryptographic/authentication protocol design is high risk and requires
explicit review.

Basis:

- `docs/SECURITY_REQUIREMENTS.md`

---

# 7. Privacy Decisions

## D-029 — Data Minimization

School Dashboard collects and processes only information required for accepted:

- product functionality,
- security,
- operations,
- explicitly approved capabilities.

Data is not collected merely because it may become useful later.

Basis:

- `docs/DATA_PRIVACY.md`

---

## D-030 — Private Academic Data by Default

Persistent user academic information is private by default.

This includes, when implemented:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- schedules,
- progress,
- notes,
- uploaded Course materials,
- AI-derived personal plans.

Basis:

- `docs/DATA_PRIVACY.md`

---

## D-031 — Privacy Classification Model

School Dashboard uses the following conceptual data classes:

- Class 0 — Public
- Class 1 — Internal / Operational
- Class 2 — Personal
- Class 3 — Private / Sensitive User Content
- Class 4 — Secrets / Credentials

Plan should use the highest applicable classification.

Derived data generally inherits the sensitivity of its private source data.

Basis:

- `docs/DATA_PRIVACY.md`

---

## D-032 — Real Beta Users Are Real Users

Friends or invited beta participants are treated as real users.

Their private data must not be treated as disposable because:

- access is free,
- beta is small,
- the users are personally known.

Relevant authentication, authorization, isolation, storage, deletion, and
security safeguards must be established before accepting private beta data.

Basis:

- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`

---

# 8. Threat-Model Decisions

## D-033 — Threat Modeling Is Risk-Driven

School Dashboard maintains a practical living threat model.

The threat model focuses on:

- assets,
- actors,
- trust boundaries,
- realistic abuse cases,
- relevant controls.

It should evolve when meaningful attack surfaces change.

It should not become a generic theoretical security exercise.

Basis:

- `docs/THREAT_MODEL.md`

---

## D-034 — Agent / Automation Error Is a Threat

Autonomous coding/deployment error is treated as a first-class threat.

Examples include:

- incorrect scope,
- secret exposure,
- missing authorization,
- destructive migration,
- wrong production commit,
- bypassed verification.

ICM, CI, Git protections, and Release separation exist partly to reduce this
risk.

Basis:

- `docs/THREAT_MODEL.md`

---

# 9. Security-Testing Decisions

## D-035 — Security Testing Is Defensive and Authorized

`docs/SECURITY_TESTING.md` defines adversarial testing for systems the project
owns or is explicitly authorized to test.

The playbook does not authorize attacks against unrelated third-party systems.

Basis:

- `docs/SECURITY_TESTING.md`

---

## D-036 — Security Tests Are Selected by Risk

Verify does not run every attack module for every task.

Plan identifies relevant:

- risk tier,
- threat IDs,
- security requirement IDs,
- privacy requirement IDs.

Verify selects the matching adversarial tests.

This preserves security without creating unnecessary execution cost.

Basis:

- `docs/SECURITY_TESTING.md`

---

## D-037 — Security Defects Become Regression Tests

When a real security defect is discovered and a repeatable test is practical:

add a regression test so the same vulnerability does not depend on future human
memory.

The desired progression is:

```text
manual discovery
→ repeatable test
→ automated test
→ CI enforcement
```

Basis:

- `docs/SECURITY_TESTING.md`

---

# 10. Git Decisions

## D-038 — Build Does Not Normally Finalize Current Task

Build does not normally commit/push unfinished current-task implementation as
task completion.

The ordinary lifecycle is:

```text
Build
→ checks
→ Verify
→ full PASS
→ task finalization
```

Branch-based workflows may allow implementation commits when required, but
merge/finalization still follows Verify and repository policy.

Basis:

- `AGENTS.md`
- `icm/02_build/CONTEXT.md`

---

## D-039 — Verified Predecessor Synchronization

An already-verified and already-committed predecessor task may be synchronized
automatically when:

- canonical repository is confirmed,
- intended branch is confirmed,
- local branch is simply ahead,
- no divergence exists,
- no conflict exists,
- no unrelated unsafe content is included,
- no destructive reconciliation is required.

A safe local-ahead state is not itself a blocker.

Basis:

- `AGENTS.md`
- Build/Verify stage instructions

---

## D-040 — Verified Task Finalization

After full PASS, Verify may finalize the task according to current repository
policy.

When direct task-scoped commit/push is permitted, Verify may:

- promote justified verified current-state documentation,
- mark task Done,
- stage task-related files,
- create one coherent task-scoped commit,
- perform normal safe synchronization.

When protected branch / pull-request workflow is required:

that workflow supersedes direct finalization.

Basis:

- `AGENTS.md`
- `icm/03_verify/CONTEXT.md`

---

## D-041 — Full PASS Is Required

Automatic task completion requires a full Verify PASS.

The following do not qualify as completed PASS:

- FAIL
- BLOCKED
- RETURN TO PLAN
- unresolved material security failure

A non-blocking limitation may be documented only when it falls outside accepted
task requirements and does not undermine security/privacy requirements.

Basis:

- `icm/03_verify/CONTEXT.md`

---

## D-042 — Destructive Git Boundary

Automatic Git authority does not include:

- force push,
- `git reset --hard`,
- destructive rebase,
- history rewriting,
- destructive branch/tag deletion,
- discarding user work,
- overwriting genuinely divergent remote work,
- destructive conflict resolution,
- staging unrelated user work.

Material destructive operations require explicit approval.

Basis:

- `AGENTS.md`

---

## D-043 — Failed Push Does Not Authorize Destructive Recovery

A failed normal push does not authorize:

- force push,
- rebase,
- hard reset,
- history rewrite.

Agents should inspect repository state and stop when safe non-destructive
reconciliation cannot be established.

Basis:

- `AGENTS.md`

---

## D-044 — Safe Git Transport Fallback

When Git synchronization fails solely because the current transport or
authentication method is unavailable:

an already-authenticated alternate transport may be used only when:

- it targets the same canonical repository,
- it targets the intended branch,
- no divergence/conflict exists,
- no destructive reconciliation is required.

Example:

```text
SSH unavailable
→ canonical repository confirmed
→ HTTPS already authenticated
→ normal HTTPS synchronization
```

Transport fallback does not authorize history modification.

Basis:

- `AGENTS.md`

---

# 11. CI and Repository Enforcement Decisions

## D-045 — Prompt Rules Are Not the Final Enforcement Layer

Agent instructions should increasingly be backed by automated repository
controls.

The long-term enforcement stack should include appropriate:

- automated tests,
- CI,
- secret scanning,
- dependency scanning,
- code scanning,
- branch/repository protections.

The exact controls should be introduced according to actual project risk and
platform capability.

Basis:

- `AGENTS.md`
- `docs/SECURITY_REQUIREMENTS.md`

---

## D-046 — Core CI Before Real Private Multi-User Beta

Before real beta users rely on persistent private multi-user data, CI should
provide at least appropriate:

- locked dependency installation,
- lint,
- typecheck,
- automated tests,
- production build.

Security-sensitive capabilities should add corresponding automated security
checks.

Basis:

- `docs/SECURITY_REQUIREMENTS.md`

---

## D-047 — Protected Production Workflow Direction

As School Dashboard becomes a real deployed multi-user application, the desired
repository flow is:

```text
task branch
→ implementation
→ Verify
→ push branch
→ pull request
→ CI/security checks
→ merge
→ Release when separately authorized
```

Repository/platform enforcement should be used where available.

Current enforcement state belongs in `docs/IMPLEMENTATION.md` and GitHub, not
in this durable decision.

Basis:

- ICM v2 security architecture

---

# 12. Release Decisions

## D-048 — Verify PASS Does Not Authorize Production

Verify PASS means the implementation has satisfied its development verification
contract.

It does not independently authorize production deployment.

Production promotion belongs to Release.

Basis:

- `icm/04_release/CONTEXT.md`

---

## D-049 — Release Requires Authorization

Production Release requires:

- explicit deployment authorization,
- or a previously accepted continuous-deployment policy that clearly covers the
  change.

Having deployment credentials is not authorization.

Basis:

- `icm/04_release/CONTEXT.md`

---

## D-050 — Verified Version Must Match Released Version

The version promoted to an environment should be traceable to the version that
received required Verify/CI evidence.

Meaningful code changes after Verify require renewed verification.

Basis:

- `icm/04_release/CONTEXT.md`

---

## D-051 — Deployment Success Is Not Product Success

A hosting provider reporting successful deployment does not prove the
application works correctly.

Release must perform proportionate post-deploy smoke testing.

R3 releases should include safe security smoke tests when applicable.

Basis:

- `icm/04_release/CONTEXT.md`

---

## D-052 — Production Changes Must Be Recoverable

Meaningful production changes should have an understood recovery strategy.

Possible strategies include:

- redeploy previous version,
- revert,
- feature disablement,
- forward fix,
- migration recovery.

Application rollback must not be assumed safe after incompatible data changes.

Basis:

- `icm/04_release/CONTEXT.md`

---

# 13. Process / Documentation Decisions

## D-053 — Process Documents Remain Durable

Global process files should remain reusable across tasks.

They should not require modification after every roadmap task merely to record
the current task.

Examples:

- `AGENTS.md`
- root `CONTEXT.md`
- ICM stage contexts

Basis:

- approved low-maintenance ICM architecture

---

## D-054 — Current-State Ownership

Changing state is owned by:

`docs/TASKS.md`

for:

- task status,
- roadmap sequence,
- milestone status.

`docs/IMPLEMENTATION.md`

for:

- verified current implementation reality.

Git/source

for:

- actual repository reality.

Process files should route agents to these sources rather than duplicate
changing state.

Basis:

- root `CONTEXT.md`

---

## D-055 — Security Documents Have Separate Responsibilities

School Dashboard security documentation is intentionally modular.

`docs/SECURITY_REQUIREMENTS.md`

answers:

> What security properties must hold?

`docs/DATA_PRIVACY.md`

answers:

> What data exists and how may it be handled?

`docs/THREAT_MODEL.md`

answers:

> How could those guarantees realistically be broken?

`docs/SECURITY_TESTING.md`

answers:

> How do we safely attempt those attacks?

Do not merge these responsibilities into one giant security document.

Basis:

- ICM v2 architecture

---

## D-056 — Stable Security References

Stable identifiers are used for:

- security requirements,
- privacy requirements,
- threats,
- security test cases.

Future artifacts should reference those IDs rather than copying entire policy
documents.

This improves:

- traceability,
- token efficiency,
- test mapping,
- auditability.

Basis:

- ICM v2 architecture

---

## D-057 — Project-Specific Profile, Reusable ICM Pattern

The secure ICM operating pattern is intended to be reusable across projects.

Reusable concepts include:

- risk tiers,
- Plan,
- Build,
- Verify,
- Release,
- progressive context loading,
- Git safety,
- adversarial verification.

Project-specific product/security/privacy requirements remain project-specific.

ReviewTap should reuse the operating pattern while receiving its own:

- product requirements,
- security requirements,
- privacy profile,
- threat model,
- security-testing profile.

Basis:

- ICM v2 architecture

---

# 14. Human Decision Boundary

## D-058 — Human Review Is Reserved for Material Choices

Mike remains the decision-maker for material choices including:

- product behavior with multiple valid meanings,
- durable architecture,
- significant provider choice,
- privacy policy,
- retention/deletion policy,
- broad authorization model,
- high-impact security policy,
- destructive migration,
- irreversible production action,
- major cost/business commitment.

Agents should not manufacture approval questions for routine reversible
implementation details.

Basis:

- `AGENTS.md`

---

# 15. Current Security Transition

## D-059 — Security Foundation Before Multi-User Private Beta

School Dashboard should not expose security-sensitive private multi-user
capabilities to real beta users until the relevant foundation exists.

The foundation includes, as applicable:

- authentication,
- server-side authorization,
- tenant isolation,
- privacy requirements,
- threat model,
- security testing,
- automated application tests,
- CI,
- repository/security enforcement,
- protected private storage when uploads exist.

This does not require building unrelated future infrastructure prematurely.

Basis:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`

---

# 16. Milestone 2 Identity and Persistence Decisions

## D-060 — One Supabase Provider for Initial Auth and PostgreSQL

Milestone 2 selects Supabase Auth and Supabase-hosted PostgreSQL as one provider
for initial private multi-user data. Initial Auth is email/password signup,
sign-in, logout, email confirmation, and provider password recovery. No social
or phone auth, custom credential/session protocol, or MFA requirement is
selected. The relational domain needs database constraints and transactional
relationships; a second provider adds an avoidable identity boundary. This is
an architecture choice, not evidence of implemented runtime capability.

Basis: SD-014 Plan and official Supabase/Next.js guidance reviewed there.

---

## D-061 — Verified Identity and Server-Only DAL

Next.js uses provider-supported cookie SSR and server-verified identity for
protected operations. A server-only DAL centralizes authorization, minimizes
returned data, and contains provider-specific queries. A request-scoped user
client carries the authenticated session. Browser state, route IDs, and
unverified session payloads never establish ownership. Normal user operations
must not use an RLS-bypassing secret/service credential.

Basis: `SEC-AUTHN-002`, `SEC-AUTHZ-003`, `SEC-DB-001`, SD-014 Plan.

---

## D-062 — Owner Isolation at Application and Database Layers

Every private record has authoritative ownership. The DAL checks actor,
operation, and owned resource; PostgreSQL grants and RLS independently restrict
rows for SELECT, INSERT, UPDATE, and DELETE. Owner checks must cover both old
and proposed update rows and preserve ownership across relationships. Anonymous
and cross-user operations deny by default. IDs are not access grants.

Basis: `SEC-AUTHZ-002`–`SEC-AUTHZ-006`, `SEC-DB-002`, SD-014 Plan.

---

## D-063 — Runtime Validation and SQL Migration Source of Truth

Use Zod at trusted server input boundaries, TypeScript for development-time
typing, and PostgreSQL constraints for durable integrity. Version-controlled
Supabase CLI SQL migrations and database tests, replayable in a local
Docker-compatible stack, are the schema source of truth. The dashboard is not.
An ORM is not selected for the initial slice.

Basis: `SEC-INPUT-003`, `SEC-DB-003`, `SEC-DB-004`, SD-014 Plan.

---

## D-064 — Development Configuration and Secret Boundary

Use a committed placeholder-only `.env.example` when runtime work begins and
an ignored `.env.local` for development values. The public Supabase URL and
publishable key may be client-visible; they do not authorize a user. Secret
keys, database credentials, and session tokens must never reach client bundles,
Git, or logs. Choose a specific US region when a hosted project is later
approved. SD-014 creates no hosted project or credential.

Basis: `SEC-SECRET-001`–`SEC-SECRET-004`, `PRIV-ACADEMIC-001`, SD-014 Plan.

---

## D-065 — SD-015 Must Falsify Cross-User Isolation

The first runtime slice must reproduce User, Academic Term, and Course from
committed migrations and prove own-row Course CRUD, cross-user direct-ID
read/update/delete denial, anonymous denial, owner-spoof insert denial, and
collection isolation in both database/RLS and application paths. It must test
server identity, validation failures, logout, and secret exposure. Any
cross-user isolation failure is SD-015 FAIL; compilation or UI filtering alone
cannot establish PASS. The complete evidence matrix is in the SD-014 Plan.

Basis: `SEC-AUTHZ-004`, `SEC-AUTHZ-005`, `docs/SECURITY_TESTING.md`, SD-014 Plan.

---

# 17. Decision Maintenance

Add a new decision only when the choice is durable enough to constrain future
work.

Do not add decisions for:

- helper names,
- local component placement,
- one-off debugging techniques,
- trivial styling choices,
- temporary implementation details.

When a durable decision changes:

1. identify the existing decision;
2. record the replacement/supersession;
3. update affected durable documents;
4. preserve historical clarity.

Do not silently rewrite project history into something that was never actually
accepted.

---

# 18. Final Principle

This document should remain small enough to answer:

> What choices have we already settled that future agents should not casually
> reopen?

The decision record is not a diary.

It is the durable memory of the project's accepted product, engineering,
security, privacy, automation, Git, and release boundaries.
