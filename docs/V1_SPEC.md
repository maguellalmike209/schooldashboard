# School Dashboard — Initial UI V1 Specification

## 1. Document Status

Milestone 1 is complete.

This specification is the frozen product contract for the completed initial
static/read-only School Dashboard UI.

It remains useful for:

- product semantics,
- domain distinctions,
- verified Milestone 1 invariants,
- historical acceptance criteria,
- regression expectations.

It should NOT be expanded to absorb later product milestones.

Future capabilities such as:

- persistent users,
- authentication,
- authorization,
- uploads,
- Course ingestion,
- AI,
- adaptive planning,
- integrations,
- billing

belong in later accepted specifications and tasks.

The long-term direction lives in:

`docs/PRODUCT_VISION.md`

Execution sequencing lives in:

`docs/TASKS.md`

Verified current implementation lives in:

`docs/IMPLEMENTATION.md`

---

# 2. Objective

Help a student answer:

> **What should I do today to stay on track in my classes?**

The initial UI milestone uses static/hardcoded academic data.

"Mock data" in V1 means that the application does not dynamically:

- ingest,
- extract,
- persist,
- research,
- or generate

academic information.

The static fixture may represent sanitized information manually derived from
real Course materials.

Possible source material includes:

- syllabus,
- instructor lecture schedule,
- Assignment/deadline information,
- assigned textbook,
- lecture slides,
- student lecture notes,
- discussion materials,
- study resources.

The V1 application receives the already-structured result.

It does not perform source interpretation itself.

Conceptually:

```text
Course Materials
      ↓
Manual normalization
      ↓
Static Course Facts
      ↓
Static authored personal academic plan
      ↓
School Dashboard UI
```

V1 is a read-only academic-planning interface representing:

- one student,
- one current Academic Term,
- one shared static plan.

The milestone validates:

- the academic information model,
- five primary views,
- cross-view consistency,
- information hierarchy,
- the usefulness of the "what should I do next?" experience.

---

# 3. Conceptual Academic Model

These are product concepts.

They are NOT automatically:

- database tables,
- persistence schemas,
- API contracts,
- ORM models,
- permanent production architecture.

---

## 3.1 Academic Term

The semester, quarter, or other named study period providing current planning
context.

It groups the student's:

- Courses,
- Academic Weeks.

V1 displays one static current term.

Term management and switching are outside V1.

---

## 3.2 Course

One class the student is taking during the Academic Term.

A Course provides context for:

- Learning Objectives,
- Assignments,
- Study Tasks,
- Course Materials,
- Class Meetings / schedule context,
- weekly progress.

A Course Card is a visual representation of the Course.

It is not a separate academic entity.

---

## 3.3 Academic Week

A labeled seven-day planning interval inside the Academic Term.

It groups:

- weekly Learning Objectives,
- Assignments relevant to the week,
- Study Tasks planned within the week.

The fixture supplies explicit week boundaries and identifies one current
Academic Week.

V1 does not provide:

- week switching,
- full academic-calendar management.

---

## 3.4 Learning Objective

A statement describing what the student aims to understand or be able to do.

Examples:

- Explain the relativity principle.
- Distinguish coordinate time from proper time.
- Apply the Doppler effect relationship.
- Explain how standing waves form.

A Learning Objective may be supported by multiple Study Tasks.

A Learning Objective does not require an Assignment.

Completing related Study Tasks does not automatically prove mastery.

---

## 3.5 Assignment

A Course obligation or deliverable with a deadline.

Examples:

- homework,
- problem set,
- essay,
- lab,
- project,
- midterm,
- final exam.

An Assignment answers:

> What must be delivered or completed, and when?

It does not describe every work session required to prepare for it.

One Assignment may motivate several Study Tasks across several days.

---

## 3.6 Study Task

A small concrete action the student plans to perform.

Examples:

- Review Lecture 02 notes.
- Read the assigned relativity section.
- Solve Problems 1–3.
- Review mistakes from the previous problem set.
- Practice spacetime-diagram problems.

A Study Task belongs to:

- one Course,
- one planned date.

It may support:

- zero Learning Objectives,
- one Learning Objective,
- several Learning Objectives,
- zero Assignments,
- or one Assignment in V1.

A Study Task may have:

- an authored estimated duration,
- one static complete/incomplete state.

---

## 3.7 Course Material

A resource supporting learning or Course context.

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

They are separate concepts.

---

## 3.8 Class Meeting / Schedule Context

A Class Meeting is a scheduled instructional event.

Examples:

- lecture,
- discussion,
- lab,
- seminar.

When meeting timing is supplied, the static fixture may represent:

- date,
- start time,
- related Course context.

A source packet may instead provide only partial schedule information such as a
lecture date/topic.

Missing time or room information must not be invented.

Class Meetings / schedule context do not:

- count toward Study Task progress,
- automatically become Study Tasks,
- track attendance,
- recur automatically,
- synchronize with an external calendar.

---

## 3.9 Progress

For V1:

> Progress describes completed Study Tasks relative to planned Study Tasks for
> an explicitly identified Academic Week and Course scope.

Progress is NOT:

- a grade,
- mastery,
- Assignment submission state,
- Course completion,
- predicted academic performance.

---

# 4. Relationships in Practice

Learning Objectives, Assignments, and Study Tasks remain distinct.

Example:

Learning Objective:

> Explain the relativity principle.

Assignment:

> Problem #1 — Due Monday.

Study Task:

> Review relativity notes — 25 min.

Another Study Task:

> Begin Problem #1 — 30 min.

The second Study Task may support both:

- the Learning Objective,
- the Assignment.

It remains one Study Task.

A Study Task may also exist without either relationship.

Example:

> Review Monday's lecture notes.

A Course Material remains different from the Study Task that uses it.

Material:

> Lecture 02 slides.

Study Task:

> Review Lecture 02 slides.

No direct Objective-to-Assignment mapping is required beyond relationships
expressed through Study Tasks.

Completing all related Study Tasks does not automatically mean:

- the Objective is mastered,
- the Assignment is submitted,
- the Course obligation is complete.

V1 does not track:

- mastery,
- grades,
- submission state.

---

# 5. V1 Product Invariants

These rules define the completed initial UI milestone.

They remain useful as regression constraints unless a later accepted product
decision explicitly supersedes them.

---

## 5.1 One Shared Academic Plan

ALWAYS:

All five primary views derive from one shared academic plan.

NEVER create separate canonical copies of:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- Course Materials,
- Class Meetings

for different screens.

A Study Task shown on:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page

is the same underlying Study Task.

Presentation may differ.

Identity and academic meaning do not.

---

## 5.2 Course Facts and Personal Planning Are Different

ALWAYS distinguish source-backed Course Facts from personal planning choices.

Course Facts may include:

- Course identity,
- instructor information,
- schedule,
- lecture topics,
- Assignment deadlines,
- exam dates,
- assigned materials.

Personal planning may include:

- Learning Objectives,
- Study Tasks,
- planned Study Task dates,
- task ordering,
- estimated durations,
- completion state.

NEVER present an authored personal Study Task as an instructor requirement
unless the source actually establishes it.

Example:

Course Fact:

> Lecture 02 covers the relativity principle.

Personal plan:

> Review the relativity principle in my own words — 25 min.

Related does not mean identical.

---

## 5.3 Academic Concepts Remain Distinct

NEVER collapse:

- Learning Objective,
- Assignment,
- Study Task,
- Course Material,
- Class Meeting

into one generic "Task" concept.

Their meanings remain:

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

## 5.4 Assignment Deadline Is Not Study Task Date

ALWAYS treat:

- Assignment due date,
- Study Task planned date

as different values.

Example:

Assignment:

> Problem #1  
> Due Monday

Study Task:

> Begin Problem #1  
> Planned Friday

NEVER move the Study Task to Monday merely because the Assignment is due Monday.

The product is intended to support work before deadlines.

---

## 5.5 Today Has One Exact V1 Meaning

For V1:

```text
Today =
incomplete Study Tasks
whose plannedDate equals the shared referenceDate
```

ALWAYS use the fixed reference date in the static academic plan.

NEVER use the machine's live current date to alter the V1 scenario.

NEVER automatically include:

- every unfinished Study Task,
- every Assignment due today,
- unfinished earlier Study Tasks,
- newly generated work.

---

## 5.6 Earlier Unfinished Work Does Not Move Automatically

If a Study Task was planned Thursday and remains incomplete Friday:

ALWAYS keep it associated with Thursday in broader plan views.

NEVER automatically reschedule it into Friday's Today list.

Automatic carryover belongs to future adaptive planning.

---

## 5.7 Completed Study Tasks

Today and Dashboard's actionable daily summary include only incomplete Study
Tasks planned for the reference date.

Weekly Plan and Course Page may continue to show completed Study Tasks.

A completed Study Task does NOT imply:

- an Assignment was submitted,
- a Learning Objective was mastered,
- the Course is complete.

---

## 5.8 Next Action

For V1:

```text
Next Action =
first incomplete Study Task
in Today's authored order
```

NEVER determine Next Action through:

- Assignment urgency,
- nearest deadline,
- duration,
- grade weighting,
- AI ranking,
- priority scoring,
- automatic scheduling.

If no Today Study Task remains:

```text
Next Action = none
```

Do not invent replacement work.

---

## 5.9 Authored Ordering

Study Tasks use the order supplied by the static academic plan.

NEVER silently reorder them based on:

- deadline,
- duration,
- Course,
- alphabetic order,
- perceived difficulty,
- AI judgment,
- urgency formula.

---

## 5.10 Weekly Progress

For any weekly scope:

```text
Progress =
completed Study Tasks planned inside the current Academic Week
/
all Study Tasks planned inside the current Academic Week
```

Course progress uses the same calculation restricted to one Course.

Overall progress counts all current-week Study Tasks across Courses.

NEVER include:

- Assignments,
- Learning Objectives,
- Class Meetings,
- Course Materials,
- source artifacts

in the denominator.

NEVER average Course percentages for overall progress.

Example:

```text
Physics: 2 of 3
Math:    1 of 2
Overall: 3 of 5
```

NOT:

```text
average of 66.7% and 50%
```

If there are zero planned Study Tasks:

> No study tasks planned.

Do not interpret zero tasks as either:

- 0%,
- 100%.

---

## 5.11 Duration Estimates

A Study Task may contain an authored estimate.

Example:

```text
25 min
```

If no estimate exists:

NEVER fabricate one.

V1 does not automatically calculate duration.

Duration does not affect progress.

---

## 5.12 Course Materials

Course Materials are resources/context.

They are not Study Tasks.

NEVER add completion state to a Course Material merely because a student may
read it.

Example:

Material:

> UCD Physics 9D — Modern Physics

Task:

> Read the assigned relativity section.

Only the Study Task has task completion state.

---

## 5.13 Class Meetings

Class Meetings / schedule context do not:

- count toward Study Task progress,
- automatically become Study Tasks,
- track attendance,
- recur automatically,
- synchronize with Google Calendar,
- generate preparation tasks automatically.

---

## 5.14 Source Uncertainty

If fixture preparation encounters questionable or conflicting source
information:

NEVER silently invent a correction.

Preserve uncertainty according to:

`MOCK_DATA_SPEC.md`

Example:

If an instructor schedule contains an impossible date, implementation must not
silently choose the date it assumes was intended.

Source correction requires review.

---

## 5.15 Missing Information Is Valid

Incomplete Course information is valid.

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

The UI should handle missing context deliberately.

---

## 5.16 Five Primary Views

V1 has exactly five required primary student views:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Dashboard, Courses, Weekly Plan, and Today are directly reachable through
primary navigation.

Course Page is reached through Course selection.

Upcoming Assignments is reusable deadline context.

It is not a sixth primary screen.

---

## 5.17 Weekly Plan and Today Are Dedicated Views

Weekly Plan cannot be satisfied only by placing a weekly section on Dashboard.

