# School Dashboard — Context Router

## 1. Purpose

This file routes agents to the smallest sufficient set of repository context
for the active task.

It answers:

> What information does this task actually need?

It does NOT define:

- global agent behavior,
- detailed Plan procedure,
- detailed Build procedure,
- detailed Verify procedure,
- detailed Release procedure,
- full product requirements,
- full security policy,
- full privacy policy,
- full architecture,
- or current implementation state.

Those responsibilities belong to other documents.

The goal is:

> load enough context to work correctly and securely without loading the entire
> repository for every task.

---

# 2. Core Operating Flow

Agents should normally load context in this order:

```text
AGENTS.md
↓
CONTEXT.md
↓
authorized task
↓
active ICM stage
↓
risk-relevant durable documents
↓
relevant repository implementation
↓
task artifact when needed
```

Use progressive disclosure.

Do not load every document merely because it exists.

Do not load every historical Plan or Verify artifact.

Context should expand with task risk and complexity.

---

# 3. Global Agent Rules

Global behavior is defined by:

`AGENTS.md`

Read it before this router.

It owns cross-project engineering behavior such as:

- autonomy,
- risk classification,
- secure development,
- Git safety,
- task scope,
- human-review boundaries,
- deployment separation,
- recovery,
- efficiency.

Do not duplicate those rules here.

---

# 4. Execution Authorization

For scheduled or manager-delegated invocations, load
`icm/automation/CONTEXT.md` for bounded external authority, cross-run recovery,
exclusive execution, and the daily Manager Review. The read-only pilot has no
trusted write gate. The automation contract supplements, but does not replace,
Plan → Build → independent Verify → optional authorized Release.

Context is not authorization.

A task appearing in:

- `docs/TASKS.md`,
- `docs/PRODUCT_VISION.md`,
- `docs/ARCHITECTURE.md`,
- a future roadmap,
- or an old Plan

does not authorize execution.

Execution authority comes from Mike's active instruction.

An instruction may authorize:

- analysis only,
- planning only,
- one ICM stage,
- one complete task lifecycle,
- one bounded batch,
- release/deployment.

Do not infer broader authority.

---

# 5. Active ICM Stage

Each stage has one job.

Load the relevant stage instructions.

---

## Plan

Load:

`icm/01_plan/CONTEXT.md`

Plan owns:

- scope definition,
- current-state understanding,
- product/engineering research when needed,
- risk classification,
- product invariants,
- architecture reasoning,
- security/privacy analysis,
- trust boundaries,
- abuse cases,
- acceptance criteria,
- verification design,
- human-decision identification.

Plan also owns task-specific execution readiness and any optional Strategic
Phase Transition Review. Route those reviews to `docs/PRODUCT_VISION.md`,
accepted specifications/decisions, `docs/TASKS.md`, `docs/IMPLEMENTATION.md`,
and relevant Verify or Release evidence as the question requires.

Plan produces the execution contract.

---

## Build

Load:

`icm/02_build/CONTEXT.md`

Build owns:

- implementation,
- consumption of relevant Plan readiness evidence,
- secure coding,
- task-local engineering decisions,
- tests,
- Build checks,
- implementation diff,
- handoff to Verify.

Build implements the accepted contract.

It does not redesign the product.

---

## Verify

Load:

`icm/03_verify/CONTEXT.md`

Verify owns:

- independent functional verification,
- reconstruction of verification targets from accepted requirements,
- regression verification,
- test validation,
- negative testing,
- security testing,
- adversarial testing,
- permitted small repairs,
- PASS / FAIL determination,
- verified documentation promotion,
- repository finalization.

Route reusable Verify learning to the owning durable source only when it
establishes a useful accepted conclusion; retain task-local observations in
the Verify artifact.

Verify attempts to prove Build wrong before granting trust.

---

## Release

Load only when deployment/release is explicitly authorized:

`icm/04_release/CONTEXT.md`

Release owns:

- exact release-version identity,
- target environment,
- configuration,
- migrations,
- deployment,
- rollback,
- smoke testing,
- monitoring,
- incident recovery.

Verify PASS does not automatically authorize Release.

---

# 6. Risk Controls Context Depth

Every meaningful task should have a risk tier from Plan.

Use the highest applicable tier.

---

## R0 — Documentation / non-executable

Typical context:

- relevant document,
- active stage,
- source owning the subject.

