# School Dashboard — Initial UI Specification

## 1. Purpose

This document defines the information hierarchy, interaction expectations, and
visual responsibilities of the School Dashboard initial UI milestone.

It does not define:

- pixel-perfect styling,
- a design system,
- exact colors,
- exact typography,
- final component APIs,
- database structure,
- AI behavior,
- persistence,
- or future integrations.

`docs/V1_SPEC.md` remains the source of truth for current product behavior,
academic concepts, calculations, date rules, and V1 exclusions.

This document answers a narrower question:

> How should the approved V1 information be organized so that the student can
> quickly understand what matters and what to do next?

The UI should optimize for clarity, academic context, and action rather than
maximizing the amount of information visible at once.

---

## 2. Core Experience

The interface should make it easy for the student to move between three levels
of academic planning:

### Today

What should I do now?

### This Week

What am I trying to accomplish this week?

### Course Context

Why am I doing this, what am I learning, and what deadlines or materials are
connected to it?

The five primary V1 views are:

1. Dashboard
2. Courses
3. Course Page
4. Weekly Plan
5. Today

Dashboard, Courses, Weekly Plan, and Today must be directly accessible through
primary navigation.

Course Page is reached by selecting a course.

Upcoming Assignments is reusable content within these views and is not a sixth
primary view.

---

## 3. Global UI Principles

### 3.1 Action first

The application should prioritize useful actions over passive academic
information.

The user should not need to inspect several sections simply to determine what
they should work on next.

Where appropriate, emphasize:

1. what the student should do next,
2. what remains planned for today,
3. what deadlines require awareness,
4. what the student is trying to accomplish this week,
5. and the deeper course context behind those actions.

---

### 3.2 Preserve academic meaning

The interface must visually preserve the distinction between:

- Learning Objective
- Assignment
- Study Task
- Course Material
- Class Meeting

Do not display all of these as interchangeable generic tasks.

Example:

Learning Objective:
Understand standing waves

Assignment:
HW 4 — Due Friday

Study Task:
Solve HW 4 questions 1–3 — 35 min

Material:
Lecture 7 slides

Class Meeting:
PHY 9B Lecture — 10:00 AM

These may be related, but they represent different things.

---

### 3.3 One academic item, multiple views

A study task may appear on:

- Dashboard
- Today
- Weekly Plan
- Course Page

These appearances represent the same underlying task.

The UI must not imply that repeated appearances are separate academic work.

Progress and completion state must therefore remain consistent between views.

---

### 3.4 Progressive disclosure

Do not show every available academic detail on every screen.

Use the views for different levels of detail:

Dashboard:
summary and immediate attention

Today:
daily execution

Weekly Plan:
weekly structure

Courses:
course overview

Course Page:
deep course-specific context

A student should be able to move deeper when needed without being overloaded on
the overview screens.

---

### 3.5 Deadlines are context, not automatically today's work

An assignment due today or soon should be visible as deadline context.

It should not automatically appear as a Study Task unless a Study Task was
actually planned for the reference day.

The UI must not visually collapse:

Assignment due date

and

Study Task planned date

into the same concept.

---

### 3.6 Progress should remain modest in meaning

Progress represents completion of planned Study Tasks for the current academic
week.

It must not visually imply:

- course mastery,
- assignment submission,
- grade performance,
- percent of the entire course completed,
- or percent of material understood.

Prefer labels such as:

"This week's study tasks"

"3 of 5 complete"

Avoid labels such as:

"Course completion: 60%"

unless a future accepted requirement explicitly defines that meaning.

---

### 3.7 Use the reference date consistently

The V1 prototype uses the fixed mock reference date defined by the academic
plan.

The UI should visibly establish the relevant day/week context.

Do not silently use the user's actual machine date.

---

## 4. Primary Navigation

The initial UI should provide direct navigation to:

- Dashboard
- Courses
- Weekly Plan
- Today

Course Page is reached from course-related UI.

The navigation should make the four directly accessible sections recognizable
without requiring the student to understand internal product terminology.

The exact navigation implementation is deferred to SD-002.

Possible forms include:

- sidebar,
- top navigation,
- compact desktop navigation,
- mobile navigation adaptation.

The exact form is not established here.

---

# 5. Dashboard

## 5.1 Purpose

The Dashboard is the cross-course command center.

Its primary question is:

> What needs my attention right now?

The student should be able to understand their immediate academic situation
within a few seconds.

---

## 5.2 Information priority

The Dashboard should visually prioritize approximately:

