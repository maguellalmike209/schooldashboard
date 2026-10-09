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

`Done`

SD-008 established and verified the project's security-first autonomous
engineering documentation foundation.

SD-009 through SD-012 then established automated tests, hosted CI, security
automation, and the protected PR workflow. SD-013 independently audited their
combined operation and reconciled current-state documentation.

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

SD-015 subsequently added and locally verified the first authenticated private
Academic Term/Course slice. Uploads and production deployment controls remain
outside that implementation.

Documentation describing a security control is not evidence that the runtime
control exists.

---

# 3. Application Stack

The verified direct framework/application versions are:

| Technology | Verified version |
| --- | --- |
| Next.js | 16.3.8 |
| React | 19.3.0 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.3 |
| `@supabase/ssr` | 0.12.7 |
| `@supabase/supabase-js` | 2.117.2 |
| Zod | 4.6.5 |
| Supabase CLI (development) | 2.120.0 |

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
| `/signup` | Email/password signup |
| `/login` | Sign-in |
| `/auth/confirm` | Local email confirmation callback |
| `/auth/recover` | Password recovery request |
| `/auth/update-password` | Password update |
| `/academic` | Authenticated Academic Terms and Courses |
| `/academic/courses/[courseId]` | Authenticated Course detail/edit/delete |

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

SD-015 added local Supabase PostgreSQL persistence for authenticated
`academic_terms` and `courses` only. `supabase/migrations/` is the schema source
of truth; an explicit local reset replayed the migration. Both tables use UUID
identifiers, required owner IDs, bounded nonblank text, scoped uniqueness, and
foreign keys. A composite Course/Term FK requires the same owner. Course delete
removes its row; Term deletion with Courses and Auth User deletion with academic
rows are restricted. The application can create/select Terms and create, read,
update, and delete database-backed Courses. No hosted Supabase
project, production database, object storage, or persistence of other Milestone
1 fixture entities exists. The fixture is still separate from this schema.

---

# 21. Current Authentication State

SD-015 implements Supabase Auth email/password signup, local email confirmation,
sign-in, global sign-out, and password recovery/update flows. `@supabase/ssr`
uses browser/server clients and a Next.js proxy for supported cookie refresh.
Protected DAL operations verify claims server-side; client-supplied identity and
cookie-derived `getSession()` user data are not authorization inputs. The
synthetic two-user browser flow passed against local Auth/Mailpit. There is no
OAuth provider. Global sign-out removes the browser's protected access and
revokes refresh sessions; an already copied access JWT can remain valid until
its configured one-hour expiry under the provider contract.

---

# 22. Current Authorization State

SD-015 implements owner-based Academic Term/Course authorization in a
`server-only` DAL and PostgreSQL RLS. The DAL derives the actor from verified
claims and scopes all private reads/writes. The tables grant no operations to
`anon`, enable RLS, and define separate owner policies for SELECT, INSERT,
UPDATE, and DELETE. UPDATE protects old and new owner values. The composite FK
prevents a Course from referencing another owner's Term. Local pgTAP (40
assertions) and synthetic two-user browser/Data API/server-action attacks passed
anonymous, cross-user, owner-spoof, and collection-isolation checks. No admin or
organization role exists.

---

# 23. Current Privacy / Real User Data State

The authenticated slice stores account email in Supabase Auth and private Term
names and Course codes/names in local PostgreSQL. It has been tested with only
synthetic accounts/data; no real user data or hosted project was introduced.
The Milestone 1 fixture remains static project data. Private notes, real
schedules, Assignments, uploads, AI prompts, and model-provider transfer are not
implemented.

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

`npm test` runs thirteen selector, fixture, component, and SD-015 validation
tests. They cover Today filtering/order, Dashboard Next Action, due-date ordering,
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

SD-015 adds `npm run supabase:db:reset` for explicit local migration replay,
`npm run supabase:test:db` for 40 PostgreSQL/RLS assertions, and
`npm run test:e2e:security` for a synthetic two-user Auth, browser, Data API,
and server-action attack suite. The suite checks own Course CRUD, anonymous and
cross-user denial, owner/Term spoofing, collection isolation, validation,
private responses, and logout. `npm run test:client-bundle-secrets` scans the
production client bundle; the security browser runner scans captured app logs.
These local checks passed after a clean local database reset. No upload tests
exist because uploads are not implemented.

---

# 29. Current CI State

SD-010 added `.github/workflows/ci.yml` for pushes and pull requests targeting
`main`. Its single Ubuntu 24.04 job uses pinned checkout/setup-node actions,
Node.js 24, read-only repository contents permission, and one `npm ci` install.
The job runs:

1. pinned local Supabase startup, local migration replay, and database/RLS tests,
2. the dependency audit and audit-policy regression check,
3. lint, typecheck, and Vitest tests,
4. production build and client-bundle credential scan,
5. Playwright Chromium installation and existing browser tests,
6. authenticated two-user security browser tests.

The SD-015 additions passed locally; their hosted PR result is recorded in the
SD-015 Verify/PR evidence when available. The workflow requires no repository
secret and performs no deployment. Repository-level required checks are
described in section 31. Security automation is described in section 30.

---

# 30. Current Security Automation State

SD-011 established a required moderate-or-higher audit of the locked production
and development dependency tree. CI now runs exact-pinned `audit-ci@7.1.0`
through `npm run audit:ci`, using `audit-ci.jsonc`. The only exception is
GHSA-vfj7-8cjw-p6xm on the full development-only
`eslint-config-next > @next/eslint-plugin-next > fast-glob > micromatch > braces`
path. It expires on 2026-11-06 and must be removed earlier when a supported
patched upstream path exists. The config records the accepted residual risk.
CI also runs a synthetic audit-policy test proving unrelated moderate, high,
and critical findings still fail. The raw `npm audit --audit-level=moderate`
continues to report the accepted finding; the replacement gate displays it.

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
| `npm audit --audit-level=moderate` | View all current findings without the temporary exception. |
| `npm run audit:ci` | Run the required moderate-or-higher audit with the exact-path temporary exception. |
| `npm run test:audit-policy` | Check that unrelated moderate, high, and critical advisories still fail the audit. |
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

# 42A. SD-018 Read-Only Scheduled Autonomy Foundation

SD-018 added `icm/automation/CONTEXT.md` as an operating contract alongside the
existing four ICM stages. `scripts/icm-automation/cli.mjs inspect|report` reads
local Git/task/artifact state and produces a daily Manager Review. It does not
accept an execution grant or write to the repository. Without an external
grant it reports `NO AUTHORIZED WORK`; unavailable live GitHub, CI, usage, and
cost evidence is labeled unknown or unavailable.

The standard-library selector strictly validates synthetic grant, accepted
task, and checkpoint records and exercises recovery-first selection,
dependency/integration gates, time and budget bounds, and fixture-only lock
contention. The Node test suites contain 67 adversarial and review cases and
run under `npm test` alongside the existing Vitest suite. Build repaired five
fail-closed/reporting defects found and reprobed by independent Verify. Protected PR #18
passed required verify, CodeQL, and Dependency Review checks on head `ca3c6b2`
and merged to `main` at `16cfb7e`.

The selector's synthetic evidence flags are not live trusted authorization or
exact-head CI proof. The fixture lock has not been validated in an unattended
Windows runtime. There is no trusted external grant loader, persistent writer
journal, unattended repository writer, or active recurring schedule. Production
Release remains separate.

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
- security/privacy/threat/testing policy foundation,
- locally verified email/password Auth, server-only owner-scoped Term/Course DAL,
- local PostgreSQL migration, constraints, and RLS for Terms/Courses,
- local database and two-user application isolation tests.

## Does not yet exist as verified runtime/infrastructure

- private object storage,
- uploads,
- AI integration,
- external integrations,
- billing,
- verified production Release pipeline.

The implemented Auth/persistence boundary covers only SD-015's Term/Course
slice. Future agents must not infer broader capability from policy documents.

---

# 44. Foundation Closeout Boundary

SD-008 through SD-013 have Verify evidence. `docs/TASKS.md` remains
authoritative for task status. SD-015 separately implements the first private
Term/Course slice; later product capabilities remain directional until
authorized.

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

---

# 48. SD-020 Disabled Trusted Writer Foundation (Local Fixture State)

The SD-020 task branch adds fixture-only modules under
`scripts/icm-automation/` for exact V1 grant binding, lock/journal integrity,
recovery-first policy, read-only exact-head GitHub evidence, draft PR proposals,
negative Verify contracts and a fake Codex process adapter. The existing
`inspect|report` CLI stays read-only. Local adversarial and process tests,
lint/typecheck/build and primary-view browser checks passed, as recorded in the
SD-020 Verify artifact. The dependency audit and protected PR hosted checks are
pending, so SD-020 remains In progress until integration is confirmed.

This source is **not an installed trusted broker**. It has no authenticated
Windows code/ACL attestation, native Scheduled trigger isolation, real worker
process-tree containment, founder grant, GitHub publisher credential, active
schedule, automatic merge or Release. `runCodexExec()` fails closed. The
installation operator sequence and G1–G8 proof ledger are in
`icm/automation/TRUSTED_WRITER_INSTALLATION.md`.
