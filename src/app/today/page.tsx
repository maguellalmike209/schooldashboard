import { academicContext, formatReferenceDate } from "@/lib/academic-context";

export default function TodayPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Reference day</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Today</h1>
        <p className="mt-3 text-base text-slate-600">
          This view uses the fixed reference date: <time dateTime={academicContext.referenceDate}>{formatReferenceDate()}</time>.
        </p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-950">Today&apos;s study plan is being prepared</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Planned study actions will appear here when the daily plan is added.
        </p>
      </section>
    </div>
  );
}