Usually avoid loading security/privacy/threat documents unless the task concerns
them directly.

---

## R1 — Low-risk application behavior

Examples:

- UI,
- styling,
- read-only pages,
- safe refactors.

Typical context:

- product requirements,
- UI specification,
- current implementation,
- relevant source files.

Load security context only if an actual security boundary is affected.

---

## R2 — Data / API / dependency behavior

Examples:

- persistence,
- APIs,
- server actions,
- database structure,
- significant dependency,
- data transformation.

Typical context expands to include:

- architecture,
- security requirements,
- privacy requirements when user data is involved,
- implementation state.

---

## R3 — Security-sensitive functionality

Examples:

- authentication,
- authorization,
- multi-user data,
- private files,
- uploads,
- PII,
- OAuth,
- sessions,
- webhooks,
- billing,
- external redirects,
- public write endpoints,
- AI over private information.

Load relevant:

- product specification,
- architecture,
- security requirements,
- data privacy,
- threat model,
- implementation state,
- durable decisions.

During Verify also load:

`docs/SECURITY_TESTING.md`

when applicable.

---

## R4 — High-impact / destructive / irreversible

Load all relevant:

- product,
- architecture,
- security,
- privacy,
- threat,
- implementation,
- migration,
- recovery,
- release context.

Explicit human approval requirements from `AGENTS.md` apply.

---

# 7. Product Context

Use product documents only when they own something relevant to the task.

---

## `docs/PRODUCT_VISION.md`

Owns long-term direction.

Use when the task depends on:

- long-term product intent,
- course intelligence direction,
- planning direction,
- AI/human-control principles,
- adaptive planning,
- future integrations.

It does not authorize implementation.

---

## Current Product Specification

Milestone 1 uses:

`docs/V1_SPEC.md`

Future milestones should use their accepted active specification.

Use the relevant product specification for:

- user-visible behavior,
- domain semantics,
- feature invariants,
- allowed interactions,
- exclusions,
- acceptance rules.

Product specifications own product meaning.

---

## `docs/UI_SPEC.md`

Use when the task affects:

- screen responsibilities,
- information hierarchy,
- navigation,
- presentation,
- reusable UI patterns,
- responsive behavior,
- accessibility-sensitive layout.

UI specifications do not override product semantics.

---

## `docs/MOCK_DATA_SPEC.md`

Use primarily for Milestone 1 static fixture behavior or when preserving its
validated domain distinctions.

It owns:

- fixture identity,
- static relationships,
- reference-date semantics,
- mock provenance,
- Course Facts vs personal-plan distinctions.

It is not a production database schema.

Do not mechanically translate it into persistent storage design.

---

# 8. Technical Context

---

## `docs/ARCHITECTURE.md`

Owns durable technical structure.

Load when the task affects:

- system boundaries,
- client/server responsibilities,
- persistence,
- service boundaries,
- external providers,
- storage,
- integrations,
- deployment architecture,
- infrastructure.

Architecture should remain durable.

Do not use it as a frequently changing implementation log.

---

## `docs/IMPLEMENTATION.md`

Owns verified current implementation reality.

Load when the task depends on:

- existing routes,
- components,
- services,
- dependencies,
- infrastructure,
- verified behavior,
- known implementation limits.

Then inspect actual source.

Repository reality remains authoritative.

---

# 9. Roadmap and Decisions

---

## `docs/TASKS.md`

Owns:

- task IDs,
- statuses,
- dependencies,
- milestone sequencing,
- roadmap state.

Use it when task sequencing or status matters.

A listed task is not execution authorization.

---

## `docs/DECISIONS.md`

Owns accepted durable decisions.

Load when:

- a task may conflict with an established decision,
- a major architecture/provider/security choice is involved,
- implementation may reopen settled ground.

Do not load it for every trivial task if no durable decision is relevant.

---

# 10. Security Context

Security context should expand only when the task touches a meaningful security
boundary.

---

## `docs/SECURITY_REQUIREMENTS.md`

Owns mandatory application-security behavior.

Load when the task touches:

- authentication,
- authorization,
- server trust boundaries,
- persistence,
- APIs,
- user input,
- private resources,
- secrets,
- sessions,
- redirects,
- uploads,
- webhooks,
- billing,
- external integrations,
- administrative actions,
- public write endpoints,
- AI actions,
- security logging.

This document defines:

