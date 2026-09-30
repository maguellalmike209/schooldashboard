import { CourseCard } from "@/components/course-card";
import { academicContext } from "@/lib/academic-context";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Course overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Courses</h1>
        <p className="mt-3 text-base text-slate-600">
          Your current courses for {academicContext.term}. Choose one to see its details.
        </p>
      </header>

      <section aria-labelledby="current-courses">
        <h2 id="current-courses" className="text-lg font-semibold text-slate-950">Current courses</h2>
        <ul className="mt-4 grid list-none gap-4 md:grid-cols-2">
          {academicContext.courses.map((course) => (
            <li key={course.id}><CourseCard course={course} /></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
