# School Dashboard — Tasks

The documentation/ICM foundation is in place. SD-001 through SD-003 are **Done**; later application tasks below remain **Not started**. A listed task is roadmap context, not authorization to execute it.

Use the `SD-XXX` prefix for project tasks. Move tasks through Not started → In progress → Ready for verification → Done; use Blocked only with a concrete blocker and next step. Mark Done only after sufficient verification, recording relevant evidence and updating [IMPLEMENTATION.md](IMPLEMENTATION.md) when actual behavior changes.

## Milestone 1 — Initial UI with mock/hardcoded data

All work follows the conceptual model, five primary views, and read-only behavior in [V1_SPEC.md](V1_SPEC.md). The existing SD-001 through SD-007 sequence is preserved:

| ID | Task | Status | Depends on | Completion target |
| --- | --- | --- | --- | --- |
| SD-001 | Initialize Next.js application | Done | — | Initialize the planned Next.js, React, TypeScript, and Tailwind CSS stack in the existing repository while preserving the documentation; verify the scaffold and document actual setup/run/check commands. |
| SD-002 | Dashboard shell and navigation | Done | SD-001 | Establish the Dashboard and navigation supporting Dashboard, Courses, Course Page, Weekly Plan, and Today, with shared mock term/reference-day/week context and source-supported date-only lecture schedule context. Connect course, progress, next-action, study, and deadline summaries as SD-003–SD-007 land. |
| SD-003 | Courses view and course cards | Done | SD-002 | Build the Courses primary view and reusable Dashboard course cards from shared mock courses; detail navigation is completed with SD-004 and weekly task progress with SD-005. |
| SD-004 | Course Page | Not started | SD-003 | Open the correct mock course with current-week/topic and static material context; handle unknown courses and connect scoped objectives, tasks, progress, and deadlines as SD-005–SD-007 land. |
| SD-005 | Weekly Plan | Not started | SD-004 | Build Weekly Plan as a primary view with objectives, deliverables, and dated study tasks distinguished, including tasks without objectives. Use mock completion states for consistent weekly progress across Dashboard, Courses, Course Page, and Weekly Plan; connect deadline context with SD-007. |
| SD-006 | Today | Not started | SD-005 | Build Today as a primary view showing incomplete tasks planned for the reference day in authored order, with supplied duration estimates and course/objective/assignment context. Connect the Dashboard's daily summary and next study action; preserve the read-only boundary. |
| SD-007 | Upcoming assignments | Not started | SD-006 | Integrate upcoming assignments and deadline context into Dashboard, Course Page, Weekly Plan, and linked Today tasks as specified; no sixth primary screen is required. Verify all five views against the shared canonical academic fixture defined in [MOCK_DATA_SPEC.md](MOCK_DATA_SPEC.md), including the PHY 009D reference context and the V1 relationship, date, and progress scenarios. |

Each task should define proportionate acceptance and verification detail through the ICM workflow before implementation. SD-001 established the application foundation; SD-002 established the shared shell and route structure; SD-003 established shared Course Cards. SD-004 is next.

## Future capability roadmap — direction only

These milestone-level descriptions are non-authorizing product direction beyond current V1. Their capability scope, implementation order within each milestone, technology choices, and delivery dates require later planning and acceptance. Do not create implementation task IDs or scaffolding until that work is actually scoped and authorized. [PRODUCT_VISION.md](PRODUCT_VISION.md) supplies the intended experience and durable principles.

| Milestone | Possible capabilities |
| --- | --- |
| 2 — Persistent personal dashboard | A real academic term; course creation/editing; persisted assignments, learning objectives, study tasks, and progress; student-controlled editing. |
| 3 — Course materials and ingestion | Course onboarding, material upload/linking, syllabus ingestion, document text and academic-information extraction, and source provenance. |
| 4 — Course intelligence | University/course enrichment, source reconciliation, grounded course understanding, course roadmap generation, and student review of extracted/generated course structure. |
| 5 — Planning engine | Weekly objective suggestions, assignment decomposition, study-task generation, duration estimation, availability-aware planning, daily scheduling, and plan approval. |
| 6 — Adaptive planning | Use completion tracking, including remaining work, to detect missed tasks and suggest revised plans for student approval. This extends progress recording from the personal-dashboard milestone rather than delaying all progress tracking until here. |
| 7 — Integrations | Possible Google Calendar and Google Drive connections, calendar-aware study planning, and course schedule synchronization. |

All of these capabilities remain outside the mock UI milestone. Authentication, multiple users, notifications, grade tracking, and submission workflows have no accepted later scope merely because they appear in V1's exclusions. Use [V1_SPEC.md](V1_SPEC.md) for the complete current boundary and [ARCHITECTURE.md](ARCHITECTURE.md) for conceptual future responsibilities. Future roadmap entries do not select providers or authorize implementation.