1. Next Action
2. Today's Study Plan
3. Today's Classes
4. Assignments Due Soon
5. Weekly Progress
6. Current Courses / course summaries
7. Weekly learning context

This order describes information importance, not a mandatory vertical component
order.

Responsive layout may place some sections beside each other.

The UI should not give every section identical visual emphasis.

---

## 5.3 Next Action

The Dashboard should strongly emphasize the next remaining Study Task from
Today's authored task order.

Example:

NEXT UP

PHY 9B

Read Chapter 16.1–16.2

25 min

Supports:
Standing Waves

[ View Today ]

The Next Action is not calculated using an urgency score.

For V1:

Next Action =
the first incomplete Study Task planned for the reference day in authored order.

If no incomplete Study Task exists for Today, show a meaningful empty state
rather than inventing work.

Example:

No study tasks remain on today's plan.

The UI may still show assignments, classes, or weekly context below.

---

## 5.4 Today's Study Plan

Show a compact summary of incomplete Study Tasks planned for the reference day.

A task summary should expose enough information to understand:

- course,
- action,
- duration when available,
- objective context when useful,
- assignment/deadline context when useful.

Example:

PHY 9B

Read Chapter 16.1–16.2
25 min
Standing Waves

PHY 9B

HW 4 questions 1–3
35 min
HW 4 due Friday

The Dashboard does not need to expose every relationship available on the full
Today screen.

Provide a clear path to the Today view.

---

## 5.5 Today's Classes

Show Class Meetings occurring on the reference day.

Each item should expose:

- course,
- meeting type/name when available,
- authored start time.

Example:

10:00 AM
PHY 9B
Lecture

1:10 PM
EEC 100
Lecture

Class Meetings are informational.

Do not:

- count attendance toward Study Task progress,
- transform meetings into Study Tasks,
- infer recurring meetings,
- or build timetable/calendar behavior in V1.

---

## 5.6 Assignments Due Soon

Show upcoming Assignment deadlines.

Each item should expose:

- assignment name,
- course,
- due date.

Example:

PHY 9B
HW 4
Due Friday

EEC 100
Lab 2
Due Monday

This section is deadline context.

Do not show an Assignment as completed simply because associated Study Tasks are
complete.

Do not duplicate Study Tasks inside this section.

No arbitrary urgency score is required.

---

## 5.7 Weekly Progress

Show current-week Study Task completion.

Provide:

- overall weekly count,
- useful per-course summaries.

Example:

This week's study tasks

8 of 13 complete

PHY 9B
4 of 6

MAT 21D
3 of 4

EEC 100
1 of 3

Do not average percentages between courses.

Use the calculation defined in `V1_SPEC.md`.

---

## 5.8 Current Courses

The Dashboard may reuse the Course Card component from the Courses view.

Dashboard Course Cards should remain compact.

They should provide enough information to:

- identify the course,
- understand current-week Study Task progress,
- open the Course Page.

Do not attempt to place the entire Course Page inside the Dashboard card.

---

# 6. Courses

## 6.1 Purpose

The Courses view answers:

> What classes am I currently managing?

It provides the student's course-level overview.

---

## 6.2 Course Card contract

Each course should be represented by a reusable Course Card.

At minimum, expose:

- course code or recognizable identifier,
- course name,
- current-week Study Task progress.

Optional mock context may include:

- instructor,
- current topic,
- next class time,

only when that information improves clarity and is supplied by mock data.

Do not fabricate missing information.

---

## 6.3 Example

PHY 9B

Physics

Current topic:
Standing Waves

This week's study tasks:
4 of 6 complete

[ Open Course ]

---

## 6.4 Behavior

Selecting the course opens its Course Page.

Course Cards appearing elsewhere should represent the same course.

Do not create separate Dashboard-course and Courses-page course concepts.

---

# 7. Course Page

## 7.1 Purpose

The Course Page answers:

> What is happening in this course, what am I trying to learn, what work is
> connected to it, and what should I be doing?

It is the deepest course-specific view in the initial milestone.

---

## 7.2 Information hierarchy

The Course Page should make these areas easy to distinguish:

1. Course identity
2. Current week/topic
3. Current learning objectives
4. Planned Study Tasks
5. Upcoming Assignments
6. Current-week progress
7. Static Course Materials/context

Exact visual ordering may vary if the hierarchy remains clear.

---

## 7.3 Course identity

Show:

- course code/name,
- useful supplied metadata.

Example:

PHY 9B
Physics

Current Week
Standing Waves

Do not invent semester-wide roadmap data.

---

