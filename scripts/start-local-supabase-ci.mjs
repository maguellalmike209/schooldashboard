import { spawnSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { localSupabaseStatus } from "./local-supabase-status.mjs";

const cli = resolve("node_modules/supabase/dist/supabase.js");
const result = spawnSync(process.execPath, [cli, "start", "--output-format", "json"], {
  encoding: "utf8",
  maxBuffer: 5_000_000,
});
if (result.status !== 0) {
  // CLI output can contain credentials. Report only a non-sensitive failure code.
  throw new Error(`Local Supabase failed to start (exit ${result.status})`);
}

const status = localSupabaseStatus();
if (!process.env.GITHUB_ENV) throw new Error("This bootstrap is for GitHub Actions only");
appendFileSync(process.env.GITHUB_ENV,
  `NEXT_PUBLIC_SUPABASE_URL=${status.API_URL}\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${status.PUBLISHABLE_KEY}\n`);
console.log("Local Supabase started; public app configuration exported.");
