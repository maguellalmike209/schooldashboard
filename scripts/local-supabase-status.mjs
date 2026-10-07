import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const cli = resolve("node_modules/supabase/dist/supabase.js");

export function localSupabaseStatus() {
  const result = spawnSync(process.execPath, [cli, "status", "-o", "json"], {
    encoding: "utf8",
    maxBuffer: 5_000_000,
  });
  if (result.status !== 0) throw new Error("Local Supabase is unavailable");
  try {
    const value = JSON.parse(result.stdout);
    if (!value.API_URL || !value.PUBLISHABLE_KEY) {
      throw new Error("missing local public endpoint or key");
    }
    return { API_URL: value.API_URL, PUBLISHABLE_KEY: value.PUBLISHABLE_KEY };
  } catch {
    throw new Error("Local Supabase status is incomplete");
  }
}
