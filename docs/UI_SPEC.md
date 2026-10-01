# School Dashboard — UI Specification

## 1. Purpose

This document defines the durable:

- information hierarchy,
- interaction expectations,
- presentation responsibilities,
- reusable UI concepts

for School Dashboard.

It primarily preserves the completed Milestone 1 interface contract while
providing UI principles that later product milestones should build on.

This document does NOT define:

- pixel-perfect styling,
- exact colors,
- exact typography,
- final component APIs,
- database structure,
- authentication architecture,
- persistence architecture,
- AI implementation,
- external integrations.

Use:

- `docs/V1_SPEC.md` for the frozen Milestone 1 product contract,
- `docs/PRODUCT_VISION.md` for long-term product direction,
- `docs/ARCHITECTURE.md` for technical boundaries,
- `docs/IMPLEMENTATION.md` for verified current implementation,
- `docs/TASKS.md` for execution sequencing.

This document answers:

> How should School Dashboard organize academic information so the student can
> quickly understand what matters and what to do next?

---

# 2. Current UI Status

Milestone 1 is complete.

The current verified UI contains five primary views:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Current runtime behavior remains:

- static,
- read-only,
- fixture-driven,
- non-authenticated,
- non-persistent,
- non-AI.

Future editable and intelligent behavior should extend this interface through
later accepted product specifications rather than silently changing historical
V1 behavior.

---

# 3. Core Experience

The interface should make it easy to move among three levels of academic
planning.

## Today

> What should I do now?

## This Week

> What am I trying to accomplish this week?

## Course Context

> Why am I doing this, what am I learning, and what deadlines or materials are
> connected to it?

The student should be able to move conceptually through:

```text
Today
↓
Weekly Plan
↓
Course
↓
deeper Course context
```

without needing to understand the application's internal data model.

---

# 4. Primary Views

The five established primary views are:

```text
Dashboard
Courses
Course Page
Weekly Plan
Today
```

Direct primary navigation includes:

- Dashboard
- Courses
- Weekly Plan
- Today

Course Page is reached through Course-related navigation.

Upcoming Assignments is reusable deadline context.

It is not a sixth primary view.

Later milestones may add new workflows such as:

- Course Setup,
- Course Materials,
- review of extracted information,
- account/settings flows.

Those additions require accepted later product scope.

They do not retroactively alter the five-view Milestone 1 contract.

---

# 5. Global UI Principle — Action First

School Dashboard should prioritize useful action over passive information.

The student should not need to inspect several screens simply to determine what
they should work on next.

Where appropriate, emphasize:

1. what should I do next?
2. what remains planned today?
3. what deadlines need awareness?
4. what am I trying to accomplish this week?
5. why am I doing this?
6. what Course context supports it?

The product should reduce planning friction rather than create another
information-management burden.

---

# 6. Preserve Academic Meaning

The UI must preserve distinctions among:

- Learning Objective
- Assignment
- Study Task
- Course Material
- Class Meeting / schedule context
- Course Fact
- planning suggestion

These concepts may be visually related.

They must not become interchangeable.

Example:

Learning Objective:

> Understand standing waves.

Assignment:

> HW 4 — Due Friday.

Study Task:

> Solve HW 4 problems 1–3 — 35 min.

Course Material:

> Lecture 7 slides.

Class Meeting:

> PHY lecture — Friday.

These describe different parts of the student's academic situation.

---

# 7. One Item Across Multiple Views

A single Study Task may appear on:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page.

These appearances represent one conceptual Study Task.

The UI must not suggest repeated appearances are duplicate work.

Relevant information should remain consistent across views:

- identity,
- title,
- Course,
- planned date,
- completion state,
- relationships.

Presentation detail may differ by context.

---

# 8. Progressive Disclosure

Do not show every available detail on every screen.

Use each view for a different level of information.

Dashboard:

> summary and immediate attention

Today:

> daily execution

Weekly Plan:

> weekly structure and purpose

Courses:

> Course-level overview

Course Page:

> deeper Course-specific context

The student should be able to move deeper when needed without being overloaded
at the top level.

---

# 9. Information Density

School Dashboard should favor:

- clear grouping,
- readable hierarchy,
- concise context,
- scannable actions.

Avoid creating screens where every piece of information receives equal visual
weight.

Important context should be available without requiring the student to process
large walls of text.

---

# 10. Deadlines Are Context

An Assignment due today or soon should be visible as deadline context.

It should not automatically become a Study Task.

The interface must distinguish:

```text
Assignment due date
```

from:

```text
Study Task planned date
```

Example:

Assignment:

> Problem Set 1 — Due Monday.

Study Task:

> Begin Problem Set 1 — Planned Friday.

The UI should help the student understand both without implying they are the same
date or concept.

---

# 11. Progress Meaning

Progress represents completion of planned Study Tasks within the accepted scope.

It must not visually imply:

- Course mastery,
- Assignment submission,
- grade performance,
- percent of the entire Course completed,
- percent of academic material understood.

Prefer clear wording such as:

> This week's study tasks

and:

> 3 of 5 complete

Avoid:

> Course completion: 60%

unless a future accepted product requirement gives that metric an explicit new
meaning.

---

# 12. Missing Information

Missing information is a valid UI state.

Do not fabricate:

- instructor,
- topic,
- deadline,
- Course Material,
- duration,
- room,
- meeting time,
- Learning Objective

merely to fill a card or section.

Use a deliberate empty or unavailable state where useful.

---

# 13. Empty States

Empty states should describe what is known without overclaiming.

Good example:

> No study tasks remain on today's plan.

Avoid:

> You're completely done!

because the student may still have:

- Assignments,
- Course obligations,
- future work,
- Classes,
- study outside the accepted plan.

Empty states should remain semantically accurate.

---

# 14. Primary Navigation

Primary navigation should make the core product areas recognizable.

Established entries:

- Dashboard
- Courses
- Weekly Plan
- Today

Course Page is reached through Course selection.

Navigation should support:

- desktop,
- narrow/mobile layouts,
- keyboard operation,
- visible active state.

The exact visual form may evolve.

The information architecture should remain understandable.

---

# 15. Dashboard

## 15.1 Purpose

Dashboard is the cross-Course command center.

Its primary question is:

> What needs my attention right now?

The student should be able to understand their immediate academic situation
quickly.

---

## 15.2 Dashboard Information Priority

Dashboard should prioritize approximately:

1. Next Action
2. Today's Study Plan
3. Today's schedule / Classes when available
4. Assignments Due Soon
5. Weekly Progress
6. Current Courses
7. Weekly learning context

This is an information-priority guide.

It does not require one exact vertical layout.

Responsive layouts may arrange sections differently.

---

## 15.3 Next Action

Dashboard should strongly emphasize the next remaining Study Task from Today's
accepted order.

For frozen V1 behavior:

```text
Next Action =
first incomplete Study Task
planned for the reference date
in authored order
```

Example:

```text
NEXT UP

PHY 009D

Review Lecture 02 notes

25 min

Supports:
Relativity principle
```

If no Today Study Task remains:

> No study tasks remain on today's plan.

Do not invent replacement work.

Later planning engines may define new prioritization behavior only through
accepted future requirements.

---

## 15.4 Today's Study Plan

Dashboard should show a compact summary of Today's Study Tasks.

Useful context may include:

- Course,
- action,
- duration when available,
- Learning Objective,
- Assignment/deadline context.

Dashboard does not need every relationship shown on the full Today screen.

Provide a clear route to Today.

---

## 15.5 Today's Schedule Context

When Course schedule or Class Meeting context exists for the current day, it may
appear on Dashboard.

Show only supplied information.

Possible fields:

- Course,
- meeting/lecture identity,
- time when supplied.

Do not invent missing time or room data.

Schedule information remains separate from Study Task progress.

---

## 15.6 Assignments Due Soon

Show upcoming Assignment deadlines.

Each item should communicate:

- Assignment title,
- Course,
- due date.

Example:

```text
PHY 009D
Problem #1
Due Monday
```

This section is deadline context.

Do not imply:

- submission,
- Study Task completion,
- priority score

unless a later product requirement explicitly introduces those concepts.

---

