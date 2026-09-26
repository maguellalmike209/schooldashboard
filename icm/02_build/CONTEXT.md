# School Dashboard ICM — Build Stage

## 1. Purpose

The Build stage exists to turn an understood School Dashboard requirement or
accepted Plan into working project changes.

Build should:

- implement the requested behavior,
- preserve accepted product semantics,
- remain inside task scope,
- make the smallest coherent change,
- use repository conventions where practical,
- run useful implementation checks,
- and leave the work ready for independent Verify.

The goal is NOT to maximize:

- code written,
- files changed,
- abstractions introduced,
- documentation generated.

The goal is:

> Produce the simplest correct implementation that satisfies the accepted task
> and can be meaningfully verified.

School Dashboard is a side project intended to move quickly.

Build should therefore automate ordinary implementation work aggressively while
preserving the important product, architecture, security, and scope guardrails.

---

# 2. Development Autonomy

Build has authority to make ordinary low-risk implementation decisions without
asking Mike for approval.

Examples include:

- local variable names,
- helper-function names,
- ordinary component decomposition,
- reasonable file organization,
- semantic HTML structure,
- Tailwind utility choices,
- straightforward responsive behavior,
- small TypeScript types,
- local utility functions,
- ordinary Next.js conventions,
- small task-local refactors needed for the implementation,
- simple accessibility improvements,
- equivalent low-risk implementation details.

These decisions should be:

- reversible,
- task-local,
- consistent with repository conventions,
- consistent with the accepted Plan,
- and compatible with durable project requirements.

Do not stop implementation merely because more than one reasonable local
solution exists.

Choose the clearest reasonable solution and continue.

---

# 3. When Build Must Stop

Build must stop and surface the issue when implementation reveals a decision
that materially changes:

- product behavior,
- V1 scope,
- academic semantics,
- durable architecture,
- accepted data relationships,
- security or privacy,
- a significant dependency,
- an external service,
- the accepted task boundary,
- destructive behavior,
- or a previously accepted durable decision.

Examples:

### Product change

The implementation would automatically move unfinished Study Tasks into Today.

STOP.

That contradicts accepted V1 behavior.

---

### Scope expansion

A Course Page task suddenly appears to require Course editing.

STOP.

Editing is outside current V1.

---

### Durable architecture

Implementation appears to require introducing a global state-management library.

STOP and surface the decision if that change is materially project-wide.

---

### Security / privacy

Implementation would require committing private Course files or credentials.

STOP.

---

### Significant dependency

A third-party dependency would become a substantial project dependency rather
than a trivial setup tool.

STOP and surface the tradeoff.

---

### Destructive operation

Implementation would delete user or project data.

STOP unless the destructive action was explicitly approved.

---

# 4. When to Use Build

Use Build when the task requires creating, modifying, or removing actual
implementation.

Examples include:

- initializing the application,
- creating routes,
- creating UI components,
- implementing navigation,
- adding static academic fixtures,
- implementing derived academic-data helpers,
- building page behavior,
- fixing bugs,
- adding validation,
- writing targeted tests,
- updating configuration required by the accepted task,
- or implementing an accepted architecture change.

Do not use Build merely to explore what should be created.

Meaningful unresolved design belongs in:

`icm/01_plan/`

---

# 5. Build Entry Conditions

Before substantial implementation, Build should be able to answer:

```text
What are we building?

Why are we building it?

What behavior is required?

What is explicitly out of scope?

Which product invariants constrain the task?

What repository areas are expected to change?

What acceptance criteria define success?

How is the result expected to be verified?
```

For non-trivial work, these answers should normally come from an accepted Plan.

If Build would still need to invent an important part of product behavior, the
task is not ready.

Return to Plan.

If only ordinary implementation details remain, continue autonomously.

---

# 6. Required Context

Before implementation:

1. Read the root `AGENTS.md`.
2. Read the root `CONTEXT.md`.
3. Read this Build-stage context.
4. Read the accepted task Plan when one exists.
5. Use the root context router to load only the durable sources relevant to the
   task.
6. Inspect the actual repository files involved.

Do not automatically load every project document.

Do not automatically load historical ICM artifacts.

Do not automatically load raw Course materials.

---

## 6.1 Common Build Context

Depending on the active task, relevant durable context may include:

### `docs/V1_SPEC.md`

Use when implementing:

- V1 behavior,
- academic concepts,
- Today behavior,
- progress,
- Assignment behavior,
- Study Task behavior,
- or another student-facing product requirement.

