# School Dashboard — Mock Data and Source Packet Specification

## 1. Purpose

This document defines how the initial School Dashboard prototype represents
academic information using static/hardcoded data.

The V1 prototype does NOT ingest files dynamically.

However, its static data should simulate the information that a future
course-ingestion system would eventually produce from real student-provided
course materials.

For the initial prototype, "mock data" means:

> static application data representing a realistic academic situation

It does NOT require the academic information itself to be invented.

A sanitized snapshot of real Course information may be used when appropriate.

The initial reference Course is based on a real student workflow:

```text
UC Davis
PHY 009D
Modern Physics
Fall Quarter 2026
```

The current source packet may contain:

- Course syllabus information,
- lecture schedule information,
- Assignment/deadline information,
- assigned textbook information,
- and later student lecture notes or other Course Materials.

The application should represent the result of interpreting those materials.

It should NOT implement the interpretation process itself during V1.

---

# 2. The Three-Layer Model

The mock data must preserve three conceptually different layers.

```text
SOURCE MATERIALS
        ↓
COURSE FACTS
        ↓
PERSONAL ACADEMIC PLAN
```

These layers are related.

They are not interchangeable.

---

# 3. Source Materials

Source Materials are the artifacts from which academic information originates.

Examples include:

- syllabus,
- lecture schedule,
- Assignment page,
- textbook,
- lecture slides,
- discussion worksheet,
- instructor handout,
- student lecture notes,
- student study notes.

Source Materials answer:

> Where did this information come from?

They do NOT automatically become:

- Study Tasks,
- Assignments,
- Learning Objectives,
- or Class Meetings.

---

# 4. Course Facts

Course Facts are structured academic facts supported by Course sources.

Examples:

```text
Course code:
PHY 009D
```

```text
Lecture 02 date:
2026-09-25
```

```text
Lecture 02 topic:
Relativity principle and the nature of time
```

```text
Midterm #1:
2026-10-23
```

```text
Final Exam:
2026-12-09 at 3:30 PM
```

Course Facts represent Course reality as supported by available sources.

They should not silently include personal planning decisions.

---

# 5. Personal Academic Plan

The Personal Academic Plan contains student-planning information.

Examples include:

- weekly Learning Objectives,
- Study Tasks,
- Study Task planned dates,
- authored task order,
- estimated Study Task durations,
- Study Task completion states.

These are planning choices.

They are not automatically Course requirements.

Example:

Course Fact:

```text
Lecture 02 covers the relativity principle.
```

Personal Study Task:

```text
Review the relativity principle in my own words
Estimated duration: 25 min
```

The second item is a personal plan derived from Course context.

It must not be presented as an instructor-assigned requirement unless a source
explicitly says so.

---

# 6. Why the Separation Matters

School Dashboard eventually aims to transform academic information into useful
planning.

That transformation only remains trustworthy if the product can distinguish:

```text
what the instructor/course said
```

from:

```text
what the system or student decided to do
```

For V1, this distinction is represented manually in static data.

Later systems may automate parts of it.

They must preserve the same conceptual boundary.

---

# 7. V1 Static Data Flow

For V1:

```text
Student Course source packet
        ↓
manual interpretation outside the application
        ↓
static normalized Course Facts
        ↓
static authored Personal Academic Plan
        ↓
School Dashboard views
```

V1 does NOT contain:

```text
PDF parser
OCR system
document-ingestion pipeline
Course-research agent
AI planning engine
automatic scheduler
```

The fixture represents the OUTPUT such systems may eventually produce.

---

# 8. SourceArtifact

V1 fixture data may use a lightweight `SourceArtifact` concept to preserve
provenance.

This is a fixture/prototype concept.

It is NOT a production upload schema.

A conceptual SourceArtifact may contain information such as:

```text
id

courseId

type

title

sourceOwner

sourceDate

notes
```

Exact TypeScript field names are implementation decisions for the task that
introduces the fixture.

The important requirement is preserving source identity where useful.

---

# 9. Source Types

Useful V1 source categories may include:

```text
instructor-syllabus

lecture-schedule

assignment-page

instructor-slides

assigned-textbook

discussion-material

student-lecture-notes

student-study-notes
```

Additional categories may be introduced when actual fixture needs justify them.