## 15.7 Weekly Progress

Dashboard should display understandable current-week Study Task progress.

Useful presentation:

```text
This week's study tasks

3 of 7 complete
```

Course summaries may show their own counts.

Do not average Course percentages to create overall progress.

---

## 15.8 Current Courses

Dashboard may reuse the Course Card presentation from Courses.

Dashboard Course Cards should remain compact.

They should allow the student to:

- recognize the Course,
- understand current-week Study Task progress,
- open the Course Page.

Do not reproduce the entire Course Page inside a Dashboard card.

---

# 16. Courses

## 16.1 Purpose

Courses answers:

> What Courses am I currently managing?

It provides a Course-level overview.

---

## 16.2 Course Card

Each Course should have a reusable Course Card.

At minimum it should expose:

- Course identifier/code,
- Course name,
- current-week Study Task progress.

Optional supplied context may include:

- instructor,
- current topic,
- schedule context.

Only display optional information when it exists and improves clarity.

Do not fabricate it.

---

## 16.3 Course Card Reuse

Course Cards may appear in:

- Courses,
- Dashboard,
- future Course-selection workflows.

A Course Card represents the same Course everywhere.

Do not create separate conceptual Course records for different views.

---

## 16.4 Course Selection

Selecting a Course Card should open that Course's Course Page.

The interaction should be:

- recognizable,
- keyboard accessible,
- visually focusable.

---

# 17. Course Page

## 17.1 Purpose

Course Page answers:

> What is happening in this Course, what am I trying to learn, what work is
> connected to it, and what should I be doing?

It is the deepest Course-specific view in Milestone 1.

---

## 17.2 Course Page Hierarchy

Course Page should make these areas distinguishable:

1. Course identity
2. current week/topic context
3. Learning Objectives
4. Study Tasks
5. upcoming Assignments
6. progress
7. Course Materials/reference context

Exact visual placement may evolve.

The semantic hierarchy should remain clear.

---

## 17.3 Course Identity

Show:

- Course code/name,
- useful supplied metadata.

Example:

```text
PHY 009D
Modern Physics
```

Do not invent full-term Course structure when only current-week information is
known.

---

## 17.4 Learning Objectives

Label Learning Objectives separately from Study Tasks.

Example:

```text
Learning Objectives

- Explain the relativity principle
- Distinguish coordinate time from proper time
```

Do not imply mastery from Study Task completion alone.

---

## 17.5 Study Tasks

Display relevant Study Tasks with useful context such as:

- action,
- planned date,
- completion state,
- duration when available,
- related Learning Objective,
- related Assignment/deadline.

Example:

```text
Friday

Begin Problem #1
30 min

Supports:
Relativity principle

Problem #1 — Due Monday
```

---

## 17.6 Assignments

Assignments should be visually distinct from Study Tasks.

Example:

```text
Assignments

Problem #1
Due Monday
```

Do not imply submission state unless a future accepted feature explicitly tracks
submission.

---

## 17.7 Course Materials

In the completed V1 interface, Course Materials are static references/context.

Example:

```text
Materials

- Assigned textbook
- Lecture notes
```

V1 does not provide:

- uploads,
- file preview,
- parsing,
- extraction,
- document search,
- AI analysis,
- Drive synchronization.

Later Course Material UI should be specified separately when that milestone is
authorized.

---

## 17.8 Progress

Course Page progress uses the same Study Task progress semantics as:

- Dashboard,
- Courses,
- Weekly Plan.

Progress presentation must not imply Course mastery.

---

## 17.9 Unknown Course

If a Course identifier is not recognized:

show a clear not-found state.

Do not:

- silently display the first Course,
- redirect to unrelated Course data,
- crash.

---

# 18. Weekly Plan

## 18.1 Purpose

Weekly Plan answers:

> What should I accomplish this week?

It is a dedicated primary view.

It must not exist only as a Dashboard section.

---

## 18.2 Conceptual Structure

Weekly Plan should distinguish:

### Learn

Learning Objectives.

### Deliver

Assignments / deadlines.

### Do

Study Tasks.

The UI does not have to literally use:

- Learn,
- Deliver,
- Do

