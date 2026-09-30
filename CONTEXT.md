# School Dashboard — Context Router

## 1. Purpose

This file is the primary context router for the School Dashboard repository.

Its job is NOT to explain the entire product.

Its job is to tell agents:

- which source owns which kind of truth,
- which documents should be loaded for a task,
- which context should remain unloaded,
- and how task-specific context connects to durable project context.

Use progressive disclosure.

Read only the context needed to perform the current task correctly.

---

# 2. Global Agent Rules

Global agent behavior is defined in:

`AGENTS.md`

Read it before meaningful planning, implementation, or verification work if it
has not already been loaded.

`AGENTS.md` defines rules such as:

- scope discipline,
- smallest coherent changes,
- human review,
- Git safety,
- verification expectations,
- product-invariant handling,
- documentation discipline,
- Plan → Build → Verify behavior,
- and full-task automation boundaries.

Do not duplicate those instructions here.

---

# 3. Durable Source-of-Truth Map

Use the following routing table to determine which durable document owns the
information needed for the current task.

| Need | Source of truth |
| --- | --- |
| Human-readable project introduction | `README.md` |
| Long-term product purpose and future direction | `docs/PRODUCT_VISION.md` |
| Current V1 product behavior, academic semantics, invariants, acceptance criteria, and exclusions | `docs/V1_SPEC.md` |
| Screen hierarchy, UI responsibilities, presentation expectations, and reusable UI concepts | `docs/UI_SPEC.md` |
| Static academic fixture semantics, source-backed mock context, identity, relationships, derivations, and fixture validation | `docs/MOCK_DATA_SPEC.md` |
| Current technical direction and system boundaries | `docs/ARCHITECTURE.md` |
| Accepted durable product and engineering decisions | `docs/DECISIONS.md` |
| Verified current implementation reality and verification limits | `docs/IMPLEMENTATION.md` |
| Task IDs, sequencing, milestone status, and roadmap state | `docs/TASKS.md` |

Load only the entries relevant to the current task.

---

# 4. Product Context Routing

## If the task concerns WHY the product exists or where it may eventually go

Read:

`docs/PRODUCT_VISION.md`

Examples:

- future course ingestion,
- course intelligence,
- source grounding,
- AI-assisted planning,
- adaptive replanning,
- student approval of generated plans,
- future Course Roadmap behavior.

Do not treat future Product Vision capabilities as authorization to implement
them.

---

## If the task concerns WHAT V1 must do

Read:

`docs/V1_SPEC.md`

Examples:

- the five primary views,
- academic concepts,
- Today behavior,
- Assignment behavior,
- Study Task behavior,
- weekly progress,
- current read-only scope,
- V1 exclusions,
- product invariants.

For current V1 behavior, `V1_SPEC.md` is the primary product source of truth.

---

# 5. UI Context Routing

## If the task concerns HOW approved V1 information should be presented

Read:

`docs/UI_SPEC.md`

Examples:

- Dashboard information hierarchy,
- Next Action prominence,
- Course Card responsibilities,
- Weekly Plan presentation,
- Today task presentation,
- empty states,
- reusable UI concepts,
- responsive behavior,
- basic accessibility expectations.

`UI_SPEC.md` controls presentation expectations.

It does not redefine the academic meaning established in `V1_SPEC.md`.

If UI expectations appear to conflict with V1 behavior, surface the conflict
rather than silently overriding V1.

---

# 6. Static Academic Data Routing

## If the task concerns mock/static academic data

Read:

`docs/MOCK_DATA_SPEC.md`

Examples:

- Course IDs,
- Study Task IDs,
- Assignment relationships,
- Learning Objective relationships,
- source-backed fixture information,
- Course Fact vs personal-plan distinctions,
- reference date,
- authored ordering,
- fixture provenance,
- derived Today tasks,
- derived Upcoming Assignments,
- progress derivation,
- validation of mock relationships.

The static fixture exists to support V1.

It is NOT automatically a production database design.

Do not convert its objects directly into persistence infrastructure unless a
later accepted task explicitly designs persistence.

---

# 7. Technical Context Routing

## If the task concerns architecture or technical boundaries

Read:

`docs/ARCHITECTURE.md`

Examples:

- planned initial stack,
- current application boundary,
- allowed infrastructure,
- current data-flow direction,
- conceptual future architecture layers.

Future architecture descriptions are direction only unless their milestone has
been separately planned and accepted.

---

# 8. Decision Routing

## If an existing durable choice may constrain the task

Read:

`docs/DECISIONS.md`

Examples:

- approved product boundaries,
- source authority principles,
- student-control rules,
- accepted stack choices,
- workflow conventions,
- Git automation boundaries.

Do not reopen an accepted durable decision during Build merely because another
approach is possible.

