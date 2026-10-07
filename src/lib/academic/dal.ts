import "server-only";

import { createClient } from "@/lib/supabase/server";
import { courseDeleteInput, courseInput, courseUpdateInput, idSchema, termInput } from "./schemas";

export class AuthenticationRequired extends Error {}
export class AcademicNotFound extends Error {}
export class AcademicUnavailable extends Error {}

export type AcademicTerm = { id: string; name: string };
export type AcademicCourse = { id: string; termId: string; code: string; name: string };

async function requestContext() {
  const client = await createClient();
  const { data, error } = await client.auth.getClaims();
  const actorId = data?.claims?.sub;

  if (error || !actorId || !idSchema.safeParse(actorId).success) {
    throw new AuthenticationRequired();
  }

  return { client, actorId };
}

function termDto(row: { id: string; name: string }): AcademicTerm {
  return { id: row.id, name: row.name };
}

function courseDto(row: { id: string; term_id: string; code: string; name: string }): AcademicCourse {
  return { id: row.id, termId: row.term_id, code: row.code, name: row.name };
}

async function requireOwnTerm(
  client: Awaited<ReturnType<typeof createClient>>,
  actorId: string,
  termId: string,
) {
  const { data, error } = await client.from("academic_terms")
    .select("id")
    .eq("id", termId)
    .eq("owner_id", actorId)
    .maybeSingle();
  if (error) throw new AcademicUnavailable();
  if (!data) throw new AcademicNotFound();
}

export async function getAcademicOverview(requestedTermId?: unknown) {
  const { client, actorId } = await requestContext();
  const { data: termRows, error: termError } = await client.from("academic_terms")
    .select("id,name")
    .eq("owner_id", actorId)
    .order("name");
  if (termError) throw new AcademicUnavailable();

  const terms = (termRows ?? []).map(termDto);
  const termId = requestedTermId === undefined ? terms[0]?.id : idSchema.parse(requestedTermId);
  if (!termId) return { terms, termId: null, courses: [] as AcademicCourse[] };
  if (!terms.some((term) => term.id === termId)) throw new AcademicNotFound();

  const { data: courseRows, error: courseError } = await client.from("courses")
    .select("id,term_id,code,name")
    .eq("owner_id", actorId)
    .eq("term_id", termId)
    .order("code");
  if (courseError) throw new AcademicUnavailable();
  return { terms, termId, courses: (courseRows ?? []).map(courseDto) };
}

export async function getCourse(rawId: unknown) {
  const id = idSchema.parse(rawId);
  const { client, actorId } = await requestContext();
  const { data, error } = await client.from("courses")
    .select("id,term_id,code,name")
    .eq("id", id)
    .eq("owner_id", actorId)
    .maybeSingle();
  if (error) throw new AcademicUnavailable();
  if (!data) throw new AcademicNotFound();
  return courseDto(data);
}

export async function createTerm(raw: unknown) {
  const { name } = termInput.parse(raw);
  const { client, actorId } = await requestContext();
  const { data, error } = await client.from("academic_terms")
    .insert({ owner_id: actorId, name })
    .select("id,name")
    .single();
  if (error || !data) throw new AcademicUnavailable();
  return termDto(data);
}

export async function createCourse(raw: unknown) {
  const { termId, code, name } = courseInput.parse(raw);
  const { client, actorId } = await requestContext();
  await requireOwnTerm(client, actorId, termId);
  const { data, error } = await client.from("courses")
    .insert({ owner_id: actorId, term_id: termId, code, name })
    .select("id,term_id,code,name")
    .single();
  if (error || !data) throw new AcademicUnavailable();
  return courseDto(data);
}

export async function updateCourse(raw: unknown) {
  const { id, code, name } = courseUpdateInput.parse(raw);
  const { client, actorId } = await requestContext();
  const { data, error } = await client.from("courses")
    .update({ code, name })
    .eq("id", id)
    .eq("owner_id", actorId)
    .select("id,term_id,code,name")
    .maybeSingle();
  if (error) throw new AcademicUnavailable();
  if (!data) throw new AcademicNotFound();
  return courseDto(data);
}

export async function deleteCourse(raw: unknown) {
  const { id } = courseDeleteInput.parse(raw);
  const { client, actorId } = await requestContext();
  const { data, error } = await client.from("courses")
    .delete()
    .eq("id", id)
    .eq("owner_id", actorId)
    .select("id")
    .maybeSingle();
  if (error) throw new AcademicUnavailable();
  if (!data) throw new AcademicNotFound();
}
