# School Dashboard — Product Vision

School Dashboard is intended to become a personal academic operating system: one place to connect what a student needs to learn, what they must deliver, and what they can do next. Its long-term purpose is to connect courses, class schedules, assignments, course materials, learning objectives, study tasks, deadlines, student availability, and progress, turning them into clear weekly goals and small daily actions.

The central product question is:

> What should I do today to stay on track in my classes?

The intended experience connects the student's current courses and academic schedule to weekly learning objectives and manageable daily study tasks. Upcoming assignments and basic progress provide context for what needs attention. Learning matters even when there is no graded deliverable: review, practice, and preparation should have a place alongside assignment work.

The central transformation is **course understanding → course roadmap → weekly objectives → daily study actions**. A deadline such as "Physics HW 4 is due Friday" should eventually lead to a manageable sequence: review the relevant slides, read a textbook section, solve a few problems, and review mistakes across the preceding days. The value is in turning a large academic obligation into an understandable learning goal and actions distributed across time. Deadline tracking alone does not deliver that experience.

## Experience principles

- Start with today's manageable actions, then let the student inspect the week's purpose and the relevant course context.
- Distinguish learning outcomes from deliverables and from the actions needed to work toward either. Completing an action is evidence of effort, not proof of mastery or a submitted assignment.
- Make deadlines visible so the student can make informed choices. A due date describes an obligation; a planned study date describes when the student intends to work on it.
- Keep progress understandable and modest in its claims. It should describe the plan being followed, not predict grades or declare that a course is mastered.
- Preserve student control. In a future editable product, the student should choose or revise objectives, task breakdowns, study dates, order of work, and completion state. Recorded course facts and instructor deadlines should remain distinguishable from personal planning choices.

The conceptual vocabulary and initial view behavior are defined in [V1_SPEC.md](V1_SPEC.md), not as a database model.

## First milestone

Validate the usefulness and clarity of the student-facing UI with mock/hardcoded data. The authoritative requirements and exclusions are in [V1_SPEC.md](V1_SPEC.md). This milestone displays an authored academic plan; student editing and completion controls are deferred. It does not depend on automated planning or connected accounts.

## Future product pipeline

The following describes intended future product behavior, not functionality in the mock UI milestone or a technical implementation design. The source and student-control principles below constrain any future implementation; the capability milestones still require separate scoping and authorization.

| Stage | Intended product responsibility |
| --- | --- |
| Course inputs | Collect the student's current course identity, official materials, and academic schedule. |
| Course ingestion | Extract academic information from materials so that they can inform planning, rather than serving only as attachments. |
| Source-grounded course understanding | Identify what the course teaches and requires, preserving sources, distinguishing supplemental context, and surfacing uncertainty or conflicts. |
| Course roadmap | Organize the course's topics and known academic milestones across the term, grounded in the available course information. |
| Weekly objectives | Identify what the student aims to understand or be able to do during the week. |
| Assignment / study task decomposition | Break deliverables and learning goals into manageable actions without conflating objectives, assignments, and tasks. |
| Daily plan | Suggest when to work on those actions, considering availability and obligations before deadlines. |
| Student review / approval | Let the student accept, edit, reject, or request regeneration before a suggestion becomes their plan. |
| Execution | Support the student in carrying out the accepted plan. The product does not submit academic work for them. |
| Progress | Observe student-reported work and remaining actions without treating completion as proof of mastery. |
| Replanning | Suggest adjustments based on actual progress and changed constraints, returning to student review before altering the accepted plan. |

### Course inputs and ingestion

Future inputs may include a syllabus, assignment schedule, lecture slides and notes, a textbook or selected chapters, homework documents, labs, discussion worksheets, exam study guides, a course calendar, and instructor-provided resources. The student may identify the university, course code, title, instructor, and academic term to establish which offering the materials belong to.

For example, a fictional course context could be UC Davis, PHY 9B, Fall 2026, Professor Example. Course examples in these documents are illustrative, not researched claims about an actual offering.

A syllabus might yield class meetings, office hours, major and weekly topics, assignments and deadlines, exams, grading structure, the assigned textbook, and important policies. A lecture deck might yield "Lecture 7 — Standing Waves" with nodes, antinodes, harmonics, and boundary conditions. Extracted information must retain its source context and any ambiguity; extraction alone does not establish that a proposed interpretation is correct. No parser or ingestion implementation is selected here.

## Source grounding, provenance, and uncertainty

Future course understanding must distinguish **facts supported by current course material**, **external research**, and **AI inference or suggestion**. External research enriches understanding; it must not silently replace the student's actual course requirements.

