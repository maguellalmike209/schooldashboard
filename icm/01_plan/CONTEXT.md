# School Dashboard ICM — Plan Stage

## 1. Purpose

The Plan stage exists to understand and design non-trivial work before
implementation begins.

A good Plan should:

- reduce uncertainty,
- prevent unnecessary work,
- identify the correct project boundaries,
- protect product invariants,
- and give Build a clear path to follow.

The goal is NOT to produce a long planning document.

The goal is:

> Produce enough specific, reliable context that Build can implement the task
> without redesigning the feature or guessing about important behavior.

School Dashboard is a side project intended to move quickly.

Use planning effort in proportion to the risk and complexity of the task.

Do not create process for process's sake.

---

# 2. Development Autonomy Mode

School Dashboard intentionally allows more agent autonomy than a highly
controlled production project.

Default rule:

> Make low-risk, reversible, task-local decisions autonomously when existing
> project context provides enough guidance.

Mike does NOT need to approve every:

- file name,
- component split,
- helper function,
- CSS organization choice,
- local TypeScript type,
- small refactor required by the task,
- straightforward framework convention,
- minor responsive-layout choice,
- implementation detail with no durable product impact.

Surface a decision to Mike only when it materially affects one or more of:

- product behavior,
- V1 scope,
- durable architecture,
- academic semantics,
- user data,
- security or privacy,
- a significant new dependency,
- an external service,
- an irreversible or destructive operation,
- substantial future maintainability,
- or the accepted task boundary.

Do not ask Mike to choose between equivalent low-risk implementation details
merely because several options exist.

When one option clearly fits the repository and accepted specifications, choose
it and explain the choice briefly.

---

# 3. Full-Task Automation

A single instruction from Mike may authorize one named task to proceed through
the complete School Dashboard workflow:

```text
Plan
↓
Build
↓
Verify
↓
PASS
↓
promote verified documentation
↓
mark task Done
↓
task-scoped commit
↓
normal safe push
```

Plan, Build, and Verify remain separate logical stages.

A one-prompt workflow does NOT mean the stages should be collapsed into one
undifferentiated activity.

Each stage must:

- load its own instructions,
- perform its own responsibilities,
- respect its own boundaries,
- and produce the evidence or handoff needed by the next stage.

When the active instruction authorizes the complete task lifecycle, Plan should
continue automatically into Build if:

- requirements are sufficiently clear,
- no material human decision remains,
- the accepted scope is understood,
- no blocker exists,
- and the task is safe to continue.

Do not create a manual approval checkpoint merely because planning completed.

Plan should stop only when human judgment is materially required.

A full-task instruction authorizes the named task only.

It does NOT automatically authorize starting the next roadmap task.

---

# 4. Automation vs Human Review

The normal School Dashboard workflow is:

```text
Plan
↓
resolve ordinary planning and implementation choices autonomously
↓
surface only material decisions when necessary
↓
Build
↓
Verify
↓
PASS
↓
automatic routine task finalization
```

A task does NOT require a separate human approval round merely because a Plan
artifact exists.

If:

- requirements are clear,
- no material product or architecture decision remains,
- no blocker exists,
- the proposed change is reversible,
- scope is understood,
- and the current instruction authorizes continuation,

the Plan should conclude:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

and proceed directly into Build.

If Mike explicitly requests planning only, stop after Plan.

Stage autonomy does not override the user's explicitly limited requested scope.

Human review is for meaningful choices.

It is not a routine stage transition.

---

# 5. When to Use Plan

Use the Plan stage when work requires meaningful reasoning before
implementation.

Typical examples include:

- new product features,
- new pages or meaningful UI flows,
- shared data-model changes,
- cross-file behavior,
- new routes,
- architecture changes,
- persistence,
- authentication,
- third-party integrations,
- AI or ingestion features,
- security-sensitive changes,
- significant refactors,
- unclear requirements,
- or work with important acceptance criteria.

Do not require a formal Plan for trivial work whose implementation is already
obvious.

Examples that may not need a full Plan:

- correcting copy,
- fixing a typo,
- adjusting straightforward spacing,
- renaming a clearly scoped variable,
- fixing an obvious small styling defect,
- or another contained reversible change.

Use process in proportion to risk.

---

# 6. Current V1 Planning Boundary

For the initial School Dashboard UI milestone, plan around:

- static/hardcoded academic data,
- one shared academic plan,
- five primary student views,
- read-only behavior,
- realistic but static Course Facts,
- authored Learning Objectives,
- authored Study Tasks,
- authored completion states,
- authored dates and durations.

Current V1 does NOT authorize:

- databases,
- Supabase,
- authentication,
- multiple users,
- material uploads,
- syllabus ingestion,
- PDF extraction,
- external Course research,
- AI planning,
- automatic Study Task generation,
- automatic prioritization,
- automatic scheduling,
- adaptive replanning,
- Google Calendar,
- Google Drive.

Consult:

`docs/V1_SPEC.md`

for the complete current boundary.

Future capabilities described elsewhere are context, not current authorization.

---

# 7. Required Context

Before meaningful planning:

1. Read root `AGENTS.md`.
2. Read root `CONTEXT.md`.
3. Read this Plan-stage context.
4. Identify the active task from the explicit instruction and `docs/TASKS.md`
   when sequencing matters.
5. Use the root context router to identify only the durable sources relevant to
   the task.
6. Inspect relevant repository reality when implementation already exists.
7. Inspect Git state when existing local work may affect planning or safe
   continuation.

Do not automatically load every project document.

Do not assume roadmap position from stale historical artifacts.

Use current task state and repository reality.

---

# 8. Common Durable Sources

Depending on the task, relevant context may include:

## `docs/PRODUCT_VISION.md`

Use when:

- long-term product intent matters,
- future capabilities affect interpretation of current work,
- source grounding or human-control principles matter.

---

## `docs/V1_SPEC.md`

Use when:

- current behavior,
- academic semantics,
- product invariants,
- scope,
- acceptance criteria,
- or exclusions matter.

This is the main product source for current V1 behavior.

---

## `docs/UI_SPEC.md`

Use when:

- planning a page,
- UI component,
- information hierarchy,
- navigation experience,
- empty state,
- responsive behavior,
- or other presentation responsibility.

---

## `docs/MOCK_DATA_SPEC.md`

Use when:

- static academic fixtures,
- task identity,
- Course relationships,
- reference date,
- provenance,
- source-backed Course Facts,
- derived Today behavior,
- Assignment relationships,
- or progress derivation matter.

---

## `docs/ARCHITECTURE.md`

Use when:

- technical boundaries,
- framework structure,
- data flow,
- routes,
- system responsibilities,
- integrations,
- or architecture matter.

---

## `docs/IMPLEMENTATION.md`

Use when:

- the task modifies existing implementation,
- current code reality matters,
- previous verified behavior constrains the change.

---

## `docs/DECISIONS.md`

Use when:

- a durable accepted decision may constrain the solution.

Do not reopen settled decisions merely because another implementation is
possible.

---

## `docs/TASKS.md`

Use when:

- task identity,
- dependencies,
- sequencing,
- milestone boundaries,
- or task status matter.

A task being next in the roadmap does not authorize execution by itself.

---

# 9. Do Not Plan From Documentation Alone When Code Exists

When implementation already exists:

inspect it.

Determine:

- what exists,
- what actually works,
- what is already shared,
- what patterns exist,
- what tests or verification mechanisms exist,
- what routes exist,
- what dependencies exist,
- and whether documentation matches repository reality.

Do not plan a replacement for functionality that already solves the task.

Do not assume documentation proves implementation.

---

# 10. Planning Workflow

For meaningful tasks, work through the following reasoning sequence.

The output does not need to mirror every step as a large section if the task is
simple.

---

## Step 1 — Define the Objective

State clearly:

- what problem is being solved,
- which user experience or system behavior is affected,
- and what successful completion should accomplish.

Avoid vague objectives.

Weak:

> Improve the Dashboard.

Better:

> Build the Courses primary view and reusable Course Card behavior using the
> shared static academic fixture while preserving the current read-only V1
> boundary.

---

## Step 2 — Establish Current State

Inspect what currently exists.

Determine:

- relevant files,
- relevant routes,
- relevant components,
- relevant data,
- existing patterns,
- verified behavior,
- missing behavior,
- known limitations,
- and relevant Git state.

If implementation does not exist yet, say so directly.

Do not invent an existing structure merely because one is likely to appear
later.

---

## Step 3 — Identify Requirements

Separate:

### Required

