import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default async function SignupPage({
  searchParams,
}: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">Create account</h1>
      {error && <p role="alert" className="text-red-700">Account creation was unsuccessful. Check your details and try again.</p>}
      <form action={signUp} className="space-y-4">
        <label className="block">Email
          <input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block">Password
          <input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} className="mt-1 w-full rounded border p-2" />
        </label>
        <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Create account</button>
      </form>
      <p><Link className="text-sky-700 underline" href="/login">Sign in instead</Link></p>
    </section>
  );
}
