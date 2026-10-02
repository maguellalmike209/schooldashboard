# School Dashboard — Current Implementation

## 1. Purpose

This document records verified current implementation reality.

It answers:

> What actually exists in the repository and application right now?

This document should describe:

- implemented application behavior,
- verified routes,
- verified data behavior,
- current dependencies,
- current development commands,
- current infrastructure,
- current testing/CI capabilities,
- known implementation limitations.

It should NOT describe future roadmap capability as though it already exists.

Use:

- `docs/TASKS.md` for roadmap and task status,
- `docs/ARCHITECTURE.md` for durable technical structure,
- `docs/DECISIONS.md` for durable accepted decisions,
- `docs/SECURITY_REQUIREMENTS.md` for required future/current security properties,
- `docs/DATA_PRIVACY.md` for privacy requirements.

Repository source and Git remain authoritative for actual repository reality.

---

# 2. Current Milestone State

## Milestone 1

`Done`

SD-001 through SD-007 established and verified the complete static read-only
Milestone 1 product.

The application currently provides five primary product views:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Milestone 1 is intentionally based on static mock/hardcoded academic data.

---

## Secure Automation Foundation

`In progress`

SD-008 established and verified the project's security-first autonomous
engineering documentation foundation.

SD-009 through SD-012 then established automated tests, hosted CI, security
automation, and the protected PR workflow. SD-013 is auditing their combined
effect before the foundation is marked complete.

This work concerns:

- agent behavior,
- context routing,
- Plan / Build / Verify / Release responsibilities,
- risk classification,
- security requirements,
- privacy requirements,
- threat modeling,
- adversarial security testing,
- durable decisions,
- roadmap sequencing.

These foundation tasks do not mean the application runtime currently has:

- authentication,
- authorization,
- tenant isolation,
- persistence,
- uploads,
- production deployment controls.

Those capabilities must be implemented and verified separately.

Documentation describing a security control is not evidence that the runtime
control exists.

---

# 3. Application Stack

The verified direct framework/application versions are:

| Technology | Verified version |
| --- | --- |
| Next.js | 16.3.6 |
| React | 19.3.0 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.3 |

The project uses:

- npm,
- `package.json`,
- `package-lock.json`.

No application dependency was added during SD-002 through SD-007.

---

# 4. Application Structure

The App Router lives in:

`src/app/`

The root layout provides:

- School Dashboard identity,
- responsive sidebar/mobile header,
- primary navigation,
- one main content region.

The small client component:

`src/components/primary-navigation.tsx`

uses the pathname to identify the active primary navigation item.

Courses remains active while viewing an individual Course Page.

Global styling lives in:

`src/app/globals.css`

and imports Tailwind CSS.

Root configuration currently includes:

- TypeScript,
- ESLint,
- PostCSS.

`next.config.ts` disables Next.js agent-rule generation so development commands
preserve the repository's existing root `AGENTS.md`.

---

# 5. Implemented Routes

The verified routes are:

| Route | View |
| --- | --- |
| `/` | Dashboard |
| `/courses` | Courses |
| `/courses/[courseId]` | Course Page |
| `/weekly-plan` | Weekly Plan |
| `/today` | Today |

Dashboard is the root view.

Course Page is reached through Course selection and is not a top-level primary
navigation item.

Known Course IDs render their matching Course context.

Unknown Course IDs return a clear 404.

---

# 6. Dashboard

Dashboard currently provides static read-only summary context derived from the
shared academic fixture.

It includes:

- Course Cards,
- weekly progress,
- upcoming Assignment context,
- today's Study Tasks,
- Dashboard Next Action.

Dashboard Next Action is derived from the first incomplete Study Task planned
for the fixed reference date in authored order.

Dashboard does not allow mutation.

---

# 7. Courses

The Courses view lists the shared static Courses.

It uses reusable Course Cards.

Dashboard also reuses compact Course Card presentation.

Course cards link to:

`/courses/[courseId]`

The Courses view currently has no:

- Course creation,
- Course editing,
- persistence,
- user-specific Course ownership.

---

