# School Dashboard — Initial UI V1 Specification

## 1. Objective

Help a student answer:

> **What should I do today to stay on track in my classes?**

The first UI milestone MUST use static/hardcoded academic data.

"Mock data" in V1 means that the application does not yet dynamically ingest,
extract, persist, research, or generate academic information.

The static fixture may represent sanitized information derived manually from
real course materials.

The initial reference experience may therefore use realistic course information
from a source packet such as:

- syllabus,
- instructor lecture schedule,
- assignment/deadline information,
- assigned textbook,
- lecture slides,
- student lecture notes,
- discussion materials,
- and study resources.

The application receives the already-structured result.

It does NOT perform the source interpretation itself during V1.

Conceptually:

```text
Course Materials
      ↓
Manual normalization for V1
      ↓
Static Course Facts
      ↓
Static authored personal academic plan
      ↓
School Dashboard UI
```

V1 is a read-only personal academic planning interface for one student and one
current academic term.

Navigation works.

Course facts, Learning Objectives, Study Tasks, planned dates, authored
ordering, duration estimates, and completion states are supplied by the static
fixture.

The current milestone is intended to validate:

- the academic information model,
- the five primary views,
- cross-view consistency,
- information hierarchy,
- and whether the dashboard actually helps the student understand what to do
  next.

These definitions specify intended product behavior, not existing
implementation.

---

## 2. Conceptual Academic Model

These are product concepts and relationships.

They are NOT:

- database tables,
- persistence schemas,
- API contracts,
- or permanent production architecture.

### Academic Term

The semester, quarter, or other named study period that provides the current
planning context.

It groups the student's Courses and Academic Weeks.

V1 displays one static current term.

Term management and switching are deferred.

---

### Course

One class the student is taking during the Academic Term.

A Course provides context for:

- Learning Objectives,
- Assignments,
- Study Tasks,
- Course Materials,
- Class Meetings,
- and weekly progress.

A Course Card is a visual representation of the same Course.

It is not a separate academic entity.

---

### Academic Week

A labeled seven-day planning interval within the Academic Term.

It groups:

- weekly Learning Objectives,
- Assignments relevant to the week,
- and Study Tasks planned for dates inside the week.

The static fixture supplies explicit week boundaries and identifies one current
Academic Week.

V1 does not provide week switching or a full academic-calendar management
system.

---

### Learning Objective

A statement describing what the student aims to understand or be able to do
during an Academic Week.

Examples:

- Explain the relativity principle.
- Distinguish coordinate time from proper time.
- Apply the Doppler effect relationship.
- Explain how standing waves form.

A Learning Objective may be supported by multiple Study Tasks.

A Learning Objective does not require an Assignment.

Completing associated Study Tasks does not automatically prove mastery.

---

### Assignment

A Course obligation or deliverable with a deadline.

Examples:

- homework,
- problem set,
- essay,
- lab,
- project,
- midterm,
- final exam.

An Assignment describes:

> What must be delivered or completed, and when?

It does NOT describe every work session needed to prepare for it.

An Assignment may motivate several Study Tasks across multiple days.

---

### Study Task

A small, concrete action the student plans to perform.

Examples:

- Review Lecture 02 notes.
- Read the assigned relativity section.
- Solve Problems 1–3.
- Review mistakes from the previous problem set.
- Practice spacetime-diagram problems.

A Study Task belongs to one Course and one planned date.

It may support:

- zero Learning Objectives,
- one Learning Objective,
- several Learning Objectives,
- zero Assignments,
- or one Assignment in V1.

It may have an authored estimated duration.

It has one static complete/incomplete state in V1.

---

### Course Material

A resource used for learning or Course context.

Examples:

- textbook,
- lecture slides,
- lecture notes,
- worksheet,
- study guide,
- discussion material.

A Course Material is not itself a Study Task.

Example:

Course Material:

> Physics 9D textbook

Study Task:

> Read the assigned relativity section.