---

### `docs/UI_SPEC.md`

Use when implementing:

- a primary view,
- navigation,
- information hierarchy,
- reusable UI elements,
- empty states,
- responsive presentation,
- accessibility-related presentation behavior.

---

### `docs/MOCK_DATA_SPEC.md`

Use when implementing:

- static Course data,
- Study Task relationships,
- Learning Objective relationships,
- Assignment relationships,
- reference-date behavior,
- source-backed mock Course Facts,
- progress derivation,
- fixture identity,
- authored ordering.

---

### `docs/ARCHITECTURE.md`

Use when:

- project structure,
- routes,
- technical boundaries,
- framework behavior,
- shared data flow,
- or architecture matters.

---

### `docs/IMPLEMENTATION.md`

Use when extending or modifying behavior that may already exist.

Then inspect repository reality directly.

---

### `docs/DECISIONS.md`

Use when an accepted durable decision constrains implementation.

---

### `docs/TASKS.md`

Use when task scope, dependency order, or status matters.

---

# 7. Context Minimization

Use only the context necessary for the task.

Example:

For:

`SD-001 — Initialize Next.js Application`

Build probably does NOT need:

- the full Physics textbook,
- detailed Course fixture data,
- every UI requirement,
- future AI planning context.

For:

`SD-006 — Today`

Build likely DOES need:

- `V1_SPEC.md`,
- `UI_SPEC.md`,
- `MOCK_DATA_SPEC.md`,
- the accepted Plan,
- relevant current implementation.

More context is not automatically better.

Use the smallest sufficient context set.

---

# 8. Accepted Plan Is the Build Baseline

When an accepted Plan exists, use it as the task-specific implementation
baseline.

Follow its:

- objective,
- requirements,
- non-goals,
- relevant invariants,
- constraints,
- proposed approach,
- impact map,
- acceptance criteria,
- implementation sequence,
- verification targets.

Do not reopen settled questions merely because another implementation is
possible.

---

# 9. Plans Are Not Absolute About Local Detail

The accepted Plan defines behavior and boundaries.

It does not need to dictate every local code decision.

Build may reasonably adjust low-risk implementation details when repository
reality makes another approach cleaner.

Example:

The Plan expected:

```text
components/course-card.tsx
```

but established repository conventions place feature-local components inside:

```text
app/courses/_components/
```

Build may follow the established convention if:

- product behavior remains unchanged,
- architecture is not materially altered,
- acceptance criteria remain valid,
- scope does not expand.

Mention meaningful deviations in the Build handoff.

Do not return to Plan for harmless local differences.

---

# 10. Material Plan Conflict

If repository reality proves a material Plan assumption wrong:

1. stop expanding the affected implementation,
2. identify the incorrect assumption,
3. inspect the relevant evidence,
4. determine whether the issue affects:
   - product behavior,
   - architecture,
   - scope,
   - acceptance criteria,
   - security,
   - or durable decisions,
5. return to Plan when necessary.

Do not force an invalid Plan simply because it was previously written.

Do not silently redesign the feature either.

---

# 11. Inspect Before Editing

Before modifying an existing area:

- inspect the relevant files,
- understand current responsibilities,
- inspect nearby patterns,
- inspect existing types,
- inspect existing tests where relevant,
- inspect configuration where relevant,
- inspect Git status.

Prefer extending existing project patterns over inventing parallel systems.

Do not replace working implementation merely because another style is possible.

---

# 12. Smallest Coherent Change

Implement the smallest coherent change that completely satisfies the accepted
task.

A coherent change may legitimately span several files.

For example:

```text
route
component
type
fixture helper
targeted test
```

may all belong to one feature.

Do not artificially force implementation into one file.

At the same time, avoid unrelated:

- cleanup,
- refactoring,
- renaming,
- abstractions,
- styling rewrites,
- feature additions.

Keep the change understandable.

---

# 13. Build in Logical Increments

For meaningful tasks, implement in a useful order.

A typical sequence may be:

```text
1. inspect current implementation
2. establish required data/types
3. implement the smallest core behavior
4. connect supporting UI or helpers
5. handle required empty/error states
6. add targeted tests when useful
7. run implementation checks
8. inspect the Git diff
```

Do not build several speculative layers before proving the core path.

---

# 14. Current V1 Hard Boundary

During the initial UI milestone, do NOT introduce:

- AI,
- external Course research,
- syllabus parsing,
- PDF processing,
- automatic Assignment extraction,
- automatic Learning Objective generation,
- automatic Study Task generation,
- automatic duration estimation,
- automatic prioritization,
- scheduling engines,
- adaptive replanning,
- Supabase,
- a production database,
- authentication,
- user accounts,
- Google Calendar,
- Google Drive,
- Course Material uploads,
- task editing,
- completion mutation,
- plan saving.

The static fixture represents information these systems may eventually produce.

V1 does not implement those systems.

---

# 15. Product Invariants During Build

For student-facing V1 behavior, preserve the invariants defined in:

`docs/V1_SPEC.md`

Important examples include:

```text
one shared academic plan

stable Study Task identity

Assignment due date != Study Task planned date

Today =
incomplete Study Tasks planned for referenceDate

earlier unfinished work does not automatically move to Today

Next Action =
first Today Study Task in authored order

weekly progress counts Study Tasks only

Course Facts != personal planning choices

V1 is read-only
```

Do not override an invariant because another implementation is simpler.

---

# 16. Shared Academic Data

When working with the V1 fixture:

prefer:

```text
shared academic data
        ↓
derived selection/calculation
        ↓
view
```

over:

```text
Dashboard copy of data

Today copy of data

Weekly Plan copy of data

Course Page copy of data
```

The same academic item should maintain one canonical identity.

Do not create screen-specific canonical Course, Assignment, Objective, or Study
Task records.

---

# 17. Derived Data

Whenever practical, derive values such as:

- Today Study Tasks,
- Today's Classes,
- Upcoming Assignments,
- Next Action,
- Course weekly progress,
- overall weekly progress.

Do not hardcode contradictory derived values independently into multiple views.

For example:

Do not store:

```text
weeklyProgress: 60
```

if progress can reliably be calculated from Study Tasks.

The durable derivation rules live in:

`V1_SPEC.md`

and:

`MOCK_DATA_SPEC.md`

---

# 18. Course Facts vs Personal Plan

Preserve the distinction between:

```text
Course Fact
```

and:

```text
Personal planning choice
```

Example:

Course Fact:

```text
Problem #1 due Monday
```

Personal plan:

```text
Begin Problem #1 Friday — 30 min
```

Do not present a personal Study Task as an instructor requirement.

Do not fabricate instructor facts to make UI content more complete.

---

# 19. Missing Academic Information

Missing data is valid.

Do not invent:

- deadlines,
- duration estimates,
- instructor names,
- lecture topics,
- textbook sections,
- Assignment relationships,
- Learning Objective relationships,
- Course Materials.

Use the empty or optional state defined by the accepted specification.

---

# 20. Source Uncertainty

When working with manually normalized Course data, do not silently correct
obviously questionable source information.

If fixture data includes source uncertainty that requires human interpretation,
preserve the accepted reviewed value or status defined by the mock-data
contract.

Build does not perform Course-source research or reconciliation during V1.

---

# 21. UI Implementation

When implementing student-facing UI:

follow:

`docs/UI_SPEC.md`

for information hierarchy and presentation responsibilities.

Preserve:

- semantic distinctions,
- useful visual hierarchy,
- responsive usability,
- reasonable accessibility,
- consistency across views.

Do not make every piece of information visually equal.

Do not introduce fake controls for unimplemented functionality.

A read-only prototype should feel intentionally read-only rather than broken.

---

# 22. Responsive Implementation

Use ordinary responsive behavior appropriate to the existing stack.

Build may autonomously decide:

- stacking behavior,
- grid transitions,
- spacing adjustments,
- compact metadata presentation,

when those decisions are low risk.

Do not hide required information merely to make a narrow layout easier.

Do not add a complex responsive framework solely for V1.

---

# 23. Accessibility

Use normal semantic web practices.

Where applicable:

- use correct interactive elements,
- preserve keyboard access,
- use useful heading structure,
- avoid status communicated only through color,
- provide meaningful labels,
- avoid inaccessible fake controls.

Accessibility improvements that are clearly local and low-risk may be made
without separate approval.

Do not add a dependency merely to claim accessibility support.

---

# 24. Dependencies

Do not add dependencies automatically because they make coding easier.

Before adding one, determine whether the capability already exists in:

- Next.js,
- React,
- TypeScript,
- Tailwind,
- the browser,
- an existing project dependency.

A small local solution is often preferable to another dependency.

---

## 24.1 Low-Risk Setup Dependencies

