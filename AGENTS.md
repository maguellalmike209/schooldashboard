# School Dashboard — Agent Instructions

## 1. Purpose of This File

This file defines the global operating rules for agents working in the School
Dashboard repository.

It does NOT contain the full product specification.

Start with:

`CONTEXT.md`

Then load only the durable documents and ICM stage instructions relevant to the
current task.

Inspect repository reality before editing.

Documentation describes intended truth.

Repository files and successful verification establish implemented truth.

---

# 2. Project Purpose

School Dashboard is a personal academic planning application centered on one
question:

> **What should I do today to stay on track in my classes?**

The long-term product may eventually transform course materials, schedules,
assignments, and student context into:

```text
Course understanding
        ↓
Course roadmap
        ↓
Weekly objectives
        ↓
Daily Study Tasks
        ↓
Student review
        ↓
Progress and replanning
```

The current implementation milestone is intentionally much smaller.

The first UI milestone uses static/hardcoded academic data and does NOT
implement the future intelligence pipeline.

Consult:

`docs/V1_SPEC.md`

for the complete current scope.

---

# 3. Progressive Context Loading

Do not load every project document automatically.

Read the smallest set of context necessary to complete the current task
correctly.

The root:

`CONTEXT.md`

is the context router.

Use it to identify the relevant source of truth.

Examples:

If working on product behavior:

read:

`docs/V1_SPEC.md`

If working on screen hierarchy or UI presentation:

read:

`docs/UI_SPEC.md`

If working on static academic fixtures, identity, relationships, dates,
provenance, or derived mock data:

read:

`docs/MOCK_DATA_SPEC.md`

If working on technical boundaries or architecture:

read:

`docs/ARCHITECTURE.md`

If working on task sequencing:

read:

`docs/TASKS.md`

If checking accepted durable choices:

read:

`docs/DECISIONS.md`

If determining what actually exists:

read:

`docs/IMPLEMENTATION.md`

Do not read unrelated documents merely because they exist.

---

# 4. Source-of-Truth Responsibilities

Each durable document has a distinct responsibility.

## `PRODUCT_VISION.md`

Owns:

- long-term product direction,
- future course ingestion,
- future source grounding,
- future course intelligence,
- future planning,
- future AI/human-control principles,
- adaptive replanning direction.

It does NOT authorize implementation of those future capabilities.

---

## `V1_SPEC.md`

Owns:

- current product behavior,
- academic semantics,
- V1 invariants,
- acceptance requirements,
- current exclusions.

For V1 behavior, this is the primary product source of truth.

---

## `UI_SPEC.md`

Owns:

- information hierarchy,
- responsibilities of each primary view,
- presentation expectations,
- reusable UI concepts,
- UI-level guardrails.

It does NOT override V1 product semantics.

---

## `MOCK_DATA_SPEC.md`

Owns:

- static V1 academic fixture semantics,
- stable identity,
- source-backed fixture context,
- Course Fact vs personal-plan distinctions,
- data relationships,
- derivation rules,
- fixture validation.

It is NOT a production database schema.

---

## `ARCHITECTURE.md`

Owns:

- current technical direction,
- technical boundaries,
- conceptual future architecture.

---

## `DECISIONS.md`

Owns:

- accepted durable product and engineering decisions.

Do not add a decision merely because an agent chose something during
implementation.

Only promote choices that are genuinely durable and accepted.

---

## `IMPLEMENTATION.md`

Owns:

- verified current implementation reality,
- actual setup,
- actual behavior,
- known verification limits.

Plans and specifications are not implementation evidence.

---

## `TASKS.md`

Owns:

- task IDs,
- task sequence,
- milestone status,
- roadmap state.

A roadmap item is not authorization to implement it.

---

# 5. Requirements Precedence and Conflict Handling

Do not silently choose between contradictory project documents.

If relevant durable documents disagree:

1. identify the conflicting statements,
2. determine which document owns the disputed responsibility,
3. stop the affected implementation if behavior is materially ambiguous,
4. surface the conflict during Plan or Human Review.

Do not resolve product ambiguity by writing code first.

For example:

If `UI_SPEC.md` appears to require presentation behavior that contradicts a
product invariant in `V1_SPEC.md`:

`V1_SPEC.md` owns the product behavior.

Surface the mismatch instead of quietly changing either interpretation during
Build.

---

# 6. Current V1 Boundary

The initial UI milestone uses static/hardcoded academic information.

It may use sanitized static data manually derived from realistic course
materials.

However, V1 does NOT dynamically perform:

- AI planning,
- external course research,
- syllabus parsing,
- PDF analysis,
- document extraction,
- assignment extraction,
- learning-objective generation,
- Study Task generation,
- duration estimation,
- prioritization,
- scheduling,
- adaptive replanning,
- database persistence,
- authentication,
- multiple-user behavior,
- Google Calendar integration,
- Google Drive integration,
- material uploads,
- task mutation,
- plan editing.

