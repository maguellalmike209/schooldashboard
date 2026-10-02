# School Dashboard — Mock Data Specification

## 1. Purpose

This document defines the semantics, source-handling rules, and canonical static
fixture used by the completed School Dashboard Milestone 1 prototype.

Milestone 1 is complete.

This document should now be treated as the frozen fixture contract for that
milestone.

It explains:

- what the static fixture represents,
- how Course Facts differ from personal planning,
- how source context is handled,
- which values are canonical,
- which values are derived,
- how missing or uncertain information is treated.

It does NOT define:

- production database schema,
- authentication,
- persistence,
- Course upload architecture,
- ingestion architecture,
- AI planning,
- future provider choices.

Use:

- `docs/V1_SPEC.md` for completed Milestone 1 product behavior,
- `docs/UI_SPEC.md` for presentation responsibilities,
- `docs/PRODUCT_VISION.md` for long-term product direction,
- `docs/ARCHITECTURE.md` for technical boundaries,
- `docs/IMPLEMENTATION.md` for verified current implementation reality.

---

# 2. Meaning of Mock Data

For Milestone 1:

> mock data means static application data representing a realistic academic
> situation.

Mock does not mean every academic value must be fictional.

The fixture may contain:

- sanitized source-backed Course context,
- intentionally fictional supporting Courses,
- manually authored personal planning choices.

The application receives already-structured data.

It does not dynamically interpret Course files during Milestone 1.

Conceptually:

```text
Course Sources
      ↓
manual normalization outside the application
      ↓
Static Course Facts
      ↓
Static authored personal plan
      ↓
School Dashboard
```

---

# 3. Frozen Milestone Boundary

The fixture exists to support the completed static/read-only Milestone 1
experience.

Future systems may replace manual normalization with:

- uploads,
- extraction,
- ingestion,
- source reconciliation,
- AI,
- persistence.

Those systems should receive their own later requirements.

Do not continually expand this fixture specification into the production data
model.

---

# 4. Three Conceptual Layers

The fixture preserves three different layers:

```text
SOURCE CONTEXT
      ↓
COURSE FACTS
      ↓
PERSONAL ACADEMIC PLAN
```

These layers may be related.

They are not interchangeable.

---

# 5. Source Context

Source context represents where academic information originated.

Possible source categories include:

- syllabus,
- lecture schedule,
- Assignment information,
- assigned textbook,
- lecture slides,
- discussion material,
- student lecture notes,
- student study notes.

Source context answers:

> Where did this information come from?

Source artifacts do not automatically become:

- Learning Objectives,
- Assignments,
- Study Tasks,
- Class Meetings.

---

# 6. Course Facts

Course Facts describe academic information supported by available Course
sources.

Examples include:

```text
Course:
PHY 009D — Modern Physics
```

```text
Lecture #02:
September 25, 2026
```

```text
Lecture #02 topics:
- Relativity principle
- Spacetime events
- Time measurement
```

```text
Problem #1:
Due September 28, 2026 at 11:59 PM
```

Course Facts must not silently include personal planning choices.

---

# 7. Personal Academic Plan

The Personal Academic Plan contains student-planning information.

Examples:

- Learning Objectives,
- Study Tasks,
- planned dates,
- authored task ordering,
- estimated durations,
- completion states.

These are planning choices.

They are not automatically instructor requirements.

Example:

Course Fact:

```text
Lecture #02 covers relativity.
```

Personal Study Task:

```text
Review Lecture #02 relativity topics.
```

The second item is a personal planning action.

---

# 8. Why the Boundary Matters

School Dashboard ultimately aims to transform Course understanding into useful
planning.

That transformation remains trustworthy only if the system can distinguish:

```text
what the Course/source established
```

from:

```text
what the student or planning system decided to do
```

Milestone 1 represents that distinction manually.

Future automation should preserve it.

---

# 9. Canonical Runtime Source

