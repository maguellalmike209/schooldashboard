# School Dashboard ICM — Verify Stage

## 1. Purpose

The verify stage exists to determine whether implemented School Dashboard behavior actually satisfies the agreed requirements and acceptance criteria.

Verification should evaluate evidence rather than assume that implementation is correct because code exists, tests were added, or Build reported success.

The goal is to answer:

> Does the resulting system behave correctly, safely, and consistently with the intended School Dashboard requirements?

Verification is not a ceremonial final step.

It is the quality gate between implementation and durable project truth.

---

## 2. When to Use This Stage

Use the verify stage when work requires meaningful confirmation that implemented behavior works as intended.

Typical examples include:

- verifying a new feature,
- validating a bug fix,
- checking a route or API,
- validating database behavior,
- testing authentication or authorization,
- checking important edge cases,
- confirming a refactor preserved behavior,
- verifying an integration,
- validating a deployment-sensitive change,
- or confirming acceptance criteria before documenting implementation as complete.

Trivial changes may require only lightweight verification.

Use verification effort in proportion to the risk and importance of the change.

For the initial UI milestone, verify behavior against the local mock/hardcoded academic data and `docs/V1_SPEC.md`. Generic database, authentication, integration, and dependency-failure checks apply only when such systems actually exist within accepted scope. During the documentation foundation, use document inspection and consistency checks; do not claim application runtime verification or create tooling merely to run it.

---

## 3. Required Context

Before verification:

1. Read the root `AGENTS.md`.
2. Read the root `CONTEXT.md`.
3. Read this verify-stage context.
4. Use the root context router to identify only the durable project sources relevant to the verification target.
5. Inspect the actual implementation, tests, schema, configuration, Git diff, or runtime behavior needed to evaluate the task.

Depending on the task, relevant context may include:

- `docs/PRODUCT_VISION.md` when product purpose or long-term direction matters,
- the accepted plan under `icm/01_plan/output/` when one exists and its acceptance criteria matter,
- a Build handoff or Build output when one exists and helps locate the change,
- `docs/V1_SPEC.md` when product requirements or expected behavior matter,
- `docs/ARCHITECTURE.md` when system structure or technical boundaries matter,
- `docs/IMPLEMENTATION.md` when verifying changes to existing functionality,
- `docs/DECISIONS.md` when settled decisions constrain expected behavior,
- `docs/TASKS.md` when verification affects task status or sequencing.

Do not load these sources automatically merely because they exist.

Treat Build descriptions and prior ICM artifacts as orientation, not proof.

Do not automatically load unrelated documentation, historical ICM outputs, or the entire repository.

---

## 4. Verification Independence

Treat Build claims as information to investigate, not proof.

Build may say:

> The course detail page works.

Verify should instead ask:

- What requirement says what the course detail page should show?
- What code was changed?
- What observable behavior proves it?
- What failure cases matter?
- What evidence exists?
- Has related existing behavior been preserved?

Do not repeat Build's conclusions without independent evidence.

Verification should challenge assumptions where reasonable.

---

## 5. Verify Against Acceptance Criteria

The primary verification target is the accepted behavior, not the implementation details.

For each relevant acceptance criterion:

1. identify the expected behavior,
2. determine the strongest practical way to test it,
3. perform the check,
4. record the result,
5. and identify any limitation in the evidence.

Example:

Acceptance criterion:

> Opening a known course shows the selected course's details and only its associated mock assignments, weekly learning objectives, and daily study tasks; an unknown course shows a clear not-found state.

Verification should separately confirm:

- the selected course is correctly resolved from mock data,
- the course card opens the corresponding detail view,
- the displayed assignments belong to that course,
- the weekly objectives and daily tasks belong to that course,
- another course's academic items are not included,
- empty lists are handled clearly,
- and an unknown course shows the expected not-found state.

Do not treat one partial success as proof of the entire criterion.

When asked to evaluate a proposed or hypothetical behavior rather than an implemented repository change, verification may compare that behavior against the relevant accepted requirements, architecture, and decisions.

In that case, clearly distinguish specification or design verification from runtime verification.

Do not claim that unimplemented behavior was executed, tested, or proven in the application.

---

## 6. Verification Strategy

