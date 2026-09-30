import Link from "next/link";
import { academicContext } from "@/lib/academic-context";

export default function CoursesPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Course overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Courses</h1>
        <p className="mt-3 text-base text-slate-600">
          Choose a course to open its page. A fuller course overview is still being prepared.
        </p>
      </header>

      <section aria-labelledby="available-course" className="border-t border-slate-200 pt-6">
        <h2 id="available-course" className="text-sm font-semibold text-slate-700">Available course</h2>
        <ul className="mt-4 list-none">
          <li>
            <Link
              href={`/courses/${academicContext.course.id}`}
              className="text-base font-semibold text-sky-800 underline decoration-sky-300 underline-offset-4 hover:text-sky-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              {academicContext.course.code} — {academicContext.course.name}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
