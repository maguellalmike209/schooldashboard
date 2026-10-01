# SD-007 — Upcoming assignments and Milestone 1 integration

## Human Review Summary

- Mike's next actions: None.
- Decisions requiring Mike: None.
- Learn before Build: Assignment deadline context is derived from the same fixture as Study Tasks, but it never changes their planned dates, completion, or order.
- Current blockers: None.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Objective and Current State

Finish reusable Upcoming Assignment context in existing views, then verify Milestone 1 across all five required views. SD-006 is verified, committed, pushed, and aligned on `main`. Dashboard lacks an upcoming deadline section. Course Page has no dedicated Assignment section. Weekly Plan shows relevant Assignments but does not use the upcoming ordering contract. Linked Today tasks already show their Assignment deadline. The canonical fixture has two Assignments and seven Study Tasks.

## Required Behavior and Boundaries

- Upcoming means `dueDate >= referenceDate`; sort by due date, then authored order. Assignment title, Course, and due date remain visible. Do not infer submission or completion from Study Tasks.
- Add one lightweight fictional HIS 110 Assignment due on the reference date with no linked Study Task. This supplies the required due-today-without-Today-task V1 scenario while preserving HIS's zero-task behavior. Preserve existing PHY/WRT Assignment dates and Study Task values. Give Assignments explicit authored order for deterministic ties.
- Dashboard shows the upcoming list as deadline context. Course Page shows upcoming deadlines for its Course. Weekly Plan keeps its established current-week-or-linked Assignment relevance rule but orders those deadlines consistently and identifies Course ownership. Linked Study Task cards in Weekly Plan, Course Page, and Today show canonical Assignment due dates.
- Keep Upcoming Assignments within existing views. No sixth screen, task mutation, Assignment submission state, urgency scoring, new dependency, persistence, authentication, uploads, AI, or external service.

## Approach and Impact Map

Extend the single fixture with authored Assignment order and the fictional due-today HIS obligation. Add pure selection and ordering helpers in `academic-context.ts`. Build one small reusable Assignment list component for Dashboard, Course Page, and Weekly Plan, with Course lookup. Keep Today as linked deadline context only. Update the existing Study Task list to show the linked Assignment's due date.

Expected implementation changes: `src/lib/academic-context.ts`, reusable Assignment list, Dashboard, Course Page, Weekly Plan, and the existing Study Task list. Existing Today task filtering and route stay intact. No new package or route.

## Acceptance Criteria

1. Upcoming list includes exactly the HIS due-September-25, WRT due-September-27, and PHY due-September-28 Assignments in that order; the selector excludes past due dates and preserves authored order for equal dates in a targeted test.
2. Dashboard shows title, Course, due date and clear deadline-only meaning for each upcoming Assignment. Course Pages scope Assignments correctly, including HIS with zero Study Tasks. Weekly Plan shows due-this-week or linked obligations separately from Objectives and Study Tasks, ordered by deadline.
3. HIS's due-today Assignment appears as deadline context without creating a Today Study Task. PHY Problem #1 remains due September 28 while its linked Study Task remains planned September 25; Study Task completion implies no Assignment status.
4. Existing Today selection/order, Next Action, duration omissions, stable IDs, per-Course and overall progress, known/unknown Course routing, and read-only behavior remain correct.
5. All five views are reachable and usable on mobile and desktop. No new primary navigation destination or future infrastructure appears.

## Verification Plan

Independently inspect fixture IDs, references, dates, authored orders, and source/personal-plan distinctions. Run targeted selector assertions using canonical and synthetic past/tied/due-today Assignments; independently calculate task progress. Run lint, typecheck, build, production HTTP and rendered-content checks for all five views and unknown Course route. Inspect browser navigation, hierarchy, mobile/desktop layout and horizontal overflow, and keyboard/focus path. Review full diff, scope, dependency changes, secrets, and private/raw Course materials. Record Milestone 1 integration evidence in the Verify artifact.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
