import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/security-e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3000", trace: "off", actionTimeout: 10_000, navigationTimeout: 15_000 },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
