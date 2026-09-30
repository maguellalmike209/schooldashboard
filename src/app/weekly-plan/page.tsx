import { formatCurrentWeek } from "@/lib/academic-context";

export default function WeeklyPlanPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">This week</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Weekly Plan</h1>
        <p className="mt-3 text-base text-slate-600">Academic week {formatCurrentWeek()}</p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-950">Weekly planning details are being prepared</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The weekly view will show learning goals and planned work when that part of the academic plan is added.
        </p>
      </section>
    </div>
  );
}
