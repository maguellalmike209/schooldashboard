# School Dashboard ICM — Verify Stage

## 1. Purpose

The Verify stage exists to independently determine whether implemented School
Dashboard work actually satisfies the accepted requirements.

Verification should evaluate evidence rather than assume implementation is
correct because:

- code exists,
- Build reported success,
- tests pass,
- the page looks plausible,
- or the implementation follows common conventions.

The central question is:

> Does the resulting implementation actually satisfy the accepted School
> Dashboard requirements without violating scope, product invariants, or nearby
> existing behavior?

Verify is the final technical quality gate before work becomes accepted project
reality.

For School Dashboard, Verify should also finish routine task housekeeping when
the evidence supports completion.

That may include:

- repairing small obvious implementation defects,
- rerunning verification,
- updating current-state documentation,
- updating task status,
- committing the verified task,
- and pushing the verified commit.

The workflow should move quickly without weakening the evidence standard.

---

# 2. Development Autonomy

School Dashboard intentionally uses a high-autonomy workflow.

Verify may autonomously perform ordinary low-risk verification and completion
work when:

- the accepted behavior is clear,
- the change is reversible,
- no material product decision is required,
- no architecture boundary is being changed,
- no security or privacy concern exists,
- and no destructive Git operation is required.

Mike does NOT need to manually approve:

- every verification command,
- every browser check,
- every lint/type/build command,
- routine fixture validation,
- small obvious implementation repairs,
- routine documentation promotion,
- normal task-status updates,
- a normal commit of a verified task,
- or a normal push of that verified commit.

Stop only when human judgment is materially useful.

---

# 3. Verification Independence

Treat Build claims as orientation, not proof.

Reconstruct the relevant verification targets from accepted requirements and
current repository reality before relying on Build's handoff or Build-authored
tests. Use fresh reviewer context where available. An agent continuing from
Build must deliberately challenge its own assumptions and document the
independent evidence it gathered.

Build may say:

> The Today page works.

Verify should ask:

```text
What requirement defines Today?

What data should appear?

What data must not appear?

What ordering is required?

What empty state is required?

Which product invariants apply?

What observable evidence proves those behaviors?
```

Do not copy Build's conclusion into the Verify result.

Independently inspect:

- requirements,
- code,
- runtime behavior,
- tests,
- data,
- configuration,
- and Git diff

as relevant.

---

# 4. When to Use Verify

Use Verify after meaningful implementation work.

Examples include:

- application initialization,
- new pages,
- navigation,
- shared components,
- static academic fixtures,
- data derivation,
- progress calculations,
- bug fixes,
- routing,
- architecture changes,
- configuration changes,
- dependencies,
- later persistence or integration work.

Trivial changes may need only lightweight verification.

Use effort in proportion to:

- task importance,
- regression risk,
- implementation complexity,
- security sensitivity.

Do not create ceremony for tiny changes.

---

# 5. Required Context

Before meaningful verification:

1. Read root `AGENTS.md`.
2. Read root `CONTEXT.md`.
3. Read this Verify-stage context.
4. Read the accepted task Plan when one exists.
5. Read the Build handoff when useful.
6. Use the context router to load only relevant durable project sources.
7. Inspect actual repository implementation and Git state.

Do not load every durable document automatically.

Do not treat ICM artifacts as stronger evidence than repository reality.

---

# 6. Common Verify Context

Depending on the task, relevant durable sources may include:

## `docs/V1_SPEC.md`

Use when verifying:

- product behavior,
- academic semantics,
- Today rules,
- Assignment behavior,
- progress,
- V1 invariants,
- exclusions.

---

## `docs/UI_SPEC.md`

Use when verifying:

- view hierarchy,
- required information,
- presentation responsibilities,
- empty states,
- navigation,
- responsive behavior,
- accessibility-related UI expectations.

---

## `docs/MOCK_DATA_SPEC.md`

Use when verifying:

- fixture structure,
- stable identity,
- Course relationships,
- source-backed Course Facts,
- personal-plan distinctions,
- authored ordering,
- reference-date behavior,
- derived values,
- fixture validation.

---

## `docs/ARCHITECTURE.md`

Use when verification involves:

