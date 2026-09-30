# SD-006 — Today

## Human Review Summary

- Mike's next actions: None.
- Decisions requiring Mike: None.
- Learn before Build: Today and Dashboard Next Action are derived selections over the canonical Study Tasks, not separately stored plans.
- Current blockers: None.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Objective and Current State

Complete the dedicated Today view and the Dashboard's actionable daily summary from the SD-005 static fixture. Today is a placeholder and Dashboard currently shows weekly progress and course context, but no actionable daily plan. The fixture contains seven Study Tasks with fixed reference date 2026-09-25.

## Required Behavior and Boundaries

- Select only incomplete tasks whose planned date exactly equals the shared reference date, ordered by authored order. The first selected task is Next Action; when none exists, show a truthful empty state.
- Today shows each selected task's Course, action, supplied duration, and canonical Objective/Assignment context. Omit absent duration. Assignment due date is context, not the task date.
- Dashboard provides a prominent Next Action and compact daily list from the same selection, with a path to Today. Preserve existing weekly progress and course context.
- No task carryover, deadline priority, generated work, mutation, persistence, new primary route, dependency, or SD-007 upcoming list.

## Approach and Impact Map

Add a pure `getTodayStudyTasks` selection and `getNextAction` helper beside existing fixture selectors. Render the selected tasks on Today with a small daily task component that resolves Course and Objective/Assignment identity. Use that component or compact presentation on Dashboard. Existing Weekly Plan and Course Page remain regression targets. No fixture values need changing.

Expected changes: `src/lib/academic-context.ts`, `src/app/today/page.tsx`, `src/app/page.tsx`, and at most one task-local display component.

## Acceptance Criteria

1. Today shows exactly task IDs `phy9d-task-review-lecture-02`, `wrt101-task-organize-notes`, `phy9d-task-begin-problem-1`, in that order, for fixed September 25. Earlier unfinished and completed reference-day tasks are absent.
2. Today shows correct Course identity and supported Objective/Assignment relationships. The WRT task has no invented duration or relationship; the PHY Problem #1 task keeps September 25 as planned date and September 28 as Assignment due date.
3. Dashboard daily summary uses those same IDs and order. Next Action is `phy9d-task-review-lecture-02`, regardless of Assignment deadline or duration. Today navigation works.
4. Empty selections produce no replacement task and a meaningful empty state. Study Task content is read-only.
5. Known routes, unknown Course 404, weekly progress, mobile/desktop layout, and navigation remain correct.

## Verification Plan

Independently inspect the fixture and selection logic, challenge it with a synthetic input where earlier, complete, out-of-order, linked, and empty tasks coexist, then check rendered production HTML for task IDs/order/context and Dashboard consistency. Run lint, typecheck, build, route smoke checks, mobile/desktop browser inspection, read-only/diff review.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