Those are separate concepts.

---

### Class Meeting

A scheduled instructional event for a Course.

Examples:

- lecture,
- discussion,
- lab,
- seminar.

The static fixture provides authored dates and times.

Class Meetings may appear in Today's Classes.

They do not:

- count toward Study Task progress,
- automatically become Study Tasks,
- track attendance,
- recur automatically,
- or synchronize with an external calendar.

---

### Progress

Progress represents completion of planned Study Tasks.

For V1 it is specifically:

> completed Study Tasks relative to planned Study Tasks for an explicitly
> identified Academic Week and Course scope.

Progress is NOT:

- a grade,
- mastery,
- Assignment submission state,
- Course completion,
- or predicted academic performance.

---

## 3. Relationships in Practice

Learning Objectives, Assignments, and Study Tasks must remain distinct.

Example:

Learning Objective:

> Explain the relativity principle.

Assignment:

> Problem #1 — Due Monday.

Study Task:

> Review relativity notes — 25 min.

Another Study Task:

> Begin Problem #1 — 30 min.

The second Study Task may support BOTH:

- the Learning Objective,
- and the Assignment.

It remains one Study Task.

A Study Task can also exist without an Assignment or Objective.

Example:

> Review Monday's lecture notes.

A Course Material is similarly different from the Study Task that uses it.

Material:

> Lecture 02 slides.

Task:

> Review Lecture 02 slides.

A Class Meeting is also separate:

> PHY 009D Lecture — 10:00 AM.

No Objective-to-Assignment mapping is required beyond the relationships carried
through Study Tasks.

Completing all related Study Tasks does not automatically mean:

- the Objective is mastered,
- the Assignment is submitted,
- or the Course obligation is complete.

V1 does not track mastery, grades, or submission state.

---

# 4. V1 Product Invariants

The following rules are non-negotiable for the initial UI milestone.

They exist so implementation agents do not reinterpret the product while
building individual screens.

If an implementation task conflicts with one of these invariants, stop and
return to Plan rather than silently changing product behavior.

---

## 4.1 One Shared Academic Plan

ALWAYS:

All five primary views derive from one shared academic plan.

NEVER:

Create separate canonical copies of:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- Course Materials,
- or Class Meetings

for different screens.

A Study Task shown on:

- Dashboard,
- Today,
- Weekly Plan,
- and Course Page

is the same underlying Study Task.

Different components may present it differently.

Its identity and academic meaning do not change.

---

## 4.2 Course Facts and Personal Planning Are Different

ALWAYS:

Keep source-backed Course Facts distinguishable from personal planning choices.

Course Facts may include:

- Course identity,
- instructor information,
- lecture schedule,
- lecture topics,
- Assignment deadlines,
- exam dates,
- assigned materials,
- class-meeting information.

Personal planning may include:

- Learning Objectives,
- Study Tasks,
- planned Study Task dates,
- task ordering,
- estimated durations,
- completion state.

NEVER:

Present an authored Study Task as though the instructor explicitly assigned
that Study Task unless the source actually establishes it.

Example:

Course Fact:

> Lecture 02 covers the relativity principle.

Personal plan:

> Review the relativity principle in my own words — 25 min.

Those are related but different pieces of information.

---

## 4.3 Academic Concepts Must Remain Distinct

NEVER collapse:

- Learning Objective,
- Assignment,
- Study Task,
- Course Material,
- Class Meeting

into one generic "Task" concept.

Their meanings are:

Learning Objective:

> What should I understand or be able to do?

Assignment:

> What must I deliver or complete, and when?

Study Task:

> What concrete action will I perform?

Course Material:

> What resource supports the work?

Class Meeting:

> What scheduled instructional event is occurring?

---

## 4.4 Assignment Deadline Is Not Study Task Date

ALWAYS:

Treat an Assignment's due date and a Study Task's planned date as different
values.

Example:

Assignment:

> Problem #1  
> Due Monday

Study Task:

> Begin Problem #1  
> Planned Friday

NEVER:

Move the Study Task to Monday merely because the Assignment is due Monday.

The whole purpose of the product is eventually to encourage work BEFORE
deadlines.

---

## 4.5 Today Has One Exact Meaning

For V1:

```text
Today =
incomplete Study Tasks
whose plannedDate equals the shared referenceDate
```

ALWAYS:

Use the fixed reference date supplied by the static academic plan.

NEVER:

Use the machine's actual current date to determine V1 Today behavior.

NEVER automatically include:

- every unfinished Study Task,
- every Assignment due today,
- unfinished Study Tasks from earlier days,
- newly created work because a deadline is approaching.

---

## 4.6 Earlier Unfinished Work Does Not Move Automatically

If a Study Task was planned for Thursday and remains incomplete on Friday:

ALWAYS:

Keep it associated with Thursday in Weekly Plan and Course Page.

NEVER:

Automatically reschedule it into Friday's Today list.

Automatic carryover and adaptive replanning are future capabilities.

---

## 4.7 Completed Study Tasks

Today and Dashboard's actionable daily summary include only incomplete Study
Tasks planned for the reference date.

Weekly Plan and Course Page may still show completed Study Tasks so the student
can understand:

- what was planned,
- what has been completed,
- and overall weekly progress.

A completed Study Task does NOT imply:

- an Assignment was submitted,
- a Learning Objective was mastered,
- or the Course is complete.

---

## 4.8 Next Action

For V1:

```text
Next Action =
first incomplete Study Task
in Today's authored order
```

NEVER calculate Next Action using:

- Assignment urgency,
- nearest deadline,
- estimated duration,
- grade weighting,
- AI ranking,
- priority scoring,
- automatic scheduling logic.

If no Today Study Task remains:

```text
Next Action = none
```

Do not invent replacement work.

---

## 4.9 Authored Ordering

Study Tasks use the ordering supplied by the static academic plan.

NEVER silently reorder them based on:

- deadline,
- duration,
- Course,
- alphabetical order,
- perceived difficulty,
- AI judgment,
- or an urgency formula.

Automatic prioritization requires a future accepted milestone.

---

## 4.10 Weekly Progress

For any weekly scope:

```text
Progress =
completed Study Tasks planned inside the current Academic Week
/
all Study Tasks planned inside the current Academic Week
```

Course progress uses the same calculation restricted to one Course.

Overall progress counts all current-week Study Tasks across current Courses.

NEVER include:

- Assignments,
- Learning Objectives,
- Class Meetings,
- Course Materials,
- source artifacts

in the progress denominator.

NEVER average Course percentages to produce overall progress.

Example:

Physics:

```text
2 of 3
```

Math:

```text
1 of 2
```

Overall:

```text
3 of 5
```

NOT:

```text
average of 66.7% and 50%
```

If there are zero planned Study Tasks, show conceptually:

> No study tasks planned.

Do not interpret zero Study Tasks as either:

- 0%,
- or 100%.

---

## 4.11 Duration Estimates

A Study Task may have an authored estimated duration.

Example:

```text
25 min
```

If no estimate exists:

NEVER fabricate one.

Do not automatically calculate duration during V1.

Duration does not affect progress.

---

## 4.12 Course Materials

Course Materials are context/resources.

They are not Study Tasks.

NEVER add completion state to a Course Material merely because the student may
read it.

Example:

Material:

> UCD Physics 9D — Modern Physics

Task:

> Read the assigned relativity section.

Only the Study Task has completion state.

---

## 4.13 Class Meetings

Class Meetings are schedule information.

They may appear under Today's Classes.

They do NOT:

- count toward Study Task progress,
- become Study Tasks automatically,
- track attendance,
- recur automatically,
- synchronize with Google Calendar,
- or generate preparation tasks automatically.

---

## 4.14 Source Uncertainty

If static fixture preparation reveals an obviously questionable or conflicting
source fact:

NEVER silently invent a correction.

Preserve the uncertainty according to `MOCK_DATA_SPEC.md`.

Example:

If an instructor schedule contains an impossible calendar date, implementation
must not silently decide which nearby date the instructor intended.

Source correction requires explicit review.

---

## 4.15 Missing Information Is Valid

Academic source packets are often incomplete.

The absence of information is not an implementation failure.

NEVER fabricate:

- instructor requirements,
- deadlines,
- lecture topics,
- textbook sections,
- duration estimates,
- Learning Objectives,
- Assignments,
- Course Materials

merely to make a screen appear complete.

The UI should handle incomplete academic context deliberately.

---

## 4.16 Five Primary Views

V1 has exactly five required primary student views:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Dashboard, Courses, Weekly Plan, and Today must be directly reachable through
primary navigation.

Course Page is reached through Course selection.

Upcoming Assignments is reusable deadline context.

It is NOT a required sixth primary view.

---

## 4.17 Weekly Plan and Today Are Real Views

NEVER satisfy Weekly Plan only by adding a weekly section to Dashboard.

NEVER satisfy Today only by adding a daily section to Dashboard.

Both are dedicated primary views with responsibilities defined in this
specification and `UI_SPEC.md`.

---

## 4.18 V1 Is Read-Only

The initial milestone displays an already-authored academic plan.

It does NOT provide functional controls for:

- adding Courses,
- editing Courses,
- uploading materials,
- changing instructor deadlines,
- completing Study Tasks,
- moving Study Tasks,
- creating Study Tasks,
- generating plans,
- regenerating plans,
- accepting AI suggestions,
- saving changes,
- deleting academic information.

Do not create controls that visually imply these behaviors already work.

The V1 prototype should feel complete within its approved read-only scope.

---

## 4.19 No Intelligence Engine Exists in V1

If implementation requires:

- AI,
- external Course research,
- syllabus parsing,
- document extraction,
- automatic Learning Objective generation,
- automatic Study Task generation,
- automatic duration estimation,
- automatic prioritization,
- automatic scheduling,
- automatic Course Roadmap generation,
- adaptive replanning,

STOP.

That work has exceeded the initial UI milestone.

The V1 static fixture represents the type of structured information such future
systems may eventually produce.

It does not implement those systems.

---

## 4.20 No Persistence Exists in V1

NEVER introduce:

- database tables,
- Supabase,
- authentication,
- local persistence,
- save APIs,
- synchronization infrastructure,
- user accounts

merely because the static fixture uses structured academic objects.

The mock-data contract is NOT a production database schema.

---

## 4.21 Relationship Integrity

A Study Task may support:

- zero or more Learning Objectives,
- zero or one Assignment in V1,
- zero or more Course Materials.

Every related item must belong to the same Course.

Invalid example:

```text
PHY 009D Study Task
→ MAT 21D Learning Objective
```

If the static fixture contains such a relationship, correct the fixture rather
than rendering it silently.

---

## 4.22 Stable Identity

ALWAYS:

A single academic item retains one identity everywhere it appears.

NEVER create independent conceptual records such as:

```text
dashboardTask

todayTask

weeklyTask

coursePageTask
```

for the same Study Task.

---

## 4.23 Derived UI Information

Whenever possible, derive view information from canonical academic data.

Examples of derived information:

- Today's Study Tasks,
- Today's Classes,
- Upcoming Assignments,
- Next Action,
- weekly progress,
- Course weekly progress.

Do not independently hardcode those derived results into each screen's data.

---

## 4.24 Scope Conflict Rule

IF implementation appears to require behavior outside these invariants:

THEN:

1. stop the affected implementation,
2. identify the requirement causing the conflict,
3. inspect:
   - `V1_SPEC.md`,
   - `UI_SPEC.md`,
   - `MOCK_DATA_SPEC.md`,
   - `ARCHITECTURE.md`,
   - and relevant accepted decisions,
