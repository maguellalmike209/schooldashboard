# School Dashboard — Tasks

## 1. Purpose

This document is the authoritative source for:

- project task IDs,
- task status,
- task dependencies,
- milestone sequencing,
- execution order.

A task appearing here does not itself authorize execution.

Mike's active instruction remains the execution authority.

The roadmap should make unsafe sequencing difficult.

In particular:

> product capability work must not jump ahead of required security, testing, CI,
> or repository foundations merely because the product feature is conceptually
> ready.

---

# 2. Task Status Model

Use the following task states:

- `Not started`
- `In progress`
- `Ready for verification`
- `Done`
- `Blocked`

Use `Blocked` only when there is a concrete blocker and a defined next action.

A task becomes `Done` only after sufficient Verify evidence.

Where implementation reality changes:

update:

`docs/IMPLEMENTATION.md`

after Verify PASS.

Release/deployment is separate from task completion unless the task explicitly
includes an authorized Release stage.

---

# 3. Task Naming

Use the prefix:

`SD-XXX`

for School Dashboard implementation/process tasks.

Task IDs remain stable after establishment.

Do not renumber completed tasks merely because roadmap structure later changes.

## Future accepted task metadata

Meaningful new accepted tasks should include a compact `icm-task` JSON block.
The block is the machine-readable accepted definition; its `status` is current
registry state. Required fields are `id`, `accepted`, `result`, `priority`
(positive integer, lower first), `dependencies` (IDs), `scope`, `exclusions`,
`risk`, `acceptance`, `verification`, `status`, and `completion`. The approved
Plan may provide details behind concise fields. `accepted: false` means a
proposal only. Do not convert historical entries merely for formatting.

**Generated work versus authorization:** An agent may write a proposed task as
planning output, but it may not make that task executable merely by assigning a
task ID, changing `accepted`, or moving its status. Current scheduled execution
is limited to the exact task IDs and digests in an independently authenticated
founder grant. Unreviewed subtasks should stay ephemeral beneath accepted tasks
or be visibly `PROPOSED`. A future outcome-delegation writer may execute bounded
generated child tasks only after independently enforced grant semantics and
negative runtime tests are implemented. Do not add new status literals without
updating and verifying the runtime parser. See
`icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md`.

An external Mike-controlled grant must bind the accepted task definition and
name its exact permitted IDs before scheduled selection. Editing this registry
cannot expand that grant. Task status changes do not change the accepted
definition. See `icm/automation/CONTEXT.md` for the separate grant contract.

An authorized batch of many tasks (including 20 or more) can persist across
multiple days and scheduled invocations without reapproval at every daily report,
so long as the grant remains valid and safety/verification/dependency gates pass.
The Manager Review is advisory: no response means no change to an existing valid
grant, **not** approval for further task IDs or a new phase. Proposed next-day
work stays visibly `PROPOSED` until accepted. Use `icm-task` definitions only
for independently accepted tasks; agents may refine implementation steps inside
an approved outcome without manufacturing separate permanent IDs.


---

# 4. Current Project State

Milestone 1 is complete.

Completed tasks:

- SD-001
- SD-002
- SD-003
- SD-004
- SD-005
- SD-006
- SD-007
- SD-008
- SD-009
- SD-010
- SD-011
- SD-012
- SD-013
- SD-014
- SD-015
- SD-016
- SD-018
- SEC-2026-10-NEXTJS

The project has completed the:

> Secure Automation Foundation

The foundation now includes:

- security-aware ICM lifecycle;
- risk-aware Plan / Build / Verify / Release boundaries;
- automated unit/integration testing;
- browser/E2E testing;
- hosted CI;
- dependency auditing;
- Dependabot;
- CodeQL;
- Dependency Review;
- secret scanning and push protection;
- protected PR-based integration to `main`;
- independent foundation closeout verification.

The current product includes the static/read-only Milestone 1 views and the
verified SD-015 authenticated Academic Term/Course slice.

The project has entered:

> Milestone 2 — Persistent Multi-User Foundation

Milestone 2 is the first phase that introduces real authenticated user identity,
persistent private academic data, server-side authorization, and cross-user
isolation.

The milestone must preserve the established Milestone 1 product distinctions
while replacing repository fixture data with authoritative user-owned data.

