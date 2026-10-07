import Link from "next/link";
import { requestPasswordReset } from "@/app/auth/actions";

export default async function RecoverPage({
  searchParams,
}: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const { error, message } = await searchParams;
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">Reset password</h1>
      {error && <p role="alert">Enter a valid email address.</p>}
      {message === "sent" && <p role="status">If the account exists, a reset link is in the local email inbox.</p>}
      <form action={requestPasswordReset} className="space-y-4">
        <label className="block">Email
          <input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1 w-full rounded border p-2" />
        </label>
        <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Send reset link</button>
      </form>
      <p><Link className="text-sky-700 underline" href="/login">Back to sign in</Link></p>
    </section>
  );
}
