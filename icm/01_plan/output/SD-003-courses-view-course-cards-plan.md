# SD-003 — Courses view and course cards

## Human Review Summary

- Mike's next actions: None.
- Decisions requiring Mike: None.
- Learn before Build: A Course Card is a view of a shared Course record. Weekly progress will be derived from shared Study Tasks when SD-005 supplies them.
- Current blockers: None. HTTPS fetch and dry-run push verified access to the configured GitHub repository after SSH authentication failed.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Objective and Current State

Replace the single-link Courses placeholder with a course overview and reuse its Course Card on Dashboard. The app currently has one PHY 009D course embedded in `academicContext`; `/courses` contains one plain link, and Dashboard has no course card. There are no Study Tasks yet.

## Requirements and Non-Goals

- Show every shared static Course with recognizable identity, current-week Study Task state, and a link to its own Course Page.
- Reuse the same card concept in a compact Dashboard Current Courses section.
- Preserve the fixed term/reference week and PHY 009D lecture context.
- SD-004 owns Course Page detail; SD-005 owns weekly task data and progress; SD-006/007 own Today and deadlines. No mutation, persistence, ingestion, or invented PHY Course Facts.

## Relevant Invariants and Approach

Use one shared course array in the existing academic context. Add one lightweight fictional course so the overview and route association cover multiple courses. Keep PHY facts separate from fictional course identity. A card with no weekly tasks says “No study tasks planned” and shows no percentage. The course route resolves by ID and retains a limited placeholder until SD-004.

## Impact Map

Expected: `academic-context.ts`, Courses route, Dashboard route, Course Page route lookup, a reusable card component. Inspect: shell and navigation. Leave Today, Weekly Plan, future services, and raw Course materials untouched.

## Acceptance Criteria

1. Courses shows each shared Course once with code/name, zero-task weekly state, and a working link to the corresponding Course Page.
2. Dashboard reuses the same Course Card concept in a compact Current Courses section.
3. Each known course route identifies the selected course; an unknown ID remains a clear 404.
4. PHY lecture context remains correctly associated; no unsupported class time, deadline, or progress percentage appears.
5. The page and cards remain readable at mobile and desktop widths, with visible keyboard focus.

## Verification Plan

Inspect the shared data and route association; run lint, typecheck, and build; check known/unknown routes and inspect mobile/desktop layout and keyboard links. Review the final diff for SD-003 scope and privacy.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