If the task genuinely requires changing a durable decision, return the issue to
Plan and Human Review.

---

# 9. Implementation Reality Routing

## If the task depends on what currently exists

Read:

`docs/IMPLEMENTATION.md`

Then inspect the actual repository files involved.

`IMPLEMENTATION.md` is a guide to verified current state.

It does NOT replace direct repository inspection when implementation exists.

Specifications and plans describe intended behavior.

They are not proof that the behavior is implemented.

---

# 10. Task and Roadmap Routing

## If the task concerns sequencing, status, or dependencies

Read:

`docs/TASKS.md`

Examples:

- current task ID,
- dependency order,
- milestone,
- completion target,
- whether a future capability is deferred.

A task appearing in `TASKS.md` is roadmap context.

It is not permission to begin that task automatically.

An explicit user instruction may authorize one named task to proceed through
its complete ICM lifecycle.

That authorization does not automatically extend to the next roadmap task.

---

# 11. ICM Stage Routing

Meaningful project work uses three logical stages:

```text
Plan
↓
Build
↓
Verify
```

Read and obey the instructions for each active stage.

A single user instruction may authorize one complete task to move through all
three stages without requiring a separate prompt between them.

Stage separation still matters.

One-prompt automation does NOT mean Plan, Build, and Verify become one
undifferentiated activity.

---

## Planning

`icm/01_plan/CONTEXT.md`

Use when:

- requirements need interpretation,
- implementation approach must be designed,
- acceptance criteria must be established,
- architecture or product decisions remain,
- the task spans meaningful implementation work.

Task-specific Plan artifacts, when justified, live under:

`icm/01_plan/output/`

When the active instruction authorizes the complete task lifecycle and Plan
reaches:

`READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED`

the agent may proceed directly into Build.

---

## Building

`icm/02_build/CONTEXT.md`

Use when:

- an accepted requirement or Plan is ready for implementation.

Build should:

- use the accepted Plan as its task-specific baseline,
- inspect repository reality before editing,
- implement inside the accepted scope,
- run proportionate Build checks,
- inspect the resulting diff,
- and hand the implementation into Verify.

Build does not normally commit unfinished current-task implementation.

Task-specific Build artifacts, when justified, live under:

`icm/02_build/output/`

When the active instruction authorizes the complete task lifecycle and Build
completes successfully, the agent may proceed directly into Verify.

---

## Verification

`icm/03_verify/CONTEXT.md`

Use when:

- meaningful implementation needs independent evaluation against requirements.

Verify must independently evaluate the implementation rather than treating Build
claims as proof.

After a full PASS, Verify may perform authorized routine finalization:

```text
promote verified current-state documentation
↓
mark task Done
↓
stage only task-related files
↓
create one task-scoped commit
↓
perform a normal safe push
```

Task-specific Verify artifacts, when justified, live under:

`icm/03_verify/output/`

---

# 12. Full-Task Automation Routing

When Mike explicitly authorizes one named task to run through the complete ICM
workflow, use:

```text
Plan
↓
Build
↓
Verify
↓
PASS
↓
documentation promotion
↓
task status Done
↓
task-scoped commit
↓
normal safe push
```

The agent should continue automatically between stages when:

- requirements are clear,
- no material human decision remains,
- no blocker exists,
- scope remains accepted,
- security/privacy boundaries remain intact,
- and no destructive Git operation is required.

Stop when:

- a material product decision is unresolved,
- a material architecture decision is unresolved,
- requirements are materially ambiguous,
- accepted scope must expand,
- a significant dependency or external service needs approval,
- security or privacy requires human judgment,
- destructive Git work would be required,
- local and remote history genuinely diverge and safe resolution is unclear,
- unrelated user work cannot be safely isolated,
- or another concrete blocker prevents trustworthy continuation.

A full-task instruction authorizes the named task only.

Do not automatically begin the next roadmap task after completion unless Mike
explicitly authorizes multi-task continuation.

---

# 13. Task-Specific Context

When a task has an accepted Plan artifact, load that artifact when entering
Build or Verify.

Example:

`icm/01_plan/output/SD-004-course-page-plan.md`

That artifact provides the task-specific implementation contract.

It does NOT replace durable project documents.

Think of context as:

```text
Global agent rules
        ↓
Context router
        ↓
Relevant durable project truth
        ↓
Active ICM stage rules
        ↓
Accepted task-specific plan
        ↓
Repository reality
```

Do not load historical task artifacts unless they materially affect the current
task.

---

# 14. Recommended Context Sets

These are routing examples, not mandatory fixed bundles.

---

## Example — Application Foundation

Likely context:

