import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/academic-context";

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

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-950">Course details are being prepared</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          The detailed course view will bring together its learning context and planned work. For now, this page establishes the selected course.
        </p>
      </section>
    </div>
  );
}