Do not create a complex taxonomy merely for completeness.

---

# 10. Source Authority

When multiple sources describe Course requirements, prefer more authoritative
current-Course sources.

The intended authority hierarchy is:

```text
1. Current instructor syllabus
2. Current instructor Assignment information / official Course materials
3. Current instructor lecture slides or notes
4. Current assigned textbook
5. Official university Course description
6. Official department Course material
7. Previous public offerings
8. General educational resources
```

Student notes are useful evidence about:

```text
what was actually discussed
what the student wrote down
what appeared important during lecture
```

but they do not automatically override instructor sources for:

- deadlines,
- grading rules,
- required attendance,
- exams,
- Course policies.

---

# 11. SourceArtifact Is Not CourseMaterial

A SourceArtifact and CourseMaterial may overlap, but they mean different
things.

SourceArtifact means:

> This artifact supports or explains an academic fact.

CourseMaterial means:

> This resource is useful to the student as part of the Course.

Example:

A syllabus may be:

```text
SourceArtifact = yes
CourseMaterial = not necessarily
```

An assigned textbook may be:

```text
SourceArtifact = yes
CourseMaterial = yes
```

Do not collapse these concepts merely because one file can satisfy both roles.

---

# 12. Raw Course Files Should Not Be Embedded in the Fixture

The application fixture should contain concise structured information.

It should NOT contain entire raw source documents.

Do not copy:

- complete syllabus text,
- complete textbook chapters,
- large lecture decks,
- complete instructor documents

into static application code.

Instead store the small facts or references required by the UI.

Example:

Good:

```text
title:
UCD Physics 9D — Modern Physics

type:
assigned textbook
```

Not appropriate:

```text
entire textbook contents embedded into TypeScript
```

---

# 13. Repository Safety

Raw Course materials may contain:

- copyrighted content,
- private Course information,
- instructor material,
- student notes,
- personally identifying information.

Do not automatically commit raw source files to the repository.

V1 fixture data should use:

- concise facts,
- sanitized values,
- minimal source references.

School Dashboard should not require private Course documents to live publicly in
GitHub simply to support the UI prototype.

---

# 14. Canonical Reference Course

The primary realistic reference Course for the current fixture is:

```text
id:
phy-009d

code:
PHY 009D

name:
Modern Physics

institution:
University of California, Davis

term:
Fall Quarter 2026
```

This Course provides realistic context for the initial prototype.

It does not mean every screen must contain only Physics data.

Additional lightweight Courses may be added where cross-Course behavior needs
to be demonstrated.

---

# 15. Current PHY 009D Source Packet

The currently available PHY 009D source packet includes information derived
from:

```text
current Course syllabus

current lecture schedule

current Assignment/deadline information

assigned Physics 9D textbook
```

Later, the student may provide:

```text
lecture notes

lecture slides

discussion worksheets

study guides

other Course-specific material
```

Missing later material is normal.

---

# 16. Source Information May Arrive Over Time

The source packet is not expected to be complete on day one.

Example:

Before Lecture 02:

```text
syllabus
lecture schedule
textbook
```

may exist.

After Lecture 02:

```text
student lecture notes
instructor slides
discussion material
```

may become available.

The product should eventually become richer as new evidence arrives.

V1 does not implement that ingestion cycle.

The static fixture may simply represent one snapshot in time.

---

# 17. Missing Sources Are Valid

A Course does not require every possible source category.

For example:

```text
syllabus exists
lecture schedule exists
textbook exists
lecture notes missing
slides missing
discussion worksheet missing
```

is a valid Course state.

Do not fabricate missing sources.

Do not fabricate Course Facts merely because a source category is absent.

---

# 18. Source References on Course Facts

Where useful, static Course Facts may preserve lightweight source references.

Conceptually:

```text
sourceRefs:
- phy9d-syllabus
- phy9d-lecture-schedule
```

Not every small value requires visible provenance in the UI.

The purpose is to preserve enough source connection that later development can
distinguish:

```text
source-backed Course information
```

from:

```text
personal planning information
```

Exact data representation is deferred to the task that implements the fixture.

---

# 19. Interpretation Status

When a Course Fact has been manually reviewed and can be represented safely,
the fixture may treat it as:

```text
confirmed
```

When the source itself is ambiguous, contradictory, or impossible to normalize
without guessing, represent that condition conceptually as:

```text
needs-review
```

Do NOT use numerical confidence percentages.

Examples of unsupported patterns:

```text
confidence: 87%
```

```text
confidence: 0.64
```

V1 does not define a numerical confidence model.

---

# 20. Preserve Source Ambiguity

Do not silently repair questionable source information.

The current PHY 009D lecture schedule provides a useful edge case.

The source contains a row corresponding conceptually to:

```text
raw date:
Sep 31

event:
Lecture #04

topic:
Paradoxes — ladder & barn, twins
```

September has no September 31.

The fixture must NOT silently convert that into:

```text
September 30
```

or:

```text
October 1
```

merely because one seems likely.

A conceptual representation could preserve:

```text
rawDate:
Sep 31

normalizedDate:
null

interpretationStatus:
needs-review
```

Exact implementation fields are not prescribed here.

The invariant is:

> Preserve uncertainty instead of manufacturing certainty.

---

# 21. General Policy vs Specific Assignment Information

General Course policies and specific Assignment facts are different levels of
information.

Example general policy:

```text
Homework is normally due Sundays at 11:59 PM.
```

Example specific Assignment:

```text
Problem #1
Due September 28 at 11:59 PM
```

When a specific Assignment page gives an explicit deadline for that Assignment,
use the specific deadline for that Assignment.

Do not overwrite a specific fact merely because it differs from a broader
Course pattern.

If two equally relevant current sources genuinely conflict about the same fact,
mark the issue for review rather than guessing.

---

# 22. Scheduled Content vs Observed Lecture Coverage

The lecture schedule describes intended or scheduled Course content.

Student notes describe what the student observed or recorded.

These are different.

Example:

Scheduled:

```text
Lecture 03
Time dilation
Lorentz transformations
Length contraction
Simultaneity
```

Student notes may later show:

```text
Lecture spent most of the time on time dilation
Lorentz transformations were only introduced briefly
```

Do not replace the scheduled Course Fact.

Preserve both meanings when later functionality needs them.

Conceptually:

```text
scheduled topic
```

and:

```text
observed coverage
```

are different evidence.

---

# 23. Academic Term

The fixture represents one current Academic Term.

For the canonical example:

```text
Fall Quarter 2026
```

Do not invent exact term-start or term-end dates unless they are actually needed
and supported by accepted fixture information.

V1 does not implement term switching.

---

# 24. Fixed Reference Date

V1 uses one fixed reference date.

For the canonical prototype:

```text
referenceDate:
2026-09-25
```

This corresponds to:

```text
Friday, September 25, 2026
```

The machine's actual current date must not alter V1 behavior.

All five views must use this same reference date.

---

# 25. Current Academic Week

The canonical current Academic Week is:

```text
2026-09-21
through
2026-09-27
```

This provides the week boundary used for:

- weekly Study Task grouping,
- weekly progress,
- weekly Objective context.

The Course begins during this week.

That is valid.

Do not fabricate earlier Course activity merely to fill Monday or Tuesday.

---

# 26. Course

A conceptual static Course may contain information such as:

```text
id:
phy-009d

code:
PHY 009D

name:
Modern Physics

termId:
fall-2026

institution:
UC Davis
```

Optional metadata may include publicly supplied instructor information when it
is useful.

Do not require every Course to have every optional metadata field.

---

# 27. Canonical Instructor Context

Available syllabus information identifies the instructor as:

```text
Prof. Shirley Chiang
```

This may be represented as Course metadata if useful.

Do not introduce unnecessary TA or staff data unless a V1 view actually benefits
from it.

V1 is not a staff-directory application.

---

# 28. LectureScheduleEntry

The static fixture may use a lightweight `LectureScheduleEntry` concept.

This represents a Course's scheduled curriculum entry.

Conceptually it may contain:

```text
id

courseId

lectureNumber

rawDate

normalizedDate

topics

sourceRefs

interpretationStatus
```

This is NOT automatically the same thing as a `ClassMeeting`.

Why?

A lecture schedule may establish:

```text
Lecture 02 occurs on September 25
```

without establishing:

```text
start time
end time
room
meeting recurrence
```