> what secure behavior the application must provide.

---

## `docs/DATA_PRIVACY.md`

Owns accepted handling of user-related data.

Load when a task:

- collects,
- stores,
- transmits,
- exposes,
- logs,
- deletes,
- exports,
- retains,
- or processes personal/private data.

Examples for School Dashboard may eventually include:

- account identity,
- Course data,
- Assignments,
- schedules,
- notes,
- uploaded materials,
- usage information.

This document defines:

> what data exists and how it may be handled.

---

## `docs/THREAT_MODEL.md`

Owns:

- protected assets,
- actors,
- trust boundaries,
- major attack surfaces,
- important abuse cases,
- system-specific security assumptions.

Load when:

- task is R3/R4,
- attack surface changes,
- new actor is introduced,
- trust boundary changes,
- new provider is added,
- public endpoint is added,
- private storage is added,
- authorization changes,
- AI gains meaningful capabilities.

This document defines:

> what could attack the system and what must be protected.

---

## `docs/SECURITY_TESTING.md`

Owns approved defensive/adversarial testing.

Load mainly during Verify when security-sensitive behavior is affected.

It should contain reusable attack cases such as:

- cross-user resource access,
- identifier manipulation,
- unauthenticated access,
- malformed input,
- unsafe redirect attempts,
- upload abuse,
- webhook forgery,
- sensitive error leakage,
- rate-limit abuse,
- AI prompt-injection scenarios.

This document defines:

> how we safely try to break our own system.

It does not authorize testing unrelated third-party systems.

---

# 11. Security Foundation Transition

The repository is transitioning from a static read-only prototype into a future
multi-user application.

