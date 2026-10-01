import Link from "next/link";
import { AssignmentList } from "@/components/assignment-list";
import { CourseCard } from "@/components/course-card";
import { TodayTaskList } from "@/components/today-task-list";
import { academicContext, formatCurrentWeek, formatReferenceDate, formatWeeklyProgress, getCourse, getNextAction, getTodayStudyTasks, getUpcomingAssignments, getWeeklyProgress } from "@/lib/academic-context";

export default function DashboardPage() {
  const scheduledCourse = getCourse(academicContext.referenceDayLecture.courseId);
  if (!scheduledCourse) {
    throw new Error("Reference-day lecture has no matching course.");
  }
  const todayTasks = getTodayStudyTasks();
  const nextAction = getNextAction();
  const nextActionCourse = nextAction ? getCourse(nextAction.courseId) : null;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Your academic day</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          A starting point for your day and the week around it.
        </p>
      </header>

      <section aria-label="Current academic context" className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current term</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{academicContext.term}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reference day</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            <time dateTime={academicContext.referenceDate}>{formatReferenceDate()}</time>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Academic week</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{formatCurrentWeek()}</p>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section aria-labelledby="next-action" className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Next up</p>
          <h2 id="next-action" className="mt-2 text-xl font-semibold text-slate-950">Next Action</h2>
          {nextAction && nextActionCourse ? (
            <div data-task-id={nextAction.id} className="mt-4">
              <p className="text-sm font-semibold text-sky-900">{nextActionCourse.code} · {nextActionCourse.name}</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{nextAction.title}</p>
              {nextAction.estimatedMinutes !== null && <p className="mt-1 text-sm text-slate-700">{nextAction.estimatedMinutes} min planned</p>}
            </div>
          ) : <p className="mt-4 text-sm text-slate-700">No study tasks remain on today&apos;s plan.</p>}
          <Link href="/today" className="mt-4 inline-block text-sm font-semibold text-sky-800 underline underline-offset-4 hover:text-sky-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">View Today</Link>
        </section>

        <section aria-labelledby="dashboard-today" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 id="dashboard-today" className="text-xl font-semibold text-slate-950">Today&apos;s study plan</h2>
          <p className="mt-2 text-sm text-slate-600">Incomplete Study Tasks planned for the reference day.</p>
          <div className="mt-4"><TodayTaskList tasks={todayTasks} /></div>
        </section>
      </div>

      <section aria-labelledby="upcoming-assignments" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Deadlines · Course obligations</p>
        <h2 id="upcoming-assignments" className="mt-2 text-xl font-semibold text-slate-950">Assignments due soon</h2>
        <p className="mt-2 text-sm text-slate-600">Due dates provide context for your plan; they do not add or reorder today&apos;s Study Tasks.</p>
        <div className="mt-4"><AssignmentList assignments={getUpcomingAssignments()} layout="grid" /></div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Course context</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">On today&apos;s course schedule</h2>
          <div className="mt-5 border-l-2 border-sky-500 pl-4">
            <p className="text-sm font-semibold text-slate-950">{scheduledCourse.code} · {scheduledCourse.name}</p>
            <p className="mt-1 text-base text-slate-800">Lecture #{academicContext.referenceDayLecture.number}</p>
            <p className="mt-2 text-sm text-slate-600">
              Scheduled for <time dateTime={academicContext.referenceDayLecture.date}>{formatReferenceDate()}</time>. The course schedule does not provide a meeting time or room.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Study plan</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">This week&apos;s study progress</h2>
          <p className="mt-4 text-2xl font-semibold text-slate-950">{formatWeeklyProgress(getWeeklyProgress())}</p>
          <p className="mt-2 text-sm text-slate-600">Completed Study Tasks across your current courses.</p>
          <Link href="/weekly-plan" className="mt-4 inline-block text-sm font-semibold text-sky-800 underline underline-offset-4 hover:text-sky-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">Open Weekly Plan</Link>
        </section>
      </div>

      <section aria-labelledby="dashboard-courses">
        <h2 id="dashboard-courses" className="text-xl font-semibold text-slate-950">Current courses</h2>
        <ul className="mt-4 grid list-none gap-4 md:grid-cols-2">
          {academicContext.courses.map((course) => (
            <li key={course.id}><CourseCard course={course} compact /></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