4. return the issue to Plan if product behavior needs to change.

Build must not resolve product ambiguity by inventing behavior.

---

# 5. Five Required Primary Views and Observable Outcomes

V1 has exactly five primary student views:

- Dashboard
- Courses
- Course Page
- Weekly Plan
- Today

Dashboard, Courses, Weekly Plan, and Today must be directly reachable through
application navigation.

Selecting a Course opens its Course Page.

A Course does not need to be selected to reach the cross-Course views.

Exact URL paths and layout structure are implementation decisions for later
task plans.

---

## 5.1 Dashboard

Primary question:

> What needs my attention?

Dashboard should provide a cross-Course summary containing:

- current Academic Term,
- reference day/week,
- today's Class Meetings,
- today's Study Tasks,
- Next Action,
- Assignments due soon,
- current Course Cards,
- weekly Learning Objective context,
- overall weekly progress,
- per-Course weekly progress.

Next Action uses the first remaining Today Study Task in authored order.

Dashboard should provide access to Today for the complete daily plan.

The Dashboard is an overview.

It should not duplicate every detail available on Course Page or Weekly Plan.

Presentation hierarchy is defined in `UI_SPEC.md`.

---

## 5.2 Courses

Primary question:

> What Courses am I currently managing?

Show all current static Courses as Course Cards.

Each Course Card should provide:

- recognizable Course identity,
- current-week Study Task progress.

Additional supplied metadata may be shown when useful.

Selecting a Course Card opens the corresponding Course Page.

The same Course Card concept may be reused on Dashboard.

Course Cards represent existing Courses.

They are not independent records.

---

## 5.3 Course Page

Primary question:

> What is happening in this Course?

Show one selected Course's:

- identity,
- current Academic Week/topic context,
- Learning Objectives,
- upcoming Assignments,
- planned Study Tasks,
- Study Task dates,
- completion states,
- relevant Course Materials,
- current-week progress.

The Course Page may provide limited Course Roadmap context through the current
week/topic supplied by static data.

V1 does NOT require:

- a generated full-term Course Roadmap,
- Course Roadmap editing,
- document ingestion,
- source analysis.

Only the selected Course's academic information should appear.

An unknown Course identifier must produce a clear not-found state.

Do not:

- silently display the first Course,
- redirect to an unrelated Course,
- or crash.

---

## 5.4 Weekly Plan

Primary question:

> What should I accomplish this week?

Weekly Plan is a dedicated primary view.

It should show:

- current Academic Week label,
- current week date range,
- Learning Objectives grouped by Course,
- Assignments relevant to the week,
- Study Tasks planned during the week,
- planned Study Task dates,
- Study Task completion states,
- Course progress.

The UI must keep distinguishable:

Learning Objectives:

> what the student aims to learn

Assignments:

> what the student must deliver

Study Tasks:

> what the student plans to do

Tasks without a Learning Objective must remain visible.

Completed Study Tasks remain visible.

An earlier unfinished Study Task remains on its original planned date.

Weekly Plan does not automatically reschedule work.

---

## 5.5 Today

Primary question:

> What should I do today?

Today is a dedicated primary view.

It displays incomplete Study Tasks whose planned date equals the shared
reference date.

Study Tasks are shown in authored order.

Where supplied, display useful context such as:

- Course,
- Study Task title,
- estimated duration,
- relevant Learning Objective,
- relevant Assignment,
- Assignment deadline.

Today does NOT automatically include:

- all unfinished Study Tasks,
- all Assignments due today,
- previous-day unfinished Study Tasks,
- generated work,
- automatically prioritized work.

Missing duration estimates are omitted rather than invented.

If no Study Tasks remain for Today, show a meaningful empty state.

Example:

> No study tasks remain on today's plan.

Do not imply that:

- all Course obligations are finished,
- the entire Academic Week is complete,
- or learning has been mastered.

---

# 6. Upcoming Assignments

Upcoming Assignments is reusable deadline context.

It is NOT a sixth primary view.