Today cannot be satisfied only by placing a daily section on Dashboard.

Both remain dedicated primary views.

---

## 5.18 V1 Is Read-Only

V1 displays an already-authored academic plan.

It does NOT provide functional controls for:

- adding Courses,
- editing Courses,
- uploading materials,
- changing instructor deadlines,
- completing Study Tasks interactively,
- moving Study Tasks,
- creating Study Tasks,
- generating plans,
- regenerating plans,
- accepting AI suggestions,
- saving changes,
- deleting academic information.

Do not create controls that imply unsupported functionality.

---

## 5.19 No Intelligence Engine Exists in V1

V1 does NOT require or implement:

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
- adaptive replanning.

The static fixture represents the type of structured data later systems may
eventually produce.

It does not implement those systems.

---

## 5.20 No Persistence Exists in V1

V1 does not introduce:

- production database tables,
- Supabase,
- authentication,
- local persistence,
- save APIs,
- synchronization infrastructure,
- user accounts.

The mock-data contract is not a production database schema.

---

## 5.21 Relationship Integrity

A Study Task may support:

- zero or more Learning Objectives,
- zero or one Assignment in V1,
- zero or more Course Materials.

Every related item must belong to the same Course.

Invalid:

```text
PHY 009D Study Task
→ MAT 21D Learning Objective
```

Invalid fixture relationships should be corrected rather than rendered silently.

---

## 5.22 Stable Identity

A single academic item retains one identity everywhere it appears.

NEVER create separate conceptual records such as:

```text
dashboardTask
todayTask
weeklyTask
coursePageTask
```

for one Study Task.

---

## 5.23 Derived UI Information

Whenever practical, derive view information from canonical academic data.

Examples:

- Today's Study Tasks,
- Today's Classes/schedule context,
- Upcoming Assignments,
- Next Action,
- weekly progress,
- Course weekly progress.

Do not independently hardcode derived results for each screen.

---

## 5.24 Scope Conflict Rule

If implementation appears to require behavior outside the frozen V1 contract:

do NOT expand V1 automatically.

Instead:

1. identify the requirement,
2. determine whether it belongs to a later milestone,
3. inspect current product/architecture/task documents,
4. create or use a later accepted specification,
5. return to Plan if a product decision is required.

V1 should not become a dumping ground for future behavior.

---

# 6. Five Required Views

---

## 6.1 Dashboard

Primary question:

> What needs my attention?

Dashboard provides a cross-Course summary that may include:

- current Academic Term,
- reference day/week,
- today's schedule context,
- today's Study Tasks,
- Next Action,
- Assignments due soon,
- current Course Cards,
- weekly Learning Objective context,
- overall weekly progress,
- per-Course weekly progress.

Next Action uses the first remaining Today Study Task in authored order.

Dashboard links to Today for the complete daily plan.

Dashboard remains an overview rather than reproducing every Course/Weekly Plan
detail.

---

## 6.2 Courses

Primary question:

> What Courses am I currently managing?

Show all static current Courses as Course Cards.

Each Course Card should provide:

- recognizable Course identity,
- current-week Study Task progress.

Additional supplied metadata may appear when useful.

Selecting a Course opens its Course Page.

Course Cards represent existing Courses.

They are not independent academic records.

---

## 6.3 Course Page

Primary question:

> What is happening in this Course?

Show the selected Course's relevant:

- identity,
- current Academic Week/topic context,
- Learning Objectives,
- upcoming Assignments,
- planned Study Tasks,
- Study Task dates,
- completion states,
- relevant Course Materials,
- current-week progress.

Course Page may show limited Course Roadmap context through supplied current
week/topic data.

V1 does NOT require:

- generated full-term roadmap,
- roadmap editing,
- document ingestion,
- source analysis.

Only the selected Course's academic information should appear.

Unknown Course identifier behavior:

- show clear not-found state,
- do not silently display another Course,
- do not crash.

---

## 6.4 Weekly Plan

Primary question:

> What should I accomplish this week?

Weekly Plan is a dedicated primary view.

