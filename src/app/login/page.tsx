import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const { error, message } = await searchParams;
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-2 text-slate-600">Access your private academic terms and courses.</p>
      </div>
      {error && <p role="alert" className="text-red-700">Sign in was unsuccessful. Check your details and try again.</p>}
      {message === "confirm" && <p role="status">Check the local email inbox to confirm your address before signing in.</p>}
      {message === "confirmed" && <p role="status">Email confirmed. Sign in to continue.</p>}
      {message === "signed-out" && <p role="status">You have signed out.</p>}
      {message === "password-updated" && <p role="status">Your password was updated. Sign in again.</p>}
      <form action={signIn} className="space-y-4">
        <label className="block">Email
          <input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block">Password
          <input name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={128} className="mt-1 w-full rounded border p-2" />
        </label>
        <button className="rounded bg-sky-700 px-4 py-2 font-medium text-white">Sign in</button>
      </form>
      <p><Link className="text-sky-700 underline" href="/signup">Create an account</Link></p>
      <p><Link className="text-sky-700 underline" href="/auth/recover">Forgot password?</Link></p>
    </section>
  );
}
