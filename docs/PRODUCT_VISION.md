# School Dashboard — Product Vision

## 1. Purpose

School Dashboard is intended to become a personal academic operating system:

> one place that understands what a student is learning, what they must deliver,
> what they have available, and what they should work on next.

The product should connect:

- Courses,
- class schedules,
- Assignments,
- Course Materials,
- Learning Objectives,
- Study Tasks,
- deadlines,
- student availability,
- progress,
- source context,
- and eventually AI-assisted planning

into an understandable academic plan.

The central product question is:

> What should I do today to stay on track in my classes?

The product should reduce the mental work required to transform a complicated
academic term into clear weekly goals and manageable daily actions.

---

# 2. Core Product Transformation

The central transformation is:

```text
Course inputs
→ Course understanding
→ Course roadmap
→ Weekly objectives
→ Study Tasks
→ Daily plan
→ Work
→ Progress
→ Replanning
```

A student should not need to manually reconstruct this entire chain for every
Course.

For example:

> Physics Homework 4 is due Friday.

Deadline tracking alone is not enough.

School Dashboard should eventually help turn that obligation into something
closer to:

- understand the relevant concepts,
- review the relevant lecture material,
- read the useful textbook section,
- work through selected problems,
- identify mistakes,
- finish remaining problems,
- review before submission.

Those actions can then be distributed across the days leading to the deadline.

The value of School Dashboard is not merely knowing that work exists.

The value is helping the student understand:

> what the work means and what to do next.

---

# 3. Product Identity

School Dashboard should become a real student-facing application rather than a
single-user coded prototype.

The long-term direction supports:

- multiple users,
- private accounts,
- private academic data,
- personal Courses,
- personal Course Materials,
- personal plans,
- secure persistence,
- individualized AI-assisted planning.

Each user should experience School Dashboard as their own academic workspace.

User data should remain isolated from other users unless an explicit future
sharing capability is deliberately designed.

---

# 4. Experience Principles

## 4.1 Start With Action

The product should prioritize:

> What can I meaningfully do now?

Today should present manageable actions rather than overwhelming the student
with the entire semester.

The student should be able to move outward from:

```text
Today
→ Week
→ Course
→ Term
```

when additional context is useful.

---

## 4.2 Learning and Deliverables Are Different

The product must distinguish:

- what the student should understand,
- what the student must submit,
- what the student plans to do.

Therefore:

```text
Learning Objective
≠
Assignment
≠
Study Task
```

A student may need to:

- review,
- practice,
- read,
- prepare,
- revisit mistakes

even when no graded Assignment exists.

Learning deserves first-class representation.

---

## 4.3 Deadlines and Planned Work Are Different

An Assignment due date represents:

> when an academic obligation is due.

A Study Task planned date represents:

> when the student intends to work.

Therefore:

```text
Assignment due date
≠
Study Task planned date
```

The product should make both visible without conflating them.

---

## 4.4 Progress Should Be Understandable

Progress should describe the student's plan and recorded work.

It should not overclaim.

Completing Study Tasks does not automatically prove:

- mastery,
- Assignment submission,
- a predicted grade,
- Course success.

School Dashboard should avoid pretending that simple activity metrics establish
learning outcomes they cannot actually prove.

---

## 4.5 Preserve Student Control

The student's personal plan belongs to the student.

Future editable functionality should allow the student to:

- create,
- accept,
- edit,
- reorder,
- reschedule,
- complete,
- delete

personal planning items according to accepted product behavior.

AI-generated planning remains advisory until accepted.

---

# 5. Product Information Boundaries

School Dashboard should preserve meaningful distinctions among:

```text
Course Facts
Personal Planning
AI Suggestions
External Supplemental Context
```

These should not silently collapse into one undifferentiated information pool.

---

# 6. Course Facts

Course Facts describe what the current Course actually teaches or requires.

Examples may include:

- instructor,
- academic term,
- Course schedule,
- topics,
- required textbook,
- Assignment deadlines,
- exam dates,
- policies.

When supported by authoritative current-course sources, these should remain
distinct from personal planning decisions.

---

# 7. Personal Planning

Personal planning represents what the student chooses to do.

Examples:

- Study Tasks,
- study dates,
- task ordering,
- duration estimates,
- weekly goals,
- accepted AI suggestions.

Changing a personal Study Task should not rewrite the instructor's Assignment
deadline.

---

# 8. AI Suggestions

AI-generated information may propose:

- Course roadmap structure,
- Learning Objectives,
- Study Tasks,
- duration estimates,
- schedule placement,
- plan revisions.

Generated information should remain clearly distinguishable from:

- source-backed Course Facts,
- student-authored accepted choices.

AI output does not become authoritative merely because a model generated it.

---

# 9. Supplemental Context

External information may eventually help explain Course content.

Examples:

- official university Course descriptions,
- department resources,
- prior Course offerings,
- reputable educational sources.

Supplemental context may enrich understanding.

It must not silently override the student's current Course materials.

---

# 10. First Milestone

Milestone 1 validates the usefulness and clarity of the core student-facing
experience using static mock/hardcoded data.

It establishes:

- Dashboard,
- Courses,
- Course Page,
- Weekly Plan,
- Today,
- core academic distinctions,
- shared plan behavior.

Milestone 1 intentionally excludes:

- real persistence,
- accounts,
- authentication,
- uploads,
- AI,
- integrations,
- automatic planning.

The authoritative Milestone 1 requirements remain in:

`docs/V1_SPEC.md`

Milestone 1 is product-model evidence.

It is not the final production architecture.

---

# 11. Long-Term Product Pipeline

The intended product pipeline is:

| Stage | Product responsibility |
| --- | --- |
| Account / academic setup | Establish the student's private workspace, current term, and Courses. |
| Course inputs | Collect current Course identity, materials, schedules, deadlines, and other relevant context. |
| Course ingestion | Extract candidate academic information from supplied materials. |
| Student review | Allow uncertain or important extracted information to be corrected or accepted. |
| Grounded Course understanding | Organize known Course facts while retaining provenance, uncertainty, and conflicts. |
| Course roadmap | Build a useful full-term view of topics and known academic milestones. |
| Weekly objectives | Identify what the student should aim to understand or accomplish during the week. |
| Task decomposition | Break learning goals and deliverables into manageable Study Tasks. |
| Daily planning | Suggest when the student should work on tasks based on deadlines, availability, and accepted priorities. |
| Student approval | Let the student accept, edit, reject, or regenerate generated plans. |
| Execution | Help the student carry out the accepted plan. |
| Progress | Track recorded work and remaining planned actions. |
| Adaptive replanning | Suggest plan changes when reality diverges from the original plan. |

Each stage should remain understandable to the student rather than becoming an
opaque autonomous system.

---

# 12. Account and Multi-User Direction

The long-term product should support real private user accounts.

Each user should have an authoritative relationship to their own:

- academic terms,
- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- schedules,
- Course Materials,
- generated plans,
- progress information.

Private academic information should be private by default.

School Dashboard should eventually be usable by friends and other students
without requiring the source code or repository to be customized for each user.

---

# 13. Real Users and Beta Users

Friends using the product are real users.

A free or invitation-only beta should not treat their data as disposable.

Before users store meaningful private academic information, the product should
provide appropriate:

- authentication,
- authorization,
- user isolation,
- persistence,
- privacy protection,
- deletion behavior,
- secure deployment practices.

The product may remain free during early beta.

Free usage does not reduce the expected privacy or security standard.

---

# 14. Course Setup

A student's Course workspace should eventually be established through the
product itself.

The student may provide information such as:

- university,
- Course code,
- Course title,
- instructor,
- academic term,
- schedule.

The exact onboarding interaction should remain lightweight.