Provider, schema, authentication, and persistence choices for the first slice
were established through SD-014 rather than inferred from earlier prototype
structures. Later capability still requires its own accepted scope.

The roadmap remains phase-gated.

Later Course Materials, ingestion, AI, adaptive planning, integrations,
production Release, and billing work remain directional until their own phases
are reached.

---

# 5. Milestone 1 — Initial UI With Mock / Hardcoded Data

## Status

`Done`

Milestone 1 established all five required read-only product views using the
shared canonical academic fixture.

| ID | Task | Status | Depends on | Completion target |
| --- | --- | --- | --- | --- |
| SD-001 | Initialize Next.js application | Done | — | Initialize the planned Next.js, React, TypeScript, and Tailwind CSS stack in the existing repository while preserving documentation; verify the scaffold and document actual setup/run/check commands. |
| SD-002 | Dashboard shell and navigation | Done | SD-001 | Establish the Dashboard and navigation supporting Dashboard, Courses, Course Page, Weekly Plan, and Today, with shared mock term/reference-day/week context and source-supported date-only lecture schedule context. Connect course, progress, next-action, study, and deadline summaries as later Milestone 1 tasks land. |
| SD-003 | Courses view and course cards | Done | SD-002 | Build the Courses primary view and reusable Dashboard Course Cards from shared mock Courses; detail navigation is completed with SD-004 and weekly task progress with SD-005. |
| SD-004 | Course Page | Done | SD-003 | Open the correct mock Course with current-week/topic and static material context; handle unknown Courses and connect scoped objectives, tasks, progress, and deadlines as later Milestone 1 tasks land. |
| SD-005 | Weekly Plan | Done | SD-004 | Build Weekly Plan as a primary view with objectives, deliverables, and dated Study Tasks distinguished, including tasks without objectives. Use mock completion states for consistent weekly progress across Dashboard, Courses, Course Page, and Weekly Plan. |
| SD-006 | Today | Done | SD-005 | Build Today as a primary view showing incomplete tasks planned for the reference day in authored order, with supplied duration estimates and Course/objective/Assignment context. Connect the Dashboard daily summary and next study action while preserving the read-only boundary. |
| SD-007 | Upcoming assignments | Done | SD-006 | Integrate upcoming Assignments and deadline context into Dashboard, Course Page, Weekly Plan, and linked Today tasks. Verify all five views against the canonical academic fixture and Milestone 1 invariants. |

SD-001 established the application foundation.

SD-002 established the shared shell and routes.

SD-003 established shared Course Cards.

SD-004 established Course Page context.

SD-005 established Weekly Plan and shared progress.

SD-006 established Today and Dashboard next-action behavior.

SD-007 established upcoming deadline context and completed Milestone 1
integration.

No further Milestone 1 product task is planned.

---

# 6. Secure Automation Foundation

## Purpose

Before School Dashboard begins storing private real-user data, the project must
upgrade from a prototype development workflow into a security-aware autonomous
engineering system.

The foundation should establish:

```text
durable policy
↓
risk-aware planning
↓
secure implementation
↓
independent verification
↓
automated tests
↓
CI/security enforcement
↓
controlled repository integration
↓
separate authorized release
```

The goal is not maximum process.

The goal is:

> make routine work highly autonomous while making dangerous mistakes difficult
> to introduce silently.

---

## Foundation Tasks