# 8. Course Page

Course Page filters the static academic fixture by Course ID.

For the selected Course it may display:

- Course identity,
- current-week context,
- Course material/reference context,
- current-week Learning Objectives,
- Study Tasks,
- progress,
- upcoming Assignments.

PHY 009D includes source-supported current-course context.

WRT 101 and HIS 110 intentionally display explicit missing-context states where
week-topic/material information was not supplied.

Unknown Course IDs return a 404.

No Course Material upload, persistence, or external material retrieval exists.

---

# 9. Weekly Plan

Weekly Plan is a dedicated primary view.

It groups planning context by Course and distinguishes:

- Learning Objectives,
- Assignments / deliverables,
- dated Study Tasks.

The same canonical Study Task records and completion states are used across
Weekly Plan and Course Page.

Weekly Plan is read-only.

It does not generate or mutate a schedule.

---

# 10. Today

Today is a dedicated actionable primary view.

It derives:

> incomplete Study Tasks whose planned date equals the fixed reference date

from the canonical fixture.

Tasks remain in authored order.

Today displays available:

- Course context,
- Learning Objective relationships,
- linked Assignment context,
- supplied duration.

A missing duration remains missing.

The UI does not fabricate an estimate.

Completed reference-date tasks do not appear in Today but remain visible where
appropriate in broader weekly/Course context.

There is currently no automatic carryover behavior.

---

# 11. Canonical Academic Fixture

The canonical static source is:

`src/lib/academic-context.ts`

It currently defines:

- Fall Quarter 2026,
- fixed reference date September 25, 2026,
- academic week September 21–27, 2026.

The Courses are:

- PHY 009D / Modern Physics
- WRT 101 / Academic Writing
- HIS 110 / World History

PHY 009D is the realistic reference Course.

WRT 101 and HIS 110 are lightweight fictional Course contexts used to exercise
the product model.

---

# 12. PHY 009D Reference Context

The shared fixture includes:

- PHY 009D / Modern Physics,
- date-only Lecture #02 on September 25, 2026,
- source-supported Course beginning/current-week context,
- assigned textbook/reference context.

The lecture is Course schedule context.

No supplied lecture:

- time,
- room

exists in the fixture.

The implementation therefore does not invent them.

The lecture is not modeled as a timed Class Meeting.

---

# 13. Learning Objectives

The fixture contains:

3 authored Learning Objectives.

Learning Objectives remain conceptually distinct from:

- Assignments,
- Study Tasks,
- Course Materials,
- meetings.

Study Tasks may reference Learning Objectives.

A Study Task may also exist without an Objective relationship where the fixture
defines that condition.

---

# 14. Assignments

The fixture contains:

3 Assignments.

Current Assignment examples include:

- PHY Problem #1 due September 28, 2026 at 23:59,
- WRT response draft due September 27, 2026,
- HIS Map quiz due September 25, 2026.

The HIS Map quiz is intentionally due on the fixed reference date without a
linked Study Task.

This verifies that:

> Assignment deadline
> does not imply
> Study Task existence.

Assignments are ordered by:

1. due date,
2. authored order for ties.

---

# 15. Study Tasks

The fixture contains:

7 authored Study Tasks.

Current completion state:

| Course | Completed | Total |
| --- | ---: | ---: |
| PHY 009D | 2 | 5 |
| WRT 101 | 1 | 2 |
| HIS 110 | 0 | 0 |
| Overall | 3 | 7 |

Study Tasks contain static:

- planned date,
- authored order,
- completion state,
- optional duration,
- Objective relationships,
- optional Assignment relationship.

The product does not currently mutate Study Tasks.

---

# 16. Assignment / Study Task Separation

Assignment deadlines and Study Task planned dates remain distinct concepts.

Example:

PHY Problem #1:

- Assignment due September 28,
- linked Study Task planned September 25.

The Assignment deadline does not:

- create a Study Task,
- automatically move a Study Task,
- automatically reorder Study Tasks.

Study Task completion does not mean Assignment submission/completion.

---

# 17. Shared Progress

