# SD-002 — Dashboard Shell and Navigation Plan

## Human Review Summary

### Objective

Turn the verified SD-001 root-page scaffold into a usable, read-only School Dashboard shell with four direct navigation links and a structural Course Page route. Establish only the academic context needed for this shell and the reference-day Dashboard.

### Proposed Approach

Use the existing App Router root layout for a responsive header, navigation, and main content container. Keep one small client-side navigation component for active-link state; leave pages and the static context as server-side code. Add `/`, `/courses`, `/courses/[courseId]`, `/weekly-plan`, and `/today`. The latter three non-Dashboard views remain intentionally limited, and the Course Page is reached through a plain course-selection link on `/courses`, not a fifth top-level link or a premature Course Card.

### Material Decisions Requiring Mike

None.

### Learning Focus

The App Router maps folders to URLs. A shared layout wraps those pages once, while a dynamic `[courseId]` segment lets one Course Page URL represent a selected course. The active navigation link can reflect `/courses/[courseId]` as **Courses** without making Course Page a permanent navigation item.

### Plan Status

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Current Repository State

- Inspected Git on `main`: `56f9532 chore(sd-001): initialize Next.js application` is HEAD; branch is one commit ahead of `origin/main`. The only working-tree item is unrelated, untracked `icm - Shortcut.lnk`. Leave it untouched.
- `src/app/layout.tsx` supplies only the HTML/body document wrapper and metadata. `src/app/page.tsx` is the SD-001 foundation message; `src/app/globals.css` only imports Tailwind. There are no other application routes, components, or academic data files.
- `package.json` provides Next.js 16, React 19, TypeScript 6, Tailwind 4, and `dev`, `lint`, `typecheck`, `build`, `start` scripts. App Router, ESLint, PostCSS, and TypeScript configuration exist. No new dependency is needed.
- `docs/IMPLEMENTATION.md` records SD-001 verification: root responds successfully, `/courses` still 404s, and lint/typecheck/build passed. These are prior verification results, not SD-002 results. `docs/TASKS.md` marks SD-001 Done and SD-002 Not started. The older current-entry text in `AGENTS.md`/`CONTEXT.md` predates SD-001; repository files and `IMPLEMENTATION.md` establish current implementation reality.

## Relevant Product Contracts

- `V1_SPEC.md`: exactly five primary views; Dashboard, Courses, Weekly Plan, and Today are directly navigable; Course Page follows course selection. One static term, one shared fixed reference date/week, one shared academic plan, read-only behavior. Class Meetings are distinct from Study Tasks and appear only when authored schedule information supports them.
- `UI_SPEC.md`: Dashboard is a cross-course overview; primary navigation has four direct destinations; today's classes require a supplied meeting and authored start time. Preserve clarity and responsive access. Later Dashboard sections have specific information priority, but that does not authorize their data or functionality in SD-002.
- `MOCK_DATA_SPEC.md`: canonical context is Fall Quarter 2026, Friday 2026-09-25, week 2026-09-21 through 2026-09-27, and `phy-009d` / PHY 009D — Modern Physics. The lecture schedule says Lecture #02 occurs on the reference date and supplies topics, but does **not** supply a start time, room, recurrence, or a timed Class Meeting. A `LectureScheduleEntry` is not a `ClassMeeting`; missing meeting data must stay missing. Course Facts remain separate from authored personal planning.
- `ARCHITECTURE.md` and `DECISIONS.md`: use the existing Next.js/React/TypeScript/Tailwind stack and small local static data. No services, persistence, authentication, ingestion, AI, or integration scaffolding.

## Scope

- Replace the scaffold presentation with a shared product identity, four-link primary navigation, active state, and responsive main content layout.
- Make the root route the Dashboard. Show term, fixed reference day, current week interval, and the supported date-only PHY 009D Lecture #02 schedule context. Make the reference-day nature of “Today” visible.
- Add intentional, lightweight Courses, Weekly Plan, Today, and known-Course placeholders. Provide a plain text course-selection link from Courses to the known Course Page route. Give unknown course identifiers a clear not-found result.
- Share the minimum static context across layout and pages without duplicating canonical values.

## Out of Scope

- SD-003 Course Cards, full Courses overview, extra Courses, per-Course progress.
- SD-004 Course Page content, topics/materials/assignments/tasks, beyond a known-course identity and limited-state message.
- SD-005 weekly objectives, dated Study Tasks, completion state, progress calculations.
- SD-006 Today Study Tasks, Next Action, task ordering or duration displays.
- SD-007 Upcoming Assignments and deadline summaries.
- A fabricated Class Meeting, class time, room, recurrence, task, assignment, requirement, duration, or misleading “nothing planned” empty state. No sixth primary destination, mutation controls, persistence, authentication, AI, external services, or new package.

