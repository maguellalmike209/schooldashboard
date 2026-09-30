import { TodayTaskList } from "@/components/today-task-list";
import { academicContext, formatReferenceDate, getTodayStudyTasks } from "@/lib/academic-context";

export default function TodayPage() {
  const tasks = getTodayStudyTasks();
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Reference day</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Today</h1>
        <p className="mt-3 text-base text-slate-600">
          This view uses the fixed reference date: <time dateTime={academicContext.referenceDate}>{formatReferenceDate()}</time>.
        </p>
      </header>

      <section aria-labelledby="today-study-plan">
        <h2 id="today-study-plan" className="text-xl font-semibold text-slate-950">Today&apos;s study plan</h2>
        <p className="mt-2 text-sm text-slate-600">Incomplete actions planned for the reference day, in your plan&apos;s authored order.</p>
        <div className="mt-4"><TodayTaskList tasks={tasks} /></div>
      </section>
    </div>
  );
}
