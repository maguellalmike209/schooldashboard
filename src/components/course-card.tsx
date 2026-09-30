import Link from "next/link";
import { formatWeeklyProgress, getWeeklyProgress, type Course } from "@/lib/academic-context";

export function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  const progress = getWeeklyProgress(course.id);
  return (
    <Link
      href={`/courses/${course.id}`}
      className={`group block rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700 ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <article>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">{course.code}</p>
        <h3 className={`mt-2 font-semibold tracking-tight text-slate-950 ${compact ? "text-lg" : "text-xl"}`}>{course.name}</h3>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">This week&apos;s study tasks</p>
          <p className="mt-1 text-sm text-slate-700">{formatWeeklyProgress(progress)}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-sky-800 group-hover:text-sky-950">Open course <span aria-hidden="true">→</span></p>
      </article>
    </Link>
  );
}