Do not fabricate missing meeting details.

---

# 29. Canonical Lecture Schedule Snapshot

The first several known PHY 009D schedule entries include:

```text
Lecture #01
Date: 2026-09-23
Topics:
- Course overview
- sound waves and decibel scale
- beats
- Doppler effect for sound
```

```text
Lecture #02
Date: 2026-09-25
Topics:
- relativity principle
- spacetime events
- time measurement
```

```text
Lecture #03
Date: 2026-09-28
Topics:
- time dilation
- Lorentz transformations
- length contraction
- simultaneity
```

The source also contains the questionable:

```text
Lecture #04
Raw date: Sep 31
Topics:
- ladder and barn paradox
- twin paradox
Status:
needs-review
```

These are Course Facts.

They do not automatically create Study Tasks.

---

# 30. Major Assessments

Available Course information supports the following major assessments:

```text
Midterm #1
2026-10-23
```

```text
Midterm #2
2026-11-20
```

```text
Final Exam
2026-12-09
3:30 PM
```

Do not invent exam locations when the available source does not establish them.

Major assessments are Course obligations/context.

They do not automatically create personal preparation tasks in V1.

---

# 31. Assignment

An Assignment represents a Course obligation or deliverable.

A conceptual Assignment may contain:

```text
id

courseId

title

dueDate

dueTime

sourceRefs

authoredOrder
```

Other fields may be added only when the V1 implementation actually needs them.

---

# 32. Canonical Assignment Example

The reference fixture may represent:

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

This is an Assignment deadline.

It is NOT the same as the date the student plans to work on it.

If later source review establishes a different deadline, update the fixture
rather than preserving knowingly incorrect information.

---

# 33. CourseMaterial

CourseMaterial represents a resource useful to the student.

A conceptual CourseMaterial may contain:

```text
id

courseId

type

title

reference

sourceRefs
```

Example:

```text
id:
phy9d-textbook

courseId:
phy-009d

type:
textbook

title:
UCD Physics 9D — Modern Physics
```

The fixture should not contain the full textbook content.

---

# 34. Textbook Structure

The assigned textbook contains broad topic areas including:

```text
Sound

Foundations of Special Relativity

Kinematics in Special Relativity

Dynamics in Special Relativity

Quantum-transition experiments

Probability

Matter waves and Schrödinger equation

One-dimensional quantum models

Three-dimensional quantum mechanics

Intrinsic angular momentum / spin
```

This structure may provide useful Course context.

It does NOT automatically establish:

- required reading,
- Study Tasks,
- weekly Learning Objectives,
- Assignment requirements.

Those require explicit authored planning or source support.

---

# 35. CourseWeekContext

The fixture may include a lightweight Course/week context to explain:

> What part of this Course are we currently in?

For PHY 009D during the reference week, useful context may include:

```text
Course beginning

Sound review

Introduction to special relativity
```

This is presentation/context information.

Do not manufacture a complete generated Course Roadmap for V1.

---

# 36. LearningObjective

Learning Objectives belong to the Personal Academic Plan.

They are NOT automatically extracted Course requirements in V1.

A conceptual LearningObjective may contain:

```text
id

courseId

weekId

title

origin

evidenceSourceRefs
```

Example:

```text
id:
phy9d-objective-relativity-principle

courseId:
phy-009d

title:
Explain the relativity principle in my own words

origin:
authored-plan
```

A source may motivate the Objective.

The Objective itself remains a planning construct.

---

# 37. StudyTask

StudyTask represents a concrete personal action.

A conceptual StudyTask may contain:

```text
id

courseId

plannedDate

authoredOrder

title

estimatedMinutes

isComplete

objectiveIds

assignmentId

materialIds

origin
```

Exact TypeScript shape is not locked by this document.

The important semantics are locked.

---

# 38. StudyTask Origin

V1 Study Tasks are part of the authored static Personal Academic Plan.

Conceptually:

```text
origin:
authored-plan
```

They must not imply:

```text
instructor-required
```

unless a future data model explicitly represents a Course requirement separately.

Example:

Source-backed fact:

```text
Lecture 02 covers the relativity principle.
```

Authored Study Task:

```text
Review Lecture 02 relativity concepts.
```

The second is a personal action.