Upcoming Assignment information may appear in:

- Dashboard,
- Course Page,
- Weekly Plan,
- Today when attached to a Study Task.

An upcoming Assignment should display at least:

- title,
- Course,
- due date.

Upcoming lists include Assignments with:

```text
dueDate >= referenceDate
```

Assignments are ordered by:

1. nearest due date,
2. authored order when due dates are equal.

An Assignment due today remains visible even if no Study Task is planned today.

A Study Task linked to an Assignment may display that Assignment deadline as
context.

Assignment deadlines do not automatically create Study Tasks.

---

# 7. Today, Deadlines, and Planning Control

V1 uses a fixed, visibly understood reference date supplied by the static
academic plan.

"Today" means that reference date.

It does NOT mean the computer's live date.

All five views use the same date context.

Today's Class Meetings use authored Class Meeting dates and start times.

Study Task planned dates remain separate from Assignment due dates.

Tasks may be planned before an Assignment deadline.

Completed Study Tasks planned today are omitted from:

- Today actionable list,
- Dashboard daily Study Task summary.

They remain visible where appropriate in:

- Weekly Plan,
- Course Page.

An unfinished earlier Study Task does not automatically move to Today.

Deadlines provide context but do not calculate task priority.

Today's Study Tasks retain authored order.

No Study Task is automatically:

- created,
- moved,
- prioritized,
- or rescheduled

because a deadline approaches.

---

# 8. Basic Weekly Progress

Count each distinct Study Task planned inside the current Academic Week exactly
once.

The numerator is:

```text
current-week Study Tasks
where isComplete == true
```

The denominator is:

```text
all Study Tasks planned inside the current Academic Week
```

This includes:

- completed tasks,
- incomplete tasks,
- later-in-the-week tasks.

A Study Task connected to both:

- a Learning Objective,
- and an Assignment

still counts once.

---

## 8.1 Overall Progress

Dashboard overall weekly progress uses all current-week Study Tasks across all
current Courses.

Example:

Course A:

```text
2 of 3
```

Course B:

```text
1 of 2
```

Overall:

```text
3 of 5
```

Do not average Course percentages.

---

## 8.2 Course Progress

Course Cards, Course Page, and per-Course Dashboard or Weekly Plan summaries use
the same calculation restricted to that Course.

Use labels such as:

> This week's study tasks

Example:

> 3 of 5 complete

An optional percentage may be:

```text
completed / total × 100
```

but the count should remain understandable.

---

## 8.3 Zero Tasks

If a Course has no Study Tasks planned for the current Academic Week, show:

> No study tasks planned.

Do not display:

- 0%,
- 100%,

because neither accurately describes the state.

---

## 8.4 What Does Not Count

Do not include:

- Assignments,
- Learning Objectives,
- Course Materials,
- Class Meetings,
- source artifacts

in Study Task progress.

There is no:

- time weighting,
- grade weighting,
- Learning Objective mastery score,
- Course completion percentage,
- term completion score,
- automatic Assignment completion.

---

# 9. Course Source Context in V1

The static academic fixture may be manually derived from real Course source
materials.

Examples include:

- current syllabus,
- current instructor schedule,
- Assignment information,
- assigned textbook,
- lecture notes,
- lecture slides.

These may support realistic Course facts.

However, V1 itself does NOT:

- upload these documents,
- parse them,
- extract their text,
- research the Course,
- reconcile conflicting sources,
- generate Study Tasks from them.

`MOCK_DATA_SPEC.md` defines fixture provenance and source-handling expectations.

`PRODUCT_VISION.md` defines the future source-grounding principles.

---

# 10. Incomplete Course Source Packets

A Course may have incomplete supporting information.

Example:

Available:

- syllabus,
- lecture schedule,
- textbook.

Not yet available:

- Lecture 02 student notes,
- instructor slides,
- discussion worksheet.

That is a valid V1 fixture state.

