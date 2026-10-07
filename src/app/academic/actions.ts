"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { AcademicNotFound, AuthenticationRequired, createCourse, createTerm, deleteCourse, updateCourse } from "@/lib/academic/dal";
import { formFields } from "@/lib/academic/schemas";

function fail(error: unknown): never {
  if (error instanceof AuthenticationRequired) redirect("/login?error=auth");
  if (error instanceof ZodError) redirect("/academic?error=invalid");
  if (error instanceof AcademicNotFound) redirect("/academic?error=missing");
  redirect("/academic?error=failed");
}

export async function createTermAction(formData: FormData) {
  let term;
  try {
    term = await createTerm(formFields(formData));
  } catch (error) {
    fail(error);
  }
  revalidatePath("/academic");
  redirect(`/academic?term=${term.id}`);
}

export async function createCourseAction(formData: FormData) {
  let course;
  try {
    course = await createCourse(formFields(formData));
  } catch (error) {
    fail(error);
  }
  revalidatePath("/academic");
  redirect(`/academic?term=${course.termId}`);
}

export async function updateCourseAction(formData: FormData) {
  let course;
  try {
    course = await updateCourse(formFields(formData));
  } catch (error) {
    fail(error);
  }
  revalidatePath("/academic");
  redirect(`/academic?term=${course.termId}`);
}

export async function deleteCourseAction(formData: FormData) {
  try {
    await deleteCourse(formFields(formData));
  } catch (error) {
    fail(error);
  }
  revalidatePath("/academic");
  redirect("/academic");
}
