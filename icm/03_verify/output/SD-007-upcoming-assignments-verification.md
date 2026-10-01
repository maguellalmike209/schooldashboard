# SD-007 — Upcoming assignments and Milestone 1 integration verification

## Status

PASS

## SD-007 evidence

- Canonical fixture and selector inspection confirmed Assignments have stable IDs and explicit authored order. The three upcoming obligations render on Dashboard in deadline order: HIS Map quiz due September 25, WRT Response draft due September 27, and PHY Problem #1 due September 28. A synthetic selector check excluded an earlier deadline and preserved authored order for equal due dates without mutating input.
- Production HTML and browser inspection confirmed Dashboard deadline context, Course-scoped upcoming sections, and Weekly Plan Deliver sections. HIS shows a due-today Assignment with zero Study Tasks; Today contains no HIS task. Linked PHY Study Task cards show September 25 as planned date and Problem #1's September 28 deadline. No Assignment submission/completion state appears.
- Course Pages and Weekly Plan resolve the same canonical Assignment IDs. No sixth route, dependency, service, mutation control, or future infrastructure was introduced.

## Milestone 1 integration evidence

- Lint, typecheck, and production build passed. Production HTTP returned 200 for Dashboard, Courses, all three Course Pages, Weekly Plan, and Today; unknown Course returned 404. Browser navigation activated Courses and a Course Card correctly; keyboard Tab showed a visible 2 px focus outline and Enter opened Today.
- Independent fixture checks confirmed unique Course/Assignment/Study Task identity, valid Course ownership, same-Course Objective and Assignment links, and the single linked PHY task counted once. Weekly Plan and Course Pages showed matching task IDs by Course. Today and Dashboard selected the same three incomplete September 25 tasks in authored order; Dashboard Next Action was their first. The completed September 25 task stayed in Weekly Plan/Course Page, and the earlier unfinished September 24 task did not move to Today.
- Raw current-week Study Task counts yielded PHY 2/5, WRT 1/2, HIS 0/0, and overall 3/7. HIS displayed the zero-task message without a percentage. WRT's Today task showed no fabricated duration or relationship. The date-only PHY lecture remained Course schedule context rather than a timed Class Meeting; Course Materials stayed separate from Objectives, Assignments, and Study Tasks.
- Browser checks at 375 px and 1280 px across Dashboard, Courses, PHY/HIS Course Pages, Weekly Plan, and Today found no horizontal overflow. A mobile screenshot showed readable Assignment cards and clear deadline, schedule, and study-plan sections. Source and diff inspection found no task mutation, submission status, persistence, authentication, AI, integration, secret, credential, or raw/private Course file.
- `git diff --check` passed. The first independent page-wide task-order assertion expected fixture order and failed because Weekly Plan groups by Course; a corrected assertion checked authored order within each Course and passed. No product code changed during Verify.

## Automatic repairs

None.

## Remaining limitations

The fixture has no timed Class Meetings; the date-only PHY lecture is presented without an invented time or room. There is no committed automated test suite or CI gate yet. Neither limits the approved static V1 behavior or the full PASS.

## Next action

Promote verified project state, mark SD-007 Done and Milestone 1 complete, make one SD-007 commit, normally push, confirm alignment, then stop.