Do not require the static data to have every possible Course Material before the
Course can appear in the interface.

Missing Course information should remain missing unless deliberately authored.

---

# 11. Explicit Exclusions

Initial V1 does NOT include:

- AI or AI-assisted planning;
- external Course research or enrichment;
- source-reconciliation functionality;
- syllabus parsing;
- PDF analysis;
- automatic Assignment extraction;
- automatic lecture-topic extraction;
- automatic Learning Objective generation;
- automatic Study Task generation;
- automatic duration estimation;
- automatic task prioritization;
- automatic scheduling;
- automatic carryover;
- adaptive replanning;
- Course Roadmap generation;
- Supabase;
- any production database;
- local persistence;
- authentication;
- multiple users;
- Google Calendar integration;
- Google Drive integration;
- notifications;
- uploading Course Materials;
- Course Material management;
- editing academic records;
- editing personal plans;
- completion controls;
- drag-and-drop scheduling;
- Assignment submission;
- grade tracking;
- GPA tracking;
- inferred learning mastery;
- attendance tracking;
- recurring Class Meeting calculation;
- term switching;
- a production academic calendar.

Static Class Meetings and Course Material references do not imply these future
systems exist.

Duration estimates are static authored values.

They are not generated estimates.

---

# 12. Canonical Mock Scenario

The detailed canonical V1 fixture is defined in `MOCK_DATA_SPEC.md`.

The initial reference experience uses a static academic plan representing a
realistic:

```text
UC Davis
PHY 009D
Fall Quarter 2026
```

Course context.

The static fixture may be manually derived from sanitized Course materials such
as:

- the current syllabus,
- lecture schedule,
- Assignment information,
- assigned textbook,
- and later available lecture notes.

This use of real Course context does NOT mean V1 performs ingestion.

For V1:

```text
Course materials
      ↓
manual normalization
      ↓
static Course Facts
      ↓
authored personal academic plan
      ↓
five primary UI views
```

All five views must agree on:

- Course identity,
- reference date,
- current Academic Week,
- Study Task identity,
- authored task ordering,
- completion state,
- Assignment deadlines,
- Learning Objective relationships,
- and weekly progress.

`MOCK_DATA_SPEC.md` owns:

- exact static fixture relationships,
- provenance examples,
- source-review examples,
- reference-date data,
- fixture identity rules,
- mock-data validation.

`UI_SPEC.md` owns:

- information hierarchy,
- screen responsibilities,
- presentation expectations.

This document owns:

- required product behavior,
- domain meaning,
- cross-view rules,
- current V1 scope.

---

# 13. Completion and Verification

Verify the five primary views against the shared static academic data and the
rules above.

At minimum, V1 must be able to represent and verify these scenarios.

---

## 13.1 Study Task Linked to Objective and Assignment

A Study Task supports:

- at least one Learning Objective,
- and one Assignment.

Verify:

- it remains one Study Task,
- it counts once in progress,
- relationships remain visible where relevant.

---

## 13.2 Study Task Linked to Neither

A Study Task belongs to a Course but has:

- no Learning Objective,
- no Assignment.

Verify that it still appears where its planned date requires it.

---

## 13.3 Assignment Due Today Without a Study Task

Verify:

- the Assignment appears as deadline context,
- it does not create a Today Study Task automatically.

---

## 13.4 Completed Study Task Planned Today

Verify:

- it is omitted from Today's actionable list,
- it is omitted from Dashboard's actionable Today summary,
- it remains visible in Weekly Plan and Course Page where appropriate,
- it contributes to weekly progress.

---

## 13.5 Earlier Unfinished Study Task

Verify:

- it remains on its original date,
- it does not silently move into Today.

---

## 13.6 Multiple Courses With Unequal Task Totals

Verify:

- Course progress is calculated independently,
- overall progress uses raw Study Task totals,
- Course percentages are not averaged.

---

## 13.7 Course With Zero Current-Week Study Tasks

Verify:

the UI shows:

> No study tasks planned.

and does not display a misleading percentage.

---

## 13.8 Unknown Course

Verify:

- Course Page shows a clear not-found state,
- the app does not display unrelated Course data.

---

## 13.9 Missing Duration

Verify:

- the UI does not fabricate an estimated duration.

---

## 13.10 Incomplete Source Context

Verify that a Course can still display correctly when some Course Materials or
metadata are absent.

Do not fabricate missing information.

---

## 13.11 Source Information Requiring Review

The static fixture may include source information that cannot safely be
normalized without human review.

Verify that fixture preparation does not silently manufacture a correction.

The application does not need a source-review interface in V1.

---

# 14. Cross-View Verification

Verify all five primary views are reachable.

Specifically confirm:

- Dashboard is directly reachable.
- Courses is directly reachable.
- Weekly Plan is directly reachable.
- Today is directly reachable.
- Course Cards open Course Pages.

Weekly Plan and Today must NOT exist only as Dashboard sections.

Upcoming Assignments must NOT require a sixth primary view.

Walk the same Study Tasks across:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page.

Verify:

- identity agrees,
- title agrees,
- Course association agrees,
- completion state agrees,
- Assignment relationships agree,
- Learning Objective relationships agree,
- authored order agrees where relevant.

Verify the same weekly progress result appears wherever the same Course/week
scope is represented.

---

# 15. Date and Ordering Verification

Verify:

- every V1 view uses the shared reference date,
- machine date does not alter the static scenario,
- Today includes only incomplete reference-date Study Tasks,
- Today's Study Tasks preserve authored order,
- Dashboard Next Action equals Today's first Study Task,
- Class Meetings are ordered by authored start time,
- Upcoming Assignments are ordered by due date,
- equal-date Assignments preserve authored order,
- Weekly Plan preserves Study Task planned dates.

---

# 16. Semantic Verification

Verify that the interface never implies:

- Study Task completion equals Assignment submission,
- Study Task completion equals mastery,
- weekly progress equals Course completion,
- Course Material equals Study Task,
- Class Meeting equals Study Task,
- Assignment deadline equals Study Task planned date,
- instructor Course Fact equals personal planning suggestion.

The interface must preserve these distinctions even if visual components share
styling.

---

# 17. Implementation-State Rule

This specification describes required behavior.

It does NOT prove that any behavior currently exists.

Use `IMPLEMENTATION.md` as the source of truth for verified current
implementation.

Do not update `IMPLEMENTATION.md` to claim a feature exists merely because:

- it appears in this specification,
- it appears in a plan,
- or Build created code for it.

Meaningful behavior should be verified before being recorded as established
implementation.

---

# 18. Document Ownership

Use the durable documents according to their responsibilities.

### `PRODUCT_VISION.md`

Owns:

- long-term product direction,
- future Course ingestion,
- source grounding,
- Course intelligence,
- planning,
- AI/human-control principles,
- adaptive replanning.

### `V1_SPEC.md`

Owns:

- current product behavior,
- academic semantics,
- V1 invariants,
- current acceptance criteria,
- current exclusions.

### `UI_SPEC.md`

Owns:

- screen information hierarchy,
- UI responsibilities,
- presentation expectations,
- reusable presentation concepts.

### `MOCK_DATA_SPEC.md`

Owns:

- static fixture semantics,
- source-backed fixture context,
- stable identities,
- mock relationships,
- derivation expectations,
- fixture validation.

### `ARCHITECTURE.md`

Owns:

- technical direction,
- technical boundaries,
- future conceptual architecture layers.

### `DECISIONS.md`

Owns:

- accepted durable product and engineering decisions.

### `IMPLEMENTATION.md`

Owns:

- verified current implementation reality.

### `TASKS.md`

Owns:

- task sequence,
- milestone status,
- implementation roadmap.

If these documents disagree materially:

STOP.

Surface the contradiction during Plan.

Do not silently select whichever interpretation is easiest to implement.