Use the strongest practical verification available for the task.

Possible methods include:

- automated tests,
- integration tests,
- end-to-end tests,
- type checking,
- linting,
- production builds,
- database queries or inspection,
- API requests,
- browser testing,
- local runtime testing,
- controlled failure testing,
- or targeted manual inspection.

Prefer objective, repeatable evidence when practical.

Manual verification is valid when automation would be disproportionate or unavailable, but describe exactly what was checked.

Do not claim a behavior was tested if it was only inferred from reading code.

---

## 7. Happy Path and Failure Path

Do not verify only the expected successful case.

Where relevant, check:

### Happy Path

Does valid input produce the required successful behavior?

### Invalid Input

Does malformed, unknown, or unsupported input behave safely and predictably?

### State Restrictions

Does behavior correctly respect states such as:

- inactive,
- disabled,
- unauthorized,
- missing,
- expired,
- or otherwise invalid?

### Dependency Failure

What happens when an expected database, service, or external dependency fails?

### Boundary Conditions

Are important limits or unusual cases handled correctly?

Use judgment.

Do not invent dozens of meaningless edge cases merely to make verification appear thorough.

Focus on failures that could realistically affect correctness, security, or user experience.

---

## 8. Regression Checking

A successful new feature is not sufficient if it breaks existing behavior.

When a change touches existing functionality, identify the nearby behavior most likely to regress.

Use:

- existing tests,
- targeted regression tests,
- relevant build checks,
- or focused manual verification.

The verification scope should remain proportional to the change.

Do not retest the entire application for every small task unless the change genuinely creates broad risk.

---

## 9. Security Verification

When the task involves security-sensitive behavior, explicitly verify relevant protections.

Examples include:

- authentication,
- authorization,
- public routes,
- course-material links,
- user-controlled input,
- database writes,
- course identifiers,
- secrets or environment configuration,
- external APIs,
- or sensitive student and academic data.

Relevant verification may include:

- unauthorized access attempts,
- invalid identifiers,
- unsafe external links,
- unexpected user input,
- accidental information exposure,
- or improper privilege boundaries.

Do not claim security from code appearance alone.

If meaningful security behavior cannot be adequately verified, document that limitation clearly.

---

## 10. Tests Are Evidence, Not Truth

Passing tests increase confidence but do not automatically prove the implementation is correct.

A test may:

- test the wrong behavior,
- miss an important case,
- encode an outdated assumption,
- or be weakened to match a broken implementation.

When reviewing tests, ask:

- Does this test correspond to an actual requirement?
- Would it fail if the feature were meaningfully broken?
- Does it cover the important behavior?
- Is the assertion specific enough to be useful?

Do not modify tests simply to make a failing implementation appear correct.

If a test conflicts with an approved requirement, surface the contradiction.

---

## 11. Build and Tooling Checks

Where appropriate, verify that the project still passes relevant technical checks.

These may include:

- TypeScript checks,
- linting,
- automated tests,
- production build,
- dependency validation,
- schema validation,
- or framework-specific checks.

A feature that behaves correctly in one narrow test but causes the project to fail compilation or build is not ready.

Record which checks were run and their results.

---

## 12. Git Diff Review

Verification includes reviewing the actual change set.

Inspect the Git diff and confirm:

- changed files are expected,
- unrelated changes were not introduced,
- no secret or sensitive file is included,
- no accidental generated file is being tracked,
- the implementation scope matches the task,
- and important deletions or configuration changes are intentional.

Verification is about both:

> Does the feature work?

and:

> Did we change only what we meant to change?

Do not commit, push, merge, reset, or rewrite Git history unless Mike explicitly asks.

---

## 13. Verification Failures

A failed verification is useful information.

Do not hide, weaken, or reinterpret a failure merely to declare completion.

When verification fails:

1. identify the acceptance criterion or expected behavior that failed,
2. record the evidence,
3. identify the likely affected implementation area when possible,
4. distinguish confirmed facts from hypotheses,
5. and return the issue to Build or Plan as appropriate.

### Return to Build

Use Build when the requirement remains correct and the implementation is defective.

### Return to Plan

Use Plan when verification reveals that the requirement, architecture, acceptance criterion, or implementation approach itself is materially flawed or incomplete.

