import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ZodError } from "zod";
import { signOut } from "@/app/auth/actions";
import { createCourseAction, createTermAction, deleteCourseAction, updateCourseAction } from "./actions";
import { AcademicNotFound, AuthenticationRequired, getAcademicOverview } from "@/lib/academic/dal";

export const dynamic = "force-dynamic";

export default async function AcademicPage({
  searchParams,
}: { searchParams: Promise<{ term?: string; error?: string }> }) {
  const { term, error } = await searchParams;
  let overview;
  try {
    overview = await getAcademicOverview(term);
  } catch (caught) {
    if (caught instanceof AuthenticationRequired) redirect("/login?error=auth");
    if (caught instanceof AcademicNotFound || caught instanceof ZodError) notFound();
    throw caught;
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Private academic workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your terms and courses</h1>
        </div>
        <form action={signOut}><button className="rounded border px-3 py-2">Sign out</button></form>
      </header>

      {error && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-red-800">
        {error === "invalid" ? "Check the required fields and try again." :
          error === "missing" ? "That course or term is unavailable." :
            "The request could not be completed. Try again."}
      </p>}

      <section className="rounded border bg-white p-5" aria-labelledby="terms-heading">
        <h2 id="terms-heading" className="text-xl font-semibold">Academic terms</h2>
        {overview.terms.length > 0 ? (
          <nav aria-label="Your academic terms" className="mt-4 flex flex-wrap gap-2">
            {overview.terms.map((item) => (
              <a key={item.id} href={`/academic?term=${item.id}`}
                aria-current={item.id === overview.termId ? "page" : undefined}
                className={`rounded px-3 py-2 ${item.id === overview.termId ? "bg-sky-700 text-white" : "border text-sky-800"}`}>
                {item.name}
              </a>
            ))}
          </nav>
        ) : <p className="mt-3 text-slate-600">Create an academic term to organize your courses.</p>}
        <form action={createTermAction} className="mt-5 flex flex-wrap items-end gap-3">
          <label className="min-w-56 flex-1">Term name
            <input name="name" required maxLength={80} placeholder="Fall Quarter 2026" className="mt-1 w-full rounded border p-2" />
          </label>
          <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Create term</button>
        </form>
      </section>

      {overview.termId && <section className="space-y-5" aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="text-xl font-semibold">Courses</h2>
        <form action={createCourseAction} className="grid gap-3 rounded border bg-white p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-end">
          <input type="hidden" name="termId" value={overview.termId} />
          <label>Course code
            <input name="code" required maxLength={24} placeholder="PHY 009D" className="mt-1 w-full rounded border p-2" />
          </label>
          <label>Course name
            <input name="name" required maxLength={120} placeholder="Modern Physics" className="mt-1 w-full rounded border p-2" />
          </label>
          <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Create course</button>
        </form>
        {overview.courses.length === 0 && <p className="text-slate-600">No courses in this term yet.</p>}
        <ul className="space-y-3">
          {overview.courses.map((course) => <li key={course.id} className="rounded border bg-white p-5">
            <p className="mb-3 font-semibold"><Link className="text-sky-800 underline" href={`/academic/courses/${course.id}`}>View {course.code}</Link></p>
            <form action={updateCourseAction} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-end">
              <input type="hidden" name="id" value={course.id} />
              <label>Course code
                <input name="code" required maxLength={24} defaultValue={course.code} className="mt-1 w-full rounded border p-2" />
              </label>
              <label>Course name
                <input name="name" required maxLength={120} defaultValue={course.name} className="mt-1 w-full rounded border p-2" />
              </label>
              <button className="rounded border border-sky-700 px-4 py-2 font-medium text-sky-800">Save</button>
            </form>
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-red-700">Delete this course</summary>
              <form action={deleteCourseAction} className="mt-3 flex flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={course.id} />
                <span>This permanently removes {course.code} from this term.</span>
                <button className="rounded bg-red-700 px-3 py-2 font-medium text-white">Delete course</button>
              </form>
            </details>
          </li>)}</ul>
      </section>}
    </div>
  );
}