---

# 39. Personal Plan vs Course Fact Example

Keep this distinction visible conceptually:

```text
COURSE FACT

Problem #1
Due Monday at 11:59 PM
```

versus:

```text
PERSONAL PLAN

Friday
Begin Problem #1
30 min
```

The Course did not necessarily tell the student:

> Work on this Friday for 30 minutes.

That is the planning layer.

---

# 40. Canonical Reference-Day Scenario

The V1 reference date is:

```text
Friday, September 25, 2026
```

Available Course context may show:

```text
Lecture #02 occurs today.

Lecture #02 topics include:
- relativity principle
- spacetime events
- time measurement

Problem #1 is upcoming.

The assigned Physics 9D textbook is available.

Student Lecture 02 notes have not yet been supplied.
```

The absence of student notes is valid.

Do not fabricate them.

---

# 41. Example Authored Friday Plan

The static Personal Academic Plan may contain example Study Tasks such as:

```text
Review Lecture 02 relativity topics
25 min
```

```text
Read the relevant textbook material on the relativity principle and time
30 min
```

```text
Begin Problem #1
30 min
```

These examples are PERSONAL PLANNING CHOICES.

They are not claims that the instructor assigned those exact study sessions.

Exact final fixture tasks may be refined during the task that introduces the
shared mock data.

---

# 42. Lecture Notes as New Evidence

Later, the student may provide lecture notes.

Those notes may support:

```text
what topics were emphasized

examples used in class

questions raised

student misunderstandings

what was actually covered
```

They should not automatically replace:

- official deadlines,
- syllabus rules,
- exam dates,
- Assignment requirements.

Future systems may use both.

---

# 43. Scheduled vs Observed Content Must Remain Distinguishable

If the schedule says:

```text
Lecture 03:
Time dilation
Lorentz transformations
Length contraction
Simultaneity
```

but later lecture notes show only:

```text
Time dilation
Lorentz transformations
```

do not silently rewrite the schedule.

Instead preserve conceptually:

```text
scheduled content
```

and:

```text
observed content
```

The difference may become useful for future planning.

---

# 44. One Shared Academic Plan

All five V1 views must derive from one shared academic fixture.

Conceptually:

```text
shared academic plan
        ↓
Dashboard
Courses
Course Page
Weekly Plan
Today
```

Do NOT create:

```text
dashboardMockData

todayMockData

weeklyPlanMockData

coursePageMockData
```

containing duplicate canonical academic records.

Views may derive different selections.

They should not own separate academic truth.

---

# 45. Stable Identity

Every academic object should have stable identity.

Examples:

```text
phy-009d
```

```text
phy9d-problem-1
```

```text
phy9d-objective-relativity-principle
```

```text
phy9d-task-review-lecture-02
```

If the same Study Task appears on:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page,

it remains the same Study Task ID.

Do not create screen-specific identities.

---

# 46. Derived Data Should Normally Not Be Stored Separately

View summaries should be derived from canonical fixture information.

Examples:

```text
Today's Study Tasks
```

derive from:

```text
Study Tasks
+
referenceDate
+
completion state
```

```text
Next Action
```

derives from:

```text
Today's incomplete Study Tasks
+
authored order
```

```text
Course weekly progress
```

derives from:

```text
Study Tasks
+
current Academic Week
+
Course ID
+
completion state
```

Do not independently hardcode:

```text
todayTasks

nextAction

courseProgressPercent
```

when they can be derived reliably.

---

# 47. Today Derivation

For V1:

```text
Today Study Tasks =
Study Tasks where:

plannedDate == referenceDate

AND

isComplete == false
```

Then preserve:

```text
authoredOrder
```

Do not include:

- earlier unfinished tasks,
- Assignments merely due today,
- automatically generated work.

---

# 48. Next Action Derivation

For V1:

```text
Next Action =
first Study Task in Today's authored order
```

If Today has no remaining Study Tasks:

```text
Next Action = none
```

Do not invent replacement work.

---

# 49. Upcoming Assignments Derivation

Upcoming Assignments include Assignments where:

```text
dueDate >= referenceDate
```

Order by:

```text
1. due date
2. authored order when dates are equal
```

Assignment deadline does not automatically determine Study Task order.

---