It should show:

- current Academic Week label,
- current week date range,
- Learning Objectives grouped by Course,
- relevant Assignments,
- Study Tasks planned during the week,
- planned Study Task dates,
- completion states,
- Course progress.

The UI must distinguish:

Learning Objectives:

> what the student aims to learn

Assignments:

> what the student must deliver

Study Tasks:

> what the student plans to do

Tasks without Learning Objectives remain visible.

Completed Study Tasks remain visible.

Earlier unfinished Study Tasks remain on their original dates.

Weekly Plan does not reschedule automatically.

---

## 6.5 Today

Primary question:

> What should I do today?

Today displays:

```text
incomplete Study Tasks
whose plannedDate equals referenceDate
```

Study Tasks remain in authored order.

Where supplied, show:

- Course,
- Study Task title,
- estimated duration,
- related Learning Objective,
- related Assignment,
- Assignment deadline.

Today does NOT automatically include:

- every unfinished Study Task,
- every Assignment due today,
- earlier unfinished Study Tasks,
- generated work,
- automatically prioritized work.

Missing duration is omitted rather than invented.

If no Study Tasks remain:

> No study tasks remain on today's plan.

Do not imply:

- all Course obligations are finished,
- the week is complete,
- learning is mastered.

---

# 7. Upcoming Assignments

Upcoming Assignments is reusable deadline context.

It is not a sixth primary view.

It may appear in:

- Dashboard,
- Course Page,
- Weekly Plan,
- Today when attached to a Study Task.

An upcoming Assignment should display at least:

- title,
- Course,
- due date.

Upcoming lists include:

```text
dueDate >= referenceDate
```

Order:

1. nearest due date,
2. authored order for equal due dates.

An Assignment due today remains visible even without a Study Task planned today.

A linked Study Task may show Assignment deadline context.

Assignment deadlines do not automatically create Study Tasks.

---

# 8. Today, Deadlines, and Planning Control

V1 uses one fixed shared reference date.

"Today" means that reference date.

It does not mean the machine's live date.

All views use the same reference context.

Study Task planned dates remain separate from Assignment due dates.

Tasks may be planned before deadlines.

Completed reference-date Study Tasks are omitted from:

- Today's actionable list,
- Dashboard's daily actionable summary.

They may remain visible in:

- Weekly Plan,
- Course Page.

Earlier unfinished work does not automatically move to Today.

Deadlines provide context.

They do not calculate priority.

No Study Task is automatically:

- created,
- moved,
- prioritized,
- rescheduled

because a deadline approaches.

---

# 9. Weekly Progress

Count each distinct Study Task planned inside the current Academic Week exactly
once.

Numerator:

```text
current-week Study Tasks
where isComplete == true
```

Denominator:

```text
all Study Tasks planned inside the current Academic Week
```

This includes:

- completed tasks,
- incomplete tasks,
- later-in-week tasks.

A Study Task associated with both an Objective and an Assignment still counts
once.

---

## 9.1 Overall Progress

Overall weekly progress uses all current-week Study Tasks across Courses.

Example:

```text
Course A: 2 of 3
Course B: 1 of 2

Overall: 3 of 5
```

Do not average Course percentages.

---

## 9.2 Course Progress

Course summaries use the same calculation restricted to one Course.

Useful wording:

> This week's study tasks

Example:

> 3 of 5 complete

A percentage may supplement the count where useful.

The count should remain understandable.

---

## 9.3 Zero Tasks

When a Course has no current-week Study Tasks:

> No study tasks planned.

Do not show:

- 0%,
- 100%.

Neither accurately represents the state.

---

## 9.4 What Does Not Count

Do not include:

- Assignments,
- Learning Objectives,
- Course Materials,
- Class Meetings,
- source artifacts

in Study Task progress.

There is no V1:

- time weighting,
- grade weighting,
- mastery score,
- Course completion percentage,
- term completion score,
- automatic Assignment completion.

---

# 10. Course Source Context

The static fixture may be manually derived from real Course sources.

Examples:

- current syllabus,
- current instructor schedule,
- Assignment information,
- assigned textbook,
- lecture notes,
- lecture slides.

These may support realistic Course Facts.

V1 itself does NOT:

- upload these documents,
- parse them,
- extract text,
- research the Course,
- reconcile sources,
- generate Study Tasks.

Fixture/source handling expectations live in:

`docs/MOCK_DATA_SPEC.md`

Future source-grounding behavior lives in:

`docs/PRODUCT_VISION.md`

---

# 11. Incomplete Course Source Packets

A Course may have incomplete supporting information.

Example:

Available:

- syllabus,
- lecture schedule,
- textbook.

Not available:

- student notes,
- instructor slides,
- discussion worksheet.

This is a valid fixture state.

Do not require every possible Course Material before a Course appears.

Missing information remains missing unless deliberately authored.

---

# 12. Explicit V1 Exclusions

Milestone 1 does NOT include:

- AI or AI-assisted planning,
- external Course research,
- source reconciliation,
- syllabus parsing,
- PDF analysis,
- automatic Assignment extraction,
- automatic lecture-topic extraction,
- automatic Learning Objective generation,
- automatic Study Task generation,
- automatic duration estimation,
- automatic task prioritization,
- automatic scheduling,
- automatic carryover,
- adaptive replanning,
- generated Course Roadmaps,
- Supabase,
- production database,
- local persistence,
- authentication,
- authorization,
- multiple users,
- tenant isolation,
- Google Calendar integration,
- Google Drive integration,
- notifications,
- Course Material uploads,
- Course Material management,
- editing academic records,
- editing personal plans,
- interactive completion controls,
- drag-and-drop scheduling,
- Assignment submission,
- grade tracking,
- GPA tracking,
- inferred mastery,
- attendance tracking,
- recurring Class Meeting calculation,
- term switching,
- production academic-calendar management,
- billing.

Static schedule/material context does not imply these systems exist.

Authored durations are static values.

They are not generated estimates.

---

# 13. Canonical Mock Scenario

Detailed canonical fixture behavior belongs to:

`docs/MOCK_DATA_SPEC.md`

The reference experience represents a realistic:

```text
UC Davis
PHY 009D
Fall Quarter 2026
```

Course context.

The fixture may be manually derived from sanitized materials such as:

- syllabus,
- lecture schedule,
- Assignment information,
- assigned textbook,
- lecture notes where available.

This does not mean V1 performs ingestion.

Conceptually:

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

All five views must agree on relevant:

- Course identity,
- reference date,
- Academic Week,
- Study Task identity,
- authored ordering,
- completion state,
- Assignment deadlines,
- Learning Objective relationships,
- progress.

`MOCK_DATA_SPEC.md` owns:

- exact fixture relationships,
- provenance examples,
- source-review examples,
- reference-date data,
- fixture identity rules,
- mock-data validation.

`UI_SPEC.md` owns:

- information hierarchy,
- screen responsibilities,
- presentation expectations.

This specification owns the completed V1:

- product semantics,
- cross-view rules,
- invariants,
- exclusions,
- historical acceptance criteria.

---

# 14. Required Verification Scenarios

---

## 14.1 Study Task Linked to Objective and Assignment

A Study Task supports:

- at least one Learning Objective,
- one Assignment.

Verify:

- it remains one Study Task,
- it counts once in progress,
- relationships appear where relevant.

---

## 14.2 Study Task Linked to Neither

A Study Task belongs to a Course with:

- no Learning Objective,
- no Assignment.

Verify it still appears wherever its planned date requires.

---

## 14.3 Assignment Due Today Without Today Study Task

Verify:

- the Assignment remains visible as deadline context,
- no Today Study Task is automatically created.

---

## 14.4 Completed Study Task Planned Today

Verify:

- omitted from Today actionable list,
- omitted from Dashboard actionable daily summary,
- retained where appropriate in Weekly Plan/Course Page,
- counted in weekly progress.

---

## 14.5 Earlier Unfinished Study Task

Verify:

- it remains on its original planned date,
- it does not silently move into Today.