Behavior needed to satisfy the active task.

### Useful but optional

Improvements that may be implemented only if they naturally fit without
expanding scope.

### Out of scope

Behavior intentionally excluded from the active task.

Use V1 exclusions aggressively.

Do not build future functionality because it seems useful.

---

## Step 4 — Identify Relevant Product Invariants

For student-facing behavior, identify the V1 invariants that constrain the task.

Examples may include:

- one shared academic plan,
- stable Study Task identity,
- Today filtering rules,
- authored ordering,
- Assignment due date vs Study Task planned date,
- weekly progress rules,
- Course Fact vs personal planning distinction,
- read-only behavior.

Do not repeat every invariant in every Plan.

Include only those that materially constrain the active task.

---

## Step 5 — Identify Constraints

Record constraints that materially affect the solution.

Examples:

- existing architecture,
- V1 scope,
- accepted stack,
- static-data boundary,
- existing route conventions,
- relevant UI contract,
- relevant mock-data contract,
- security rules,
- dependency restrictions,
- previously accepted decisions,
- predecessor implementation that must remain working.

Do not design around hypothetical future constraints.

---

## Step 6 — Design the Smallest Coherent Solution

Propose the simplest implementation that fully satisfies the active task.

Prefer:

- existing project patterns,
- framework conventions,
- shared components where justified,
- simple data flow,
- small helpers,
- direct implementation.

Avoid:

- speculative service layers,
- premature abstraction,
- unnecessary context providers,
- unnecessary state management,
- future-proofing for unapproved features,
- unnecessary dependencies,
- giant generic component systems.

A solution may touch several files when those files naturally belong to the
same behavior.

Smallest does not mean "fewest files."

It means:

> no unnecessary system.

---

# 11. Local Decisions the Agent May Make Automatically

Plan may resolve task-local choices autonomously when they are:

- reversible,
- low risk,
- contained,
- compatible with durable requirements,
- and do not establish a meaningful project-wide convention.

Examples:

- local helper function names,
- whether a small display fragment becomes a local component,
- ordinary TypeScript type organization,
- Tailwind class composition,
- normal responsive stacking,
- straightforward file placement that matches existing conventions,
- a simple utility required by the task,
- semantic HTML structure,
- minor accessibility implementation details.

Record important local choices when useful.

Do not ask Mike to approve them individually.

---

# 12. Decisions That Require Mike

Surface a decision when it materially changes:

## Product behavior

Example:

Should unfinished Study Tasks automatically carry into Today?

That changes the product.

Mike should decide.

---

## Durable architecture

Example:

Should School Dashboard introduce a global state library?

That may affect the entire application.

Mike should approve.

---

## Significant dependency

Example:

Should a third-party scheduling library be added?

Mike should approve if the dependency is materially significant.

---

## Scope

Example:

A task appears to require editing behavior even though V1 is read-only.

That changes task or product scope.

Mike should decide.

---

## Security / privacy

Example:

A proposed implementation would commit real private Course materials to the
repository.

Stop and surface the issue.

---

## External service

Example:

A task unexpectedly requires Google OAuth.

That requires separate planning and approval.

---

## Destructive or irreversible work

Example:

A Git or data operation would destroy or rewrite existing work.

Stop and obtain approval.

---

# 13. Do Not Invent Decisions

Not every choice is a "Decision for Mike."

Do not ask questions such as:

> Should I use `map()` or a loop?

> Should this local helper live above or below the component?

> Should I use `gap-4` or `space-y-4`?

These are ordinary implementation details.

Choose reasonably.

Human review should focus on decisions worth human attention.

---

# 14. Impact Map

Identify the expected impact of the task.

Useful categories include:

### Expected to change

Files or areas likely to be edited.

### May need inspection

Files needed to understand the change.

### Should remain untouched

Areas specifically outside scope.

Example:

```text
Expected to change:
- Courses route
- reusable Course Card component
- shared static academic data when required by the accepted task

May need inspection:
- existing navigation
- Dashboard shell
- mock academic specification

Should remain untouched:
- persistence
- AI
- authentication
- Google integrations
```

The exact format may vary.

---

# 15. Acceptance Criteria

Every meaningful Plan should define observable acceptance criteria.

Acceptance criteria describe behavior.

They should NOT merely describe implementation effort.

Weak:

> Create a Course component.

Better:

> The Courses primary view shows every approved static Course, each Course Card
> exposes the information required by the UI specification, and selecting a
> Course uses the existing Course Page route without inventing unsupported
> academic information.

Acceptance criteria should be specific enough that Verify can independently
determine whether implementation succeeded.

---

# 16. Acceptance Criteria Should Cover Relevant Edges

When meaningful, consider:

- expected behavior,
- empty state,
- unknown input,
- data association,
- cross-view consistency,
- ordering,
- missing optional information,
- responsive behavior,
- accessibility,
- regression risk.

Do not invent dozens of meaningless edge cases.

Focus on cases that could realistically reveal incorrect behavior.

---

# 17. Verification Must Be Planned Before Build

For each important acceptance criterion, determine how it can be verified.

Possible methods include:

- TypeScript checking,
- linting,
- production build,
- automated tests,
- targeted unit tests,
- browser/runtime inspection,
- route navigation,
- visual inspection,
- fixture validation,
- targeted code inspection.

Use the strongest practical evidence proportional to the task.

Do not add a testing framework solely because verification needs to occur if
simpler evidence is sufficient.

Plan should leave Verify with clear targets rather than vague instructions to
"check everything."

---

# 18. UI Planning

When planning a student-facing UI task, distinguish:

```text
Product behavior
→ V1_SPEC.md

Presentation responsibility
→ UI_SPEC.md

Static academic information
→ MOCK_DATA_SPEC.md

Technical implementation
→ task Plan
```

Do not allow the task Plan to redefine product behavior that belongs in the
durable specifications.

---

# 19. Static Data Planning

When a task requires static academic data:

- use the shared academic plan,
- preserve stable identities,
- preserve Course ownership,
- derive view-specific data,
- preserve authored ordering,
- do not fabricate missing Course Facts,
- do not convert the static fixture into database infrastructure.

The Plan may specify the TypeScript representation needed by the active task.

That representation is implementation detail unless it establishes a durable
architecture decision.

---

# 20. Source-Material Planning

Raw academic materials are not normal context for UI implementation.

Do not load:

- complete textbooks,
- complete syllabi,
- every lecture note,
- every screenshot,

unless the active task actually depends on their content.

For the V1 UI, prefer the normalized static fixture.

This keeps context focused and reduces unnecessary token usage.

---

# 21. Dependency Planning

If implementation may require a new dependency:

first determine whether:

- Next.js already provides the capability,
- React already provides the capability,
- the browser already provides the capability,
- an existing project dependency already solves it,
- or a small local implementation is simpler.

Only surface dependency approval when the new package is materially significant.

Tiny development tooling required by the already-approved framework setup may be
resolved according to the task Plan when conventional and low risk.

---

# 22. Risks and Unknowns

Record uncertainty that could affect the solution.

Distinguish:

### Blocker

Prevents Build.

### Material open decision

Needs Mike.

### Implementation uncertainty

Build can investigate safely.

### Deferred future work

Not relevant to current completion.

Do not label ordinary unknown implementation details as blockers.

---

# 23. Planning for Fast Iteration

Because this is a side project, optimize for useful iteration.

Prefer:

```text
small useful feature
↓
verify
↓
finish
```

over:

```text
design entire future system
↓
build large abstraction
↓
discover product assumption was wrong
```

Plans should favor changes that are:

- easy to inspect,
- easy to reverse,
- easy to verify,
- useful to the current product.

---

# 24. Plan Output Artifact

For meaningful planned work, create a task-specific Plan artifact under:

`icm/01_plan/output/`

Example:

`SD-004-course-page-plan.md`

Do not use generic names such as:

`plan.md`

or:

`notes.md`

Create an artifact only when the task benefits from a durable planning record.

Do not create a Plan artifact for every trivial change.

---

# 25. Plan Artifact Structure

A substantial Plan artifact should normally use:

```text
# <Task ID> — <Task Name>

## Human Review Summary

## Objective

## Current State

## Requirements

## Non-Goals

## Relevant Product Invariants

## Constraints

## Proposed Approach

## Impact Map

## Acceptance Criteria

## Implementation Steps

## Verification Plan

## Risks / Open Questions

## Build Readiness
```

Sections may be shortened or omitted when they add no value.

Do not add empty ceremony.

---

# 26. Human Review Summary

