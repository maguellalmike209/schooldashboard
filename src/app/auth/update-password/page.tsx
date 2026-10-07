import { redirect } from "next/navigation";
import { updatePassword } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function UpdatePasswordPage({
  searchParams,
}: { searchParams: Promise<{ error?: string }> }) {
  const client = await createClient();
  const { data, error: identityError } = await client.auth.getClaims();
  if (identityError || !data?.claims?.sub) redirect("/login");
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">Choose a new password</h1>
      {error && <p role="alert" className="text-red-700">Password update was unsuccessful.</p>}
      <form action={updatePassword} className="space-y-4">
        <label className="block">New password
          <input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} className="mt-1 w-full rounded border p-2" />
        </label>
        <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Update password</button>
      </form>
    </section>
  );
}