- project structure,
- technical boundaries,
- dependencies,
- routes,
- shared data flow,
- architecture changes.

---

## `docs/IMPLEMENTATION.md`

Use when determining:

- previously verified behavior,
- existing implementation responsibilities,
- whether current-state documentation now needs updating.

---

## `docs/DECISIONS.md`

Use when accepted durable decisions constrain expected behavior.

---

## `docs/TASKS.md`

Use when verification affects:

- task status,
- task sequencing,
- milestone completion.

---

# 7. Context Minimization

Do not automatically load:

- the complete Physics textbook,
- raw Course source materials,
- unrelated historical Plan artifacts,
- unrelated historical Verify artifacts,
- future milestone documentation.

Example:

For a typical feature task, Verify likely needs:

```text
AGENTS.md
CONTEXT.md
accepted task Plan
Build handoff when useful
relevant durable specifications
relevant current implementation
TASKS.md when status changes
actual Git state
```

It does NOT automatically need:

```text
full Course textbooks
all raw Course materials
every historical task artifact
future milestone specifications
unrelated project documentation
```

Use the smallest sufficient context set.

---

# 8. Primary Verification Target

The primary verification target is accepted behavior.

Implementation details matter only insofar as they:

- produce that behavior,
- violate architecture,
- create security problems,
- introduce regressions,
- or expand scope.

For each important acceptance criterion:

```text
Requirement
    ↓
Verification method
    ↓
Evidence
    ↓
Result
```

Do not substitute:

```text
Code looks reasonable
```

for observable verification when stronger evidence is practical.

---

# 9. Verify Acceptance Criteria Individually

Do not treat one successful observation as proof of an entire feature.

Example acceptance criterion:

> Opening a known Course shows only that Course's relevant academic information
> and an unknown Course shows a clear not-found state.

Verify separately:

- known Course resolves,
- correct Course identity displays,
- its Objectives belong to that Course,
- its Assignments belong to that Course,
- its Study Tasks belong to that Course,
- unrelated Course data does not leak,
- empty academic sections behave correctly,
- unknown identifier produces the required not-found behavior.

A partial success is not a full PASS.

---

# 10. Verification Methods

Use the strongest practical evidence available.

Possible methods include:

```text
automated tests

TypeScript checks

linting

production build

runtime execution

browser navigation

manual UI inspection

route testing

fixture validation

data relationship checks

API testing

database inspection

integration testing

Git diff inspection
```

Not every task requires every method.

Choose the methods that best prove the accepted behavior.

---

# 11. Source Inspection vs Runtime Evidence

Reading code is useful.

It is not the same thing as running behavior.

Clearly distinguish:

```text
Verified by code inspection
```

from:

```text
Verified through runtime behavior
```

Do not claim:

> The route works.

when the route was only inspected.

Say instead:

> The route implementation was inspected, but runtime navigation was not
> verified.

when that is the actual evidence.

---

# 12. Happy Path Verification

Verify normal expected behavior.

Examples:

- valid navigation succeeds,
- expected Course renders,
- correct static data appears,
- progress displays correctly,
- valid build completes,
- expected route loads.

Happy-path success is necessary but may not be sufficient.

---

# 13. Edge and Failure Cases

Check meaningful cases that could realistically reveal incorrect behavior.

Possible examples include:

- unknown Course identifier,
- Course with no Study Tasks,
- missing duration estimate,
- Assignment due today without a Study Task,
- completed Study Task planned today,
- earlier unfinished Study Task,
- Study Task without an Objective,
- Study Task without an Assignment,
- multiple Courses with unequal task totals.

Use the task's accepted criteria.

Do not manufacture dozens of irrelevant edge cases merely to make verification
look thorough.

---

# 14. V1 Invariant Verification

For student-facing Milestone 1 work, verify relevant invariants from:

`docs/V1_SPEC.md`

Examples include:

```text
one shared academic plan

stable Study Task identity

Course Fact != personal planning choice

Assignment due date != Study Task planned date

Today =
incomplete Study Tasks planned for referenceDate

earlier unfinished Study Tasks do not automatically move to Today

Next Action =
first Today Study Task in authored order

progress counts Study Tasks only

V1 remains read-only
```

