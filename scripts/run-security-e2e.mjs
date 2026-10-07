import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { localSupabaseStatus } from "./local-supabase-status.mjs";

const status = localSupabaseStatus();
const baseURL = "http://127.0.0.1:3000";
const credentialPattern = /sb_secret_[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9._-]{60,}|token_hash=[A-Za-z0-9._-]+/;
const publicEnv = { ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: status.PUBLISHABLE_KEY,
};
for (const name of ["SECRET_KEY", "SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_LOCAL_SECRET_KEY"]) {
  delete publicEnv[name];
}

async function isReady() {
  try {
    const response = await fetch(baseURL, { signal: AbortSignal.timeout(2_000) });
    return response.ok;
  } catch {
    return false;
  }
}

if (await isReady()) throw new Error("Port 3000 already serves an application");
const server = spawn(process.execPath, ["./node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3000"], {
  detached: process.platform !== "win32",
  env: publicEnv,
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLogs = "";
server.stdout.on("data", (chunk) => { serverLogs += String(chunk); });
server.stderr.on("data", (chunk) => { serverLogs += String(chunk); });

function stopServer() {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    try { process.kill(-server.pid, "SIGTERM"); } catch { /* already exited */ }
  }
}

try {
  const deadline = Date.now() + 120_000;
  while (!(await isReady())) {
    if (server.exitCode !== null) throw new Error("Next.js server exited before security tests");
    if (Date.now() >= deadline) throw new Error("Next.js server did not become ready");
    await delay(500);
  }

  const tests = spawn(process.execPath,
    ["./node_modules/@playwright/test/cli.js", "test", "--config", "playwright.security.config.ts"], {
      env: {
        ...publicEnv,
        SUPABASE_LOCAL_EMAIL_URL: "http://127.0.0.1:54324",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
  const scrub = (chunk) => String(chunk)
    .replace(/sb_secret_[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/eyJ[A-Za-z0-9._-]{40,}/g, "[redacted]")
    .replace(/token_hash=[A-Za-z0-9._-]+/g, "token_hash=[redacted]");
  tests.stdout.on("data", (chunk) => process.stdout.write(scrub(chunk)));
  tests.stderr.on("data", (chunk) => process.stderr.write(scrub(chunk)));
  process.exitCode = await new Promise((resolve, reject) => {
    tests.once("error", reject);
    tests.once("exit", (code) => resolve(code ?? 1));
  });
} finally {
  stopServer();
}

if (credentialPattern.test(serverLogs)) {
  process.stderr.write("Credential-like content appeared in Next.js server logs.\n");
  process.exitCode = 1;
}

process.exit(process.exitCode ?? 1);
