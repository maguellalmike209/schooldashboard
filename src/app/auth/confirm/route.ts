import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { supabaseConfig } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const rawType = request.nextUrl.searchParams.get("type");
  if (!tokenHash || tokenHash.length > 512 || (rawType !== "email" && rawType !== "recovery")) {
    return NextResponse.redirect(new URL("/login?error=auth", request.url));
  }

  const { url, key } = supabaseConfig();
  const destination = rawType === "recovery" ? "/auth/update-password" : "/login?message=confirmed";
  let response = NextResponse.redirect(new URL(destination, request.url));
  const client = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: rawType });
  if (error) response = NextResponse.redirect(new URL("/login?error=auth", request.url));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