Do not patch production code inside Verify simply to make verification pass unless Mike explicitly asks for that workflow.

Keep verification and repair conceptually separate.

---

## 14. Verification Output Artifacts

For meaningful verification work, create a task-specific artifact under:

`icm/03_verify/output/`

Create this directory only when a task needs a verification artifact; it need not exist during the documentation foundation.

Example:

`SD-004-course-detail-verification.md`

Use a verification artifact when the task benefits from a durable record of what was checked before the conclusions are promoted into project documentation.

Every substantial verification artifact should begin with a concise `Human Review Summary` before the detailed verification content.

The summary is an acceptance aid for Mike, not merely a shorter agent report. It should make the result, proven behavior, evidence gaps, review priorities, routing, and next action clear without duplicating the detailed evidence.

The `Human Review Summary` should contain these sections near the top:

### Verification Result

State exactly one status:

- PASS
- PASS WITH LIMITATIONS
- FAIL
- BLOCKED

Use the status meanings defined in this stage and do not claim completion more strongly than the evidence supports.

### What Was Proven

- Include only concise, evidence-backed claims.
- Connect each claim to the relevant check or observation without repeating raw output.
- If nothing was proven, say `None.`

### What Was Not Proven

- Explicitly identify limitations, untested assumptions, unavailable environments, and other evidence gaps.
- Do not invent a limitation merely to populate the section.
- If the relevant behavior was sufficiently proven with no meaningful evidence gap, say `None.`

### Mike's Review Focus

- Identify the most important evidence, files, behavior, or failures Mike should personally inspect.
- Explain briefly why each focus area matters when that is not obvious.
- If no special human review focus exists, say `None.`

### Learning Takeaways

- Concisely explain the most important engineering lessons revealed by verification.
- Keep learning takeaways separate from verification evidence.
- Do not turn the artifact into a tutorial or add unrelated concepts.
- If there is no meaningful takeaway, say `None.`

### Retrospective Candidates

Build may surface possible candidates, but Verify provides the final task-level retrospective candidates after the available evidence is known.

- **Decision Candidates:** List only potential durable product or technical decisions requiring human review.
- **ICM Improvement Candidates:** List only potential improvements to agent instructions or the ICM workflow requiring human review.

Candidates are surfaced for human review only. Do not automatically promote them into `docs/DECISIONS.md`, `AGENTS.md`, or other durable documentation. If a category has no meaningful candidates, say `None.`

### Failures / Limitations and Routing

- Describe confirmed failures and meaningful limitations without hiding them behind the overall status.
- Route defective implementation to Build.
- Route defective or unresolved requirements, design, architecture, acceptance criteria, or implementation approach to Plan.
- Keep confirmed facts separate from hypotheses.
- Do not repair production code inside Verify unless Mike explicitly asks for that workflow.
- If there are no failures or meaningful limitations to route, say `None.`

### Next Action

Clearly state whether the task should:

- return to Plan,
- return to Build,
- remain blocked,
- or proceed to final human review and commit consideration.

### Final Acceptance Checklist

When applicable, provide a concise checklist Mike can use to determine whether the work is ready to be accepted as the current project state. The checklist should reflect the actual acceptance criteria, evidence, limitations, regression status, security considerations, diff review, and justified documentation updates.

After the `Human Review Summary`, retain the detailed verification content needed to support independent review. Do not repeat the entire detailed artifact in the summary, and preserve progressive disclosure.

A useful verification artifact may contain:

### Verification Target

What implementation or feature was evaluated.

### Acceptance Criteria

The criteria being tested.

### Verification Performed

Commands, tests, browser actions, queries, or other checks used.

### Results

What passed, failed, or could not be verified.

### Evidence

Relevant test output, observed behavior, or concise findings.

### Regressions Checked

Existing behavior that was specifically checked.

### Limitations

Anything the verification process could not confidently establish.

### Final Status

One of:

- PASS
- PASS WITH LIMITATIONS
- FAIL
- BLOCKED

Do not create a verification output file for every trivial change.

Do not turn verification artifacts into permanent general project documentation.

Do not invent decisions, learning requirements, blockers, failures, or limitations merely to fill a summary section. Use `None.` whenever a section has nothing meaningful to report.

