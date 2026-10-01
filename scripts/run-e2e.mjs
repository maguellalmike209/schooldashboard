import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const baseURL = "http://127.0.0.1:3100";
const serverArgs = ["./node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3100"];
const testArgs = ["./node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)];

async function isReady() {
  try {
    const response = await fetch(baseURL, { signal: AbortSignal.timeout(2_000) });
    return response.ok;
  } catch {
    return false;
  }
}

if (await isReady()) {
  throw new Error(`Port 3100 already serves an application. Stop it before running E2E tests.`);
}

const server = spawn(process.execPath, serverArgs, {
  detached: process.platform !== "win32",
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

async function stopServer() {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // The server may have already exited.
    }
  }
}

try {
  const deadline = Date.now() + 120_000;
  while (!(await isReady())) {
    if (server.exitCode !== null) throw new Error(`Next.js server exited with code ${server.exitCode}.`);
    if (Date.now() >= deadline) throw new Error("Next.js server did not become ready within 120 seconds.");
    await delay(500);
  }

  const tests = spawn(process.execPath, testArgs, { stdio: ["ignore", "pipe", "pipe"] });
  tests.stdout.pipe(process.stdout);
  tests.stderr.pipe(process.stderr);
  const exitCode = await new Promise((resolve, reject) => {
    tests.once("error", reject);
    tests.once("exit", (code) => resolve(code ?? 1));
  });
  process.exitCode = exitCode;
} finally {
  await stopServer();
}

process.exit(process.exitCode ?? 1);