Do not implement future capabilities simply because their concepts appear in:

- `PRODUCT_VISION.md`,
- future sections of `ARCHITECTURE.md`,
- or future milestones in `TASKS.md`.

Future context explains direction.

It does not expand current task scope.

---

# 7. Product Invariants Are Hard Guardrails

When implementing student-facing behavior, read the relevant invariants in:

`docs/V1_SPEC.md`

and any applicable contract in:

`docs/UI_SPEC.md`

or:

`docs/MOCK_DATA_SPEC.md`

Treat documented invariants as non-negotiable unless Mike explicitly accepts a
change.

Examples include:

- one shared academic plan,
- stable Study Task identity across views,
- Assignment deadline is different from Study Task planned date,
- Today includes only incomplete Study Tasks planned for the reference date,
- earlier unfinished Study Tasks do not automatically move to Today,
- Next Action is the first Today Study Task in authored order,
- weekly progress counts Study Tasks only,
- Course Facts remain distinct from personal planning,
- V1 remains read-only.

Do not infer different behavior because:

- another UX pattern seems more common,
- generated code makes another structure easier,
- a framework encourages another architecture,
- or an existing component suggests another interpretation.

---

# 8. Do Not Invent Product Behavior During Build

If Build requires a product decision that the accepted plan and durable
documents do not answer:

STOP.

Do not silently invent:

- a new academic entity,
- a new relationship,
- a new sorting rule,
- a new date rule,
- a new progress rule,
- a new priority rule,
- a new screen,
- a new interaction,
- a new persistence behavior,
- a new AI behavior.

Return the issue to Plan or Human Review.

Implementation convenience is not permission to redefine the product.

---

# 9. Smallest Coherent Change

Follow the user's requested task scope.

Make the smallest coherent change that fully satisfies the accepted
requirements.

Avoid:

- unrelated refactors,
- speculative infrastructure,
- premature abstractions,
- unnecessary dependencies,
- future-feature scaffolding,
- rebuilding working code for style alone.

Do not implement adjacent roadmap items merely because they appear easy while
the relevant files are open.

Example:

If the active task is:

`SD-003 — Courses view and course cards`

do not also build:

- Course Page,
- database persistence,
- course creation,
- Google Calendar integration,
- AI-generated progress.

---

# 10. Inspect Before Editing

Before making meaningful code changes:

1. inspect the current repository,
2. inspect relevant existing files,
3. inspect Git status,
4. read the accepted task plan when one exists,
5. read only the durable context relevant to the task,
6. understand existing conventions before introducing new ones.

Do not assume:

- a file exists,
- a route exists,
- a dependency is installed,
- a feature is implemented,
- documentation matches reality.

Confirm repository state.

---

# 11. Plan → Build → Verify

Meaningful work follows:

```text
Plan
 ↓
Human approval when required
 ↓
Build
 ↓
Verify
 ↓
Commit only when explicitly authorized
```

Stage instructions live at:

- `icm/01_plan/CONTEXT.md`
- `icm/02_build/CONTEXT.md`
- `icm/03_verify/CONTEXT.md`

Read the active stage instructions instead of duplicating them here.

---

## Plan

Use Plan to determine:

- exact scope,
- relevant context,
- affected files,
- acceptance criteria,
- implementation approach,
- verification strategy,
- unresolved decisions.

A plan is not ready if Build must still guess about a major piece of product
behavior.

---

## Build

Build implements an understood and accepted requirement.

Build should:

- follow the accepted plan,
- inspect before editing,
- stay inside scope,
- make reviewable changes,
- preserve product invariants,
- report deviations honestly.

Build must not reinterpret the task merely because another implementation seems
easier.

---

## Verify

Verify independently evaluates whether the implementation actually satisfies
the accepted requirements.

Do not treat Build claims as proof.

Verification should compare:

```text
Requirement
vs.
Repository reality
vs.
Observed evidence
```

---

# 12. Stage Artifacts

ICM stage output directories are task-driven working locations.

Use them when the task benefits from a durable artifact.

Do not generate artifacts merely because the folders exist.

Examples:

```text
icm/01_plan/output/
icm/02_build/output/
icm/03_verify/output/
```

A meaningful Plan may produce a planning artifact.

A meaningful Verify may produce a verification artifact.

A Build does not need a fake artifact if its meaningful output is the actual
code change.

---

# 13. Teaching Requirement

School Dashboard is also a software-learning project.

Mike should remain able to understand the important engineering decisions being
made.

When introducing a meaningful concept:

1. briefly state what it is,
2. explain why it is being used here,
3. explain where it fits in this project.

Keep explanations concise unless deeper learning is requested.

Do not hide important architecture or product decisions behind generated code.

Do not create unnecessary teaching overhead for trivial syntax.

---

# 14. Human Review

Mike remains the decision-maker for meaningful product and architecture choices.

When several reasonable choices materially affect:

- product behavior,
- architecture,
- dependencies,
- data relationships,
- security,
- long-term maintainability,