## 7.4 Learning Objectives

Clearly label Learning Objectives separately from Study Tasks.

Example:

Learning Objectives

- Explain standing waves
- Identify nodes and antinodes
- Calculate harmonic frequencies

Do not imply objective mastery based solely on task completion.

---

## 7.5 Study Tasks

Display the course's Study Tasks for the current week.

Show:

- task action,
- planned day/date,
- completion state,
- duration when available,
- associated objective when relevant,
- associated assignment/deadline when relevant.

Example:

Tuesday

Read Chapter 16.1–16.2
25 min

Supports:
Standing Waves

Wednesday

HW 4 questions 4–6
40 min

Supports:
Harmonic Frequencies
HW 4 — Due Friday

---

## 7.6 Upcoming Assignments

Show Assignment obligations separately from Study Tasks.

Example:

Assignments

HW 4
Due Friday

Exam 1
October 23

Do not imply submission state.

V1 does not track submissions.

---

## 7.7 Materials

Course Materials are static reference/context items during V1.

Example:

Materials

- Lecture 7 slides
- Textbook Chapter 16
- Practice worksheet

V1 does not require:

- uploads,
- previews,
- file parsing,
- document search,
- AI analysis,
- or Google Drive.

Opening/link behavior should only be implemented if the relevant task later
defines supplied mock links.

---

## 7.8 Progress

Course Page progress represents only current-week Study Tasks for this course.

Use the same calculation as Dashboard, Courses, and Weekly Plan.

---

## 7.9 Unknown course

If the user navigates to a course identifier that does not exist in mock data,
show a clear not-found state.

Do not:

- silently redirect to another course,
- display the first course,
- or crash.

---

# 8. Weekly Plan

## 8.1 Purpose

Weekly Plan answers:

> What should I accomplish this week?

It is a dedicated primary view.

It must not be implemented only as a Dashboard section.

---

## 8.2 Information model

Weekly Plan should visually distinguish:

### Learn

Learning Objectives.

### Deliver

Assignments / deadlines.

### Do

Study Tasks.

Review and practice are types of Study Task descriptions, not separate domain
entities.

The UI does not have to literally use the labels Learn, Deliver, and Do if
another design preserves the same distinction.

---

## 8.3 Course grouping

The Weekly Plan should organize information in a way that preserves course
context.

A reasonable structure is:

Week 4
September 28 – October 4

PHY 9B

Learning Objectives
- Understand standing waves
- Identify nodes and antinodes

Assignments
- HW 4 — Due Friday

Monday
- Review Lecture 7 — 20 min

Tuesday
- Read Chapter 16.1–16.2 — 25 min
- HW 4 questions 1–3 — 35 min

Wednesday
- Practice nodes/antinodes — 30 min

---

## 8.4 Tasks without objectives

A Study Task without an associated Learning Objective must remain visible.

Example:

Review Monday lecture notes

It should not disappear simply because it lacks an objective relationship.

---

## 8.5 Deadlines

Assignments due during the week should appear as deadline context.

They must remain distinguishable from Study Tasks.

---

## 8.6 Completion state

Weekly Plan includes both:

- complete Study Tasks,
- incomplete Study Tasks.

Unlike Today, it should preserve completed actions so the student can understand
weekly progress.

---

## 8.7 Earlier unfinished tasks

An unfinished Study Task from an earlier day remains displayed on its original
planned day.

Do not automatically move it into Today.

---

# 9. Today

## 9.1 Purpose

Today is the most execution-focused screen.

It answers:

> What should I do today?

The student should be able to open Today and begin working without needing to
interpret the entire weekly plan.

---

## 9.2 Task inclusion rule

Today contains:

Study Tasks where:

- planned date equals the mock reference date,
- and completion state is incomplete.

It does NOT automatically contain:

- every unfinished task,
- every assignment due today,
- tasks from earlier dates,
- tasks generated because a deadline is close.

---

## 9.3 Ordering

Use authored order.

Do not invent:

- priority scores,
- urgency formulas,
- AI ranking,
- deadline-based automatic reordering.

The first remaining task is the Dashboard Next Action.

---

## 9.4 Task presentation

A Today Study Task should expose:

- course,
- concrete action,
- estimated duration when supplied,
- Learning Objective context when relevant,
- Assignment context when relevant,
- Assignment due date when useful.

Example:

PHY 9B

Read Chapter 16.1–16.2

25 min

Supports:
Standing Waves

---

PHY 9B

HW 4 questions 1–3

35 min

Supports:
Standing Waves
HW 4 — Due Friday