School Dashboard should not require the developer to manually hardcode each
student's Courses.

---

# 15. Course Materials Through the Dashboard

Real Course Materials should eventually be added through School Dashboard
rather than committed into the application repository.

Potential materials include:

- syllabus,
- lecture slides,
- lecture notes,
- textbook sections,
- homework documents,
- labs,
- discussion worksheets,
- exam study guides,
- Course calendars,
- instructor resources.

The student should be able to associate materials with the correct Course.

Uploaded private materials should remain private according to the accepted
security/privacy model.

---

# 16. Course Materials Are More Than Attachments

The long-term value of Course Materials is not simply file storage.

Materials should help School Dashboard understand the Course.

The intended transformation is:

```text
Course Material
→ extraction
→ structured candidate information
→ review / reconciliation
→ grounded Course context
```

For example, a syllabus may contain:

- meeting information,
- weekly topics,
- Assignment deadlines,
- exam dates,
- textbook information,
- important policies.

A lecture deck may contain:

- lecture title,
- topics,
- equations,
- concepts,
- learning context.

Extraction should make this information useful for planning.

---

# 17. Extraction Is Not Truth

Machine extraction should create:

> candidate information

rather than immediately rewriting accepted Course truth.

An extracted value may be:

- correct,
- ambiguous,
- incomplete,
- misinterpreted,
- conflicting.

Important uncertain information should be reviewable.

The product should prefer:

```text
extract
→ preserve source
→ identify uncertainty
→ review when necessary
→ accept
```

over:

```text
extract
→ silently assume correct
```

---

# 18. Source Grounding

Future Course understanding must distinguish:

- facts supported by current Course materials,
- supplemental external research,
- AI inference,
- planning suggestions.

External research should enrich understanding.

It must not silently replace current Course requirements.

---

# 19. Source Hierarchy

Use the following authority guide for current-Course facts:

1. Current instructor syllabus.
2. Current instructor Assignments / official Course materials.
3. Current lecture slides / instructor notes.
4. Current assigned textbook sections.
5. Official university Course description.
6. Official department materials.
7. Public materials from previous Course offerings.
8. General educational resources.

Current-course information outranks historical/general sources for claims about
the current Course.

Example:

Current syllabus:

> Week 5 — Standing Waves

Older Course page:

> Week 5 — Sound

The current syllabus should remain authoritative for the current offering.

The older page may still provide useful supplemental context.

---

# 20. Provenance

Important Course information should remain traceable to where it came from.

The product should eventually be capable of distinguishing information such as:

- student-entered,
- current syllabus,
- current lecture,
- current Assignment,
- textbook,
- university/department source,
- historical Course source,
- extracted candidate,
- AI inference,
- generated planning suggestion.

The exact technical provenance model is an architecture decision for later
planning.

The product requirement is:

> important facts should not become source-less claims.

---

# 21. Uncertainty

Source authority and certainty are different.

Even an authoritative source may be ambiguous.

School Dashboard should preserve uncertainty when appropriate rather than
manufacturing certainty.

Examples:

- unclear exam coverage,
- conflicting Course documents,
- incomplete lecture sequence,
- ambiguous deadline wording.

The system may ask the student to resolve important ambiguity.

Do not invent numerical confidence percentages merely to make uncertainty appear
precise.

---

# 22. Conflicts

When meaningful current-course sources conflict, School Dashboard should not
silently choose whichever value is easiest.

Future reconciliation may:

- identify the conflict,
- show the competing sources,
- use the accepted source hierarchy,
- ask for student confirmation where appropriate.

Detailed reconciliation logic remains future work.

---

# 23. Course Roadmap

Course Roadmap answers:

> What will this Course teach me and approximately when?

It may eventually organize:

- topics,
- topic sequence,
- Course milestones,
- Assignment context,
- exam context,
- source-backed timing.

A roadmap should distinguish between:

- known Course structure,
- inferred/proposed organization.

Missing information should remain missing or proposed rather than being
presented as instructor-established fact.

---

# 24. Weekly Plan

Weekly Plan answers:

> What should I accomplish this week?

It may contain:

- Learning Objectives,
- deliverables,
- review,
- practice,
- Study Tasks.

Weekly Plan should connect daily work to a larger purpose.

A student should be able to understand:

> why am I doing this task?

---

# 25. Today

Today answers:

> What should I work on now?

Today should favor small understandable actions.

Useful context may include:

- Course,
- related Learning Objective,
- related Assignment,
- estimated duration,
- order,
- completion state.

The goal is to reduce decision fatigue.

Today should not become an unexplained list produced by an opaque algorithm.

---

# 26. Planning Inputs

A future planning system may consider:

- Learning Objectives,
- Assignment deadlines,
- Course schedule,
- expected workload,
- task dependencies,
- student availability,
- exam proximity,
- current progress,
- student priorities,
- duration estimates,
- existing accepted plans.

Not every input needs to exist in the first planning version.

Planning sophistication should increase gradually.

---

# 27. Task Decomposition

Large academic obligations should become manageable Study Tasks where useful.

Example:

Instead of:

> Do Physics HW 4 Thursday

School Dashboard might suggest:

Monday:

- review relevant lecture concepts,
- attempt problems 1–2.

Tuesday:

- solve problems 3–5.

Wednesday:

- finish remaining problem,
- review mistakes.

Thursday:

- final review / completion check.

This illustrates the experience.

It does not define a scheduling algorithm.

---

# 28. Duration Estimates

Duration estimates are planning aids.

They are not guarantees.

The product should:

- preserve supplied estimates,
- distinguish estimates from actual measured time,
- avoid inventing precise durations without a basis.

Future AI may suggest durations.

The student should be able to adjust them.

---

# 29. Student Availability

Future planning may consider when the student is actually available.

Availability may eventually come from:

- student-entered schedule,
- class meetings,
- manually entered commitments,
- connected calendar information.

The product should not assume that every open-looking hour is available for
study.

Detailed scheduling rules remain future work.

---

# 30. Human Control of AI

Future AI may suggest:

- Learning Objectives,
- Course roadmap items,
- Assignment breakdowns,
- Study Tasks,
- duration estimates,
- Weekly Plans,
- daily plans,
- replanning changes.

Generated plans must support student review.

Core actions should include some form of:

- Accept
- Edit
- Reject / Regenerate

Only accepted planning becomes the student's plan.

---

# 31. AI Must Not Silently Control Academic Truth

AI must not silently:

- modify instructor deadlines,
- invent Course requirements as facts,
- overwrite authoritative Course information,
- mark Study Tasks complete,
- claim mastery,
- submit academic work,
- permanently replace an accepted student plan.

AI should support the student.

It should not become the final authority over their Course data or personal plan.

---

# 32. AI and Academic Work

School Dashboard is intended to help students:

- understand Courses,
- organize work,
- plan studying,
- prepare,
- track progress.

The product is not intended to autonomously submit academic work for students.

The planning system should support learning and execution rather than replacing
the student's responsibility for academic work.

---

# 33. AI Input Minimization

When private Course information is used for AI functionality, the product should
send only the information reasonably required for the requested operation.

Example:

If one lecture section is enough to generate a useful Objective, the product
should not automatically transmit the student's entire academic history.

This supports:

- privacy,
- efficiency,
- lower cost,
- more focused model context.

---

# 34. AI Output Is a Proposal

AI output should be treated as:

> generated candidate information

until validated or accepted according to the relevant product flow.

This applies to:

- extracted interpretation,
- Course understanding,
- roadmap suggestions,
- plans,
- rescheduling.

---

# 35. Adaptive Planning

The long-term loop is:

```text
plan
→ work
→ observe
→ replan
```

Example:

Tuesday plan:

> Physics problems 1–4.

Student reports:

> completed problems 1–2.

School Dashboard may suggest an updated Wednesday plan incorporating the
remaining work.

The adjustment should return to student review before replacing the accepted
plan.

---

# 36. Missed Work

Missing a planned Study Task should not automatically create:

- punishment,
- hidden priority changes,
- cascading schedule changes.

The product should eventually help the student understand:

- what remains,
- what deadlines are approaching,
- what realistic adjustment may help.

The student remains in control of the revised plan.

---

# 37. Progress

Progress should help answer:

> How much of my accepted plan have I completed?

It may eventually support:

- completed Study Tasks,
- remaining Study Tasks,
- weekly plan progress,
- Course-level planning progress.

Progress should not automatically claim:

- understanding,
- mastery,
- Assignment submission,
- grade outcome.

---

# 38. Integrations

Future integrations may reduce manual setup.

Possible examples include:

- Google Calendar,
- Google Drive.

Potential benefits include:

- Course schedule synchronization,
- availability context,
- selective Course file access,
- easier material ingestion.

Integrations remain optional future capabilities.

Their existence in this vision does not select providers or authorize
implementation.

---

# 39. Integration Principle

External accounts should be connected only when they create meaningful student
value.

The product should avoid:

- requesting unnecessary permissions,
- importing entire accounts when a subset is sufficient,
- making integrations mandatory when manual input works.

Student control should remain visible.

---

# 40. Notifications

Notifications may eventually help with:

- approaching deadlines,
- accepted study plans,
- missed planned work,
- major plan changes.

Notifications should not become noisy or guilt-driven.

They should support the student's chosen plan.

Notification scope and channels remain future decisions.

---

# 41. Security and Privacy as Product Qualities

Security and privacy are part of the product experience.

A student should reasonably expect:

- private Courses,
- private plans,
- private uploaded materials,
- separation from other users.

School Dashboard should not require students to understand technical security
details in order to receive normal protection.

