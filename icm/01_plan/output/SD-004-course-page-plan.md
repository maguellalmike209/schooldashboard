# SD-004 — Course Page

## Human Review Summary

- Mike's next actions: None.
- Decisions requiring Mike: None.
- Learn before Build: Course week context describes scheduled Course Facts; Study Tasks and objectives are personal planning records introduced in later tasks.
- Current blockers: None.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Objective and Current State

Turn the known-course placeholder into a course-specific page with current-week/topic and static material context. SD-003 provides two shared course identities, links, and unknown-ID handling; no Course Page academic detail, materials, objectives, tasks, assignments, or progress exist yet.

## Requirements and Non-Goals

- The selected route shows only its matching Course identity and supplied current-week/topic and Course Material context.
- PHY 009D context uses sanitized facts from `MOCK_DATA_SPEC.md`: the reference week begins the course, sound review/introductory relativity, scheduled Lecture #02 topics, and the assigned textbook.
- The lightweight fictional WRT 101 course has no supplied week topics or materials; show clear missing-context states without borrowing PHY data.
- Unknown course IDs retain a clear 404.
- SD-005–SD-007 own the later addition of objectives, Study Tasks, progress, and deadlines. No uploads, material links, ingestion, Course editing, or generated roadmap.

## Relevant Invariants and Approach

Keep one shared academic context and relate week context/materials to Courses by stable `courseId`. Course Facts remain labeled as schedule/material context, never as authored Study Tasks. Keep the existing dynamic route and use local static data, semantic sections, and responsive layout.

## Impact Map

Expected: shared academic context and Course Page route. Inspect: SD-003 Course Cards, route not-found state, Dashboard lecture. No change to Weekly Plan, Today, or future services.

## Acceptance Criteria

1. PHY route shows its identity, reference-week dates, scheduled topic context, and the assigned textbook without fabricating a time, room, reading assignment, or download link.
2. WRT route shows its identity and honest absence of supplied week/material context; no PHY detail appears.
3. Unknown route remains 404 with a clear not-found state.
4. Course Card navigation remains correct; Dashboard PHY lecture remains correct; Course Page is readable at mobile and desktop widths.
5. The page stays read-only and the diff remains inside SD-004 scope.

## Verification Plan

Inspect per-course relationship filtering and fact wording; run lint, typecheck, and build; check known/unknown production routes, browser navigation, and mobile/desktop layout. Review Git scope and private-data safety.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