## Route and Navigation Plan

| Route | Purpose | SD-002 responsibility | Later owner |
| --- | --- | --- | --- |
| `/` | Dashboard/default | Real shell, term/day/week context, supported date-only lecture schedule context, bounded study-plan placeholder | SD-003 course summary; SD-005 weekly context/progress; SD-006 daily tasks/Next Action; SD-007 deadlines |
| `/courses` | Courses | Intentional limited page with one plain course-selection link; no Course Card | SD-003 |
| `/courses/[courseId]` | Course Page | Structural dynamic route; known `phy-009d` shows identity and limited-state message; unknown ID shows clear not-found state | SD-004 |
| `/weekly-plan` | Weekly Plan | Dedicated accessible route with shared week context and limited-state message | SD-005 |
| `/today` | Today | Dedicated accessible route with shared fixed reference-day context and limited-state message | SD-006 |

Navigation labels are **Dashboard**, **Courses**, **Weekly Plan**, **Today**. The Courses link is active on `/courses` and its child Course Page. Unknown course URLs must not silently show PHY 009D or redirect. The plain known-course link is a routing affordance for SD-002, not the SD-003 Course Card contract.

## Dashboard SD-002 Boundary

Implement a clear Dashboard page heading and a compact reference-context area: Fall Quarter 2026; Friday, September 25, 2026; current academic week September 21–27, 2026. Show “On today's course schedule” (or equivalently explicit date-only wording) with PHY 009D Lecture #02 and only the supported schedule information. Label it as scheduled lecture context, with time unavailable/unspecified if useful; never present a fabricated clock time or imply that a timed Class Meeting record exists.

Include one restrained, honest study-plan placeholder explaining that the plan summary is not available in this stage. It must not say that no work, deadlines, or classes exist. Do not render mock task counts, Next Action, progress, deadlines, Course Cards, or empty states that depend on a complete plan. Later tasks replace or extend this placeholder in the UI hierarchy required by `UI_SPEC.md`.

## Shared Context Plan

- One local static module, for example `src/lib/academic-context.ts`, holds the term label, ISO `referenceDate`, explicit current-week start/end, one known course identity, and one source-backed date-only Lecture #02 schedule entry. Stable `phy-009d` identity is shared by the course link and dynamic route.
- The date is supplied, never computed from `new Date()` as a live “today.” Display formatting must be deterministic; using fixed display strings or UTC-safe formatting is acceptable. Do not derive an academic-week number or term dates not supplied by the contract.
- The schedule entry is a Course Fact. No personal-plan records are introduced in SD-002. Do not create a `ClassMeeting` from the lecture entry; no authored timed meeting exists in the accepted fixture. If a timed Class Meeting is introduced in a later task, it should be a distinct record with authored date/start time and then support Today's Classes.
- This is a partial, shared fixture nucleus, not the complete canonical V1 academic plan or a production schema. Later tasks extend the same source of truth with their owned facts and authored planning records.

## Component / File Structure

- `src/app/layout.tsx`: server root layout with product identity, shared context summary, main landmark, and responsive shell.
- `src/components/primary-navigation.tsx`: one small client component using the current pathname for active state and semantic Next.js links. No global state library or context provider.
- Route page files own their small content. A separate AppShell or page-header abstraction is unnecessary unless Build finds a concrete reuse need.
- `src/lib/academic-context.ts`: minimal static values, not a full domain/schema layer.
- `src/app/globals.css` plus Tailwind utility classes: only small global base styling if needed.

## Responsive and Accessibility Plan

- Use a bounded, readable content width and clear spacing/type hierarchy. On wide screens, a compact persistent left navigation/sidebar may sit beside main content; on narrow screens, the same four links remain visible in a wrapping or horizontally scrollable top row. Avoid a menu that needs JavaScript disclosure state for four links.
- Product identity remains visible. Navigation and content must not overflow at practical mobile widths (for example 375 px) or desktop widths (for example 1280 px).
- Use `<nav aria-label="Primary">`, one main landmark, one page-level heading per route, real links, visible focus styles, and `aria-current="page"` for the active destination. Use `<time dateTime="...">` for displayed dates where suitable. Ensure adequate text/background contrast and keyboard navigation.
- Course Page should highlight Courses as the parent navigation destination. Placeholders are plain information, not disabled or fake action controls.