Conventional dependencies that are part of an already-approved framework setup
may be added when the accepted Plan clearly requires them.

Example:

Dependencies created by the approved Next.js initialization flow.

These do not need repeated approval if they are normal parts of the selected
stack.

---

## 24.2 Material Dependencies

Stop and surface a dependency decision when a package:

- materially changes architecture,
- introduces significant maintenance burden,
- handles sensitive data,
- creates vendor lock-in,
- affects large parts of the app,
- or was not reasonably implied by the accepted Plan.

---

# 25. Security and Sensitive Information

Never put real secrets into:

- source code,
- documentation,
- fixture data,
- tests,
- ICM artifacts,
- committed environment files.

Never expose:

- API keys,
- passwords,
- access tokens,
- credentials.

Use approved environment-variable patterns when future tasks need secrets.

Do not commit private student or Course information unnecessarily.

---

# 26. Raw Course Materials

Do not automatically place raw materials such as:

- textbooks,
- Canvas exports,
- instructor PDFs,
- lecture files,
- student notes

into the application repository.

The V1 UI should normally use normalized static fixture information.

Raw source documents should only be handled when a task specifically requires
them.

Do not reproduce large copyrighted source content inside fixture files.

---

# 27. Error Handling

Handle actual failure cases deliberately.

Do not:

- swallow errors,
- report success after failure,
- create empty catch blocks,
- hide failures behind broad fallbacks,
- weaken validation simply to make checks pass.

When debugging:

prefer:

```text
failure
↓
evidence
↓
hypothesis
↓
targeted change
↓
recheck
```

over repeated speculative editing.

---

# 28. Evidence-Based Debugging

When something fails:

inspect the actual:

- error message,
- stack trace,
- failing test,
- browser behavior,
- type error,
- build output,
- relevant source.

Do not make several speculative changes at once.

Fix the smallest supported cause first.

Then rerun the relevant check.

---

# 29. Testing During Build

Build may create and run targeted tests when they provide useful confidence.

Tests should verify meaningful behavior rather than implementation trivia.

When appropriate, cover:

- required behavior,
- important edge cases,
- failure states,
- data relationships,
- ordering,
- regression-sensitive behavior.

Do not introduce a large testing system merely because one small feature needs
verification.

Do not modify tests simply to make an incorrect implementation pass.

---

# 30. Tests Are Not Completion

Passing tests are useful evidence.

They do not automatically prove:

- the specification was interpreted correctly,
- the UI is usable,
- no regression exists,
- all acceptance criteria were satisfied.

Independent Verify still evaluates meaningful implementation against the
accepted requirements.

---

# 31. Build Checks

Before handing meaningful work to Verify, run the strongest practical checks
available for the task.

Depending on the implementation, these may include:

```text
type checking

linting

targeted tests

production build

local development runtime

route navigation

browser inspection

fixture validation

manual behavior inspection
```

Use checks proportional to risk.

Do not run irrelevant checks merely for ceremony.

---

# 32. Explain What Checks Prove

When reporting Build checks, distinguish:

```text
what the check proves
```

from:

```text
what the check does NOT prove
```

Example:

```text
npm run build
```

may prove:

- the production build succeeds,
- TypeScript/framework compilation is acceptable.

It does NOT prove:

- every visual requirement is satisfied,
- every interaction behaves correctly,
- the product semantics are correct.

---

# 33. Teaching During Build

Mike is learning software engineering while building School Dashboard.

Teaching should support progress without creating unnecessary friction.

When implementation introduces an important concept, briefly explain:

- what it is,
- why it is being used,
- where it lives,
- how it affects the current task.

Concepts that often deserve explanation include:

- a new Next.js pattern,
- important React behavior,
- meaningful TypeScript structure,
- shared data flow,
- routing,
- validation,
- significant dependency behavior,
- security-sensitive configuration,
- testing architecture.

Do not interrupt implementation with explanations of trivial syntax.

---

# 34. Increased Automation for Learning

Mike does not need to manually perform every development step.

Build may automate:

- file creation,
- routine edits,
- repetitive setup,
- local refactors,
- standard commands,
- routine checks.

Preserve learning by explaining meaningful engineering decisions in the
handoff.

Do not deliberately slow implementation simply so Mike can type every command
himself.

When there is a particularly valuable hands-on learning step, mention it as an
optional review opportunity rather than making it a blocker unless Mike asks
for the manual workflow.

---

# 35. Documentation During Build