---

## 14.6 Unequal Course Task Totals

Verify:

- Course progress is calculated independently,
- overall progress uses raw task totals,
- Course percentages are not averaged.

---

## 14.7 Course With Zero Current-Week Study Tasks

Verify:

> No study tasks planned.

Do not show misleading percentage progress.

---

## 14.8 Unknown Course

Verify:

- clear not-found state,
- no unrelated Course data.

---

## 14.9 Missing Duration

Verify:

- no duration is fabricated.

---

## 14.10 Incomplete Source Context

Verify a Course still renders correctly when some Course Materials or metadata
are unavailable.

Do not fabricate missing context.

---

## 14.11 Source Information Requiring Review

Fixture preparation must not silently manufacture a correction for ambiguous
source information.

V1 does not require a source-review UI.

---

# 15. Cross-View Verification

Verify all five primary views are reachable.

Specifically:

- Dashboard directly reachable,
- Courses directly reachable,
- Weekly Plan directly reachable,
- Today directly reachable,
- Course Cards open Course Pages.

Weekly Plan and Today must not exist only as Dashboard sections.

Upcoming Assignments must not require a sixth primary view.

Trace shared Study Tasks across:

- Dashboard,
- Today,
- Weekly Plan,
- Course Page.

Verify that relevant:

- identity,
- title,
- Course association,
- completion state,
- Assignment relationships,
- Learning Objective relationships,
- authored order

remain consistent.

The same Course/week progress scope should produce the same result anywhere it
is represented.

---

# 16. Date and Ordering Verification

Verify:

- all views use the shared reference date,
- machine date does not alter the static scenario,
- Today includes only incomplete reference-date Study Tasks,
- Today preserves authored order,
- Dashboard Next Action equals Today's first Study Task,
- supplied meeting/schedule ordering is preserved where relevant,
- Upcoming Assignments are ordered by due date,
- equal-date Assignments preserve authored order,
- Weekly Plan preserves planned Study Task dates.

---

# 17. Semantic Verification

The UI must never imply:

- Study Task completion = Assignment submission,
- Study Task completion = mastery,
- weekly progress = Course completion,
- Course Material = Study Task,
- Class Meeting = Study Task,
- Assignment deadline = Study Task planned date,
- instructor Course Fact = personal planning suggestion.

Visual similarity must not erase semantic distinction.

---

# 18. Milestone 1 Completion State

Milestone 1 was completed through:

- SD-001
- SD-002
- SD-003
- SD-004
- SD-005
- SD-006
- SD-007

Verified implementation details belong in:

`docs/IMPLEMENTATION.md`

This specification should not be used to claim implementation state.

---

# 19. Frozen Contract Rule

This document is now a completed milestone specification.

Future agents should generally NOT modify V1 product behavior to accommodate new
capabilities.

Example:

Adding authentication later does not mean:

> authentication becomes a V1 requirement.

Instead:

```text
V1 remains the completed static UI contract

Later milestone
→ defines authentication behavior
→ preserves relevant V1 product semantics
```

The same applies to:

- persistence,
- uploads,
- Course ingestion,
- AI,
- adaptive planning,
- integrations,
- billing.

---

# 20. Preserved V1 Invariants in Future Work

Later architecture may change implementation substantially.

The following V1-derived product distinctions should continue unless explicitly
superseded:

- Course Fact vs personal planning,
- Learning Objective vs Assignment vs Study Task,
- Course Material vs Study Task,
- Assignment due date vs Study Task planned date,
- missing information remains missing,
- provenance matters,
- one conceptual item retains stable identity,
- progress does not claim mastery,
- generated planning does not become instructor truth.

Later milestones may intentionally supersede V1 mechanics such as:

- fixed reference date,
- read-only behavior,
- authored static ordering,
- no carryover,
- no persistence.

Such changes belong in later accepted specifications.

---

# 21. Transition to Persistent Multi-User Work

Future persistent/private capability must not be specified by rewriting this
file.

Instead, a later milestone specification should define:

- user/account behavior,
- authentication,
- authorization,
- Course ownership,
- CRUD,
- persistence,
- validation,
- tenant isolation,
- real date behavior,
- editable planning.

That specification should inherit relevant V1 academic semantics while defining
the new behavior explicitly.

---

# 22. Transition to Course Materials and Ingestion

Future material ingestion should receive its own accepted requirements.

It may define:

- upload behavior,
- private storage,
- material ownership,
- extraction,
- provenance,
- review,
- uncertainty,
- deletion.

V1's static Course Material references do not define that implementation.

---

# 23. Transition to AI Planning

Future AI planning should receive a later accepted specification defining:

- what AI may generate,
- grounding requirements,
- review/approval,
- failure handling,
- cost/usage behavior,
- plan acceptance,
- regeneration,
- adaptive replanning.

The V1 authored fixture should not be treated as an AI algorithm.

---

# 24. Security Transition

Milestone 1 did not contain private multi-user runtime capability.

Later security-sensitive functionality must follow:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`

Those documents do not retroactively change Milestone 1's historical scope.

They govern future relevant implementation.

---

# 25. Implementation-State Rule

This specification describes the completed milestone contract.

It does not prove current implementation state.

Use:

`docs/IMPLEMENTATION.md`

for verified implementation reality.

Do not claim a feature exists merely because:

- it appears in this specification,
- it appears in a Plan,
- it appears in future direction.

Verified reality remains separate from requirements.

---

# 26. Document Ownership

Use durable documents according to their responsibilities.

---

## `PRODUCT_VISION.md`

Owns:

- long-term product direction,
- multi-user product direction,
- future Course ingestion,
- source grounding,
- Course intelligence,
- AI-assisted planning,
- adaptive replanning,
- monetization direction.

---

## `V1_SPEC.md`

Owns:

- completed Milestone 1 product semantics,
- V1 invariants,
- V1 acceptance criteria,
- V1 exclusions,
- historical V1 scope.

It should not become the specification for every future milestone.

---

## `UI_SPEC.md`

Owns:

- UI information hierarchy,
- presentation responsibilities,
- reusable UI concepts,
- visual/interaction expectations.

---

## `MOCK_DATA_SPEC.md`

Owns:

- static fixture semantics,
- fixture source context,
- stable mock identities,
- fixture relationships,
- derivation expectations,
- mock-data validation.

---

## `ARCHITECTURE.md`

Owns:

- durable technical boundaries,
- conceptual system layers,
- future architecture direction,
- provider-neutral technical structure.

---

## `SECURITY_REQUIREMENTS.md`

Owns:

- durable application security requirements.

---

## `DATA_PRIVACY.md`

Owns:

- data classification,
- privacy handling,
- data-minimization requirements,
- retention/deletion principles.

---

## `THREAT_MODEL.md`

Owns:

- assets,
- actors,
- trust boundaries,
- realistic threat scenarios.

---

## `SECURITY_TESTING.md`

Owns:

- defensive adversarial testing procedures,
- security regression-test patterns.

---

## `DECISIONS.md`

Owns:

- accepted durable product,
- architecture,
- security,
- automation,
- Git,
- release decisions.

---

## `IMPLEMENTATION.md`

Owns:

- verified current implementation reality.

---

## `TASKS.md`

Owns:

- task sequence,
- task status,
- milestone sequencing,
- roadmap execution order.

---

# 27. Conflict Rule

If durable documents appear to disagree materially:

STOP the affected implementation.

Do not silently choose the easiest interpretation.

Plan should determine:

1. whether the conflict is real,
2. which document owns the subject,
3. whether one document is stale,
4. whether a new durable decision is required.

---

# 28. Final Principle

V1 proved the core product model:

```text
Course context
+
Learning Objectives
+
Assignments
+
Study Tasks
+
deadlines
+
progress
        ↓
five coherent views
        ↓
"What should I do today?"
```

The next stages may replace static fixtures with real systems.

They should not erase the product distinctions Milestone 1 successfully
established.

V1 is now:

> a completed foundation to build on,

not:

> a specification that expands forever.