Dashboard, Course Cards, Course Page, and Weekly Plan use the same shared
task-count progress behavior.

Progress is based on Study Task completion.

Current verified counts are:

- PHY: 2 / 5
- WRT: 1 / 2
- HIS: zero Study Tasks
- overall: 3 / 7

The UI does not reinterpret Assignment deadlines as task completion.

---

# 18. Shared Components

Important shared presentation components currently include behavior such as:

- primary navigation,
- Course Cards,
- Study Task lists,
- Today Study Task presentation,
- Assignment lists.

`StudyTaskList` presents relevant:

- planned date,
- completion,
- supplied duration,
- Objective relationships,
- Assignment relationships.

`AssignmentList` presents upcoming deadline context from the shared canonical
fixture.

---

# 19. Current Read-Only Boundary

The current application remains read-only.

There are no controls for:

- creating a Course,
- editing a Course,
- deleting a Course,
- creating an Assignment,
- editing an Assignment,
- completing a Study Task interactively,
- uploading Course Materials,
- accepting/generated planning,
- account settings.

All displayed academic state comes from the static repository fixture.

---

# 20. Current Persistence State

No application persistence layer exists.

There is currently no production:

- relational database,
- document database,
- user data store,
- object storage,
- persistent task state.

Refreshing/restarting the application does not preserve user-created changes
because user-created changes do not yet exist.

Milestone 1 fixture structure must not be treated automatically as the future
database schema.

---

# 21. Current Authentication State

Authentication is NOT implemented.

There are currently no:

- user accounts,
- login flow,
- logout flow,
- sessions,
- authenticated identities,
- OAuth providers,
- password flows.

The security requirements describing authentication are future/runtime
requirements, not statements of current implementation.

---

# 22. Current Authorization State

Multi-user authorization is NOT implemented because the application does not yet
have persistent users/private user resources.

There is currently no:

- owner-based Course authorization,
- tenant isolation,
- role-based access,
- admin role,
- cross-user database filtering.

Future private multi-user work must implement these controls before relying on
them.

Security-policy documentation does not itself provide authorization.

---

# 23. Current Privacy / Real User Data State

The application does not currently persist real private user academic data.

The current fixture is static project data.

The application currently has no implemented data flows for:

- account email storage,
- personal Course storage,
- private notes,
- real schedules,
- private Assignments,
- uploaded documents,
- AI prompts,
- model-provider transfer.

`docs/DATA_PRIVACY.md` defines requirements for future data handling.

It does not imply those data flows already exist.

---

# 24. Current Upload / Storage State

Uploads are NOT implemented.

There is currently no:

- file upload interface,
- object-storage provider,
- private storage bucket,
- signed-download system,
- document parser,
- syllabus ingestion,
- file scanning pipeline.

Course Materials displayed in Milestone 1 are static reference context.

They are not user-uploaded files.

---

# 25. Current AI State

AI/model integration is NOT implemented in the application.

There is currently no runtime:

- model provider,
- AI API call,
- prompt pipeline,
- document-to-model pipeline,
- AI planning engine,
- AI-generated Study Task system,
- tool-calling agent,
- model usage/cost accounting.

The AI-related security/privacy requirements are forward requirements for later
authorized work.

---

# 26. Current External Integration State

No external application integration is currently implemented.

There is no runtime integration with:

- Google Calendar,
- Google Drive,
- university systems,
- Canvas,
- payment providers,
- webhook providers.

Future integration references in product/architecture/security documentation are
direction only until implemented and verified.

---

# 27. Current Billing State

Billing is NOT implemented.

There are currently no:

- subscriptions,
- payment provider,
- entitlements,
- paid plans,
- billing webhooks,
- payment credentials.

Billing remains later product direction.

---

# 28. Current Test Infrastructure

SD-009 added Vitest 5.0.3 for TypeScript unit/invariant and synchronous
presentation integration tests, and Playwright 1.63.0 with Chromium for browser
tests. These are development dependencies in the npm lockfile.