A visually functional implementation that violates an invariant is not a PASS.

---

# 15. Shared-Data Verification

Where several views show the same academic information, confirm they agree.

For example, the same Study Task appearing in:

```text
Dashboard
Today
Weekly Plan
Course Page
```

should agree on relevant fields such as:

- identity,
- title,
- Course,
- completion state,
- Assignment relationship,
- Objective relationship,
- date.

Repeated UI appearances must not behave like separate academic records.

---

# 16. Progress Verification

When a task touches progress, verify the actual calculation.

For a given Academic Week:

```text
completed current-week Study Tasks
/
all current-week Study Tasks
```

Verify that progress does NOT count:

- Assignments,
- Learning Objectives,
- Course Materials,
- Class Meetings,
- source artifacts.

Verify Course-specific progress filters the same canonical Study Tasks by
Course.

Verify overall progress counts raw Study Tasks across Courses.

Do not accept averaging of Course percentages.

---

# 17. Date Verification

When the task touches date behavior, confirm:

- the static shared reference date is used,
- the machine date does not change V1 behavior,
- Today filtering follows the reference date,
- Assignment due dates remain distinct from Study Task planned dates,
- earlier unfinished Study Tasks remain on their authored date,
- Upcoming Assignments are ordered according to accepted rules.

Date behavior should be proven through data and/or runtime evidence where
practical.

---

# 18. UI Verification

When verifying a UI task, evaluate both:

```text
Does the required information exist?
```

and:

```text
Does the interface communicate the required hierarchy and meaning?
```

Examples:

- Next Action should actually be identifiable.
- Assignments should not look indistinguishable from Study Tasks.
- Weekly Plan should be a real dedicated view.
- Today should be a real dedicated view.
- empty states should not overclaim.
- fake controls for unavailable features should not appear.

Do not treat a screenshot that merely contains all required words as proof of
good information hierarchy.

---

# 19. Responsive Verification

When relevant, inspect more than one practical viewport width.

Confirm:

- core content remains accessible,
- navigation remains usable,
- important information is not hidden,
- layout does not obviously break,
- interactive elements remain usable.

Do not require exhaustive device testing for every small UI task.

Use proportional verification.

---

# 20. Accessibility Verification

For UI tasks, check obvious accessibility requirements when relevant.

Examples:

- interactive controls use appropriate elements,
- keyboard navigation remains reasonable,
- heading hierarchy makes sense,
- status is not communicated only through color,
- links/buttons have understandable labels.

Do not claim full accessibility certification from lightweight checks.

---

# 21. Regression Verification

A feature is not successful if it breaks nearby accepted behavior.

When a task touches existing functionality:

identify the most likely regressions.

Use:

- existing tests,
- targeted checks,
- browser navigation,
- build validation,
- focused manual verification

as appropriate.

Do not retest the entire application after every small task unless the change
creates broad risk.

---

# 22. Dependency Verification

When a task adds or changes dependencies, verify:

- the dependency is expected,
- lockfile changes are reasonable,
- no unrelated package churn occurred,
- the dependency is actually needed,
- the project still builds/checks correctly.

If a material dependency appeared without accepted planning, surface it.

Do not normalize scope expansion merely because installation succeeded.

---

# 23. Security and Privacy Verification

When relevant, explicitly inspect:

- secrets,
- credentials,
- environment files,
- external URLs,
- private Course data,
- student information,
- authorization,
- external APIs,
- user-controlled input.

For the legacy static Milestone 1 scope specifically check that:

- real secrets were not committed,
- raw private Course files were not accidentally added,
- large restricted materials were not copied unnecessarily into source.

Do not claim security from appearance alone.

For a material trust boundary, attempt relevant negative or adversarial checks
against project-owned or explicitly authorized systems. Use the accepted
security requirements and `docs/SECURITY_TESTING.md` when applicable. A test
file's existence is not evidence that its protection ran or held.

---

# 24. Git Diff Review Is Required

Before completing meaningful verification, inspect:

```text
git status

git diff

git diff --staged
```

as relevant.

Confirm:

- expected files changed,
- unrelated files did not change,
- no secrets were added,
- no private Course files were accidentally added,
- no unwanted generated files are tracked,
- important deletions are intentional,
- scope matches the accepted task.