| ID | Task | Status | Depends on | Completion target |
| --- | --- | --- | --- | --- |
| SD-008 | Secure ICM v2 and security policy foundation | Done | SD-007 | Establish the durable four-stage Plan → Build → Verify → Release operating model; risk tiers; progressive context routing; security requirements; privacy requirements; threat model; adversarial security-testing playbook; durable decisions; and roadmap sequencing. Perform a consistency review before completion. |
| SD-009 | Automated testing foundation | Done | SD-008 | Establish the minimum useful automated testing architecture for the current application and upcoming secure development. Select appropriate test tooling during Plan rather than preselecting it here. Provide repeatable unit/invariant, integration, and browser/E2E capability proportional to actual needs. Preserve the ability to add authorization/security regression tests as multi-user features arrive. |
| SD-010 | Continuous integration baseline | Done | SD-009 | Add CI that runs the project's required repeatable checks on repository changes. Initial baseline should include locked dependency installation, lint, typecheck, automated tests, and production build. CI must fail meaningfully when required checks fail rather than becoming ceremonial. |
| SD-011 | Security and supply-chain automation | Done | SD-010 | Introduce appropriate automated repository security controls such as secret detection, dependency/security scanning, and code/security analysis where supported and useful. Avoid redundant tooling and evaluate actual findings rather than suppressing them for green status. |
| SD-012 | Protected Git / PR workflow | Done | SD-011 | Establish the practical task-branch → Verify → PR → CI → merge workflow and enable appropriate GitHub repository protections/rules supported by the account/repository. Required checks and safe main-branch behavior should match the accepted ICM. Do not claim unavailable protections are enabled. |
| SD-013 | Secure Automation Foundation audit | Done | SD-012 | Perform an end-to-end consistency and adversarial audit of AGENTS, root CONTEXT, all four ICM stages, security/privacy/threat/testing documents, task/decision ownership, tests, CI, security tooling, and Git workflow. Remove contradictions, close material gaps, confirm automation boundaries, and record final evidence that the foundation is ready for security-sensitive product work. |

---

# 7. SD-008 — Secure ICM v2 and Security Policy Foundation

## Status

`Done`

## Objective

Replace the earlier lightweight task workflow with a durable security-first
autonomous engineering system before introducing real private user data.

## Expected durable structure

### Generic ICM core

- `AGENTS.md`
- root `CONTEXT.md`
- `icm/01_plan/CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- `icm/03_verify/CONTEXT.md`
- `icm/04_release/CONTEXT.md`

### School Dashboard security profile

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`

### Supporting durable state

- `docs/DECISIONS.md`
- `docs/TASKS.md`
- `docs/IMPLEMENTATION.md`
- existing product/architecture specifications

## Required outcomes

SD-008 should establish all of the following:

- delivery-first agent behavior,
- progressive context loading,
- R0–R4 risk classification,
- autonomous routine implementation,
- explicit material-human-decision boundaries,
- Plan as execution/security contract,
- Build as secure executor,
- Verify as independent adversarial gate,
- Release as a separate production-control stage,
- security requirement IDs,
- privacy classification,
- practical threat modeling,
- reusable security attack-test IDs,
- safe Git behavior,
- explicit production authorization boundaries,
- durable-document ownership,
- project-specific security profile separated from reusable ICM core.

## Completion condition

SD-008 is not complete merely because the documents exist.

Before marking Done:

1. inspect the complete document set together;
2. identify contradictions or duplicated ownership;
3. verify stage transitions agree;
4. verify status terminology agrees;
5. verify Git behavior agrees;
6. verify security IDs and routing agree;
7. verify Release remains separately authorized;
8. verify product-specific rules did not leak unnecessarily into reusable ICM;
9. verify no future provider/architecture choice was accidentally treated as accepted;
10. run a final documentation consistency review.

Only then should SD-008 receive Verify PASS and be finalized.

---

# 8. SD-009 — Automated Testing Foundation

## Status

`Done`

## Objective

Create automated evidence so later agents do not depend primarily on manual
inspection.

## Expected capability

The task should determine the smallest appropriate framework/tooling during
Plan.

The resulting system should support the project's likely testing layers:

```text
unit / invariant
↓
integration
↓
browser / E2E
↓
security regression
```

Not every task must use every layer.

## Initial priorities

Automate high-value existing Milestone 1 invariants where appropriate.

Examples may include:

- canonical fixture relationships,
- authored ordering,
- Today filtering,
- progress calculations,
- upcoming Assignment ordering,
- cross-view consistency.

Browser/E2E capability should support future:

- authentication,
- navigation,
- multi-user isolation,
- upload workflows.

## Security direction

The testing foundation must be capable of eventually representing attack cases
from:

`docs/SECURITY_TESTING.md`

such as:

- User A own resource → allow,
- User A foreign resource → deny,
- anonymous protected resource → deny.

Do not create fake security tests for features that do not yet exist.

---

# 9. SD-010 — Continuous Integration Baseline

## Status

`Done`

## Objective

Move important verification from agent memory into machine enforcement.

## Initial CI baseline

The Plan should confirm exact commands, but expected categories are:

```text
locked dependency install
↓
lint
↓
typecheck
↓
automated tests
↓
production build
```

## Required properties

CI should:

- run against the intended repository change,
- fail when a required check fails,
- be reproducible,
- avoid printing secrets,
- avoid silently skipping required checks,
- provide useful failure evidence.

CI should become part of later Verify evidence.

---

# 10. SD-011 — Security and Supply-Chain Automation

## Status

`Done`

## Objective

Back security instructions with automated detection where practical.

Potential controls to evaluate during Plan include:

- secret scanning,
- dependency vulnerability scanning,
- dependency update/security automation,
- static/code security scanning,
- dependency review,
- repository security alerts.

Use only controls supported by the current repository/account and justified by
the project.

Do not add multiple overlapping scanners without a reason.

Do not silence real findings merely to make CI green.

---

# 11. SD-012 — Protected Git / PR Workflow

## Status

`Done`

## Objective

Establish and exercise the practical protected repository workflow before
security-sensitive multi-user development begins.

Target workflow:

```text
authorized task
↓
task branch
↓
Plan
↓
Build
↓
Verify
↓
push task branch
↓
pull request
↓
required CI/security checks
↓
merge
↓
Release only when separately authorized
```

---

# 12. SD-013 — Secure Automation Foundation Audit

## Status

`Done`

## Objective

Independently audit SD-008 through SD-012 as one complete engineering system
before trusting the foundation with private multi-user product development.

The audit should answer:

> Does the Secure Automation Foundation actually enforce the behavior its
> documents describe, and is there sufficient evidence to rely on it for the
> next security-sensitive phase?

SD-013 is primarily a closeout and verification task.

It should not manufacture new implementation work simply to justify the task.

When a genuine material gap is discovered:

- identify it precisely;
- repair it only when scope and accepted behavior are already clear;
- otherwise return to Plan or human review;
- rerun the affected verification afterward.

## Audit Model

Trace important controls through:

```text
accepted requirement
↓
identified threat / failure mode
↓
implementation or repository control
↓
test / adversarial verification
↓
observable evidence
```

---

# 13. Gate Before Persistent Multi-User Product Work

The Secure Automation Foundation gate has been satisfied.

The following tasks are Done:

- SD-008
- SD-009
- SD-010
- SD-011
- SD-012
- SD-013

Their completion permits the project to begin separately authorized
security-sensitive multi-user development.

It does NOT mean multi-user runtime security already exists.

Milestone 2 activates previously dormant requirements involving:

- authentication;
- server-trusted user identity;
- persistence;
- private user-owned academic data;
- server-side authorization;
- tenant/user isolation;
- runtime input validation;
- privacy-aware data handling;
- cross-user negative security tests.

Each Milestone 2 task must implement and verify the requirements relevant to the
capability it actually introduces.

Security documentation alone is not evidence that runtime protection exists.

The project must not jump directly from foundation completion to storing private
data without an accepted Milestone 2 architecture and security Plan.

---

# 13A. SD-014 — Persistent Multi-User Architecture and Provider Selection

## Status

Done. Architecture/decision documentation only; no private-data runtime.

## Completion condition

Accept the Auth/PostgreSQL provider strategy, trusted server and RLS boundaries,
validation/migration/secrets approach, cost/privacy/lock-in review, and a
falsifiable SD-015 vertical-slice contract. Independent Verify must PASS before
Done; required hosted checks and protected PR merge finalize the task.

---

# 13B. SD-015 — Authenticated Academic Term and Course Vertical Slice

## Status

Done. Local R3 Verify PASS established migration replay, 40 PostgreSQL/RLS
assertions, and real two-user Auth/application attacks. Required hosted checks
and protected PR merge govern repository integration.

## Required proof

Implement only the accepted User → Academic Term → Course slice. Reproduce the
schema from committed migrations; prove sign-in/logout, server-trusted
identity, own Course CRUD, cross-user and anonymous denial, owner-spoof denial,
collection isolation, input/relationship validation, and no privileged-key or
token exposure. The full test matrix is in the SD-014 Plan and D-065. Any
cross-user isolation failure is FAIL.

---

# 13C. SD-016 — Secure Autonomy Upgrade

## Status

Done. Independent Verify passed the bounded ICM documentation upgrade; final
hosted CI/Security checks passed, and protected PR #12 merged at `fb134c5`.

## Objective and scope