The implemented canonical fixture lives in:

`src/lib/academic-context.ts`

For actual current runtime behavior, that source file and verified
`docs/IMPLEMENTATION.md` take precedence over stale examples.

This document describes the semantics the fixture should preserve.

---

# 10. Canonical Academic Term

The fixture represents:

```text
Fall Quarter 2026
```

Milestone 1 does not implement:

- term creation,
- term switching,
- production academic-calendar management.

---

# 11. Fixed Reference Date

The canonical reference date is:

```text
2026-09-25
```

which represents:

```text
Friday, September 25, 2026
```

All Milestone 1 views use this same reference date.

The machine's live date must not change the scenario.

---

# 12. Current Academic Week

The canonical current Academic Week is:

```text
2026-09-21
through
2026-09-27
```

This boundary is used for:

- weekly Study Task selection,
- weekly progress,
- weekly Learning Objective context.

Do not fabricate academic activity merely to fill every day of the week.

---

# 13. Canonical Courses

The current runtime fixture contains three Courses.

## PHY 009D

```text
id:
phy-009d

code:
PHY 009D

name:
Modern Physics
```

This is the primary realistic reference Course.

---

## WRT 101

```text
id:
wrt-101

code:
WRT 101

name:
Academic Writing
```

This is lightweight supporting fixture data.

---

## HIS 110

```text
id:
his-110

code:
HIS 110

name:
World History
```

This is lightweight supporting fixture data.

---

# 14. Realistic vs Supporting Fixture Data

PHY 009D provides realistic Course context derived from a sanitized source
packet.

WRT 101 and HIS 110 are lightweight supporting Courses used to verify
cross-Course product behavior.

Supporting fixture data does not need a complete fictional Course history.

Include only enough information to exercise required behavior.

---

# 15. Canonical PHY Week Context

The current PHY week context is:

```text
Course beginning:
sound review and introduction to special relativity
```

Its displayed source context is:

```text
Current lecture schedule
```

This is Course context.

It is not a generated full-term Course Roadmap.

---

# 16. Canonical Reference-Day Lecture

The fixture includes:

```text
Course:
PHY 009D

Lecture:
02

Date:
2026-09-25

Topics:
- Relativity principle
- Spacetime events
- Time measurement
```

This is date/topic Course schedule context.

The source does not provide a time or room in the implemented fixture.

Do not invent either.

---

# 17. Lecture Schedule Context vs Class Meeting

A scheduled lecture entry is not automatically a fully populated Class Meeting.

A source may establish:

```text
Lecture #02 occurs September 25.
```

without establishing:

```text
start time
end time
room
recurrence
```

Do not manufacture missing meeting details.

Where only date/topic context exists, preserve it as such.

---

# 18. Canonical Course Material

The current fixture includes one PHY Course Material:

```text
id:
phy9d-textbook

courseId:
phy-009d

kind:
Assigned textbook

title:
UCD Physics 9D — Modern Physics
```

The fixture contains only the concise reference needed by the UI.

It does not contain the textbook itself.

---

# 19. Raw Course Materials

Do not embed complete raw Course documents into the application fixture.

Examples that should not be copied wholesale into static source code:

- syllabus text,
- textbook chapters,
- lecture decks,
- instructor documents,
- student notes.

The fixture should contain:

- concise Course Facts,
- sanitized values,
- small references required by the UI.

---

# 20. Repository Safety

Raw Course materials may contain:

- copyrighted content,
- instructor material,
- student information,
- private Course information.

Private/raw Course files should not be committed merely to support the static
prototype.

Future real Course Materials should enter through an authorized private product
workflow rather than becoming repository fixture files.

---

# 21. Source Authority

When multiple sources describe current Course requirements, more authoritative
current-Course sources should generally outrank historical/general sources.

The product authority guide is:

1. Current instructor syllabus.
2. Current instructor Assignments / official Course materials.
3. Current lecture slides / instructor notes.
4. Current assigned textbook sections.
5. Official university Course description.
6. Official department materials.
7. Previous public Course offerings.
8. General educational resources.

Student notes may provide useful evidence about observed lecture coverage.

They do not automatically override instructor sources for:

- deadlines,
- grading rules,
- exam dates,
- Course policies.

---

# 22. Specific Facts vs General Policies

Specific current Assignment information should not be overwritten merely because
it differs from a broader Course pattern.

Example:

General policy:

```text
Homework is usually due Sunday at 11:59 PM.
```

Specific Assignment:

```text
Problem #1
Due Monday, September 28 at 11:59 PM.
```

When a clearly authoritative specific Assignment source establishes the
deadline, use the specific fact.

If equally relevant authoritative sources genuinely conflict:

do not guess.

---

# 23. Missing Sources Are Valid

A Course does not require every possible source category.

A valid source state might be:

```text
Available:
- syllabus
- lecture schedule
- textbook
- Assignment information

Missing:
- lecture notes
- slides
- discussion worksheet
```

Missing information is not a fixture failure.

---

# 24. Do Not Invent Missing Facts

If sources do not establish a value, leave it absent.

Do not fabricate:

- lecture time,
- room,
- instructor requirement,
- Assignment deadline,
- required textbook section,
- office hours,
- grade value,
- duration.

A UI component having space for a value is not evidence that the value exists.

---

# 25. Source Ambiguity

Ambiguous or contradictory source information must not be silently normalized.

Conceptually, ambiguous source information may be treated as:

```text
needs-review
```

rather than:

```text
confirmed
```

Do not invent numerical confidence percentages.

Milestone 1 has no numeric confidence model.

---

# 26. Historical Source-Review Example

During manual source review, an impossible source date such as:

```text
Sep 31
```

must not be silently converted to:

```text
Sep 30
```

or:

```text
Oct 1
```

without evidence.

This is an example of the broader invariant:

> preserve uncertainty instead of manufacturing certainty.

Such an edge case does not need to exist in the runtime fixture merely to prove
the principle.

---

# 27. Scheduled vs Observed Course Content

Scheduled Course content and observed lecture coverage are different concepts.

Example:

Scheduled:

```text
Lecture:
Time dilation
Lorentz transformations
Length contraction
```

Later student notes might indicate:

```text
Most time was spent on time dilation.
```

Do not silently replace the scheduled record.

Future systems may preserve both:

```text
scheduled content
```

and:

```text
observed coverage
```

---

# 28. Canonical Learning Objectives

The current runtime fixture contains three Learning Objectives.

## PHY Sound Objective

```text
id:
phy9d-objective-sound

courseId:
phy-009d

title:
Explain sound-wave and Doppler-effect ideas

origin:
authored-plan
```

## PHY Relativity Objective

```text
id:
phy9d-objective-relativity

courseId:
phy-009d

title:
Explain the relativity principle and spacetime events

origin:
authored-plan
```

## WRT Argument Objective

```text
id:
wrt101-objective-argument

courseId:
wrt-101

title:
Build a clear argument for the response draft

origin:
authored-plan
```

HIS 110 intentionally has no current-week Learning Objective in the fixture.

---

# 29. Learning Objective Semantics

Learning Objectives in the V1 fixture belong to the authored personal plan.

They are not automatically instructor-defined learning outcomes.

A Course source may motivate an Objective.

The authored Objective remains a planning construct unless the data explicitly
represents a different origin.

---

# 30. Canonical Assignments

The current fixture contains three Assignments.

## PHY Problem #1

```text
id:
phy9d-problem-1

courseId:
phy-009d

title:
Problem #1

dueDate:
2026-09-28

dueTime:
23:59
```

## WRT Response Draft

```text
id:
wrt101-response-draft

courseId:
wrt-101

title:
Response draft

dueDate:
2026-09-27
```