# 50. Weekly Progress Derivation

For an Academic Week:

```text
Progress =
completed Study Tasks planned inside the week
/
all Study Tasks planned inside the week
```

Course progress applies the same calculation after filtering to one Course.

Overall weekly progress counts Study Tasks across all current Courses.

Do not:

- count Assignments,
- count Objectives,
- count Materials,
- count Class Meetings,
- average Course percentages.

---

# 51. Zero-Task Progress

If a Course has no Study Tasks during the Academic Week:

show conceptually:

```text
No study tasks planned.
```

Do not store or imply:

```text
0%
```

or:

```text
100%
```

Neither correctly communicates the state.

---

# 52. Incomplete Source Packet Is Normal

The fixture must support Courses where only part of the future source packet
exists.

Example:

```text
Course:
PHY 009D

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

The Course remains valid.

---

# 53. Do Not Invent Missing Course Facts

If available sources do not establish information, leave it absent.

Do not fabricate:

```text
lecture time

room

instructor requirement

Assignment deadline

required textbook chapter

office hours

Study Task duration

grade value
```

simply because a UI component has space for it.

Missing information is a legitimate fixture state.

---

# 54. ClassMeeting vs LectureScheduleEntry

Do NOT automatically convert every LectureScheduleEntry into a fully populated
ClassMeeting.

A schedule may establish:

```text
Lecture occurs on Friday
```

without supplying:

```text
10:00 AM
Physics Building Room 55
```

If a V1 ClassMeeting requires start time and the source packet does not contain
one:

do not invent it.

The implementation may:

- omit the ClassMeeting,
- present date-only Course schedule context where permitted,
- or use a separate intentionally authored fixture Course for ClassMeeting UI
  verification.

The task Plan should choose the smallest option compatible with the relevant
acceptance criteria.

---

# 55. Additional Courses

The fixture may include additional lightweight Courses to exercise cross-Course
behavior.

Examples might be used to verify:

- multiple Course Cards,
- unequal Study Task totals,
- overall progress,
- mixed Today tasks,
- different upcoming deadlines.

Do not invent complete quarter-long fake academic histories.

Only include enough data to prove required V1 behavior.

---

# 56. Additional Course Data May Be Fictional or Sanitized

PHY 009D is the realistic reference Course.

Additional Course fixtures may use:

- sanitized real Course structure,
- simple fictional Course data.

The purpose is UI and behavior testing.

Do not introduce unnecessary private academic information simply to make the
fixture feel realistic.

---

# 57. Edge Cases the Fixture Should Eventually Support

The shared fixture should be capable of representing:

```text
Study Task linked to both an Objective and Assignment

Study Task linked to neither

Assignment due today without a Today Study Task

completed Study Task planned today

earlier unfinished Study Task

Course with zero current-week Study Tasks

missing duration estimate

unknown Course route

multiple Courses with unequal task totals

source fact requiring review

missing optional Course metadata
```

These support V1 verification.

Not every edge case must be visually prominent in the primary reference Course.

---

# 58. ALWAYS Rules

ALWAYS:

- use one shared academic fixture;
- preserve stable identity;
- keep Course Facts separate from personal planning;
- preserve Assignment deadlines independently from Study Task planned dates;
- preserve authored Study Task order;
- use the fixed V1 reference date;
- derive Today from canonical Study Tasks;
- derive progress from Study Tasks;
- preserve source ambiguity when it exists;
- keep source references lightweight;
- keep raw copyrighted/private documents out of application fixtures;
- allow missing information.

---

# 59. NEVER Rules

NEVER:

- dynamically parse Course files during V1;
- run AI to produce V1 fixture data at runtime;
- treat mock data as a production database schema;
- duplicate canonical academic objects per screen;
- fabricate Course Facts;
- silently repair contradictory source facts;
- treat student planning as instructor requirements;
- treat Course Materials as Study Tasks;
- treat Assignment due date as Study Task planned date;
- infer ClassMeeting times not supplied by sources;
- use machine current date instead of `referenceDate`;
- calculate numerical confidence;
- embed entire textbooks or source documents into the fixture.

---

# 60. IF → THEN Rules

IF:

```text
the same Study Task appears on several views
```

THEN:

```text
use the same canonical Study Task identity and state
```

---

IF:

```text
a duration is missing
```

THEN:

```text
leave duration absent
```

---

IF:

```text
a Course has no weekly Study Tasks
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
an Assignment is due today without a Study Task today
```

THEN:

```text
show it as deadline context only
```

---

IF:

```text
a source fact is ambiguous
```

THEN:

```text
preserve the ambiguity / needs-review state
```

---

IF:

```text
a specific Assignment deadline conflicts with a general recurring Course policy
```

THEN:

```text
use the specific Assignment information for that Assignment when the source is
clearly authoritative
```

---

IF:

```text
two comparable current authoritative sources genuinely conflict
```

THEN:

```text
do not guess; flag for review
```

---

# 61. Fixture Validation

Before using the fixture as the canonical V1 source, verify:

```text
[ ] Every ID is unique.