The Plan artifact should begin with a concise summary that allows Mike to review
the important parts quickly without reading the entire technical Plan.

Use:

## Mike's Next Actions

Include only actions Mike genuinely needs to perform.

Maximum five.

If none:

`None.`

---

## Decisions Requiring Mike

Include only material choices requiring human approval.

For each:

- explain the choice,
- give the recommended option,
- explain the consequence briefly.

If none:

`None.`

Do not list ordinary task-local implementation decisions here.

---

## Learn Before Build

Use three levels.

### Must Understand Before Build

Only concepts Mike needs to understand in order to make a required decision or
meaningfully review risk.

### Can Learn During Build

Useful concepts that will be easier to learn while inspecting actual code.

### Not Needed Yet

Concepts that sound relevant but are outside the current task.

Keep this concise.

Do not turn every Plan into a tutorial.

---

## Current Blockers

Include only conditions that actually prevent Build.

If none:

`None.`

Risks are not automatically blockers.

---

## Automation Status

State one of:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

```text
READY FOR BUILD AFTER LISTED APPROVAL
```

```text
BLOCKED
```

When the complete task lifecycle is authorized and the status is:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

continue directly into Build.

Do not wait for another prompt.

---

# 27. Learn Before Build Should Not Become Friction

Teaching remains important, but School Dashboard should move quickly.

Do not require Mike to study every framework concept before implementation.

A concept belongs under:

### Must Understand Before Build

only when misunderstanding it would make Mike unable to responsibly approve a
material decision.

Otherwise prefer:

### Can Learn During Build

Examples that often can be learned during Build:

- a straightforward React component pattern,
- a simple TypeScript type,
- a route convention,
- ordinary Tailwind layout,
- a helper function.

Learning should support progress, not block it unnecessarily.

---

# 28. Proposed Approach

The Proposed Approach should explain:

- what structure will be used,
- how data/control flows,
- why it is the simplest suitable option,
- important tradeoffs.

Do not describe every line of code that Build will write.

Plan the system boundary.

Let Build handle local implementation detail.

---

# 29. Implementation Steps

Provide an ordered sequence that Build can follow.

Each step should:

- have a clear purpose,
- build on previous steps,
- remain inside scope,
- be reasonably reviewable.

Avoid vague instructions such as:

> Build the page.

Prefer:

```text
1. Inspect the existing route and shared shell.
2. Extend the shared static Course data only as required by this task.
3. Build the reusable Course Card using existing project conventions.
4. Render the Courses primary view from shared data.
5. Preserve the existing Course Page route relationship.
6. Add required responsive and accessibility behavior.
7. Run targeted Build checks.
8. Inspect the final task diff.
9. Hand the implementation into Verify.
```

Build should not need to redesign the feature from scratch.

---

# 30. Build Autonomy

Once the Plan establishes:

- behavior,
- boundaries,
- acceptance criteria,
- relevant invariants,
- expected affected areas,

Build may make ordinary implementation decisions autonomously.

Build does not need to return to Plan for:

- local naming,
- minor file organization,
- small helper extraction,
- ordinary framework patterns,
- trivial styling choices,
- equivalent low-risk implementation details.

Return to Plan only when a discovery materially affects:

- accepted behavior,
- architecture,
- task scope,
- acceptance criteria,
- durable decisions,
- security,
- privacy,
- major dependencies,
- or external services.

---

# 31. Plan Deviation Threshold

Build may deviate from a local implementation detail in the Plan when repository
reality makes another low-risk approach clearly better.

Example:

Plan expected:

`components/course-card.tsx`

but repository conventions place feature-local components somewhere more
appropriate.

Build may follow the existing convention if:

- product behavior does not change,
- architecture does not materially change,
- acceptance criteria remain valid,
- scope remains unchanged.

Document the meaningful local deviation in the Build handoff.

Do not force obsolete Plan detail merely for procedural purity.

---

# 32. Durable Decision Handling

If planning establishes a meaningful project-wide choice, classify it as a
potential durable decision.

Examples:

- route conventions,
- durable data ownership,
- source authority rules,
- security boundaries,
- major technology selection,
- intentional V1 limitations.

Do not automatically write every task-local choice to:

`docs/DECISIONS.md`

Durable decision candidates require acceptance.

When a durable decision is already implied by existing accepted documentation,
do not create a duplicate decision merely to restate it.

---