Use this source hierarchy as the product's authority guide:

1. Current instructor syllabus.
2. Current instructor assignments / official class materials.
3. Current lecture slides / instructor notes.
4. Current assigned textbook sections.
5. Official university course description.
6. Official department materials.
7. Public materials from previous offerings of the course.
8. General educational resources.

Current-course sources outrank historical or general sources for current-course facts. For example, if the current syllabus says "Week 5 — Standing Waves" and an old public course page says "Week 5 — Sound," retain the current syllabus as authoritative; the older page may provide supplemental context. A current syllabus's explicit "Midterm 1 — October 23" can support a course fact. A historical page's typical exam coverage cannot establish this offering's exam coverage.

Important information should remain traceable to its source and course offering where known. Qualitative labels should distinguish authoritative current-course information, supplemental context, and AI inference/suggestion. For example, Standing Waves from the current syllabus and Fourier Analysis from a previous offering must not appear as equally established current requirements. A topic found only in related materials may be described as a supplemental topic, not something the student must learn for this course.

Source authority and certainty of interpretation are different: even an authoritative document can be ambiguous. Preserve uncertainty and surface conflicting current materials for review rather than silently choosing or manufacturing certainty. Detailed reconciliation behavior belongs to later planning. Do not invent numerical confidence scores or convert this principle into a provenance schema now.

## Course roadmap, Weekly Plan, and Today

| Horizon | Question it answers | Intended content |
| --- | --- | --- |
| Course Roadmap | What will this course teach me and approximately when? | The semester/quarter learning structure: topics, sequence, and source-supported assignment or exam context. |
| Weekly Plan | What should I accomplish this week? | Learning objectives, deliverables, and supporting review/practice/study tasks for the week. |
| Today | What should I work on now? | Small actions in a chosen order, with course, objective/assignment context, and estimated duration when available. |

A fictional future course roadmap might progress from Week 1 Oscillations (simple harmonic motion, energy, damping), to Week 2 Mechanical Waves (wave speed, wave equation, superposition), to Week 3 Standing Waves (nodes, antinodes, harmonics, boundary conditions), followed by a midterm covering Weeks 1–3 if current materials support that coverage. Missing sequence or timing should remain uncertain or proposed, rather than becoming invented instructor facts.

Future Course Setup / Materials and Course Roadmap views may support onboarding and the full-term perspective. They are outside the five-view mock UI milestone. Static topic and material context on a V1 Course Page does not imply roadmap generation or an ingestion feature. The shared mock plan example in [V1_SPEC.md](V1_SPEC.md) illustrates how the initial views can represent these relationships before any intelligence capability exists.

## Future planning and adaptive replanning

A future planning system should consider learning objectives, assignment deadlines, expected workload, student availability, task dependencies, exam proximity, current progress, student-authored priorities, and estimated task durations. It should help distribute meaningful work before deadlines, rather than placing one large homework block on the due date. Estimates are planning aids, not measured work or guarantees.

For example, a Thursday obligation might become problems 1–2 on Monday, problems 3–5 on Tuesday, problem 6 and mistake review on Wednesday, and final completion/review on Thursday. This describes the intended experience, not an algorithm, priority formula, or automatic scheduling requirement for V1.

The long-term loop is **plan → work → observe → replan**. If Tuesday's accepted task was problems 1–4 and the student reports completing only 1–2, the product may suggest an adjusted Wednesday task covering the remaining work. The student can accept, edit, or reject the suggestion. Partial-work reporting and missed-task handling are future capabilities; the current prototype retains its fixed mock completion states and has no adaptive carryover.

## Human control of AI suggestions

Future AI may suggest learning objectives, course roadmap items, assignment breakdowns, study tasks, duration estimates, weekly/daily plans, and rescheduling. Generated plans must support student review: **Accept**, **Edit**, or **Reject / Regenerate**. Only an accepted plan becomes the student's plan, and later generated changes require approval before replacing it.

AI must not silently change instructor deadlines, invent course requirements as facts, mark tasks complete, claim mastery, submit academic work, replace current instructor information with external research, or permanently alter an accepted student plan. Student edits to a personal plan should remain distinguishable from the source-backed course facts. No AI or approval interface is part of the initial prototype.

## Future capability milestones

The [task roadmap](TASKS.md) separates the current mock UI from possible later persistence, materials/ingestion, course intelligence, planning, adaptive planning, and integrations. Supabase remains a possible persistence choice; Google Calendar and Google Drive remain possible integrations. These are product directions, not technology commitments or authorization to implement them. Record future choices in [DECISIONS.md](DECISIONS.md) only after they are established.