Verification asks both:

> Does the implementation satisfy the task?

and:

> Did we change only what we intended?

---

# 25. Tests Are Evidence, Not Truth

Passing tests increase confidence.

They do not automatically prove correctness.

Treat Build-authored tests as hypotheses about the requirement. Inspect
important assertions and independently exercise or challenge the behavior
when risk warrants it.

A test may:

- test the wrong requirement,
- miss an edge case,
- contain an outdated assumption,
- or be too weak.

Ask:

```text
Does this test correspond to a real requirement?

Would this test fail if the feature were meaningfully broken?

Does it cover the behavior we actually care about?
```

Do not change a valid requirement merely so a test passes.

Do not weaken a test to hide broken implementation.

---

# 26. Small Repair Lane

Verify may automatically repair a small implementation defect when ALL of the
following are true:

- the accepted requirement is unambiguous,
- the defect is localized,
- the fix is low risk,
- the fix does not change product behavior,
- the fix does not materially change architecture,
- the fix does not expand task scope,
- no new significant dependency is required,
- no human decision is needed.

Examples:

```text
wrong link path

simple missing empty state

incorrect local filter condition

small TypeScript issue

obvious styling break

missing accessible label

simple test typo that conflicts with the accepted implementation intent
```

After repairing:

1. rerun the relevant Build checks,
2. invalidate prior evidence affected by the repair or another meaningful
   implementation/configuration change, then rerun the affected Verify checks,
3. inspect the resulting diff,
4. report the repair.

This avoids unnecessary Plan → Build → Verify loops for obvious defects.

---

# 27. What Verify Must NOT Repair Autonomously

Return to Build or Plan when fixing the issue would materially change:

- product behavior,
- academic semantics,
- architecture,
- scope,
- acceptance criteria,
- persistence strategy,
- dependency strategy,
- security model,
- external integration behavior.

Example:

Today automatically includes all overdue tasks.

If the code intentionally implements that incorrect model across the
application, do not quietly redesign the planning system inside Verify.

Return the issue appropriately.

---

# 28. Routing Failures

## Return to Build

Use Build when:

- requirements remain correct,
- architecture remains correct,
- implementation is materially defective,
- the repair exceeds the Small Repair Lane.

---

## Return to Plan

Use Plan when verification reveals that:

- requirements are ambiguous or wrong,
- architecture is insufficient,
- acceptance criteria need revision,
- task scope was incorrect,
- a material new decision is required.

---

## Blocked

Use BLOCKED when verification cannot proceed because necessary:

- environment,
- access,
- implementation,
- dependency,
- data,
- or tooling

is unavailable.

State the concrete blocker and next step.

---

# 29. Verification Status

Use exactly one primary status.

## PASS

Use when:

- all required acceptance criteria were sufficiently verified,
- no blocking defect remains,
- meaningful regressions were not found,
- scope remains correct.

---

## PASS WITH LIMITATIONS

Use when:

- required behavior appears correct,
- but a meaningful part of verification could not be completed,
- and the missing evidence does NOT represent a known requirement failure.

State the limitation clearly.

Do not use this status to hide a failing requirement.

---

## FAIL

Use when one or more accepted requirements are not satisfied.

---

## BLOCKED

Use when verification cannot meaningfully proceed.

---

# 30. Evidence Standard

Every final Verify conclusion should be traceable to evidence.

For material claims, record the evidence source, tested environment, relevant
version or repository state, and limitations. Reuse evidence only while its
relevant state remains unchanged and independent Verify does not require a
fresh check. A command or test that was not executed cannot support PASS.

When an authorized task makes market, legal, financial, or commercial-readiness
claims, challenge their applicability, source, jurisdiction, date, and scope
using the conditional assurance guide. A technical Verify PASS is not legal
certification or production launch approval.

Useful evidence includes:

```text
command output

runtime observation

browser behavior

test result

build result

type-check result

fixture calculation

Git diff

direct source inspection
```

Do not use:

```text
Build said it worked
```

as primary evidence.

---

# 31. Verification Artifacts

For meaningful verification work, create a task-specific artifact under:

```text
icm/03_verify/output/
```

Example:

```text
SD-004-course-page-verification.md
```

Create an artifact when:

- verification is substantial,
- the evidence is worth preserving,
- the task has meaningful acceptance criteria,
- or future review would benefit from the record.

Do NOT create a verification artifact for every trivial change.

---

# 32. Verification Artifact Structure

A meaningful artifact should normally contain:

```text
# <Task ID> — <Task Name> Verification

## Human Review Summary

## Verification Target

## Acceptance Criteria

## Verification Performed

## Results

## Repairs Performed During Verify

## Regression Checks

## Git Diff Review

## Limitations

## Documentation Promotion

## Final Status
```

Omit sections that add no value.

Do not generate a giant report merely because a template exists.

---

# 33. Human Review Summary

The top of a substantial Verify artifact should let Mike understand the result
quickly.

Use:

## Verification Result

One of:

```text
PASS
PASS WITH LIMITATIONS
FAIL
BLOCKED
```

---

## What Was Proven

Only concise evidence-backed claims.

If none:

```text
None.
```

---

## What Was Not Proven

Meaningful evidence gaps only.

If none:

```text
None.
```

---

## Automatic Repairs

List small defects Verify fixed automatically.

If none:

```text
None.
```

---

## Mike's Review Focus

Only identify something when Mike's review would materially help.

Examples:

- meaningful visual design choice,
- significant dependency,
- unresolved limitation,
- unusual architecture.

For an ordinary successful task:

```text
None required for technical completion.
```

Mike may still inspect the feature if he wants.

---

## Learning Takeaway

Give the highest-value engineering idea exposed by verification.

Keep it short.

If none:

```text
None.
```

---

## Next Action

Use one of:

```text
Finalize task automatically

Return to Build

Return to Plan

Remain blocked

Human review recommended before finalization
```

---

# 34. Autonomous Documentation Promotion

After a PASS, Verify may update durable documentation when the verified
implementation changes project reality.

Do not require a separate manual documentation round for routine accurate
promotion.

---

## `docs/IMPLEMENTATION.md`

Update when verified functionality changes what the application currently does.

Record:

- actual current behavior,
- meaningful implementation structure,
- actual commands,
- important constraints,
- known verified limitations.

Keep it concise.

Do not paste raw test output.

---

## `docs/TASKS.md`

Update the verified task status when appropriate.

Typical lifecycle:

```text
Not started
↓
In progress
↓
Ready for verification
↓
Done
```

After a full PASS, the task may normally become:

```text
Done
```

---

## `docs/ARCHITECTURE.md`

Update only when verified implementation establishes a meaningful technical
structure not already described accurately.

Do not record every file placement as architecture.

---

## `docs/DECISIONS.md`

Do NOT automatically promote task-local implementation choices.

Add only accepted durable decisions.

If Verify discovers a new durable decision candidate that was never approved,
surface it instead.

---

## `docs/V1_SPEC.md`

Update only when accepted product requirements changed.

Do not rewrite requirements to match implementation.

---

## `docs/UI_SPEC.md`

Update only when accepted UI responsibilities or presentation requirements
changed.

---

## `docs/MOCK_DATA_SPEC.md`

Update only when accepted fixture semantics or relationships changed.

Do not change the contract merely because implementation accidentally differs.

---

# 35. Implementation Documentation Quality

`docs/IMPLEMENTATION.md` should answer:

```text
What meaningful functionality exists right now?

How do the important pieces fit together?

Where should an agent inspect the implementation?

How can the application currently be run or checked?

What important limitations remain?
```

It should NOT become:

- commit history,
- raw test logs,
- debugging notes,
- planning discussion,
- duplicated product specifications.

Git already preserves history.

---

# 36. Automatic Task Finalization

When verification reaches PASS and no material decision remains, Verify should
automatically finalize routine project state.

A normal completion sequence is:

```text
1. complete independent verification

2. perform allowed small repairs if needed

3. rerun affected checks

4. confirm PASS

5. update IMPLEMENTATION.md when current reality changed

6. update TASKS.md to Done

7. inspect final Git status and diff

8. confirm branch and upstream safety

9. stage only files belonging to the verified task

10. create one task-scoped commit

11. confirm the resulting commit and branch state

12. push the current branch normally

13. confirm local/upstream alignment
```

