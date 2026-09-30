import Link from "next/link";
import { StudyTaskList } from "@/components/study-task-list";
import { academicContext, formatAcademicDate, formatCurrentWeek, formatWeeklyProgress, getWeeklyAssignments, getWeeklyObjectives, getWeeklyProgress, getWeeklyStudyTasks } from "@/lib/academic-context";

export default function WeeklyPlanPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">This week</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Weekly Plan</h1>
        <p className="mt-3 text-base text-slate-600">Academic week {formatCurrentWeek()}</p>
        <p className="mt-2 text-sm text-slate-600">Learning goals, Course obligations, and your planned actions are shown separately.</p>
      </header>

      <div className="space-y-6">
        {academicContext.courses.map((course) => {
          const objectives = getWeeklyObjectives(course.id);
          const assignments = getWeeklyAssignments(course.id);
          const tasks = getWeeklyStudyTasks(course.id);
          const progress = getWeeklyProgress(course.id);

          return (
            <section key={course.id} aria-labelledby={`weekly-${course.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">{course.code}</p>
                  <h2 id={`weekly-${course.id}`} className="mt-1 text-xl font-semibold text-slate-950">
                    <Link href={`/courses/${course.id}`} className="hover:text-sky-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">{course.name}</Link>
                  </h2>
                </div>
                <p className="text-sm font-medium text-slate-700">This week&apos;s study tasks: {formatWeeklyProgress(progress)}</p>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <section aria-labelledby={`learn-${course.id}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Learn · Personal plan</p>
                  <h3 id={`learn-${course.id}`} className="mt-1 text-lg font-semibold text-slate-950">Learning objectives</h3>
                  {objectives.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                      {objectives.map((objective) => <li key={objective.id}>{objective.title}</li>)}
                    </ul>
                  ) : <p className="mt-3 text-sm text-slate-600">No learning objectives supplied for this week.</p>}
                </section>

                <section aria-labelledby={`deliver-${course.id}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Deliver · Course obligations</p>
                  <h3 id={`deliver-${course.id}`} className="mt-1 text-lg font-semibold text-slate-950">Assignments</h3>
                  {assignments.length > 0 ? (
                    <ul className="mt-3 space-y-3">
                      {assignments.map((assignment) => (
                        <li key={assignment.id} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm">
                          <p className="font-semibold text-slate-950">{assignment.title}</p>
                          <p className="mt-1 text-slate-700">Due <time dateTime={assignment.dueDate}>{formatAcademicDate(assignment.dueDate)}</time></p>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="mt-3 text-sm text-slate-600">No assignments due or linked to this week&apos;s study tasks.</p>}
                </section>
              </div>

              <section aria-labelledby={`do-${course.id}`} className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Do · Personal plan</p>
                <h3 id={`do-${course.id}`} className="mt-1 text-lg font-semibold text-slate-950">Study tasks</h3>
                <div className="mt-3"><StudyTaskList tasks={tasks} /></div>
              </section>
            </section>
          );
        })}
      </div>
    </div>
  );
}