if another presentation preserves these distinctions clearly.

---

## 18.3 Course Grouping

Weekly information should preserve Course context.

Conceptually:

```text
Current Week

PHY 009D

Learning Objectives
- Understand relativity concepts

Assignments
- Problem #1 — Due Monday

Friday
- Review Lecture 02 notes
- Begin Problem #1
```

---

## 18.4 Tasks Without Objectives

A Study Task without an Objective relationship must remain visible.

Example:

> Organize class notes.

It should not disappear merely because no Objective is linked.

---

## 18.5 Deadlines

Assignments relevant to the week should appear as deadline context.

They remain visually distinguishable from Study Tasks.

---

## 18.6 Completion State

Weekly Plan includes:

- complete Study Tasks,
- incomplete Study Tasks.

Completed work remains visible so the student can understand the week's plan and
progress.

---

## 18.7 Earlier Unfinished Work

Under frozen V1 behavior, an unfinished earlier Study Task remains displayed on
its original planned date.

It does not automatically move to Today.

Later adaptive planning may intentionally change this behavior through a new
accepted specification.

---

# 19. Today

## 19.1 Purpose

Today is the most execution-focused view.

It answers:

> What should I do today?

The student should be able to open Today and begin working without interpreting
the entire Weekly Plan.

---

## 19.2 V1 Inclusion Rule

Frozen V1 Today contains Study Tasks where:

```text
plannedDate == referenceDate
AND
isComplete == false
```

It does not automatically contain:

- every unfinished Study Task,
- every Assignment due today,
- earlier unfinished Study Tasks,
- generated work,
- work created because a deadline is approaching.

---

## 19.3 Ordering

Use authored order.

Do not invent:

- urgency ranking,
- AI ranking,
- deadline-based automatic reordering,
- priority formulas.

The first remaining Study Task is Dashboard Next Action.

---

## 19.4 Task Presentation

A Today Study Task should expose useful context such as:

- Course,
- concrete action,
- duration when supplied,
- Learning Objective when relevant,
- Assignment when relevant,
- Assignment deadline when useful.

Example:

```text
PHY 009D

Begin Problem #1

30 min

Supports:
Relativity principle

Problem #1 — Due Monday
```

---

## 19.5 Missing Duration

If duration is unavailable:

omit it.

Do not invent an estimate simply because the UI normally has a duration field.

---

## 19.6 Today Empty State

If no Today Study Tasks remain:

> No study tasks remain on today's plan.

Do not imply the student has completed:

- every Assignment,
- the entire week,
- all Course obligations.

---

# 20. Upcoming Assignments Presentation

Upcoming Assignment context may appear in:

- Dashboard,
- Course Page,
- Weekly Plan,
- linked Today Study Tasks.

At minimum show:

- title,
- Course where useful,
- due date.

Deadline presentation should not visually transform an Assignment into a Study
Task.

---

# 21. Status and Completion Presentation

Study Task completion should be understandable without implying stronger meaning
than intended.

A completed Study Task means:

> the student recorded the planned action as complete

not:

> the Learning Objective is mastered

and not:

> the Assignment has been submitted.

Later editable UI should preserve this distinction.

---

# 22. Responsive Behavior

The product should remain usable across narrow/mobile and desktop layouts.

Responsive behavior may:

- stack sections,
- collapse navigation,
- reduce secondary metadata,
- change grid layout.

It should not:

- hide critical actions,
- create horizontal page overflow,
- destroy information hierarchy.

Exact breakpoints remain implementation choices unless a task specifically
defines them.

---

# 23. Accessibility

Accessibility is part of normal UI quality.

Interactive elements should support, where applicable:

- keyboard access,
- visible focus state,
- semantic controls,
- understandable labels,
- sufficient navigation clarity.

Do not create a visually clickable element that cannot reasonably be operated
without a pointer.

---

# 24. Loading States

Future persistent/networked features may require loading states.

When such behavior exists:

- distinguish loading from empty,
- avoid implying failure before a request finishes,
- avoid exposing unrelated previous-user data,
- preserve useful page structure where practical.

The static V1 application does not require network loading behavior for its
fixture.

---

