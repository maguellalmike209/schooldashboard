# SD-005 — Weekly Plan

## Human Review Summary

- Mike's next actions: None.
- Decisions requiring Mike: None.
- Learn before Build: Weekly progress is a count derived from canonical Study Tasks, not an independent value stored on each screen.
- Current blockers: None.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Objective and Current State

Build the dedicated Weekly Plan from one shared authored static plan and connect current-week Study Task progress across Dashboard, Courses, Course Page, and Weekly Plan. The route is currently a placeholder; cards show the correct zero-task state because no Study Tasks exist. Course Page has course-specific week/material context but no personal plan content.

## Required Behavior and Boundaries

- Show the fixed academic week, then course-grouped Learn (Learning Objectives), Deliver (Assignments relevant to this week), and Do (dated Study Tasks) sections.
- Use stable IDs and explicit course/objective/assignment relationships. Include a task linked to both an Objective and Assignment, a task linked to neither, a completed reference-day task, an earlier unfinished task, a missing duration, unequal Course task totals, and a zero-task Course.
- Keep completed tasks visible in Weekly Plan and Course Page. Preserve authored order and planned dates. Progress counts each current-week Study Task once, scoped by Course or across all Courses.
- Assignment due dates remain distinct from planned Study Task dates. An Assignment is relevant to this week if due inside the week or linked from a Study Task planned this week. This includes the source-supported PHY Problem #1 due next Monday without moving its Friday Study Task.
- SD-006 owns Today and Dashboard daily actions; SD-007 owns comprehensive upcoming-deadline context. V1 stays read-only, static, and free of automatic planning or persistence.

## Proposed Approach and Impact Map

Extend the existing shared `academicContext` with a small typed fixture: current-week objectives, two Assignments, and authored Study Tasks for PHY and fictional WRT, plus a zero-task fictional course. Add tiny selection/progress helpers in the same local data module. Reuse a Study Task display component on Weekly Plan and Course Page. Update Course Cards and Dashboard to use the same progress helper. Replace the Dashboard's now-stale study-plan placeholder with weekly progress and a Weekly Plan link. Keep Today as its SD-006 placeholder.

Expected changes: `academic-context.ts`, Weekly Plan route, Dashboard route, Course Card, Course Page, a reusable task list. No raw Course files, dependencies, new primary routes, task mutation, or future infrastructure.

## Acceptance Criteria

1. Weekly Plan displays every current-week Objective, relevant Assignment, and Study Task under its Course with Learn/Deliver/Do meanings clear. A task without an Objective remains visible.
2. Study Task cards show authored planned dates, static completion states, and supplied duration only. Completed and earlier unfinished tasks remain visible on their original dates.
3. A task linked to both an Objective and Assignment appears and counts once. Assignment due dates never replace task planned dates.
4. Course progress agrees across Courses, Dashboard cards, Course Page, and Weekly Plan; Dashboard overall progress uses raw task totals. Zero-task Course says “No study tasks planned” without a percentage.
5. All routes remain read-only, known/unknown Course routing remains correct, and mobile/desktop layout stays usable.

## Verification Plan

Inspect fixture IDs/relationships and independently calculate expected counts; run lint, typecheck, build, and meaningful targeted invariant checks. Verify production routes and browser-visible content across four views, including responsive and empty states. Review diff and Git scope before finalization.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