surface the decision instead of silently choosing a major direction.

Do not invent approval questions when one option is already clearly required by
the accepted specification.

Human review is for real choices, not ceremony.

---

# 15. Dependency Discipline

Do not add a dependency unless it provides clear value for the current task.

Before adding a non-obvious dependency, determine:

- what problem it solves,
- why existing platform/framework capabilities are insufficient,
- whether the dependency creates unnecessary complexity.

Prefer existing Next.js, React, TypeScript, Tailwind, and browser capabilities
when reasonable.

Do not install a library merely to avoid writing a small amount of ordinary
code.

---

# 16. Static Academic Data Is Not a Database Design

The structure described in:

`docs/MOCK_DATA_SPEC.md`

supports the V1 prototype.

Do not automatically translate mock objects into:

- database tables,
- ORM models,
- Supabase schemas,
- production APIs.

When persistence is eventually planned, re-evaluate the product model based on
what the UI prototype taught us.

The mock fixture is a product-testing tool.

It is not a locked production storage design.

---

# 17. Course Materials and Repository Safety

Course materials may include:

- instructor files,
- Canvas content,
- textbooks,
- lecture slides,
- student notes.

Do not automatically copy or commit raw course materials into the repository.

Use fictional or sanitized academic fixture data when appropriate.

Do not reproduce large copyrighted source materials inside application source
files merely to support the prototype.

Preserve privacy and source restrictions.

---

# 18. Security

Never expose or commit:

- API keys,
- passwords,
- access tokens,
- credentials,
- secrets,
- private environment values.

When future tasks introduce secrets, use appropriate environment handling.

Do not commit private academic or personal information merely because it is
convenient for testing.

---

# 19. Git Discipline

Always inspect Git state before meaningful work.

Pay attention to:

- modified files,
- staged files,
- untracked files,
- unexpected changes.

Do NOT:

- commit,
- push,
- merge,
- reset,
- rebase,
- rewrite history,
- delete branches,
- discard uncommitted work

unless Mike explicitly authorizes that Git action.

Do not assume that task completion includes a commit.

Commit only after the relevant work has been reviewed and verified.

---

# 20. Documentation Discipline

Update durable documentation only when the task actually changes durable truth.

Examples:

Update `V1_SPEC.md` when:

- accepted V1 behavior changes.

Update `DECISIONS.md` when:

- a genuine durable choice is accepted.

Update `IMPLEMENTATION.md` when:

- verified implementation reality changes meaningfully.

Update `TASKS.md` when:

- task status or accepted sequencing changes.

Do not edit documentation simply to make the diff look comprehensive.

Do not record planned behavior as implemented behavior.

---

# 21. Implementation Reality

Specifications may describe behavior that does not exist yet.

Plans may describe files that have not been created yet.

Build may claim something works.

None of those are sufficient proof.

When reporting current implementation:

use repository inspection and verification evidence.

If something has not been verified, say so.

Do not state:

> implemented and working

when the available evidence only supports:

> code exists.

---

# 22. Verification Discipline

Verification should be proportional to the task.

Possible checks include:

- file inspection,
- TypeScript checks,
- linting,
- build validation,
- runtime smoke testing,
- route testing,
- visual inspection,
- behavioral checks,
- targeted data-invariant checks.

Do not run unrelated expensive checks simply to appear thorough.

Do not skip meaningful checks merely because code looks correct.

Report:

- what was checked,
- what passed,
- what failed,
- what could not be verified,
- what evidence supports completion.

---

# 23. Scope Failure Rule

If during implementation you discover that completing the accepted task
requires substantial work outside its approved scope:

STOP.

Report:

1. what requirement created the issue,
2. why the current task cannot safely complete without expanding scope,
3. the smallest decision or follow-up task needed.

Do not quietly absorb a second project task into the current one.

---

# 24. No Premature Future Infrastructure

The long-term product may eventually include:

- Supabase,
- authentication,
- Google Calendar,
- Google Drive,
- course-material ingestion,
- AI,
- external research,
- planning engines,
- adaptive replanning.

These possibilities do NOT justify adding infrastructure today.

Only introduce future infrastructure when:

1. its milestone is active,
2. its task has been planned,
3. its scope has been accepted.

---

# 25. Completion Standard

A task is complete only when:

- the accepted scope is satisfied,
- relevant acceptance criteria are met,
- product invariants are preserved,
- implementation remains inside scope,
- proportionate verification succeeds,
- unresolved blockers are surfaced,
- durable documentation is accurate when updates are required.

Do not mark incomplete work as complete.

---

# 26. Current Project State

The repository currently begins from a documentation and ICM foundation.

The first actual implementation task is:

`SD-001 — Initialize Next.js Application`

Do not begin SD-001 merely because it appears in `TASKS.md`.

Task roadmap entries are not authorization.

When SD-001 is explicitly started, follow:

```text
Plan
↓
Build
↓
Verify
```

according to the repository ICM.