`npm test` runs nine selector, fixture, and component integration tests. They
cover Today filtering/order, Dashboard Next Action, due-date ordering,
Assignment/Study Task separation, Course-scoped relationships, missing duration,
raw weekly progress, and zero-task presentation.

`npm run test:e2e` runs four Chromium tests against a local production Next.js
server. Run `npx playwright install chromium` once per machine, then
`npm run build` before the browser suite. It covers the five primary
views, navigation, Course selection, unknown Course 404, cross-view Today/Next
Action consistency, narrow-viewport overflow, and keyboard navigation.

The test runner starts and stops its own loopback server on port 3100. It
rejects a preexisting server on that port so results are not attributed to an
unrelated process. Browser artifacts are ignored by Git.

No authentication, authorization, multi-user isolation, or upload tests exist
because those runtime features have not been built.

---

# 29. Current CI State

SD-010 added `.github/workflows/ci.yml` for pushes and pull requests targeting
`main`. Its single Ubuntu 24.04 job uses pinned checkout/setup-node actions,
Node.js 24, read-only repository contents permission, and one `npm ci` install.
The job runs:

1. lint,
2. typecheck,
3. Vitest unit/integration tests,
4. production build,
5. Playwright Chromium installation,
6. browser tests.

The same commands passed locally during SD-010 verification. Hosted `main` and
PR runs have since exercised the job; failing Dependabot PRs demonstrate that
lint failure stops later steps. The workflow requires no repository secret and
performs no deployment. Repository-level required checks are described in
section 31. Security automation is described in section 30.

---

# 30. Current Security Automation State

SD-011 added a required `npm audit --audit-level=moderate` step to the CI job.
It evaluates the locked production and development dependency tree on pushes
and pull requests to `main`. The audit returned zero vulnerabilities during
local verification. Hosted CI run status is recorded in the SD-011 Verify artifact.

`.github/dependabot.yml` configures weekly npm and GitHub Actions version
update pull requests. Four Dependabot PRs were observed after SD-011, so
version-update scheduling and PR creation are active. GitHub's dependency
graph and vulnerability alerts were enabled during SD-012, and its SBOM export
contained 490 packages at verification. Dependabot security updates were also
enabled; no security-update PR is claimed.

`.github/workflows/security.yml` configures CodeQL JavaScript/TypeScript
analysis on pushes and pull requests to `main`, and GitHub dependency review
on pull requests. The CodeQL job has `security-events: write` only for findings
upload. Hosted CodeQL completed successfully on `main` and Dependabot PRs.
The dependency-review job has read-only contents permission and a moderate
severity threshold. Its first four PR runs failed before assessment because
the dependency graph was unavailable. After enabling the graph, rerun job
`110723380908` on PR #1 succeeded and listed the changed Actions dependency.

GitHub reports secret scanning and push protection enabled. Code-scanning and
secret-scanning alert endpoints returned empty lists at SD-012 inspection;
that is not proof that future findings cannot occur. `npm audit` remains a
separate CI gate from GitHub's dependency graph and review.

---

# 31. Current Git / Repository Protection State

The project currently uses Git and GitHub for source control.

The protected workflow is:

```text
task branch
→ Plan
→ Build
→ Verify
→ pull request
→ CI/security checks
→ merge
→ separately authorized Release
```