Before beginning security-sensitive product milestones, the repository should
have accepted versions of:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`

and the updated:

- Plan stage,
- Build stage,
- Verify stage,
- Release stage.

CI/testing/security enforcement should also be introduced before real
multi-user production usage.

Do not bypass an incomplete security foundation merely because a roadmap task
is ready conceptually.

---

# 12. Security Escalation

If work reveals a new security-sensitive boundary:

1. stop the affected path;
2. reassess risk;
3. load newly relevant security context;
4. return to Plan if needed.

Examples:

UI  
→ unexpectedly needs public API

Course feature  
→ unexpectedly needs private uploads

analytics  
→ unexpectedly stores identifiable user activity

integration  
→ unexpectedly requires OAuth

Do not continue using stale context.

---

# 13. Data Context

When persistent data becomes part of the application, distinguish:

- product concepts,
- storage representation,
- ownership,
- authorization,
- privacy classification,
- provenance.

Do not infer production data architecture solely from:

- TypeScript mock types,
- static fixture structure,
- current UI component props.

The prototype is evidence.

It is not a locked database design.

---

# 14. Multi-User Context

Any task introducing multiple users or organizations should normally load:

- active product specification,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- Implementation,
- relevant Decisions.

Plan must establish resource ownership.

Verify must establish tenant isolation.

Client filtering is not authorization.

---

# 15. Upload / Private File Context

Any task introducing uploads/private files should normally be treated as at
least R3.

Load:

- product specification,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- relevant storage/provider context.

Verify additionally loads:

- Security Testing.

Do not commit real private user files into Git as development fixtures.

---

# 16. Authentication Context

Authentication tasks should normally load:

- active product requirements,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- Decisions,
- Implementation.

Verify should additionally load:

- Security Testing.

Authentication does not automatically define authorization.

Plan must treat them separately.

---

# 17. API Context

For API/server-action work, load relevant:

- product behavior,
- Architecture,
- Security Requirements,
- Data Privacy if user data flows through it,
- Implementation.

For public or protected write endpoints also consider:

- Threat Model,
- Security Testing.

---

# 18. External Integration Context

When adding a third-party integration:

load relevant:

- product requirements,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- provider documentation where needed.

Plan should determine:

- data transferred,
- credentials,
- trust boundary,
- failure behavior,
- cost,
- privacy impact.

---

# 19. AI Context

When introducing model/AI features, load:

- accepted AI/product requirements,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- Implementation.

Consider:

- data leaving the system,
- source grounding,
- prompt injection,
- tool permissions,
- authorization,
- human approval boundaries,
- usage/cost limits.

Verify should load Security Testing for meaningful AI attack scenarios.

---

# 20. Billing Context

When payments/subscriptions eventually become relevant, load:

- product requirements,
- Architecture,
- Security Requirements,
- Data Privacy,
- Threat Model,
- Implementation,
- relevant durable decisions.

Billing tasks will normally be at least R3.

Consider:

- webhook authenticity,
- entitlement state,
- idempotency,
- duplicate events,
- authorization,
- failure handling.

Do not introduce payments merely because usage tracking exists.

---

# 21. Git Context

When task safety depends on repository state, inspect live Git state.

Relevant information may include:

- branch,
- upstream,
- status,
- staged diff,
- unstaged diff,
- recent history,
- ahead/behind relationship,
- divergence,
- conflicts,
- untracked files.

Do not rely on old artifacts for current Git truth.

---

# 22. Task Artifact Context

Historical Plan/Build/Verify/Release artifacts are not default context.

Load an artifact when:

- it belongs to the active task,
- recovering interrupted work,
- investigating a regression,
- tracing an earlier requirement,
- auditing earlier evidence.

Do not read every historical task artifact.

---

# 23. Interrupted Task Recovery

When resuming an interrupted task, inspect:

1. Git state;
2. current task status;
3. active Plan artifact;
4. Build state;
5. Verify artifact if present;
6. Release artifact if deployment had begun;
7. current implementation.

Determine the last trustworthy completed stage.

Resume from repository evidence.

Do not restart automatically.

---

# 24. Release Context

Release/deployment is intentionally separate.

When deployment is explicitly authorized load:

- `icm/04_release/CONTEXT.md`,
- current Verify result,
- relevant implementation state,
- Architecture,
- Security Requirements,
- relevant configuration/deployment documentation.

When persistence/configuration is affected also load appropriate migration/data
context.

Do not load Release instructions during ordinary local Build unless deployment
impact itself needs planning.

---

# 25. Environment Context

Environment-sensitive conclusions require environment identity.

Distinguish:

- local,
- test,
- preview,
- staging,
- production.

Do not assume behavior observed in one proves another.

For environment-specific work inspect relevant:

- config,
- services,
- secrets presence,
- deployment/version identity.

Never expose secret values unnecessarily.

For execution or verification infrastructure readiness, use
`icm/01_plan/CONTEXT.md` to identify task-specific dependencies and
`icm/02_build/CONTEXT.md` to consume and recheck their evidence. Use Git and
the relevant environment configuration for exact target identity.

---

# 26. External Research

Do not perform external research automatically for every task.

Use it when needed for:

- current provider documentation,
- dependency evaluation,
- integration requirements,
- security standards,
- current framework behavior,
- current platform capabilities.

Plan may also need product strategy or conditional business, legal, and
financial research when a material task choice depends on it. Start with
accepted product direction and repository reality, then use authoritative
external sources for the unresolved question. Route decision briefs and
source/evidence distinctions to `icm/01_plan/CONTEXT.md`.

External information may inform planning.

It does not silently override accepted project requirements.

---

# 27. Source Material

Raw Course/student materials are not ordinary engineering context.

Examples:

- textbooks,
- Canvas exports,
- lecture PDFs,
- student notes,
- instructor documents.

Load only when the active feature genuinely requires their content.

Do not commit raw private/copyrighted source material into the application
repository simply to provide context.

Future ingestion architecture should control storage and access.

---

# 28. Real User Data

Prefer:

- fictional,
- synthetic,
- sanitized,
- isolated test data.

Do not use real user data when representative test data is sufficient.

Do not copy production data into:

- source,
- committed fixtures,
- ICM artifacts,
- screenshots,
- logs.

If real user data is genuinely required for authorized troubleshooting, follow
the privacy/security policy.

---

# 29. Dependency Context

When adding or upgrading a meaningful dependency, inspect:

- current dependencies,
- existing platform capabilities,
- reason dependency is required,
- maintenance/security implications,
- lockfile impact.

Security-sensitive dependencies may also require:

- Security Requirements,
- Threat Model,
- dependency-security tooling.

Do not introduce packages incidentally.

---

# 30. Context Packs

The following examples show intended routing behavior.

They are examples, not rigid checklists.

---

## Simple styling task

Example:

> adjust Dashboard spacing

Load approximately:

```text
AGENTS
CONTEXT
active stage
UI_SPEC
relevant source
```

Do not load:

- Threat Model,
- Data Privacy,
- Security Testing,
- all historical artifacts.

---

## Persistent Course creation

Example:

> let authenticated users create Courses

Load approximately:

```text
AGENTS
CONTEXT
Plan
product specification
ARCHITECTURE
SECURITY_REQUIREMENTS
DATA_PRIVACY
THREAT_MODEL
IMPLEMENTATION
relevant source
```

Verify additionally loads:

```text
SECURITY_TESTING
```

---

## Private syllabus upload

Load approximately:

```text
product specification
ARCHITECTURE
SECURITY_REQUIREMENTS
DATA_PRIVACY
THREAT_MODEL
storage context
active stage
```

Verify additionally loads:

```text
SECURITY_TESTING
```

Risk should be at least R3.

---

## Authentication

Load approximately:

```text
product requirements
ARCHITECTURE
SECURITY_REQUIREMENTS
DATA_PRIVACY
THREAT_MODEL
DECISIONS
IMPLEMENTATION
Plan
```

Verify adds:

```text
SECURITY_TESTING
```

---

## Deployment

Load approximately:

```text
AGENTS
CONTEXT
Release
Verify artifact
IMPLEMENTATION
ARCHITECTURE
SECURITY_REQUIREMENTS
deployment/config context
```

Add migration/data context when applicable.

---

# 31. Do Not Duplicate Context

Do not paste large durable documents into task artifacts.

Instead reference them and record only:

- relevant requirement,
- decision,
- risk,
- acceptance criterion,
- implementation-specific conclusion.

The repository itself is the shared memory.

---

# 32. Context Freshness

Before relying on a durable document, consider whether the information should be
current-state or durable-policy information.

Use:

`IMPLEMENTATION.md`

for verified changing implementation state.

Use:

`TASKS.md`

for changing roadmap/task state.

Use Git/source for actual repository state.

Use architecture/security/product docs for durable contracts.

Do not place changing task snapshots inside this router.

---

# 33. Source-of-Truth Conflicts

When relevant documents disagree:

1. identify the conflict;
2. determine which document owns the disputed responsibility;
3. prefer repository reality for current implementation facts;
4. prefer accepted product/security/privacy documents for required behavior;
5. stop when the contradiction materially prevents safe implementation.

Do not silently choose whichever statement makes Build easier.

---

# 34. Missing Durable Context

If a task requires a policy/decision that does not exist:

do not invent it inside code.

Examples:

- retention period,
- deletion policy,
- ownership rule,
- broad authorization model,
- sensitive data handling,
- provider choice with major consequences.

Return to Plan/human review when material.

---

# 35. Efficiency Rule

Context depth should roughly follow:

```text
low risk
→ minimal context