## Expected File Changes

- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, and possibly `src/app/globals.css`.
- Add: `src/components/primary-navigation.tsx`, `src/lib/academic-context.ts`, `src/app/courses/page.tsx`, `src/app/courses/[courseId]/page.tsx`, `src/app/weekly-plan/page.tsx`, `src/app/today/page.tsx`, and a small not-found presentation for unknown course IDs if necessary.
- No package/config changes expected. Build should not edit durable product docs to claim new behavior. After a later full Verify PASS, current-state `docs/IMPLEMENTATION.md` and `docs/TASKS.md` may be updated per ICM; no `DECISIONS.md` change is planned.

## Acceptance Criteria

- [ ] Every SD-002 route renders intentionally: `/`, `/courses`, `/weekly-plan`, `/today`, and `/courses/phy-009d`.
- [ ] `/` is the default Dashboard and all routes share a coherent identity, navigation, and main content shell.
- [ ] Primary navigation reaches Dashboard, Courses, Weekly Plan, and Today; no fifth top-level Course Page link or sixth product destination appears.
- [ ] Active navigation is communicated visually and with `aria-current`; a known Course Page activates Courses.
- [ ] Courses offers a plain selection link to the known Course Page without implementing Course Cards; an unknown course ID yields a clear not-found result with no unrelated course data.
- [ ] Courses, Course Page, Weekly Plan, and Today clearly state their current limited content and do not imply complete academic features or a genuinely empty personal plan.
- [ ] All visible term/day/week context agrees on Fall Quarter 2026, 2026-09-25, and 2026-09-21 through 2026-09-27; it does not depend on the machine date.
- [ ] Dashboard presents the supported date-only PHY 009D Lecture #02 context without a fabricated time, room, or `ClassMeeting`.
- [ ] Dashboard has no Course Cards, Study Tasks, Next Action, progress, or Upcoming Assignments functionality in SD-002.
- [ ] Navigation and content work at practical mobile and desktop widths without clipped links or content.
- [ ] Keyboard access, semantic navigation/main/headings/links, focus indication, and readable contrast are preserved.
- [ ] Existing lint, typecheck, and production build commands pass; a runtime smoke check can navigate the real routes.
- [ ] No persistence, authentication, mutation, AI, external integration, future infrastructure, or new dependency is added.

## Verification Plan

1. Compare the final diff and route tree to this Plan. Inspect the static context for a single source of term/date/week/course identity; confirm there is no personal-plan data, invented meeting time, later-task UI, package change, or unrelated staged work.
2. Run `npm run lint`, `npm run typecheck`, and `npm run build`. Record results; rerun affected checks after any repair.
3. Run the application and navigate directly and via links to `/`, `/courses`, `/weekly-plan`, `/today`, and `/courses/phy-009d`; check an unknown `/courses/<id>` URL yields a clear not-found state. Inspect page headings and active nav/`aria-current`, including Courses active on the child route.
4. Use browser visual inspection at approximately 375 px and 1280 px to check layout, navigation visibility, focus/keyboard behavior, and Dashboard information hierarchy. Visual inspection is warranted because responsive navigation and shell presentation are core SD-002 outcomes.
5. Inspect visible text and static data against the fixed reference date/week and source-backed lecture entry. Confirm the UI does not claim “no tasks,” “no classes,” or computed progress without an authored plan. Confirm the machine date cannot change displayed context.

## Risks / Blockers

- **Fixture gap, resolved for this scope:** PHY 009D's lecture schedule supplies Lecture #02's date but no start time. SD-002 displays it explicitly as date-only schedule context, not as a timed Class Meeting. Later timed meeting UI requires an authored/supported timed record.
- **Partial page risk:** Placeholder copy must describe an incomplete view without implying that the student's actual plan is empty. Verify this in rendered pages.
- **Repository hygiene:** `main` is ahead of remote by one commit and the untracked shortcut is unrelated. Plan does not touch either. Reinspect Git state when Build begins.
- No material blocker identified.

## Durable Decision Candidates

None.

## Build Handoff

Build the shared shell, four direct nav links, minimal routes, and date-only Dashboard context using the existing stack. Keep the dynamic Course Page limited, and preserve the ownership of content assigned to SD-003 through SD-007. Verify routes, active state, fixed context, responsive layout, semantics, and build health. This Plan authorizes no implementation in the current Plan-only turn.

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