## HIS Map Quiz

```text
id:
his110-map-quiz

courseId:
his-110

title:
Map quiz

dueDate:
2026-09-25
```

The HIS Map quiz intentionally exists without a linked Today Study Task.

---

# 31. Assignment Semantics

An Assignment represents an academic obligation/deadline.

It does not define when the student plans to work on it.

Therefore:

```text
Assignment due date
≠
Study Task planned date
```

---

# 32. Canonical Study Tasks

The current runtime fixture contains seven authored Study Tasks.

## 1 — PHY Lecture #01 Review

```text
id:
phy9d-task-review-lecture-01

plannedDate:
2026-09-23

estimatedMinutes:
20

isComplete:
true

objective:
phy9d-objective-sound

assignment:
none
```

---

## 2 — PHY Doppler Practice

```text
id:
phy9d-task-practice-doppler

plannedDate:
2026-09-24

estimatedMinutes:
30

isComplete:
false

objective:
phy9d-objective-sound

assignment:
none
```

This intentionally demonstrates an earlier unfinished task.

It does not automatically move into Today.

---

## 3 — WRT Response Outline

```text
id:
wrt101-task-outline

plannedDate:
2026-09-24

estimatedMinutes:
25

isComplete:
true

objective:
wrt101-objective-argument

assignment:
wrt101-response-draft
```

---

## 4 — PHY Spacetime Event Example

```text
id:
phy9d-task-sketch-event

plannedDate:
2026-09-25

estimatedMinutes:
20

isComplete:
true

objective:
phy9d-objective-relativity

assignment:
none
```

This demonstrates a completed Study Task planned for the reference date.

It contributes to weekly progress but is omitted from actionable Today.

---

## 5 — PHY Lecture #02 Review

```text
id:
phy9d-task-review-lecture-02

plannedDate:
2026-09-25

estimatedMinutes:
25

isComplete:
false

objective:
phy9d-objective-relativity

assignment:
none
```

---

## 6 — WRT Organize Notes

```text
id:
wrt101-task-organize-notes

plannedDate:
2026-09-25

estimatedMinutes:
none

isComplete:
false

objectives:
none

assignment:
none
```

This intentionally demonstrates:

- missing duration,
- no Objective relationship,
- no Assignment relationship.

---

## 7 — PHY Begin Problem #1

```text
id:
phy9d-task-begin-problem-1

plannedDate:
2026-09-25

estimatedMinutes:
30

isComplete:
false

objective:
phy9d-objective-relativity

assignment:
phy9d-problem-1
```

This demonstrates one Study Task supporting both:

- a Learning Objective,
- an Assignment.

---

# 33. Study Task Origin

All current V1 Study Tasks have the conceptual origin:

```text
authored-plan
```

They must not imply:

```text
instructor-required
```

unless a later data model explicitly represents such a distinction.

---

# 34. Authored Order

Study Tasks use one shared authored order.

Current order:

```text
1. phy9d-task-review-lecture-01
2. phy9d-task-practice-doppler
3. wrt101-task-outline
4. phy9d-task-sketch-event
5. phy9d-task-review-lecture-02
6. wrt101-task-organize-notes
7. phy9d-task-begin-problem-1
```

Derived views preserve that order where relevant.

Do not silently replace it with:

- deadline ranking,
- alphabetical sorting,
- duration sorting,
- AI priority.

---

# 35. Stable Identity

Every canonical academic item has one stable identity.

If a Study Task appears on:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page,

it retains the same ID and state.

Do not create conceptual duplicates such as:

```text
dashboardTask
todayTask
weeklyTask
coursePageTask
```

for the same Study Task.

---

# 36. One Shared Academic Fixture

All five primary views derive from one canonical fixture.

Conceptually:

```text
shared academic context
        ↓
Dashboard
Courses
Course Page
Weekly Plan
Today
```

Views may select or format different parts.

