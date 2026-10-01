import { expect, test } from "@playwright/test";

test("all five primary views resolve through navigation and Course selection", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Dashboard", level: 1 })).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("link", { name: "Courses" }).click();
  await expect(page.getByRole("heading", { name: "Courses", level: 1 })).toBeVisible();
  await page.locator('a[href="/courses/phy-009d"]').click();
  await expect(page.getByRole("heading", { name: /PHY 009D.*Modern Physics/, level: 1 })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Courses" })).toHaveAttribute("aria-current", "page");

  await nav.getByRole("link", { name: "Weekly Plan" }).click();
  await expect(page.getByRole("heading", { name: "Weekly Plan", level: 1 })).toBeVisible();
  await nav.getByRole("link", { name: "Today" }).click();
  await expect(page.getByRole("heading", { name: "Today", level: 1 })).toBeVisible();
  await nav.getByRole("link", { name: "Dashboard" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard", level: 1 })).toBeVisible();
});

test("unknown Course returns a real 404", async ({ page }) => {
  const response = await page.goto("/courses/no-such-course");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Course not found")).toBeVisible();
});

test("Dashboard Next Action matches the first actionable Today task", async ({ page }) => {
  await page.goto("/");
  const nextActionId = await page.locator("section[aria-labelledby='next-action'] [data-task-id]").getAttribute("data-task-id");
  const dashboardTaskIds = await page.locator("section[aria-labelledby='dashboard-today'] [data-task-id]")
    .evaluateAll((items) => items.map((item) => item.getAttribute("data-task-id")));
  await page.getByRole("link", { name: "View Today" }).click();
  await expect(page.getByRole("heading", { name: "Today", level: 1 })).toBeVisible();
  const todayTaskIds = await page.locator("section[aria-labelledby='today-study-plan'] [data-task-id]")
    .evaluateAll((items) => items.map((item) => item.getAttribute("data-task-id")));
  expect(nextActionId).toBeTruthy();
  expect(nextActionId).toBe(todayTaskIds[0]);
  expect(dashboardTaskIds).toEqual(todayTaskIds);
});

test("narrow viewport retains keyboard navigation without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Dashboard" })).toBeFocused();
  await page.keyboard.press("Tab");
  const courses = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Courses" });
  await expect(courses).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Courses", level: 1 })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