# 25. Error States

Errors should be useful and safe.

User-visible errors should explain what the student can do next where possible.

Do not expose:

- stack traces,
- raw database errors,
- credentials,
- internal implementation details.

Detailed security requirements live in:

`docs/SECURITY_REQUIREMENTS.md`

---

# 26. Authentication UI Boundary

Authentication UI is not part of Milestone 1.

When later introduced, login/account UI should:

- clearly establish the active user,
- provide understandable sign-in/sign-out behavior,
- avoid making security policy depend on visual hiding.

UI state is not authorization.

Protected behavior must still be enforced by trusted application boundaries.

---

# 27. Editable UI Boundary

Future persistent milestones may introduce controls for:

- creating Courses,
- editing Courses,
- Assignments,
- Study Tasks,
- completion,
- plan changes.

Editable UI should clearly distinguish:

- saved state,
- unsaved state where relevant,
- destructive actions,
- generated suggestions,
- accepted plan state.

Do not add non-functional controls merely to preview future capability.

---

# 28. Destructive Actions

When later UI supports actions such as:

- deleting a Course,
- deleting Course Materials,
- deleting an account

the interaction should make meaningful destructive consequences clear.

The exact confirmation pattern should match actual risk.

Do not add unnecessary confirmation dialogs to harmless actions.

---

# 29. Course Material UI Boundary

Future Course Material workflows may eventually include:

```text
Add material
↓
upload / source selection
↓
processing
↓
extracted candidate information
↓
review
↓
accepted Course context
```

The UI should make meaningful processing state understandable.

Potential states may include:

- uploading,
- processing,
- ready,
- needs review,
- failed.

Do not define exact controls until Course Material functionality is authorized.

---

# 30. Source and Provenance UI

When Course ingestion/intelligence exists, important information should be able
to communicate provenance when it matters.

The student should be able to distinguish information that is:

- source-backed,
- student-entered,
- supplemental,
- inferred,
- generated.

Not every small UI element needs a source badge.

Use provenance presentation where it materially affects trust or decision
making.

---

# 31. Uncertainty UI

The product should not disguise uncertainty.

When future extraction or Course intelligence encounters ambiguity, useful UI
patterns may include:

- needs review,
- uncertain source interpretation,
- conflicting information.

The UI should help the student correct important uncertainty rather than
presenting guesses as facts.

---

# 32. AI Suggestion UI Boundary

When AI planning exists, generated content must be distinguishable from accepted
plan state.

The product should support student control conceptually through actions such as:

- Accept
- Edit
- Reject
- Regenerate

Exact interaction design belongs to the relevant future product specification.

---

# 33. Generated vs Accepted Plan

Future UI should make a meaningful distinction between:

```text
AI-generated proposal
```

and:

```text
student-accepted plan
```

A suggestion should not visually appear permanent before the product has
accepted it according to the approved workflow.

---

# 34. AI Explanation

The product should provide enough context for generated planning that the
student can understand why an action is being suggested.

Useful context may include:

- related Course,
- related Assignment,
- Learning Objective,
- deadline,
- source context.

Avoid unexplained algorithmic-looking priority labels that create false
authority.

---

# 35. Adaptive Replanning UI

Future replanning may suggest changes when:

- work is missed,
- progress changes,
- deadlines approach,
- availability changes.

The interface should present these as proposed plan changes until accepted.

Do not silently rewrite the student's accepted plan unless a future explicit
product decision changes this principle.

---

# 36. Integration UI

Future external integrations should make clear:

- what is being connected,
- what information is being used,
- whether the integration is active,
- how the student can disconnect it.

Do not make optional integrations feel mandatory for the core product.

---

# 37. Privacy in UI

Avoid unnecessary exposure of private academic content.

Examples:

- do not place sensitive content in shareable/public URLs,
- do not display another user's academic content,
- avoid leaking private content into generic error states.

Detailed privacy rules live in:

`docs/DATA_PRIVACY.md`

---

# 38. Security in UI

The UI should help users perform secure actions, but security cannot depend on
presentation alone.

Examples:

Hiding a button:

> not authorization.

Disabling an input:

> not authorization.