They should not own separate academic truth.

---

# 37. Derived Information

View-specific summaries should normally be derived from canonical data.

Do not separately hardcode results such as:

```text
todayTasks
nextAction
courseProgressPercent
upcomingAssignments
```

when they can be derived reliably.

---

# 38. Today Derivation

For frozen V1:

```text
Today Study Tasks =
Study Tasks where

plannedDate == referenceDate

AND

isComplete == false
```

Then sort by:

```text
authoredOrder
```

For the current fixture, actionable Today is:

```text
1. Review Lecture #02 relativity topics
2. Organize class notes
3. Begin Problem #1
```

The completed spacetime-event Study Task does not appear in actionable Today.

The earlier unfinished Doppler Study Task does not automatically move into
Today.

---

# 39. Next Action Derivation

For V1:

```text
Next Action =
first Study Task in actionable Today order
```

Therefore the current Next Action is:

```text
Review Lecture #02 relativity topics
```

If Today contains no remaining Study Tasks:

```text
Next Action = none
```

Do not invent replacement work.

---

# 40. Upcoming Assignment Derivation

Upcoming Assignments include:

```text
dueDate >= referenceDate
```

Order by:

```text
1. due date
2. authored order for equal dates
```

For the current fixture the ordering is:

```text
1. HIS 110 — Map quiz — 2026-09-25
2. WRT 101 — Response draft — 2026-09-27
3. PHY 009D — Problem #1 — 2026-09-28
```

Assignment deadline order does not automatically determine Study Task order.

---

# 41. Weekly Progress Derivation

For the current Academic Week:

```text
Progress =
completed Study Tasks planned inside the week
/
all Study Tasks planned inside the week
```

Current fixture:

```text
PHY 009D:
2 of 5 complete

WRT 101:
1 of 2 complete

HIS 110:
No study tasks planned.

Overall:
3 of 7 complete
```

Do not:

- count Assignments,
- count Learning Objectives,
- count Course Materials,
- count schedule context,
- average Course percentages.

---

# 42. Zero-Task Progress

If a Course has no current-week Study Tasks:

show:

```text
No study tasks planned.
```

Do not imply:

```text
0%
```

or:

```text
100%
```

HIS 110 intentionally exercises this case.

---

# 43. Relationship Integrity

Every related object must belong to the same Course.

Invalid:

```text
PHY Study Task
→ WRT Learning Objective
```

or:

```text
WRT Study Task
→ PHY Assignment
```

Cross-Course relationships are fixture errors.

---

# 44. Missing Duration

A missing duration remains absent.

The canonical WRT Study Task:

```text
Organize class notes
```

has no duration.

Do not fabricate one.

---

# 45. Assignment Due Today Without Today Task

The HIS Map quiz is due on the reference date:

```text
2026-09-25
```

It has no linked Study Task.

This intentionally proves:

```text
Assignment due today
does not imply
Today Study Task
```

The Assignment remains deadline context.

---

# 46. Earlier Unfinished Study Task

The PHY Study Task:

```text
Practice Doppler-effect examples
```

is planned:

```text
2026-09-24
```

and remains incomplete.

It stays associated with September 24.

It does not automatically move into September 25 Today.

---

# 47. Completed Study Task Planned Today

The PHY Study Task:

```text
Sketch a spacetime event example
```

is planned:

```text
2026-09-25
```

and is complete.

Therefore it:

- contributes to weekly progress,
- may appear in Weekly Plan/Course context,
- is omitted from actionable Today.

---

# 48. Study Task Linked to Objective and Assignment

The Study Task:

```text
Begin Problem #1
```

supports:

```text
phy9d-objective-relativity
```

and:

```text
phy9d-problem-1
```

It remains one Study Task.

It counts once in progress.

---

# 49. Study Task Linked to Neither

The WRT Study Task:

```text
Organize class notes
```

has:

- no Objective,
- no Assignment.