When the target branch is protected, finalization continues through the
repository's required pull request, hosted checks, and protected merge. A
successful task-branch push alone does not complete integration. If hosted
checks fail or the PR head changes, investigate and re-verify the affected
work before merging. Confirm the merged commit and updated `origin/main`.

Do not ask Mike for a redundant approval checkpoint between these steps when
the repository instructions authorize autonomous finalization.

A successful PASS should normally result in a completed task, not a task waiting
for a separate manual Git round.

---

# 37. Git Authorization

Mike authorizes School Dashboard agents to perform normal, non-destructive Git
operations required for verified task completion.

After a task reaches PASS, Verify MAY automatically:

- inspect repository and upstream state,
- stage files belonging to the verified task,
- create one task-scoped commit,
- push the current branch to its configured upstream,
- confirm synchronization afterward.

For a protected target branch, this authority also covers a normal PR and
merge after its required checks pass. It never authorizes bypassing or
weakening the repository's merge rules.

No separate approval is required for these normal operations when the safety
conditions in this document are satisfied.

This authorization applies only to non-destructive Git completion.

It does NOT authorize destructive reconciliation, history rewriting, or
overwriting genuinely divergent remote work.

---

# 38. Git Operations Allowed After PASS

Verify may use ordinary operations such as:

```text
git status

git diff

git diff --staged

git log

git fetch

git add <task files>

git commit

git push
```

Verify may also inspect:

- the current branch,
- its configured upstream,
- whether local is ahead,
- whether upstream is ahead,
- whether branches have diverged,
- and whether unrelated working-tree changes exist.

Do not stage unrelated changes merely because they are present in the working
tree.

Do not treat a safe local-ahead state as a blocker.

---

# 39. Git Operations That Require Explicit Approval

Do NOT automatically:

```text
force push

git reset --hard

rebase

rewrite commit history

delete branches

delete tags

discard uncommitted user work

resolve destructive conflicts by choosing a side

overwrite genuinely divergent remote work

stage unrelated user changes

commit or push secrets or credentials

commit or push private/raw Course materials
```

Do not use a failed normal push as permission to perform one of these actions.

If safe completion requires a destructive or history-changing operation:

STOP and surface the issue.

High automation means ordinary Git work should happen automatically.

It does NOT mean destructive Git autonomy.

---

# 40. Commit Preconditions

Before creating the automatic task commit, Verify MUST confirm:

```text
[ ] Final verification status is PASS.

[ ] The task's acceptance criteria are satisfied.

[ ] Required repairs were re-verified.

[ ] The final diff matches the accepted scope.

[ ] No unrelated user changes will be staged.

[ ] No secret or credential is included.

[ ] No private/raw Course material was accidentally included.

[ ] Required current-state documentation is updated.

[ ] TASKS.md accurately reflects completion.

[ ] No unresolved blocking limitation remains.
```

If these conditions are not met:

do not auto-commit.

---

# 41. Commit Scope

Prefer one coherent commit for one verified task.

The commit should contain:

- the accepted implementation,
- task-required tests,
- verification-driven small repairs,
- justified durable documentation updates,
- task-status update.

Do not absorb unrelated changes.

If unrelated modifications already exist and cannot be safely separated:

stop automatic Git finalization and report the issue.

Do not discard them.

---

# 42. Commit Message

Use a concise task-scoped commit message.

Preferred shape:

```text
<type>(<task-id>): <short description>
```

Examples:

```text
chore(sd-001): initialize Next.js application

feat(sd-002): add dashboard shell and navigation

feat(sd-005): add weekly plan view

fix(sd-006): preserve authored Today task order
```

Reasonable types include:

```text
chore
feat
fix
refactor
docs
test
```

Do not over-optimize commit-message taxonomy.

The task ID and change should be recognizable.

---

# 43. Push Preconditions

Before a normal automatic push, Verify should establish that the repository can
be synchronized safely.

Confirm:

```text
[ ] The intended current branch is active.

[ ] The branch has the expected configured upstream.

[ ] The verified task commit exists locally.

[ ] The push will not include unrelated unsafe work.

[ ] No secret or credential will be pushed.

[ ] No private/raw Course material will be pushed.

[ ] No unresolved conflict exists.

[ ] No destructive reconciliation is required.
```