Removing a navigation link:

> not authorization.

Trusted server-side controls remain authoritative.

---

# 39. Design-System Boundary

A formal design system is not currently required.

Shared components should still avoid unnecessary visual inconsistency.

Potential reusable concepts include:

- Course Card,
- Assignment presentation,
- Study Task presentation,
- progress display,
- empty-state pattern,
- navigation.

Do not create a large design-system abstraction until repeated UI complexity
justifies it.

---

# 40. Component Reuse Principle

Reuse UI when reuse preserves meaning.

Do not force unrelated domain concepts into one component merely because their
cards look similar.

For example:

Assignment and Study Task may share visual primitives.

They should not necessarily become one generic academic-item model.

Semantic clarity outranks superficial abstraction.

---

# 41. Visual Hierarchy

Use visual emphasis to answer:

> What matters first?

Useful hierarchy may come from:

- layout,
- spacing,
- typography,
- grouping,
- concise labels.

Do not rely only on color to communicate important meaning.

---

# 42. Text and Labels

Prefer student-understandable language.

Avoid exposing implementation terminology unnecessarily.

Good:

> This week's study tasks

Less useful:

> Weekly task completion metric

Labels should describe the student's academic context rather than the internal
system representation.

---

# 43. Date Presentation

Dates should be understandable in context.

Where useful, present:

- day name,
- calendar date,
- relative deadline wording

without creating ambiguity.

The underlying academic semantics remain defined by the product specification.

V1 continues to use its fixed reference date.

Later live-user behavior should receive a later specification.

---

# 44. Time Presentation

Only display a time when a time is actually known.

Do not infer:

- class time,
- deadline time,
- duration

from incomplete source context.

Date-only information should remain date-only.

---

# 45. Current M1 UI Invariants

Unless later deliberately superseded, preserve:

1. five established primary views;
2. Dashboard emphasizes immediate attention;
3. Today is execution-focused;
4. Weekly Plan is week-focused;
5. Course Page is Course-focused;
6. Learning Objective, Assignment, Study Task, Course Material, and Class Meeting remain distinct;
7. Study Task identity remains consistent across views;
8. Assignment due date remains distinct from Study Task planned date;
9. progress describes Study Tasks, not mastery;
10. missing information is not fabricated;
11. Course Cards represent the same Course everywhere;
12. empty states avoid overclaiming;
13. responsive behavior preserves critical information;
14. interactive elements remain keyboard-usable where applicable.

---

# 46. Future UI Specifications

Major future capabilities should receive focused UI/product requirements when
authorized.

Likely examples:

```text
Persistent editing
Course setup
Authentication/account
Course Material upload
Ingestion review
Course Roadmap
AI planning approval
Adaptive replanning
Integrations
Billing
```

Do not predesign every future screen inside this document.

This document should stay durable.

---

# 47. Current Implementation Boundary

The UI specification does not prove that a feature exists.

Use:

`docs/IMPLEMENTATION.md`

for verified current behavior.

If this document describes future interaction principles such as:

- upload,
- AI approval,
- editing,

that means:

> preserve these principles if/when that feature is implemented,

not:

> the feature exists now.

---

# 48. Frozen V1 Boundary

The completed V1 screen behavior remains governed by:

`docs/V1_SPEC.md`

Later features should extend the interface through new accepted requirements.

Do not rewrite historical Milestone 1 acceptance merely because School
Dashboard becomes a multi-user product.

---

# 49. Update Rule

Update this document when a durable UI principle or major information hierarchy
changes.

Examples:

- a new primary product workflow becomes accepted,
- generated-vs-accepted plan interaction materially changes,
- navigation architecture materially changes,
- important reusable presentation semantics change.

Do not update this document for:

- minor spacing,
- one-off styling,
- local class changes,
- temporary implementation details.

---

# 50. Final Principle

School Dashboard UI should help the student move quickly from:

> What is happening?

to:

> What matters?

to:

> What should I do next?

The interface should make academic complexity easier to act on without erasing
the meaning of the information underneath it.

The durable UI principle is:

```text
clarity
+
academic meaning
+
progressive context
+
student control
=
useful action
```