Do not update:

`docs/IMPLEMENTATION.md`

merely because code now exists.

Implementation should normally be described as established reality only after
sufficient Verify evidence.

Build may identify documentation updates that Verify should finalize later.

---

## 35.1 Requirements Documents

Do not change:

- `V1_SPEC.md`,
- `UI_SPEC.md`,
- `MOCK_DATA_SPEC.md`

merely to make them match an implementation mistake.

If implementation reveals a genuine requirement problem:

return to Plan.

Requirements drive implementation.

Implementation does not silently redefine requirements.

---

## 35.2 Architecture and Decisions

If Build reveals a potential durable architecture or product decision:

surface it.

Do not automatically promote every local implementation choice into:

`ARCHITECTURE.md`

or:

`DECISIONS.md`.

Only meaningful accepted durable choices belong there.

---

# 36. Task Status

Do not mark a meaningful implementation task:

```text
Done
```

merely because Build completed.

A useful lifecycle is:

```text
Not started
↓
In progress
↓
Ready for verification
↓
Done
```

Build may prepare the task for verification.

Verify determines whether sufficient evidence exists for completion.

Follow the status conventions in:

`docs/TASKS.md`

---

# 37. Build Output Artifacts

Use:

`icm/02_build/output/`

only when the task benefits from a durable Build artifact.

Possible examples:

- meaningful implementation handoff notes,
- significant migration notes,
- a substantial deviation record,
- a complex implementation map.

Do not create a Build artifact automatically for every task.

The actual source code and Git diff are usually the primary implementation
record.

---

# 38. Build Artifact Naming

When an artifact is justified, use a descriptive task-specific name.

Example:

```text
SD-012-assignment-persistence-build-notes.md
```

Avoid vague names such as:

```text
build.md

notes.md
```

Build artifacts are temporary working evidence.

They are not permanent product specifications.

---

# 39. Human Review Summary

When a substantial Build artifact or handoff is useful, begin with a concise
Human Review Summary.

The purpose is to let Mike understand the important result quickly without
having to inspect every implementation detail.

Use the following structure where relevant.

---

## What Changed

Briefly explain:

- what behavior was implemented,
- what major project areas changed,
- what intentionally remained untouched.

Do not reproduce a file-by-file diff.

---

## Important Implementation Choices

Mention only choices worth understanding.

Examples:

- shared fixture data was centralized,
- progress is derived rather than stored,
- a Next.js dynamic route was used for Course Page.

Do not list trivial code decisions.

---

## What Mike Should Review

Point to the highest-value:

- files,
- behavior,
- UI,
- dependency,
- configuration,
- or command output.

If no focused review is necessary:

```text
None.
```

---

## Learn From This Build

Use:

### Worth Understanding

Important engineering ideas demonstrated by the implementation.

### Can Learn Later

Concepts present in the code but not important to review now.

Do not turn the handoff into a large tutorial.

---

## Checks Run

For each meaningful check, report:

```text
command/check

result

what it proves

what it does not prove
```

---

## Limitations or Blockers

Distinguish:

### Expected deferred work

Something intentionally outside current scope.

from:

### Actual defect/blocker

Something preventing correct completion.

If neither exists:

```text
None.
```

---

## Plan Deviations

Describe meaningful differences from the accepted Plan.

If none:

```text
None.
```

Do not report trivial local adjustments.

---

## Ready for Verify

State:

```text
YES
```

or:

```text
NO
```

with a short reason if needed.

---

# 40. No Artificial Human Checkpoints

Do not require Mike to approve implementation between every logical Build step.

When the accepted Plan allows autonomous implementation:

continue through the coherent Build.

Pause only for:

- material decision,
- blocker,
- destructive operation,
- security concern,
- significant scope expansion.

This is intentionally a faster workflow.

---

# 41. Build Discoveries

Implementation often reveals information that was invisible during Plan.

Classify discoveries before acting.

---

## Local Implementation Detail

If the discovery is:

- contained,
- reversible,
- low-risk,
- compatible with accepted behavior,

resolve it autonomously.

Example:

A small utility is cleaner than repeating date filtering in three components.

Build may create it.

---

## Plan-Impacting Discovery

If the discovery changes:

- expected implementation approach materially,
- scope,
- acceptance criteria,
- architecture,
- product behavior,

return to Plan.

---

## Durable Discovery

If implementation reveals a potentially lasting project-wide rule:

surface it as a decision candidate.

Do not automatically promote it.

