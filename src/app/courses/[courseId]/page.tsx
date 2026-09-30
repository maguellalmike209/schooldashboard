import Link from "next/link";
import { notFound } from "next/navigation";
import { StudyTaskList } from "@/components/study-task-list";
import { academicContext, formatCurrentWeek, formatReferenceDate, formatWeeklyProgress, getCourse, getWeeklyObjectives, getWeeklyProgress, getWeeklyStudyTasks } from "@/lib/academic-context";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const course = getCourse(courseId);
  if (!course) {
    notFound();
  }
  const weekContext = academicContext.courseWeekContexts.find((context) => context.courseId === courseId);
  const lecture = academicContext.referenceDayLecture.courseId === courseId
    ? academicContext.referenceDayLecture
    : null;
  const materials = academicContext.courseMaterials.filter((material) => material.courseId === courseId);
  const objectives = getWeeklyObjectives(courseId);
  const tasks = getWeeklyStudyTasks(courseId);

  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <Link href="/courses" className="text-sm font-medium text-sky-800 underline underline-offset-4 hover:text-sky-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">
          Back to Courses
        </Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Course page</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {course.code} <span className="text-slate-500">·</span> {course.name}
        </h1>
      </header>

      <section aria-labelledby="course-week" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">{formatCurrentWeek()}</p>
        <h2 id="course-week" className="mt-2 text-xl font-semibold text-slate-950">Current week</h2>
        {weekContext ? (
          <div className="mt-4 space-y-4">
            <p className="text-base text-slate-800">{weekContext.summary}</p>
            {lecture && (
              <div className="rounded-xl bg-sky-50 p-4">
                <h3 className="font-semibold text-slate-950">Scheduled Lecture #{lecture.number}</h3>
                <p className="mt-1 text-sm text-slate-600"><time dateTime={lecture.date}>{formatReferenceDate()}</time> · Scheduled topics</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {lecture.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
            )}
            <p className="text-xs text-slate-500">Source: {weekContext.source}. Scheduled topics are course context, not study tasks.</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">No current-week topic has been supplied for this course.</p>
        )}
      </section>

      <section aria-labelledby="course-plan" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 id="course-plan" className="text-xl font-semibold text-slate-950">This week&apos;s plan</h2>
        <p className="mt-2 text-sm font-medium text-slate-700">Study Task progress: {formatWeeklyProgress(getWeeklyProgress(courseId))}</p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-950">Learning objectives</h3>
          {objectives.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {objectives.map((objective) => <li key={objective.id}>{objective.title}</li>)}
            </ul>
          ) : <p className="mt-3 text-sm text-slate-600">No learning objectives supplied for this week.</p>}
        </div>
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-950">Study tasks</h3>
          <div className="mt-3"><StudyTaskList tasks={tasks} /></div>
        </div>
      </section>

      <section aria-labelledby="course-materials" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 id="course-materials" className="text-xl font-semibold text-slate-950">Course materials</h2>
        {materials.length > 0 ? (
          <ul className="mt-4 list-none space-y-3">
            {materials.map((material) => (
              <li key={material.id} className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{material.kind}</p>
                <p className="mt-1 font-medium text-slate-950">{material.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-600">No course materials have been supplied for this course.</p>
        )}
      </section>
    </div>
  );
}