# 33. Documentation Changes During Plan

Plan may identify required documentation changes.

Do not update:

`docs/IMPLEMENTATION.md`

to describe functionality that has not yet been built and verified.

Do not mark the active task Done during Plan.

Do not promote planned behavior into verified current-state documentation.

Product requirements may be updated during Plan only when Mike has actually
accepted a requirements change.

Do not rewrite requirements to match a preferred implementation.

Routine implementation-state documentation belongs after successful Verify.

---

# 34. Plan Quality Check

Before declaring a meaningful Plan ready, confirm it answers:

```text
What are we building?

Why are we building it?

What currently exists?

What must remain unchanged?

What is in scope?

What is explicitly out of scope?

Which product invariants matter?

What approach will Build use?

What areas should change?

What areas should remain untouched?

What acceptance criteria define success?

How will Verify prove those criteria?

Are any material human decisions unresolved?

Is anything actually blocking Build?
```

If Build would still have to guess about a major piece of product behavior, the
Plan is not ready.

If Build only needs to resolve ordinary implementation detail, the Plan is
ready.

---

# 35. Build Readiness

A task is ready for Build when:

1. the objective is clear,
2. relevant current state has been inspected,
3. required behavior is defined,
4. non-goals are clear,
5. relevant invariants are identified,
6. the proposed solution is coherent,
7. acceptance criteria are observable,
8. verification has been planned,
9. material uncertainty is resolved or explicitly surfaced,
10. no blocker remains.

Then state:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

or:

```text
READY FOR BUILD AFTER LISTED APPROVAL
```

as appropriate.

When the active instruction authorizes the complete task lifecycle and the
result is:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

the next action is:

```text
load Build stage instructions
↓
proceed into Build
```

Do not create a redundant human checkpoint.

---

# 36. Final Plan Handoff

At the end of meaningful Plan work, provide a concise handoff.

Use:

## Plan Status

One of:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
READY FOR BUILD AFTER LISTED APPROVAL
BLOCKED
```

---

## What Will Be Built

Short description of the accepted task.

---

## Important Boundaries

Only the boundaries Build is most likely to accidentally cross.

---

## Decisions Made Automatically

Mention meaningful task-local choices made autonomously when useful.

Do not list trivial choices.

---

## Decisions Requiring Mike

Only material unresolved choices.

If none:

`None.`

---

## Verification Targets

The most important behaviors Verify must later prove.

---

## What Mike Should Understand

Only the highest-value concept or decision from the Plan.

If nothing important needs explanation:

`None.`

---

## Next Stage

If:

```text
READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
```

and the active user instruction authorizes the complete task lifecycle:

```text
Proceed directly to Build.
```

If:

```text
READY FOR BUILD AFTER LISTED APPROVAL
```

stop for the required approval.

If:

```text
BLOCKED
```

state the concrete blocker and the smallest next action required.

---

# 37. Stage Transition Safety

Automatic transition from Plan into Build is allowed only when it preserves the
accepted task boundary.

Do not continue automatically if planning reveals:

- unresolved product behavior,
- unresolved academic semantics,
- a material architecture choice,
- significant dependency uncertainty requiring approval,
- security or privacy concerns,
- required external-service adoption,
- destructive work,
- scope expansion,
- or another genuine blocker.

Ordinary implementation uncertainty does not require a stop.

Build may investigate ordinary technical details safely.

The purpose of Plan is to remove material uncertainty.

It is not to eliminate every unknown before implementation.

---

# 38. One-Prompt Task Boundary

When Mike provides a full-task instruction such as:

> Complete SD-003 using the repository ICM workflow.

interpret that as authorization to complete SD-003 through:

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
mark SD-003 Done
↓
task-scoped commit
↓
normal safe push
```

subject to all repository safety and human-review boundaries.

Do NOT interpret it as authorization to begin:

`SD-004`

after SD-003 completes.

One task prompt means:

> finish this task completely.

It does not mean:

> continue indefinitely through the roadmap.

---

# 39. Current Roadmap Awareness

Use:

`docs/TASKS.md`

for current task sequencing and status.

Do not hardcode a historical task such as SD-001 into the global Plan stage
instructions.

The Plan stage must remain reusable as School Dashboard advances.

Mike's explicit instruction remains the execution authorization. A task's
roadmap position does not independently authorize execution.