```text
AGENTS.md
CONTEXT.md
docs/ARCHITECTURE.md
docs/TASKS.md
docs/IMPLEMENTATION.md
docs/DECISIONS.md
active ICM stage
```

Probably unnecessary:

```text
docs/UI_SPEC.md
docs/MOCK_DATA_SPEC.md
raw Course materials
future Product Vision details
```

unless planning reveals a concrete reason to inspect them.

---

## Example — Courses View and Course Cards

Likely context:

```text
AGENTS.md
CONTEXT.md
docs/V1_SPEC.md
docs/UI_SPEC.md
docs/MOCK_DATA_SPEC.md
docs/ARCHITECTURE.md
docs/IMPLEMENTATION.md
docs/DECISIONS.md
docs/TASKS.md
active ICM stage
accepted SD-003 Plan after Plan completes
relevant existing application files
```

---

## Example — Dashboard UI

Likely context:

```text
AGENTS.md
CONTEXT.md
docs/V1_SPEC.md
docs/UI_SPEC.md
docs/MOCK_DATA_SPEC.md
docs/ARCHITECTURE.md
docs/IMPLEMENTATION.md
docs/DECISIONS.md
accepted task Plan
active ICM stage
```

---

## Example — Static Academic Fixture

Likely context:

```text
AGENTS.md
CONTEXT.md
docs/V1_SPEC.md
docs/MOCK_DATA_SPEC.md
docs/IMPLEMENTATION.md
accepted task Plan
active ICM stage
```

Load `UI_SPEC.md` only if fixture design depends on a specific presentation
requirement.

---

## Example — Future Course Ingestion

When that future milestone is actually authorized, likely context would include:

```text
AGENTS.md
CONTEXT.md
docs/PRODUCT_VISION.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
docs/IMPLEMENTATION.md
docs/TASKS.md
active ICM stage
```

Do not load or implement that future capability during the current V1 merely
because it is documented.

---

# 15. Context Minimization Rules

Do not automatically load:

- every file in `docs/`,
- every previous Plan artifact,
- every previous Verify artifact,
- raw Course materials,
- the complete textbook,
- unrelated source files,
- future milestone documentation,

merely for completeness.

More context is not automatically better context.

Load information when it materially helps answer:

- what must be built,
- what must remain unchanged,
- how the task is constrained,
- how success will be verified.

---

# 16. Course Materials Are Not Default Agent Context

Raw academic materials such as:

- textbooks,
- syllabi,
- lecture slides,
- student notes,
- worksheets

should not be loaded for ordinary application-development tasks unless the task
actually depends on their content.

For the initial UI milestone, normalized static academic information belongs in
the shared fixture.

Do not repeatedly load large raw Course documents merely to build UI components.

Future ingestion tasks may intentionally require those materials.

---

# 17. Conflict Handling

If durable sources disagree materially:

DO NOT:

- guess,
- silently choose the easiest interpretation,
- change product behavior during Build.

Instead:

1. identify the disagreement,
2. determine which document owns the disputed responsibility,
3. inspect accepted durable decisions,
4. surface the conflict,
5. return to Plan or Human Review when necessary.

Examples:

Product semantics:

`V1_SPEC.md`

Presentation expectations:

`UI_SPEC.md`

Static fixture semantics:

`MOCK_DATA_SPEC.md`

Technical boundary:

`ARCHITECTURE.md`

Implemented reality:

`IMPLEMENTATION.md`

Accepted durable decision:

`DECISIONS.md`

---

# 18. Repository Reality Wins for Implementation State

Documentation may become stale.

When a task touches implementation that already exists:

inspect the actual repository.

If:

```text
documentation
≠
repository reality
```

do not silently assume either is correct.

Identify the discrepancy.

Product requirements may still require the implementation to change.

But claims about what CURRENTLY exists must be grounded in repository evidence.

---

# 19. Progressive Disclosure Principle

The preferred context-loading sequence is:

```text
1. AGENTS.md
2. CONTEXT.md
3. active ICM stage
4. docs/TASKS.md when task identity or sequencing matters
5. docs/IMPLEMENTATION.md when existing implementation matters
6. only other relevant durable sources
7. accepted task Plan when entering Build or Verify
8. relevant repository files
```

The exact order may vary when repository inspection needs to happen earlier.

The important rule is:

> Load the smallest context set that allows the task to be completed correctly
> without forcing the agent to guess.

Do not optimize for maximum context.

Optimize for relevant context.

---

# 20. Current Project Entry Point

Read `docs/TASKS.md` for current task status and sequencing, and
`docs/IMPLEMENTATION.md` for verified implementation reality.

A roadmap entry does not authorize execution. Mike's active instruction defines
the task scope. A one-task instruction may authorize that named task through the
complete ICM lifecycle, but does not authorize beginning the next task.