It remains valid and visible because its planned date requires it.

---

# 50. Lightweight Supporting Courses

Supporting Courses should remain intentionally small.

Do not invent:

- quarter-long schedules,
- large fake material sets,
- complete fictional histories

merely to make fixture data appear realistic.

Add only the data needed to test accepted product behavior.

---

# 51. Source References

Static Course Facts may preserve lightweight provenance references where useful.

Conceptually:

```text
sourceRefs:
- current-syllabus
- current-lecture-schedule
```

Not every UI value requires visible provenance.

The purpose is to preserve enough source distinction that future work can
separate:

```text
source-backed Course information
```

from:

```text
personal planning
```

Exact future production provenance representation remains unselected.

---

# 52. SourceArtifact vs CourseMaterial

These concepts may overlap but are not identical.

SourceArtifact means conceptually:

> an artifact provides evidence for information.

CourseMaterial means:

> a resource is useful to the student as Course material.

A textbook may be both.

A syllabus may primarily serve as a source artifact.

Do not collapse the concepts simply because one document could play both roles.

The current runtime fixture does not require a production SourceArtifact model.

---

# 53. Fixture Types Are Not Production Schema

TypeScript types used by Milestone 1 should not automatically become:

- database tables,
- ORM models,
- public APIs,
- storage schemas.

They are evidence about the product model.

Production persistence should be designed during the relevant later Plan.

---

# 54. No Runtime Ingestion

Milestone 1 does NOT perform:

```text
PDF parsing
OCR
document ingestion
external Course research
AI extraction
AI planning
automatic scheduling
```

The fixture represents structured output that future systems may eventually
produce.

---

# 55. Future Ingestion Relationship

Long-term product direction may eventually transform:

```text
student Course materials
        ↓
private source records
        ↓
extraction
        ↓
candidate Course information
        ↓
provenance / uncertainty
        ↓
student review when needed
        ↓
accepted Course context
        ↓
planning suggestions
        ↓
student approval
```

That future pipeline belongs to later milestones.

This document does not define its implementation.

---

# 56. Fixture Validation

Before treating a static fixture as canonical, verify:

```text
[ ] Every canonical ID is unique.

[ ] Every Study Task references an existing Course.

[ ] Every Learning Objective references an existing Course.

[ ] Every Assignment references an existing Course.

[ ] Every Course Material references an existing Course.

[ ] Study Task relationships do not cross Course boundaries.

[ ] The reference date lies inside the current Academic Week.

[ ] Assignment deadlines remain separate from Study Task planned dates.

[ ] Today can be derived from canonical Study Tasks.

[ ] Next Action can be derived from Today.

[ ] Upcoming Assignments can be derived from Assignments.

[ ] Weekly progress can be derived from Study Tasks.

[ ] No required behavior depends on the machine's live date.

[ ] Missing values remain missing.

[ ] Source ambiguity is not silently normalized.

[ ] Raw private/copyrighted Course documents are not embedded unnecessarily.

[ ] Course Facts remain distinguishable from personal planning.
```

---

# 57. ALWAYS Rules

ALWAYS:

- use one canonical fixture;
- preserve stable identity;
- distinguish Course Facts from personal planning;
- preserve Assignment due dates independently from Study Task planned dates;
- preserve authored Study Task order;
- use the fixed V1 reference date;
- derive Today from canonical Study Tasks;
- derive Next Action from Today;
- derive progress from Study Tasks;
- derive upcoming Assignment ordering from canonical Assignments;
- preserve missing information;
- preserve source uncertainty where relevant;
- keep raw/private Course documents out of application fixtures.

---

# 58. NEVER Rules

NEVER:

- dynamically parse Course files during Milestone 1;
- run runtime AI to create V1 fixture data;
- treat fixture types as production database schema;
- duplicate canonical academic records per screen;
- fabricate Course Facts;
- silently repair ambiguous source facts;
- present personal planning as instructor requirements;
- treat Course Materials as Study Tasks;
- treat Assignment due date as Study Task planned date;
- infer missing meeting times or rooms;
- use the machine's current date instead of the V1 reference date;
- fabricate missing durations;
- calculate unsupported numerical confidence;
- embed complete textbooks or private source documents into the fixture.

---

# 59. IF → THEN Rules

IF:

```text
the same Study Task appears in multiple views
```

THEN:

```text
use the same canonical identity and state
```

---

IF:

```text
a duration is absent
```

THEN:

```text
leave it absent
```

---

IF:

```text
a Course has no Study Tasks in the week
```

THEN:

```text
show "No study tasks planned."
```

---

IF:

```text
an earlier Study Task remains unfinished
```

THEN:

```text
keep its original planned date
```

---

IF:

```text
an Assignment is due today with no Study Task today
```

THEN:

```text
show deadline context only
```

---

IF:

```text
a source fact is ambiguous
```

THEN:

```text
preserve ambiguity / require review rather than guessing
```

---

IF:

```text
a clearly authoritative specific Assignment deadline differs from a general
Course pattern
```

THEN:

```text
use the specific Assignment information for that Assignment
```

---

IF:

```text
comparable authoritative current sources genuinely conflict
```

THEN:

```text
do not guess
```

---

# 60. Frozen Fixture Boundary

Milestone 1 is complete.

Future product work should not keep adding production behavior into this static
fixture merely because new features need data.

Examples:

Authentication should use real user identity.

Persistence should use real persistence.

Uploads should use private storage.

Ingestion should use real ingestion models.

AI planning should create explicit generated proposals.

Do not simulate future production architecture by endlessly expanding
`academic-context.ts`.

---

# 61. Preserved Product Lessons

The V1 fixture proved several useful product concepts that future systems should
retain unless deliberately superseded:

1. one conceptual academic item should have one identity;
2. shared views should derive from shared academic truth;
3. Course Facts and planning choices are different;
4. Assignment deadlines and Study Task dates are different;
5. missing source information should not be invented;
6. provenance and uncertainty matter;
7. derived UI state should not become duplicated canonical state;
8. progress should remain modest in meaning;
9. a task can exist without an Objective or Assignment;
10. an Assignment can exist without a same-day Study Task.

---

# 62. Document Ownership

This document owns:

- completed static fixture semantics,
- canonical Milestone 1 fixture context,
- source-packet principles,
- fixture identity,
- fixture derivation,
- fixture validation,
- source ambiguity handling.

`V1_SPEC.md` owns:

- Milestone 1 product behavior,
- academic semantics,
- V1 invariants,
- historical acceptance criteria.

`UI_SPEC.md` owns:

- presentation,
- information hierarchy,
- interaction expectations.

`PRODUCT_VISION.md` owns:

- future product direction,
- future ingestion,
- future AI planning,
- student-control principles.

`ARCHITECTURE.md` owns:

- technical boundaries,
- future technical structure.

`IMPLEMENTATION.md` owns:

- verified current repository/runtime reality.

`TASKS.md` owns:

- roadmap sequence,
- current task status.

---

# 63. Conflict Rule

If this document and the implemented canonical fixture disagree:

1. inspect actual repository state;
2. determine whether the fixture intentionally changed through an accepted task;
3. inspect the relevant verification artifact;
4. update stale documentation rather than inventing a reconciliation.

For current implementation truth:

`src/lib/academic-context.ts`

and:

`docs/IMPLEMENTATION.md`

are authoritative.

---

# 64. Final Principle

The Milestone 1 fixture should remain:

> a small, coherent, realistic testbed for the product model.

It should not become:

> a fake version of the future production backend.

Its durable lesson is:

```text
source-backed Course context
+
clearly authored personal planning
+
one canonical shared state
+
derived views
=
a trustworthy static product prototype
```