Inspect local/upstream relationship when necessary.

A normal safe state may look like:

```text
local branch aligned with upstream
↓
verified task commit created
↓
local branch now ahead
↓
normal push
```

or:

```text
local branch already ahead only because of an earlier verified commit
↓
no remote divergence
↓
normal push
```

A branch being simply ahead of its configured upstream is NOT a blocker.

When local contains the intended verified commit and upstream has no independent
commits that create divergence:

```text
normal push is authorized automatically
```

No extra confirmation from Mike is required.

---

## 43.1 Push Success

If the normal push succeeds:

- confirm the result,
- inspect synchronization when useful,
- report the pushed commit.

The task is then finalized.

---

## 43.2 Push Failure

If a normal push fails because of:

- authentication,
- network failure,
- branch protection,
- remote policy,
- newly discovered remote commits,
- conflict,
- divergence,
- or another unexpected remote condition,

Verify may safely inspect using operations such as:

```text
git status

git log

git fetch
```

Do NOT automatically:

```text
force push

rebase

reset

rewrite history

discard user work

overwrite divergent remote work
```

A failed normal push is not authorization for destructive reconciliation.

If safe non-destructive completion is no longer possible:

report the blocker.

---

# 44. PASS WITH LIMITATIONS and Git

Do not automatically commit and push on:

```text
PASS WITH LIMITATIONS
```

unless an accepted task Plan explicitly defines the limitation as compatible
with automatic finalization.

Default behavior:

```text
PASS
→ may finalize + commit + push

PASS WITH LIMITATIONS
→ stop before automatic Git finalization and surface the limitation

FAIL
→ no task completion commit

BLOCKED
→ no task completion commit
```

This keeps the final automatic push threshold strict.

---

# 45. Small Verify Repair and Git History

If Verify performs allowed small repairs before PASS:

include those repairs in the same task commit.

Do not create unnecessary intermediate commits such as:

```text
attempt fix

fix fix

verification tweak
```

Prefer one clean verified task commit.

The working history can remain simple for this side project.

---

# 46. Verification Failures Are Useful

Do not hide or weaken a failed requirement merely to reach automatic commit and
push.

A FAIL is better than a false PASS.

When a requirement fails:

- identify it,
- record evidence,
- repair only if it qualifies for the Small Repair Lane,
- otherwise route correctly.

The automatic completion workflow exists to reduce ceremony.

It does NOT lower the correctness standard.

---

# 47. Retrospective Candidates

Meaningful Verify work may surface:

## Decision Candidates

Potential durable product or technical choices that deserve later acceptance.

Promote a candidate to `docs/DECISIONS.md` only after acceptance and only if it
records a useful durable choice. Do not make that document a development diary.

## ICM Improvement Candidates

Potential improvements to:

- Plan,
- Build,
- Verify,
- global instructions,
- context routing.

Do not automatically modify durable process files because one task suggested an
improvement.

Surface useful candidates.

If none:

```text
None.
```

Do not invent retrospective items merely to populate a section.

Retain learning only when it yields a useful durable decision, process lesson,
falsified assumption, or next-phase dependency. Route each accepted conclusion
to its owning document; task-specific observations can remain in the Verify
artifact without becoming global policy.

---

# 48. Verify Quality Check

Before finalizing meaningful work, confirm:

```text
[ ] Relevant acceptance criteria were individually evaluated.

[ ] Important happy-path behavior was checked.

[ ] Meaningful edge/failure behavior was considered.

[ ] Relevant V1 invariants were preserved.

[ ] Regressions were considered.

[ ] Appropriate technical checks ran.

[ ] UI behavior was inspected when relevant.

[ ] Security/privacy concerns were considered when relevant.

[ ] Git diff was reviewed.

[ ] Evidence supports the selected status.

[ ] Any limitation is stated accurately.

[ ] Documentation promotion matches verified reality.

[ ] Automatic Git finalization is safe if PASS.
```

If the conclusion relies mainly on assumption:

verification is not complete.

---

# 49. Final Verify Handoff