[ ] Every Study Task references an existing Course.

[ ] Every Objective belongs to an existing Course.

[ ] Every Assignment belongs to an existing Course.

[ ] Every Material belongs to an existing Course.

[ ] Study Task relationships do not cross Course boundaries.

[ ] The reference date belongs to the current Academic Week.

[ ] Study Task planned dates are preserved independently of Assignment deadlines.

[ ] Today can be derived from canonical Study Tasks.

[ ] Next Action can be derived from Today.

[ ] Weekly progress can be calculated from Study Tasks.

[ ] No required value depends on the machine date.

[ ] Missing optional values remain missing rather than fabricated.

[ ] Source ambiguity is not silently normalized.

[ ] No raw private or copyrighted Course document is embedded unnecessarily.

[ ] Course Facts and personal planning choices remain conceptually distinguishable.
```

---

# 62. Future Ingestion Mapping

The long-term product may eventually automate the pipeline represented manually
in V1.

Conceptually:

```text
Student supplies:

syllabus
schedule
Assignments
textbook
lecture notes
other Course Materials

        ↓

source records / provenance

        ↓

candidate structured Course Facts

        ↓

student review of uncertain or conflicting extraction

        ↓

source-grounded Course understanding

        ↓

suggested Course Roadmap

        ↓

suggested weekly Learning Objectives

        ↓

suggested Study Tasks

        ↓

student review / acceptance

        ↓

daily academic plan
```

V1 begins near the bottom of this future pipeline by manually providing the
already-structured data.

Do not implement the future pipeline merely because this document describes it.

---

# 63. Future Student Review

Future automated extraction or planning should not silently convert uncertain
information into accepted academic truth.

Examples requiring student review may include:

```text
conflicting deadline

uncertain lecture date

ambiguous Assignment relationship

generated Learning Objective

generated Study Task

suggested duration

suggested schedule
```

V1 does not implement these review interfaces.

Its static data simply respects the underlying distinction.

---

# 64. Document Ownership

This document owns:

```text
static fixture semantics

Course source-packet modeling

Course Fact vs personal-plan distinction

fixture identity

source references

fixture derivation rules

source ambiguity handling

fixture validation
```

`V1_SPEC.md` owns:

```text
product behavior

academic-domain semantics

Today rules

progress rules

view requirements

current exclusions
```

`UI_SPEC.md` owns:

```text
presentation

information hierarchy

screen responsibilities

reusable UI concepts
```

`PRODUCT_VISION.md` owns:

```text
future product direction

future ingestion

future source grounding

future AI planning

student-control principles
```

`ARCHITECTURE.md` owns:

```text
technical boundaries

technical direction
```

The implementation task that creates the actual fixture may choose reasonable
TypeScript shapes.

It must preserve the semantics defined here.

---

# 65. Current Canonical Fixture Direction

The current intended reference context is:

```text
Institution:
UC Davis

Course:
PHY 009D — Modern Physics

Term:
Fall Quarter 2026

Reference date:
Friday, September 25, 2026

Current Academic Week:
September 21–27, 2026
```

Course Facts should be grounded only in the available sanitized source packet.

Personal Learning Objectives and Study Tasks are intentionally authored
prototype planning choices.

Additional lightweight Courses may be introduced only as needed to prove
cross-Course UI behavior.

This provides enough realism to test the School Dashboard without pretending
that V1 already contains the future Course-ingestion or planning systems.