Improve the existing Plan, Build, Verify, root context routing, and minimal
global guidance for task-grounded research, execution readiness, independent
evidence, and reusable learning. Inspect Release for compatibility and edit it
only for a concrete gap. This process task depends on the SD-015 verified PR #10
merge and does not authorize the next product phase.

## Acceptance and boundaries

The changed documents must assign clear ownership and triggers for each new
capability, preserve existing risk, approval, security, Git, batch, repair, and
Release boundaries, and form one coherent task-scoped diff. No application code,
tests, infrastructure, security requirements, product specifications, or
accepted decisions change. Scoped Build checks prepare the diff; only fresh
independent Verify and protected integration may complete this task.

---

# 13D. SEC-2026-10-NEXTJS — Next.js Security Maintenance

## Status

Done. Independent technical Verify and final-head hosted CI/Security checks
passed; protected PR #16 merged into canonical `main` at `2f4d25c`. This
separate task did not change SD-016's accepted documentation-only scope.

## Completion condition

Patch `next` and matching `eslint-config-next` to 16.3.8 with a reviewed
lockfile; preserve the approved narrow audit exception; independently verify
the dependency and authenticated regression checks; pass required hosted CI
and Security checks; merge through the protected PR workflow. Only then resume
SD-016 PR #12 against patched `main`.

---

# 13E. SD-018 — Scheduled Autonomy Foundation & Manager Mode

## Status

Done. Independent Verify passed after five adversarial findings were repaired.
Required verify, CodeQL, and Dependency Review checks passed on PR #18 head
`ca3c6b2`; protected PR #18 merged into canonical `main` at `16cfb7e`.
No unattended writer, live schedule, or Release was enabled. SD-017 remains
Product & Business Assurance and is outside this task.

```icm-task
{"id":"SD-018","accepted":true,"result":"Read-only recovery-first ICM inspection and daily Manager Review foundation","priority":1,"dependencies":["SD-016"],"scope":"Automation contract, deterministic inspection, synthetic grant/recovery validation, reporting, adversarial tests, read-only pilot","exclusions":["Unattended repository writing","live recurring schedule","Release","application behavior","ReviewTap"],"risk":"R3","acceptance":["24 adversarial scenarios pass","Real read-only pilot produces evidence-based report","Unattended writer remains disabled","Independent Verify passes","Protected PR checks pass"],"verification":["Independent code and scenario challenge","Scoped tests and repository diff review","Hosted CI and protected integration"],"status":"Done","completion":"Independent PASS and protected PR integration with no unattended writer enabled"}
```

---

# 13F. SD-017 — Product & Business Assurance ICM

## Status

Done. Independent local Verify passed, hosted `verify`, CodeQL, and Dependency
Review passed on PR #20 head `7a2ecef`, and protected PR #20 merged into
canonical `main` at `6812e71`. This process task did not authorize product
features, a scheduled writer, or Release.

```icm-task
{"id":"SD-017","accepted":true,"result":"Conditional Product & Business Assurance procedure and SchoolDashboard evidence register integrated into ICM","priority":1,"dependencies":["SD-016","SD-018"],"scope":"Review supplied assurance baseline, integrate two documents, add minimal routing, independently verify scenarios and protected checks","exclusions":["Application features","ReviewTap changes","scheduled writer or live schedule","payments or providers","production Release","new roadmap tasks"],"risk":"R0","acceptance":["Conditional assurance covers product, commercial, legal, pilot, operations, and retirement decisions","Facts, assumptions, proposals, decisions, authorization, and unknowns stay distinct","SD-018 controls and separate Release authority remain intact","Independent Verify passes","Protected PR checks pass and canonical main contains SD-017"],"verification":["Adoption matrix scenario challenge and full diff review","Relevant repository checks","Hosted CI and Security checks on final PR head","Post-merge main confirmation"],"status":"Done","completion":"Independent PASS; hosted verify, CodeQL, and Dependency Review passed on PR #20 head 7a2ecef; protected merge 6812e71 confirmed on canonical main"}
```

---

# 13G. SD-019 — Founder Steering ICM Integration

## Status

Done. Local independent Verify passed the packet and policy checks. Required
`verify`, CodeQL, and Dependency Review passed on PR #23 head `35ab3fb`;
protected PR #23 merged into canonical `main` at `7a68da2`. Scheduled writing
and Release remain disabled.

