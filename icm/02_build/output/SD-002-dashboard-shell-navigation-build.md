# SD-002 — Dashboard Shell and Navigation Build

## Build Summary

The SD-001 foundation now has a shared, read-only School Dashboard shell, four direct primary links, the five planned routes, and a small canonical static context module. Dashboard shows the fixed term/day/week and PHY 009D's date-only Lecture #02 schedule entry. Later-owned views have deliberate limited-state content. No SD-002 implementation was committed or pushed.

At Build entry, `main` and `origin/main` already both pointed at verified SD-001 commit `56f9532` (`git rev-list --left-right --count origin/main...main` returned `0 0`), so the authorized predecessor push was unnecessary. The unrelated untracked `icm - Shortcut.lnk` was not touched.

## Files Created or Changed

- Changed `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css` for the shell and Dashboard.
- Added `src/components/primary-navigation.tsx` for pathname-based active navigation.
- Added `src/lib/academic-context.ts` for the minimum shared static facts and deterministic UTC date display.
- Added `src/app/courses/page.tsx`, `src/app/courses/[courseId]/page.tsx`, and `src/app/courses/[courseId]/not-found.tsx`.
- Added `src/app/weekly-plan/page.tsx` and `src/app/today/page.tsx`.
- This Build artifact records implementation evidence. The accepted SD-002 Plan artifact remains untracked for the SD-002 workflow.

## Implementation Notes

- The App Router root layout owns product identity, a single `<main>`, shared reference-day context, and responsive navigation placement. At `lg`, navigation sits in a left column; at smaller widths it is a visible two-column or four-column grid. There is no menu state or global provider.
- The only client component is primary navigation. It uses `usePathname()`; `/courses/[courseId]` activates Courses. Active links have distinct visible styling and `aria-current="page"`.
- `/courses` uses a plain text link for `phy-009d`, without a Course Card. The dynamic route renders only the known course identity and a limited-state message. An unknown ID calls `notFound()` and uses a course-scoped not-found page, avoiding unrelated course content or a misleading global 404 label.
- Dashboard's schedule section explicitly says that the course schedule supplies no meeting time or room. It does not create a timed `ClassMeeting`. Its study-plan section is an honest placeholder, not a claim that there is no work.
- Next.js, React, TypeScript, Tailwind, and browser capabilities were sufficient; package/configuration files were not changed.

## Route Results

Production runtime HTTP checks after the final build:

| Route | Result |
| --- | --- |
| `/` | 200; Dashboard heading and context |
| `/courses` | 200; Courses heading and PHY 009D text link |
| `/courses/phy-009d` | 200; known Course Page heading and limited state |
| `/weekly-plan` | 200; Weekly Plan heading and current week |
| `/today` | 200; Today heading and fixed reference date |
| `/courses/unknown-course` | 404; clear “Course not found” page, without PHY 009D data |

## Navigation Results

Browser keyboard activation of real links reached Courses → known Course Page, Weekly Plan, Today, and Dashboard. The AX tree exposed the four direct links and page headings. Rendered HTML checks found the following `aria-current="page"` targets: `/` on Dashboard, `/courses` on Courses and known Course Page, `/weekly-plan` on Weekly Plan, and `/today` on Today. Narrow browser screenshots showed the corresponding active styling for Dashboard, Courses, and the unknown Course Page state. Course Page is absent from the top-level navigation.

## Shared Context Implemented

The single `src/lib/academic-context.ts` module contains:

- term: Fall Quarter 2026;
- reference date: `2026-09-25` (Friday, September 25, 2026);
- academic week: `2026-09-21` through `2026-09-27`;
- one known course: `phy-009d`, PHY 009D — Modern Physics;
- one source-backed date-only lecture schedule entry: Lecture #02 on `2026-09-25`, associated with `phy-009d`.

Date display is derived from these fixed ISO values using UTC formatting. The app does not read the machine's current date to define Today. No Class Meeting, personal-plan record, or additional Course Fact was added.

## Build Checks

- `npm run lint` — passed after final file changes.
- `npm run typecheck` — passed after final file changes; Next route types generated successfully.
- `npm run build` — passed after final file changes; Next listed `/`, `/courses`, `/courses/[courseId]`, `/weekly-plan`, and `/today`.
- `git diff --check` — exit 0; Git emitted only LF-to-CRLF working-copy notices for existing modified files.

These checks prove code/configuration validity and buildability. They do not substitute for independent visual and product-semantic verification.

## Runtime Smoke Tests

Ran the production app with `npm run start -- -p 3102`. All required routes had expected HTTP statuses (above). The in-app browser showed the Dashboard, Courses, known Course Page, Weekly Plan, Today, and unknown-course content. Actual link activation used keyboard Return; the browser's pointer-click action did not navigate in this environment, while keyboard activation did. Tabbing moved focus from Dashboard to Courses. The unknown route returned 404 and exposed a Browse Courses link.

## Responsive / Visual Inspection

- Inspected the in-app browser's narrow viewport (approximately 300 px, narrower than the requested 375 px). Navigation remained visible in two columns without observed horizontal clipping. Dashboard and Courses hierarchy, active styling, and limited-state/404 presentation were readable.
- The browser tooling did not provide a controllable 1280 px viewport. An attempt to capture 375 px with the installed Edge headless executable produced no screenshot file. Desktop layout is implemented with Tailwind's `lg` grid classes and `min-w-0`, but **1280 px visual inspection remains for Verify**.

## Accessibility Checks

- Source inspection found `<nav aria-label="Primary">`, one shared `<main>`, one page-level `<h1>` per route, real `<a>` links, `aria-current="page"` on active primary links, and visible `focus-visible` outline classes.
- Browser AX exposed the four primary links and route headings. Keyboard Tab reached Courses and Return activated navigation.
- Date-only reference text uses `<time dateTime>` for individual dates. Text and active-state styling are readable in the narrow screenshots. Full accessibility auditing remains a Verify responsibility.

## Scope Guardrail Check

Source and diff inspection found no Course Cards, weekly objectives, Study Tasks, Next Action, progress calculation, Upcoming Assignments, deadline summary, persistence, authentication, AI, integration, mutation control, or new dependency. No raw/private Course material, credentials, or secret was introduced. The only `new Date` call parses a supplied fixed ISO date for UTC display; it does not read current machine time. `docs/IMPLEMENTATION.md`, `docs/TASKS.md`, and durable requirements were not updated in Build. The unrelated shortcut remains untracked and untouched.

## Deviations From Plan

None.

## Issues / Limitations

Desktop visual inspection around 1280 px could not be completed with the available browser viewport controls. Verify should inspect this width. The in-app browser's pointer-click action did not navigate, but keyboard activation of the same real links succeeded, and the routes responded correctly at runtime.

## Verify Handoff

Independently compare the implementation with the accepted Plan and V1/UI/mock-data contracts. Recheck all routes and unknown-course behavior, four-link navigation and `aria-current` including Course Page, the fixed shared context and date-only lecture wording, mobile and **1280 px desktop** layouts, keyboard focus, and the absence of SD-003–SD-007 functionality. Review the task-only diff and leave the unrelated shortcut out of any later task commit. After a full Verify PASS, Verify may update implementation/task state and finalize Git under repository rules.

READY FOR VERIFY WITH KNOWN LIMITATION