moderate risk
→ product + architecture + relevant security

high risk
→ product + architecture + security + privacy + threat model

security verification
→ add adversarial testing

production release
→ add operational/release context
```

Do not use:

```text
every task
→ every document
```

---

# 36. Context Budget

Agents should optimize for useful context rather than maximum context.

Before loading another large document ask:

> Does this document own information that could materially change my decision?

If no:

do not load it.

If yes:

load the relevant portion where tooling supports targeted reads.

---

# 37. Current Implementation Transition

Milestone 1 produced a static read-only application.

Future milestones may introduce:

- persistence,
- accounts,
- multiple users,
- uploads,
- course ingestion,
- AI,
- integrations,
- deployment.

Do not assume Milestone 1 implementation decisions are automatically correct
for production architecture.

Use what Milestone 1 taught us as evidence.

Re-plan production systems deliberately.

---

# 38. Current ICM Transition

The repository is moving to a secure autonomous ICM.

The active pipeline is intended to become:

```text
Plan
↓
Build
↓
Verify
↓
PASS
↓
repository integration
↓
Release when authorized
```

The new secure foundation includes:

- risk-aware Plan,
- secure Build,
- adversarial Verify,
- controlled Release,
- Security Requirements,
- Data Privacy,
- Threat Model,
- Security Testing,
- automated CI/testing/security enforcement.

Do not begin high-risk production work before the relevant foundation is
accepted.

---

# 39. Reusable ICM Boundary

The generic ICM operating system consists primarily of:

```text
AGENTS.md
CONTEXT.md
icm/01_plan/CONTEXT.md
icm/02_build/CONTEXT.md
icm/03_verify/CONTEXT.md
icm/04_release/CONTEXT.md
```
