# SD-003 — Courses view and course cards Verification

## Human Review Summary

- Verification result: **PASS**.
- Proven: Both shared courses appear as cards on Courses and Dashboard, each links to its matching route, and unknown IDs return 404. Zero-task cards show no misleading percentage. Checks and responsive inspection passed.
- Not proven: No separate keyboard activation test was completed for the new cards; semantic links and visible focus classes were inspected.
- Automatic repair: Dashboard lecture association now looks up its Course by `courseId` rather than array position.
- Mike's review focus: None required for technical completion.
- Learning takeaway: Shared records keep Course identity consistent across cards, routes, and schedule context.
- Next action: Finalize task automatically.

## Verification Target and Results

1. `academicContext.courses` contains PHY 009D and one fictional WRT 101; both render once on `/courses` and in compact Dashboard cards. Browser AX and DOM inspection confirmed both links in each view.
2. Browser selection of WRT 101 opened `/courses/wrt-101` with its matching heading. Production HTTP returned 200 for `/`, `/courses`, both known course routes, and 404 for `/courses/unknown-course`.
3. Cards show “This week's study tasks / No study tasks planned.” No numeric percentage, class time, or unsupported Course Fact was added. The PHY lecture remains associated by Course ID.
4. Browser inspection at mobile and desktop widths showed readable content and `scrollWidth <= innerWidth`; source inspection confirmed semantic links and focus-visible styling.
5. `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed after the repair. The build includes all five routes.

## Regression and Scope

Dashboard term/date/PHY lecture and existing navigation remained present in browser inspection. The final diff contains only SD-003 plan, shared course context, card/component/page changes, status, verified implementation documentation, and this evidence. No dependency, secret, raw Course material, persistence, or mutation was added.

## Final Status

PASS — documentation promoted and task marked Done; one task-scoped commit and normal push authorized by the repository workflow.
