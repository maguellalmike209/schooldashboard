import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Not found</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Course not found</h1>
      </header>
      <p className="text-base text-slate-600">There is no course page for this address.</p>
      <Link href="/courses" className="inline-block text-sm font-semibold text-sky-800 underline underline-offset-4 hover:text-sky-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">
        Browse Courses
      </Link>
    </div>
  );
}