SD-012 configured GitHub branch protection for `main` on this public
repository. GitHub's read-back reports required pull requests with zero human
approvals (the current sole-maintainer model), administrator enforcement,
strict up-to-date checks, resolved conversations, and force-push/deletion
restrictions. Required GitHub Actions checks are `verify`, `CodeQL`, and
`Dependency review`, each bound to Actions app ID `15368`. This is repository
configuration backed by [SD-012 PR #5](https://github.com/maguellalmike209/schooldashboard/pull/5):
the required checks passed on the final head, GitHub reported the PR clean,
and it merged as `648cfc9e65da4a72b1489da44740c18ed5dee716`. This is not
a production deployment.

---

# 32. Current Deployment State

This document does not claim a verified production deployment pipeline.

The new Release stage defines how deployment should be controlled once a
deployment architecture exists.

Verify PASS does not itself mean:

- production deployment occurred,
- production is healthy,
- Release is authorized.

Runtime deployment state should be recorded only after actual Release evidence
exists.

---

# 33. Development Commands

From the repository root, use Node.js 20.9 or later and npm.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile. |
| `npm run dev` | Serve the development application at `http://localhost:3000`. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Generate Next.js route types, then run TypeScript without emitting files. |
| `npm test` | Run Vitest unit and rendered-component integration tests. |
| `npm run test:e2e` | Build and serve the application on loopback, then run Playwright Chromium browser tests. |
| `npm audit --audit-level=moderate` | Check the locked dependency tree at the CI severity threshold. |
| `npm run build` | Create the production build. |
| `npm run start` | Serve the production build after `npm run build`. |

---

# 34. SD-001 Implementation

SD-001 established the Next.js application foundation.

It introduced the planned:

- Next.js,
- React,
- TypeScript,
- Tailwind CSS

stack while preserving the project's documentation/ICM structure.

---

# 35. SD-002 Verification

SD-002 Verify confirmed:

- `npm ci`,
- lint,
- typecheck,
- production build.

Production HTTP returned:

- 200 for all five intended routes,
- 404 for an unknown Course.

Browser inspection at approximately:

- 373 px mobile,
- 1273 px desktop

confirmed:

- visible navigation,
- readable content,
- no horizontal overflow.

Keyboard Tab showed visible focus.

Enter activated a primary navigation link.

No application testing framework was added.

---

# 36. SD-003 Verification

SD-003 Verify confirmed:

- lint,
- typecheck,
- production build.

Production HTTP confirmed:

- Dashboard,
- Courses,
- known Course routes,
- unknown Course 404 behavior.

Browser inspection confirmed:

- Course Card links on Courses,
- Course Card links on Dashboard,
- matching WRT 101 navigation,
- no horizontal overflow on tested mobile/desktop widths.

Course Card focus styling was inspected in source.

A separate keyboard-activation test was not completed for SD-003.

---

# 37. SD-004 Verification

SD-004 Verify confirmed:

- lint,
- typecheck,
- production build.

Production routes returned expected status behavior.

Browser inspection confirmed:

- correct PHY Course content,
- WRT isolation,
- explicit missing-context states,
- clear unknown-Course behavior,
- responsive layout.

No Course Material links/uploads were introduced.

---

# 38. SD-005 Verification

SD-005 Verify confirmed:

- lint,
- typecheck,
- production build,
- targeted fixture-relationship assertions,
- targeted progress assertions.

Production HTTP confirmed expected known routes and unknown Course behavior.

Browser inspection confirmed:

- Learn / Deliver / Do separation,
- Study Task dates,
- task status,
- relationships,
- progress consistency,
- responsive behavior.

Verified progress included:

- PHY 2 / 5,
- WRT 1 / 2,
- HIS zero tasks,
- overall 3 / 7.

No dedicated application testing framework was added.

---

# 39. SD-006 Verification

SD-006 Verify confirmed:

- lint,
- typecheck,
- build,
- targeted Today-selection assertions,
- targeted empty-case assertions,
- production route behavior.

Browser inspection confirmed Today and Dashboard use the same three incomplete
September 25 Study Tasks in authored order.

The first Today task is Dashboard Next Action.

Relevant:

- Course,
- Objective,
- Assignment

context resolves correctly.

Missing duration remains omitted.

Responsive behavior showed no horizontal overflow in tested widths.

---

# 40. SD-007 Verification

SD-007 Verify confirmed:

- lint,
- typecheck,
- build,
- targeted fixture assertions,
- cross-view assertions,
- production route behavior.

Browser inspection confirmed:

- upcoming deadline ordering,
- due-today HIS Assignment without a Today Study Task,
- linked deadline context,
- navigation,
- keyboard focus,
- responsive behavior.

No horizontal overflow was observed at:

- 375 px,
- 1280 px

across the five primary views.

SD-007 completed Milestone 1.

---

# 41. Milestone 1 Verified Invariants

Current verified Milestone 1 behavior includes:

- one canonical shared static academic fixture,
- five primary views,
- Course Facts separated from personal-plan concepts,
- Learning Objectives distinct from Assignments,
- Assignments distinct from Study Tasks,
- Study Tasks distinct from Course Materials,
- Assignment due date distinct from Study Task planned date,
- Today derived from incomplete reference-date Study Tasks,
- no automatic carryover,
- Dashboard Next Action is first Today task in authored order,
- progress based on Study Task completion,
- missing duration remains missing,
- Course Materials are not Study Tasks,
- unknown Course IDs produce 404,
- upcoming Assignments use due-date then authored-order sorting,
- deadline presence does not create or reprioritize Study Tasks,
- Study Task completion does not equal Assignment submission,
- a due-today Assignment may exist without a Today Study Task.

These remain useful product invariants when future persistence is designed.

Their current fixture representation does not automatically determine future
database schema.

---

# 42. Secure Automation Foundation State

SD-008 established the project's engineering operating model without changing
Milestone 1 runtime behavior. SD-009 through SD-012 supplied the test, CI,
security-automation, and protected-Git controls summarized above.

The durable ICM structure includes:

```text
AGENTS.md
CONTEXT.md

icm/
  01_plan/
  02_build/
  03_verify/
  04_release/
```

The School Dashboard security profile includes:

```text
docs/SECURITY_REQUIREMENTS.md
docs/DATA_PRIVACY.md
docs/THREAT_MODEL.md
docs/SECURITY_TESTING.md
```

Supporting durable documents include:

```text
docs/DECISIONS.md
docs/TASKS.md
docs/IMPLEMENTATION.md
```

These documents define how future implementation should behave.

They do not themselves implement application security.

---

# 43. Current Security Posture Summary

At the current implementation boundary:

## Exists

- static read-only application,
- shared mock academic fixture,
- typed application code,
- lint command,
- typecheck command,
- production build command,
- Vitest unit/integration and Playwright browser tests for current behavior,
- hosted CI with locked install, audit, lint, typecheck, tests, and build,
- Dependabot version-update PRs and enabled security updates,
- working CodeQL and PR Dependency Review,
- enabled dependency graph, vulnerability alerts, secret scanning, and push protection,
- protected `main` with PR integration and required CI/security checks,
- security/privacy/threat/testing policy foundation.

## Does not yet exist as verified runtime/infrastructure

- authentication,
- sessions,
- authorization,
- tenant isolation,
- persistence,
- private object storage,
- uploads,
- AI integration,
- external integrations,
- billing,
- verified production Release pipeline.

Future agents must not infer the second group from the existence of policy
documents.

---

# 44. Foundation Closeout Boundary

SD-008 through SD-012 have Verify evidence and are merged. SD-013 independently
audits their combined operation. `docs/TASKS.md` remains authoritative for
task status. The next product phase remains directional until separately
authorized; these process controls do not implement private multi-user
application behavior.

---

# 45. Source-of-Truth Rule

Use:

`docs/IMPLEMENTATION.md`

for verified current implementation state.

Use:

`docs/TASKS.md`

for roadmap/task state.

Use:

`docs/ARCHITECTURE.md`

for durable technical structure.

Use:

`docs/DECISIONS.md`

for accepted durable choices.

Use:

Git/source

for actual repository reality.

When this document and source disagree:

inspect repository reality before proceeding.

---

# 46. Update Rule

Update this document when verified implementation reality changes.

Examples:

- dependency added,
- route added,
- authentication implemented,
- database introduced,
- test framework added,
- CI introduced,
- upload pipeline implemented,
- AI provider integrated,
- deployment infrastructure established.

Do not update this document merely because something is planned.

Do not describe an unverified future capability in present tense.

---

# 47. Final Principle

This document exists to prevent the project from confusing:

> intended architecture

with:

> implemented reality.

Future agents should be able to read this file and accurately answer:

> What does School Dashboard actually do today?

> What engineering infrastructure actually exists today?

> Which security controls are implemented, and which are only requirements?

The standard is:

> verified reality, not optimistic documentation.
