# School Dashboard — Architecture

## Current state

The repository contains documentation and ICM instructions only. No application structure, routes, components, data fixtures, schemas, or runtime configuration exist. [IMPLEMENTATION.md](IMPLEMENTATION.md) records current implementation reality.

## Planned initial technical direction

| Technology | Intended role |
| --- | --- |
| Next.js | Application framework and page/navigation structure |
| React | Student-facing UI components |
| TypeScript | Types for UI code and mock academic data |
| Tailwind CSS | UI styling |

These are planned choices, not installed dependencies. Exact versions, package manager, initialization options, and directory conventions will be resolved during SD-001 planning against the repository state at that time.

## Initial UI boundaries

The conceptual data flow is local mock/hardcoded academic plan → selections and progress summaries → the five primary views: Dashboard, Courses, Course Page, Weekly Plan, and Today. The product vocabulary, relationships, view behavior, date rules, and progress calculation are owned by [V1_SPEC.md](V1_SPEC.md). This describes a boundary, not a prescribed schema or file layout.

The mock plan supplies course identity, the term/week/reference day, objectives, assignment deadlines, task associations, optional duration estimates, authored order, and completion state. It also supplies dated class meetings with display times and static material references. All views must use the same underlying plan so that a task shown in several places is still one task and progress totals agree. Display filtering and task-count arithmetic are sufficient; this is not a scheduling or recommendation engine.

Materials and class meetings provide academic context, not separate document-processing or calendar subsystems. Upcoming assignments and course cards can be reused across the primary views without creating additional primary screens. Conceptual relationships do not require dedicated tables, services, repositories, or a file for each entity. The read-only prototype has no user mutation or persistence boundary to implement.

Use the smallest structure needed for [V1_SPEC.md](V1_SPEC.md). There is no V1 persistence, authentication layer, uploads, external research, external integration, or AI service. Do not build placeholder service layers, schemas, credentials, or integration scaffolding for possible future work.

Page paths, component boundaries, mock data shapes, and the technical implementation of the specified date/progress rules should be defined when a task needs them. Product semantics are already defined in V1_SPEC.md and must not be reinvented during Build. Record lasting technical choices in [DECISIONS.md](DECISIONS.md) after acceptance; do not describe proposed code as existing architecture.

## Future architecture direction

The following are conceptual responsibilities for later milestones, not existing components or instructions to scaffold them. [PRODUCT_VISION.md](PRODUCT_VISION.md) owns the full product pipeline, source hierarchy, and student-control principles; [TASKS.md](TASKS.md) owns the non-authorizing capability roadmap.

| Future layer | Conceptual boundary |
| --- | --- |
| Presentation/UI | Present course facts, plans, provenance, suggestions, and student review controls with their meanings distinguishable. |
| Academic domain data | Represent the academic concepts and relationships without collapsing objectives, assignments, and study tasks. Keep source-backed obligations distinct from personal planning choices. |
| Persistence | Retain student-controlled academic data, accepted plans, and reported progress when a persistence milestone is approved. |
| Course-material ingestion | Turn supplied materials into candidate academic information while retaining origin and uncertainty. |
| Source/provenance handling | Preserve source identity and current-course context, distinguish external research and AI inference, and expose conflicts according to the product's source-grounding principles. |
| Course intelligence | Use grounded academic information to support course understanding and proposed course roadmaps; supplemental research cannot silently overwrite authoritative facts. |
| Planning engine | Suggest task breakdowns, durations, weekly/daily plans, and later adjustments for student review. Suggestions do not silently become accepted plans. |
| External integrations | Exchange information with approved external tools while preserving source context and the student's control of their plan. |

These responsibilities need not become separate services. Data shapes, storage schemas, APIs, service boundaries, queues, parsers, retrieval/embedding approaches, algorithms, and provider choices remain unselected. There is no scheduling, priority, or numerical confidence formula established here.

Supabase remains a possible persistence choice, and Google Calendar and Google Drive remain possible integrations. Their security, authorization, synchronization, and technical design require later Plan tasks. No production infrastructure or future-layer implementation is authorized by this document.