At the end of meaningful verification provide:

## Status

One of:

```text
PASS
PASS WITH LIMITATIONS
FAIL
BLOCKED
```

---

## What Was Verified

Concise list of the meaningful requirements evaluated.

---

## Evidence

Most important:

- commands,
- tests,
- browser observations,
- runtime behavior,
- data checks.

Do not dump unnecessary raw output.

---

## Automatic Repairs

Describe any small fixes performed during Verify.

If none:

```text
None.
```

---

## Regression Status

State:

- what nearby behavior was checked,
- whether a regression was found.

---

## Remaining Limitations

Only meaningful unresolved limitations.

If none:

```text
None.
```

---

## Documentation Updates

State which durable current-state documents were updated after verification.

If none:

```text
None.
```

---

## Git Finalization

Report:

```text
Commit:
<hash and message>

Push:
<succeeded / not attempted / failed>
```

when applicable.

If no automatic Git finalization occurred, explain why briefly.

---

## What Mike Should Understand

Give the highest-value engineering or product lesson from the task.

Keep it concise.

---

## Next Project Step

Identify the next task from the accepted roadmap when appropriate.

Do not automatically start that next task merely because the previous one
finished unless the active instruction explicitly authorizes continuing through
multiple tasks.

A prompt that authorizes one full task lifecycle authorizes completion of that
task through Plan, Build, Verify, documentation promotion, commit, and push.

It does NOT automatically authorize beginning the following roadmap task.

---

# 50. Fast Side-Project Philosophy

School Dashboard should move quickly.

Prefer:

```text
clear Plan
↓
autonomous Build
↓
independent Verify
↓
small repairs automatically
↓
PASS
↓
document
↓
mark Done
↓
task-scoped commit
↓
normal push
↓
finished
```

over:

```text
approval
↓
tiny edit
↓
approval
↓
another edit
↓
approval
↓
verification
↓
approval
↓
commit
↓
approval
↓
push
```

The purpose of the ICM is to make automation safer.

It should not turn development into bureaucracy.

---

# 51. Current Milestone Reminder

Milestone 1 remains:

```text
read-only School Dashboard UI
+
static/hardcoded academic data
+
five primary student views
```

It does NOT include:

```text
AI planning

Course ingestion

database persistence

authentication

Google integrations

automatic scheduling

editable Study Plans
```

Verify against the product that is currently approved.

Do not fail a task because deferred future functionality is absent.

Do not pass a task because future documentation describes something that is not
implemented.

---

# 52. Full-Task Automation Boundary

School Dashboard may use a single active instruction to authorize one complete
task lifecycle.

That lifecycle may be:

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
normal push
```

The agent must still preserve stage separation.

## Plan

Plan must:

- inspect the relevant repository state,
- load Plan-stage instructions,
- establish requirements and scope,
- identify acceptance criteria,
- resolve ordinary planning questions autonomously,
- stop for material unresolved decisions when necessary.

## Build

Build must:

- load Build-stage instructions,
- implement the accepted Plan,
- run useful Build checks,
- inspect the resulting diff,
- avoid committing unfinished current-task implementation,
- hand the completed implementation into Verify.

## Verify

Verify must:

- load Verify-stage instructions,
- independently evaluate the accepted requirements,
- use evidence rather than Build claims,
- perform allowed Small Repair Lane fixes when appropriate,
- require a full PASS before ordinary automatic finalization,
- promote verified current-state documentation,
- mark the task Done,
- create one task-scoped commit,
- perform a normal safe push and, when protection requires it, complete the
  checked PR/merge path.

One prompt does NOT collapse Plan, Build, and Verify into one undifferentiated
activity.

It authorizes the agent to move through those stages sequentially without
requiring Mike to issue three separate prompts.

A full-task automation prompt authorizes completion of the named task only.

It does NOT authorize automatically beginning the next roadmap task unless Mike
explicitly grants multi-task continuation.

The automation must still stop when:

- a material product decision is unresolved,
- a material architecture decision is unresolved,
- requirements are materially ambiguous,
- accepted scope would need to expand,
- a security or privacy concern requires judgment,
- a destructive Git operation would be required,
- local and remote work genuinely diverge and safe reconciliation is unclear.