The detailed engineering requirements live in:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`

---

# 42. Beta Philosophy

The initial multi-user version may be used primarily by:

- Mike,
- friends,
- invited students.

That does not make it disposable.

A small beta is an opportunity to learn:

- whether students use Today,
- whether ingestion saves setup time,
- whether generated plans feel useful,
- where students edit/reject suggestions,
- which features actually matter.

The beta should remain safe enough for real private academic data within its
accepted scope.

---

# 43. Product Learning

The product should evolve based on actual usefulness.

Important questions include:

- Do students return to Today?
- Does Weekly Plan provide useful context?
- Does ingestion reduce setup effort?
- Do students trust extracted Course information?
- Which AI suggestions are accepted vs edited?
- Does planning reduce decision fatigue?
- Are duration suggestions useful?
- Which Course materials create the most value?

Do not build features solely because they are technically interesting.

---

# 44. Usage Measurement

When usage analytics are introduced, measurement should focus on improving the
product and understanding operational cost.

Potential aggregate/product signals may include:

- feature usage,
- plan acceptance/edit behavior,
- ingestion usage,
- AI operation counts,
- task completion interactions.

Private academic content should not be copied into analytics merely because it
is available.

---

# 45. AI Usage and Cost Accounting

When AI functionality becomes active, School Dashboard should understand its
actual marginal usage.

Useful operational records may include:

- user/account,
- operation type,
- provider/model,
- input usage,
- output usage,
- estimated cost,
- timestamp.

The purpose is to answer questions such as:

> How much does a typical active student cost to support?

> Which AI features consume meaningful resources?

> Can the beta remain free sustainably?

Cost accounting should avoid storing complete private prompts when usage
metadata is sufficient.

---

# 46. Free Beta Direction

The initial beta may remain free.

Mike should be able to let friends use the product without immediately creating
a subscription system.

The product should learn:

- whether people actually use it,
- what features matter,
- what the real operating cost is

before monetization becomes a central design constraint.

---

# 47. Monetization Direction

Billing is intentionally late-stage.

Possible future monetization may be considered if:

- AI usage,
- storage,
- infrastructure,
- support,
- external APIs

create meaningful recurring cost or the product grows beyond a small beta.

The product should not introduce payment complexity before there is evidence
that it is needed.

---

# 48. Billing Does Not Change User Data Rights

A free user and a paid user may receive different feature limits.

That does not imply different fundamental expectations for:

- privacy,
- tenant isolation,
- security.

Charging for School Dashboard does not grant broader ownership of a student's
private academic content.

---

# 49. Future Product Milestones

The authoritative roadmap and execution order live in:

`docs/TASKS.md`

The long-term product direction currently includes approximately:

1. static product model and UI,
2. secure engineering foundation,
3. persistent multi-user dashboard,
4. secure Course Materials and ingestion,
5. grounded Course intelligence,
6. AI-assisted planning,
7. adaptive replanning,
8. external integrations,
9. broader production hardening,
10. optional billing/monetization if justified.

These descriptions are product direction.

They do not authorize implementation.

---

# 50. Provider Neutrality

This Product Vision does not select:

- authentication provider,
- database,
- storage provider,
- AI provider,
- hosting provider,
- payment provider,
- analytics provider.

Provider choices should follow actual requirements when the relevant task is
authorized.

Do not let a product example silently become an architecture commitment.

---

# 51. Supabase Status

Supabase has previously been considered as a possible persistence option.

It remains:

> a possible option

not:

> an accepted product requirement.

Its future use should be evaluated when persistence architecture is planned.

---

# 52. Google Integration Status

Google Calendar and Google Drive remain possible future integrations.

Their value may include:

- availability context,
- schedule synchronization,
- selective Course Material access.

They are not required for the core product to exist.

---

# 53. Product Scope Discipline

School Dashboard should grow because a capability improves the student's
academic planning experience.

Avoid adding unrelated features merely because they are common in student apps.

Potential features such as:

- social networking,
- messaging,
- grade prediction,
- full LMS replacement

should not enter scope unless they clearly support the core product goal and are
deliberately accepted.

---

# 54. What School Dashboard Is Not

School Dashboard is not intended to become:

- a generic file-storage product,
- a generic calendar,
- a generic chatbot,
- a replacement for every university system,
- an automatic academic-work submission service.

Those systems may provide inputs or integrations.

School Dashboard's value is the connection between:

```text
Course understanding
+
student obligations
+
personal planning
+
daily action
```

---

# 55. Product Success

The strongest product outcome is not:

> the app contains many features.

It is:

> the student opens School Dashboard and quickly understands what matters and
> what they should do next.

Success means reducing academic planning friction while preserving student
understanding and control.

---

# 56. Current Product Boundary

At the current verified implementation state:

School Dashboard is still:

- static,
- read-only,
- single-fixture,
- non-persistent,
- non-authenticated,
- non-AI.

The product vision describes where it is intended to go.

It must not be confused with:

`docs/IMPLEMENTATION.md`

which describes what actually exists now.

---

# 57. Product Decision Rule

A future possibility becomes an accepted product decision only when it is
deliberately established.

Record durable accepted choices in:

`docs/DECISIONS.md`

Record execution sequencing in:

`docs/TASKS.md`

Do not infer authorization from this vision.

---

# 58. Final Principle

School Dashboard should help a student move from:

> I have too much schoolwork and I do not know where to start.

to:

> I understand what matters this week and I know what I should do next.

The intended long-term loop is:

```text
understand the Course
→ understand the goal
→ break down the work
→ make a realistic plan
→ choose today's actions
→ do the work
→ observe progress
→ adjust deliberately
```

Technology, AI, integrations, and automation should exist only to make that loop
more useful, more accurate, and easier for the student.

The student remains the final owner of their academic plan.