---

## Security / Destructive Discovery

Stop immediately when the discovery creates:

- a meaningful security risk,
- privacy risk,
- destructive action,
- data-loss risk,
- credential exposure.

Do not silently work around it.

---

# 42. Git Discipline

Git history remains controlled by Mike unless he explicitly delegates it.

Build may inspect:

```text
git status

git diff

git diff --staged
```

when useful.

Do NOT automatically:

- commit,
- push,
- merge,
- rebase,
- reset,
- force push,
- delete branches,
- rewrite history,
- discard uncommitted work.

---

# 43. Diff Review

Before declaring meaningful Build work ready for Verify, inspect the resulting
change set.

Confirm:

- expected files changed,
- unexpected files did not change,
- no secrets were added,
- no private Course source material was accidentally added,
- no generated junk was accidentally tracked,
- no unrelated refactor leaked in,
- the change remains inside accepted scope.

The question is not only:

> Does the new code appear to work?

It is also:

> Did we change only what this task was supposed to change?

---

# 44. Build Quality Check

Before handing meaningful work to Verify, confirm:

```text
[ ] Required behavior is implemented.

[ ] Accepted Plan boundaries were respected.

[ ] Relevant V1 invariants remain intact.

[ ] No future feature leaked into current scope.

[ ] Repository patterns were reused where reasonable.

[ ] No unnecessary dependency was added.

[ ] No private or sensitive information was introduced.

[ ] Relevant empty/failure states were considered.

[ ] Targeted Build checks were run.

[ ] Failures are documented accurately.

[ ] The Git diff was inspected.

[ ] Material Plan deviations are explained.

[ ] No known blocking defect is being hidden.
```

Do not knowingly hand broken implementation to Verify while claiming readiness.

---

# 45. Handoff to Verify

Build is ready for Verify when:

1. implementation for the accepted scope exists,
2. relevant Build checks pass or limitations are clearly documented,
3. no unresolved blocking defect remains,
4. material Plan deviations are resolved or surfaced,
5. acceptance criteria remain valid,
6. Verify has enough context to independently evaluate the work.

---

# 46. Final Build Handoff

At the end of meaningful Build work, provide:

## Build Status

Use one of:

```text
READY FOR VERIFY
```

```text
READY FOR VERIFY WITH KNOWN LIMITATION
```

```text
RETURN TO PLAN
```

```text
BLOCKED
```

---

## What Changed

Concise implementation summary.

---

## Why This Approach

Only the meaningful implementation reasoning.

---

## Main Files

List the small set of important implementation files.

Do not list every automatically generated file unless it matters.

---

## Important Implementation Choices

Meaningful autonomous decisions made during Build.

If none:

```text
None.
```

---

## Build Checks

What was actually run and the actual result.

---

## Known Limitations

Distinguish deferred scope from defects.

If none:

```text
None.
```

---

## Plan Deviations

Meaningful deviations only.

If none:

```text
None.
```

---

## Verification Targets

Identify the behaviors Verify should independently prove.

Do NOT tell Verify:

> This works.

Instead provide:

- the requirement,
- the implementation location,
- the evidence Build gathered,
- and the behavior Verify should challenge.

---

## What Mike Should Understand

Provide only the highest-value engineering concept or decision from the Build.

If none:

```text
None.
```

---

# 47. Current Initial Milestone

During Milestone 1, Build should remember:

```text
V1 =
read-only UI
+
static/hardcoded academic data
+
five primary views
```

It is NOT:

```text
AI academic planner

database-backed application

course-material ingestion system

calendar integration

student account system
```

Build the current product.

Do not scaffold the future product unless an accepted task explicitly requires
it.

---

# 48. SD-001 Build Boundary

For:

`SD-001 — Initialize Next.js Application`

Build should focus only on establishing the approved application foundation.

Expected work may include:

- initializing Next.js in the existing repository,
- React,
- TypeScript,
- Tailwind CSS,
- framework-required configuration,
- package metadata,
- minimal application entry files,
- preserving existing project documentation and ICM,
- confirming basic development/build commands.

SD-001 must NOT implement:

- Dashboard functionality,
- Course Cards,
- Course Page,
- Weekly Plan,
- Today,
- Physics mock data,
- academic calculations,
- AI,
- persistence,
- authentication,
- integrations.

The goal is:

> establish a clean working application foundation for subsequent School
> Dashboard tasks.

Do not expand SD-001 merely because product specifications already exist.