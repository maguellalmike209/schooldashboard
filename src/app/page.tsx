import { academicContext, formatCurrentWeek, formatReferenceDate } from "@/lib/academic-context";

export default function DashboardPage() {
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

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Course context</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">On today&apos;s course schedule</h2>
          <div className="mt-5 border-l-2 border-sky-500 pl-4">
            <p className="text-sm font-semibold text-slate-950">{academicContext.course.code} · {academicContext.course.name}</p>
            <p className="mt-1 text-base text-slate-800">Lecture #{academicContext.referenceDayLecture.number}</p>
            <p className="mt-2 text-sm text-slate-600">
              Scheduled for <time dateTime={academicContext.referenceDayLecture.date}>{formatReferenceDate()}</time>. The course schedule does not provide a meeting time or room.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Study plan</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Your daily plan, in one place</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            A study plan summary is not available in this preview yet. This space will show planned work as the academic plan is added.
          </p>
        </section>
      </div>
    </div>
  );
}