```icm-task
{"id":"SD-019","accepted":true,"result":"Founder steering and bounded outcome delegation policy integrated into the four-stage ICM","priority":1,"dependencies":["SD-017","SD-018"],"scope":"Integrate the supplied founder steering packet into its owning ICM documents, independently verify policy boundaries, and use protected PR integration","exclusions":["Unattended writer or grant changes","live schedule","application functionality","production Release","new product milestone"],"risk":"R0","acceptance":["Every packet provision is placed in its owning document","Current exact-task scheduled grant and foreground batch boundaries remain distinct","Independent Verify passes the required policy scenarios and applicable checks","Required hosted PR checks pass on the final head and canonical main contains SD-019"],"verification":["Packet-to-diff and audit-scenario challenge","Documentation consistency and applicable repository checks","Hosted verify, CodeQL, and Dependency Review on exact PR head","Post-merge canonical main confirmation"],"status":"Done","completion":"Independent PASS; hosted verify, CodeQL, and Dependency Review passed on PR #23 head 35ab3fb; protected merge 7a68da2 confirmed on canonical main"}
```

---

# 13H. SD-020 — Disabled Trusted Autonomous Engineering Foundation

## Status

In progress. The 2026-10-09 founder packet authorizes one R3 foreground process task for a disabled foundation. No unattended writer, live grant or schedule is authorized. Protected PR integration and hosted checks are required before Done.

```icm-task
{"id":"SD-020","accepted":true,"result":"Disabled, independently testable fixed-task trusted engineering foundation and Windows/GitHub installation runbook","priority":1,"dependencies":["SD-018","SD-019"],"scope":"Implement protected-grant binding, exclusive broker lock and journal, recovery-first exact-task policy, disabled Codex worker adapter, read-only GitHub reconciliation, adversarial tests and protected PR integration","exclusions":["Live unattended writer","active schedule or real founder grant","privileged Windows installation","GitHub credential or rule changes","automatic merge or Release","dynamic executable child tasks","product features"],"risk":"R3","acceptance":["Disabled foundation fails closed on untrusted grant, identity, budget, lock, recovery and stale GitHub evidence","Packet T01–T22 have truthful applicable test and host-proof results","Existing inspect/report semantics and automation tests remain intact","Manual Windows and GitHub installation runbook states G1–G8 proof and no activation","Independent Verify and protected exact-head PR/CI integration pass"],"verification":["Adversarial unit and independent-process fixture tests","Independent source/diff and legacy regression review","Applicable lint, typecheck, unit and build checks","Hosted verify, CodeQL and Dependency Review on exact PR head; post-merge main confirmation"],"status":"In progress","completion":"Local adversarial Verify passed; protected PR review/merge pending; no unattended writer enabled"}
```

---

# 14. Future Capability Roadmap — Direction Only

The following milestone-level descriptions are non-authorizing product
direction.

Their:

- detailed scope,
- internal task order,
- providers,
- infrastructure,
- implementation technologies,
- delivery dates

require later planning and acceptance.

Do not create implementation task IDs or scaffolding for these capabilities
until that work is explicitly scoped and authorized.

`docs/PRODUCT_VISION.md` remains the main long-term product-direction source.

---

## Milestone 2 — Persistent Multi-User Foundation

Possible capabilities:

- authentication,
- user accounts,
- authoritative user identity,
- private user-owned academic data,
- real academic terms,
- Course creation/editing,
- persisted Assignments,
- persisted Learning Objectives,
- persisted Study Tasks,
- progress/completion persistence,
- server-side authorization,
- cross-user isolation,
- validation,
- basic user-controlled CRUD.

This roadmap entry did not select providers. SD-014 records the accepted
Milestone 2 Auth/PostgreSQL architecture; SD-015's Term/Course slice passed
security Verify and is integrated only through the protected PR workflow.

Before real beta users store private data, the accepted security/privacy
requirements must be satisfied.

---

## Milestone 3 — Course Materials and Secure Ingestion

Possible capabilities:

- Course onboarding,
- private material upload,
- secure object storage,
- material linking,
- syllabus ingestion,
- document text extraction,
- academic-information extraction,
- provenance,
- user review of uncertain extracted information,
- deletion/retention behavior.

Uploads and ingestion should be treated as security-sensitive functionality.

---