---

## 15. Verification Status Meaning

Use status labels carefully.

### PASS

All required acceptance criteria were sufficiently verified and no blocking issue remains.

### PASS WITH LIMITATIONS

Required behavior appears correct, but a meaningful part of verification could not be completed or confidence is reduced for a clearly stated reason.

This status should not be used to hide a known requirement failure.

### FAIL

One or more required acceptance criteria did not pass.

### BLOCKED

Verification cannot proceed because required environment, access, data, dependency, or implementation is unavailable.

Always explain the evidence behind the status.

---

## 16. Documentation Promotion

Verification is the gate before new implementation is described as established project reality.

After meaningful functionality receives sufficient verification, update durable documentation as appropriate.

### `docs/IMPLEMENTATION.md`

Update when verified behavior changes what School Dashboard currently does.

Document:

- current behavior,
- major implementation flow,
- important file or module locations,
- implementation constraints,
- known limitations,
- and references to relevant durable decisions.

Describe the current state rather than a chronological history.

### `docs/ARCHITECTURE.md`

Update when verified work materially changes system design or technical structure.

### `docs/V1_SPEC.md`

Update only when accepted product requirements themselves change.

Do not rewrite requirements merely to match an incorrect implementation.

### `docs/DECISIONS.md`

Update when the task establishes an accepted durable technical or product decision.

### `docs/TASKS.md`

Update when verification changes the state of tracked work.

Do not promote failed or unverified behavior into `IMPLEMENTATION.md` as if it is complete.

---

## 17. Implementation Documentation Quality

When updating `docs/IMPLEMENTATION.md`, preserve its role as a concise current-state guide.

Do not fill it with:

- raw test output,
- temporary debugging notes,
- chronological commit history,
- detailed planning discussion,
- or every internal implementation detail.

Future agents should be able to use it to answer:

> What meaningful functionality exists right now?

> How do its major pieces fit together?

> Where should I inspect the actual implementation?

If the implementation later changes, update the existing description rather than preserving obsolete behavior as active documentation.

Git already preserves historical versions.

---

## 18. Verification Discoveries

Verification may reveal information beyond a simple pass or fail.

Classify discoveries before promoting them.

### Implementation defect

Return to Build.

### Planning or requirement defect

Return to Plan.

### Durable architectural insight

Record in `ARCHITECTURE.md` or `DECISIONS.md` once accepted.

### Current implementation detail

Record in `IMPLEMENTATION.md` after sufficient verification.

### Future improvement

Record in `TASKS.md` if it is valuable and within project direction.

### Temporary observation

Keep it only in the verification artifact when appropriate.

Do not promote every observation into permanent project context.

---

## 19. Verify Quality Check

Before declaring verification complete, confirm:

- relevant acceptance criteria were evaluated,
- appropriate happy-path behavior was checked,
- meaningful failure or edge cases were considered,
- relevant regressions were checked,
- important technical checks were run,
- security-sensitive behavior was examined when applicable,
- the Git diff was reviewed,
- results are supported by evidence,
- limitations are explicit,
- and durable documentation was updated only when justified.

If confidence depends primarily on assumption rather than evidence, verification is not complete.

---

## 20. Final Handoff

At the end of meaningful verification, provide Mike with a concise handoff containing:

### Status

PASS, PASS WITH LIMITATIONS, FAIL, or BLOCKED.

### What Was Verified

The behavior and acceptance criteria that were evaluated.

### Evidence

The most important tests, checks, or observations supporting the conclusion.

### What Failed or Remains Uncertain

Any issue, limitation, or blocked area.

### Regression Status

Whether relevant existing behavior was checked and whether regressions were found.

### Documentation Updates

Any durable project documentation that should now be updated or was updated because the behavior is verified.

### What Mike Should Understand

The most important engineering lesson, system behavior, or verification concept from the task.

Do not claim completion more strongly than the evidence supports.

When no verification artifact is justified, the final Verify handoff should still apply the same human-review principles where practical: state the result, distinguish what was and was not proven, direct Mike to the most important evidence, separate learning from evidence, route failures correctly, state the next action, and provide an acceptance checklist when applicable.
