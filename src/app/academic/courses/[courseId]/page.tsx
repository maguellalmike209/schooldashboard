import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ZodError } from "zod";
import { AcademicNotFound, AuthenticationRequired, getCourse } from "@/lib/academic/dal";

export const dynamic = "force-dynamic";

export default async function PrivateCoursePage({
  params,
}: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  let course;
  try {
    course = await getCourse(courseId);
  } catch (error) {
    if (error instanceof AuthenticationRequired) redirect("/login?error=auth");
    if (error instanceof AcademicNotFound || error instanceof ZodError) notFound();
    throw error;
  }

  return <article className="space-y-4">
    <Link href={`/academic?term=${course.termId}`} className="text-sky-700 underline">Back to your courses</Link>
    <h1 className="text-3xl font-semibold">{course.code} — {course.name}</h1>
  </article>;
}