## Milestone 4 — Course Intelligence

Possible capabilities:

- grounded Course understanding,
- source reconciliation,
- supplemental university/course enrichment,
- uncertainty preservation,
- Course roadmap generation,
- student review of extracted/generated Course structure.

Current-course authoritative sources should continue to outrank generic or
historical enrichment.

---

## Milestone 5 — Planning Engine

Possible capabilities:

- weekly objective suggestions,
- Assignment decomposition,
- Study Task generation,
- duration suggestions,
- availability-aware planning,
- daily scheduling,
- plan approval.

Generated plans remain advisory until accepted by the student.

---

## Milestone 6 — Adaptive Planning

Possible capabilities:

- use completion state,
- detect missed planned work,
- understand remaining work,
- propose plan revisions,
- reschedule through student approval.

Adaptive behavior should modify accepted plans only through the accepted
human-control model.

---

## Milestone 7 — Integrations

Possible capabilities:

- Google Calendar,
- Google Drive,
- Course schedule synchronization,
- calendar-aware planning,
- selective external-content ingestion.

External providers/scopes must be selected through explicit architecture,
privacy, and security planning.

---

## Later — Production Hardening and Broader Beta

Possible capabilities:

- stronger monitoring,
- operational alerting,
- performance tuning,
- mature recovery procedures,
- broader beta readiness,
- public product readiness.

The exact milestone number should be assigned when this work is scoped.

---

## Later — Billing / Monetization

Billing is intentionally not an early milestone.

The product may initially remain free for friends/beta users.

Before deciding whether to charge users, the project should understand actual
marginal operating cost such as:

- AI usage,
- storage,
- database usage,
- external APIs,
- infrastructure.

If AI/cost-bearing operations are introduced earlier, usage accounting may be
implemented before billing.

Possible future billing capabilities:

- subscription provider integration,
- trusted entitlement state,
- webhook verification,
- usage limits,
- plan controls.

Billing does not change the privacy ownership of user academic data.

---

# 15. AI Cost / Usage Direction

When AI functionality is introduced, the architecture should be capable of
recording useful per-user operational information such as:

- operation type,
- model/provider,
- input usage,
- output usage,
- estimated cost,
- timestamp.

Do not store complete private prompts merely for cost accounting when usage
metadata is sufficient.

Actual pricing, quotas, free-tier limits, and subscription tiers remain future
product decisions.

---

# 16. Real User Boundary

Before friends or other beta users rely on School Dashboard:

treat them as real users.

Free access does not reduce the importance of:

- authentication,
- authorization,
- tenant isolation,
- privacy,
- deletion,
- secure uploads,
- safe AI handling,
- CI,
- security verification.

A beta user must not become a substitute for a test fixture.

---

# 17. Roadmap Authorization Rule

The following are not authorization:

- a task listed here,
- a milestone listed here,
- a feature mentioned in Product Vision,
- a future architecture possibility,
- an old Plan artifact.

Execution begins only when Mike authorizes the specific task or bounded batch.

Agents should not continue from:

`SD-XXX Done`

directly into:

`SD-(XXX+1)`

unless the active instruction authorizes that continuation.

---

# 18. Roadmap Maintenance

Update this document when:

- task status changes,
- a task is accepted,
- sequencing changes,
- a milestone is completed,
- a new task is deliberately established,
- a concrete blocker changes execution order.

Do not use this document for:

- detailed implementation notes,
- temporary debugging state,
- extensive security requirements,
- architecture prose.

Those responsibilities belong to their owning documents.

---

# 19. Current Next Task

SD-014, SD-015, SD-016, SD-017, SD-018, SD-019, and SEC-2026-10-NEXTJS are Done.
Later milestone capabilities remain directional and require separate authorization. No next product
implementation task is started here.

---

# 20. Final Principle

The roadmap should answer:

> What is complete?

> What is currently authorized/in progress?

> What must happen next?

> What dependencies prevent unsafe work from starting too early?

The intended progression is:

```text
Milestone 1 product prototype
↓
Secure Automation Foundation
↓
Persistent multi-user foundation
↓
secure Course materials
↓
Course intelligence
↓
AI planning
↓
adaptive behavior
↓
integrations
↓
production hardening
↓
optional monetization
```

Product progress should increase capability only as quickly as the engineering
system can verify and protect it.
