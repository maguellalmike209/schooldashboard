"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { credentialsInput, formFields } from "@/lib/academic/schemas";
import { createClient } from "@/lib/supabase/server";

const emailInput = z.strictObject({ email: z.email().max(254) });
const passwordInput = z.strictObject({ password: z.string().min(8).max(128) });

export async function signIn(formData: FormData) {
  const parsed = credentialsInput.safeParse(formFields(formData));
  if (!parsed.success) redirect("/login?error=invalid");

  const client = await createClient();
  const { error } = await client.auth.signInWithPassword(parsed.data);
  if (error) redirect("/login?error=credentials");
  redirect("/academic");
}

export async function signUp(formData: FormData) {
  const parsed = credentialsInput.safeParse(formFields(formData));
  if (!parsed.success) redirect("/signup?error=invalid");

  const client = await createClient();
  const { error } = await client.auth.signUp(parsed.data);
  if (error) redirect("/signup?error=failed");
  redirect("/login?message=confirm");
}

export async function requestPasswordReset(formData: FormData) {
  const parsed = emailInput.safeParse(formFields(formData));
  if (!parsed.success) redirect("/auth/recover?error=invalid");

  const client = await createClient();
  // The response is identical whether the account exists or not.
  await client.auth.resetPasswordForEmail(parsed.data.email);
  redirect("/auth/recover?message=sent");
}

export async function updatePassword(formData: FormData) {
  const parsed = passwordInput.safeParse(formFields(formData));
  if (!parsed.success) redirect("/auth/update-password?error=invalid");

  const client = await createClient();
  const { data, error: identityError } = await client.auth.getClaims();
  if (identityError || !data?.claims?.sub) redirect("/login?error=auth");
  const { error } = await client.auth.updateUser({ password: parsed.data.password });
  if (error) redirect("/auth/update-password?error=failed");
  await client.auth.signOut({ scope: "global" });
  redirect("/login?message=password-updated");
}

export async function signOut() {
  const client = await createClient();
  const { error } = await client.auth.signOut({ scope: "global" });
  if (error) redirect("/academic?error=signout");
  redirect("/login?message=signed-out");
}
