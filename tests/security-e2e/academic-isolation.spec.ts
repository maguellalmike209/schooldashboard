import { randomBytes, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const mailUrl = process.env.SUPABASE_LOCAL_EMAIL_URL!;
const appOrigin = "http://127.0.0.1:3000";

function syntheticUser() {
  return {
    email: `sd015-${randomUUID()}@example.invalid`,
    password: `${randomBytes(24).toString("base64url")}A1!`,
  };
}

async function confirmationLink(request: APIRequestContext, email: string) {
  const query = encodeURIComponent(`to:"${email}"`);
  const url = `${mailUrl}/view/latest.html?query=${query}`;
  for (let attempt = 0; attempt < 30; attempt++) {
    const response = await request.get(url);
    if (response.ok()) {
      const html = await response.text();
      const encoded = html.match(/href="([^"]*\/auth\/confirm\?token_hash=[^"]+)"/)?.[1];
      if (encoded) {
        const link = encoded.replaceAll("&amp;", "&");
        const parsed = new URL(link);
        expect(parsed.origin).toBe(appOrigin);
        expect(parsed.searchParams.get("type")).toBe("email");
        return link;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Local confirmation email was not delivered");
}

async function signUpConfirmAndSignIn(page: Page, request: APIRequestContext, user: ReturnType<typeof syntheticUser>) {
  await page.goto("/signup");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Check the local email inbox")).toBeVisible();

  await page.goto(await confirmationLink(request, user.email));
  await expect(page.getByRole("status")).toContainText("Email confirmed");

  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Your terms and courses" })).toBeVisible();
}

async function createTermAndCourse(page: Page, termName: string, code: string, courseName: string) {
  await page.getByLabel("Term name").fill(termName);
  await page.getByRole("button", { name: "Create term" }).click();
  await expect(page.getByRole("link", { name: termName })).toHaveAttribute("aria-current", "page");
  const termId = new URL(page.url()).searchParams.get("term")!;
  await page.locator('form:has(input[name="termId"]) input[name="code"]').fill(code);
  await page.locator('form:has(input[name="termId"]) input[name="name"]').fill(courseName);
  await page.getByRole("button", { name: "Create course" }).click();
  const href = await page.getByRole("link", { name: `View ${code}` }).getAttribute("href");
  expect(href).toBeTruthy();
  return { termId, courseId: href!.split("/").at(-1)! };
}

test("SD-015 real auth, app authorization, RLS, validation, and logout", async ({ browser, request }) => {
  test.setTimeout(180_000);
  const a = syntheticUser();
  const b = syntheticUser();
  const contextA = await browser.newContext();
  const contextB = await browser.newContext();
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  try {
    const anonymous = await browser.newPage();
    await anonymous.goto("/academic");
    await expect(anonymous.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await anonymous.close();

    await signUpConfirmAndSignIn(pageA, request, a);
    const aData = await createTermAndCourse(pageA, "A Synthetic Term", "A101", "A Course");
    await signUpConfirmAndSignIn(pageB, request, b);
    const bData = await createTermAndCourse(pageB, "B Synthetic Term", "B101", "B Course");

    // Direct private route lookups must check the actor on every request.
    expect((await pageA.goto(`/academic/courses/${bData.courseId}`))?.status()).toBe(404);
    expect((await pageB.goto(`/academic/courses/${aData.courseId}`))?.status()).toBe(404);
    expect((await pageA.goto("/academic/courses/not-a-uuid"))?.status()).toBe(404);
    expect((await pageA.goto(`/academic/courses/${randomUUID()}`))?.status()).toBe(404);

    const privateResponse = await pageA.goto("/academic");
    expect(privateResponse?.status()).toBe(200);
    expect(privateResponse?.headers()["cache-control"]).toContain("private");
    expect(privateResponse?.headers()["cache-control"]).toContain("no-store");
    expect(await privateResponse!.text()).not.toMatch(/sb_secret_|eyJ[A-Za-z0-9._-]{40,}/);
    await expect(pageA.getByRole("link", { name: "View A101" })).toBeVisible();
    await expect(pageA.getByText("B Course")).toHaveCount(0);
    await pageB.goto("/academic");
    await expect(pageB.getByRole("link", { name: "View B101" })).toBeVisible();
    await expect(pageB.getByText("A Course")).toHaveCount(0);

    const clientA = createClient(apiUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const clientB = createClient(apiUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const anonymousClient = createClient(apiUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const loginA = await clientA.auth.signInWithPassword(a);
    const loginB = await clientB.auth.signInWithPassword(b);
    expect(loginA.error).toBeNull();
    expect(loginB.error).toBeNull();
    const aId = loginA.data.user!.id;
    const bId = loginB.data.user!.id;

    const anonymousActionFields = await pageA.locator('form:has(input[name="termId"])').evaluate((form) =>
      Object.fromEntries([...new FormData(form as HTMLFormElement).entries()].map(([name, value]) => [name, String(value)])),
    );
    anonymousActionFields.code = "ANON";
    anonymousActionFields.name = "Anonymous action attempt";
    const anonymousAction = await request.post(`${appOrigin}/academic`, {
      form: anonymousActionFields,
      headers: { Origin: appOrigin },
      maxRedirects: 0,
    });
    expect([303, 307]).toContain(anonymousAction.status());
    expect(new URL(anonymousAction.headers().location!, appOrigin).pathname).toBe("/login");

    expect((await clientA.from("courses").select("id")).data?.map((row) => row.id)).toEqual([aData.courseId]);
    expect((await clientB.from("courses").select("id")).data?.map((row) => row.id)).toEqual([bData.courseId]);
    expect((await clientA.from("courses").select("id").eq("id", bData.courseId)).data).toEqual([]);
    expect((await clientB.from("courses").select("id").eq("id", aData.courseId)).data).toEqual([]);
    expect((await clientA.from("courses").update({ name: "Attack" }).eq("id", bData.courseId).select("id")).data).toEqual([]);
    expect((await clientA.from("courses").delete().eq("id", bData.courseId).select("id")).data).toEqual([]);
    expect((await clientA.from("courses").insert({ owner_id: bId, term_id: bData.termId, code: "X", name: "Spoof" })).error).toBeTruthy();
    expect((await clientA.from("courses").insert({ owner_id: aId, term_id: bData.termId, code: "X", name: "Cross term" })).error).toBeTruthy();
    expect((await anonymousClient.from("courses").select("id")).error).toBeTruthy();
    expect((await anonymousClient.from("courses").insert({ owner_id: aId, term_id: aData.termId, code: "X", name: "Anonymous" })).error).toBeTruthy();
    expect((await clientB.from("courses").select("name").eq("id", bData.courseId).single()).data?.name).toBe("B Course");

    // Submit altered server-action forms, bypassing the normal UI choices.
    const createForm = pageA.locator('form:has(input[name="termId"])');
    await createForm.locator('input[name="code"]').fill("SPOOF");
    await createForm.locator('input[name="name"]').fill("Spoof attempt");
    await createForm.evaluate((form, ownerId) => {
      const field = document.createElement("input");
      field.name = "owner_id";
      field.value = ownerId;
      form.appendChild(field);
    }, bId);
    await pageA.getByRole("button", { name: "Create course" }).click();
    await expect(pageA.locator('main p[role="alert"]')).toContainText("Check the required fields");

    const invalidForm = pageA.locator('form:has(input[name="termId"])');
    await invalidForm.evaluate((form) => { (form as HTMLFormElement).noValidate = true; });
    await invalidForm.locator('input[name="code"]').fill(" ");
    await invalidForm.locator('input[name="name"]').fill("Blank code attempt");
    await invalidForm.getByRole("button", { name: "Create course" }).click();
    await expect(pageA.locator('main p[role="alert"]')).toContainText("Check the required fields");

    await pageA.locator('form:has(input[name="termId"])').evaluate((form) => {
      (form as HTMLFormElement).noValidate = true;
      (form.querySelector('input[name="name"]') as HTMLInputElement).value = "x".repeat(121);
    });
    await pageA.locator('form:has(input[name="termId"]) input[name="code"]').fill("OVER");
    await pageA.getByRole("button", { name: "Create course" }).click();
    await expect(pageA.locator('main p[role="alert"]')).toContainText("Check the required fields");

    await pageA.locator('form:has(input[name="termId"]) input[name="termId"]').evaluate((field, termId) => {
      (field as HTMLInputElement).value = termId;
    }, bData.termId);
    await pageA.locator('form:has(input[name="termId"]) input[name="code"]').fill("CROSS");
    await pageA.locator('form:has(input[name="termId"]) input[name="name"]').fill("Cross term attempt");
    await pageA.getByRole("button", { name: "Create course" }).click();
    await expect(pageA.locator('main p[role="alert"]')).toContainText("unavailable");

    const updateForm = pageA.locator('form:has(button:has-text("Save"))').first();
    await updateForm.locator('input[name="id"]').evaluate((field, courseId) => {
      (field as HTMLInputElement).value = courseId;
    }, bData.courseId);
    await updateForm.getByRole("button", { name: "Save" }).click();
    await expect(pageA.locator('main p[role="alert"]')).toContainText("unavailable");

    const deleteForm = pageA.locator('form:has(button:has-text("Delete course"))').first();
    await deleteForm.locator('input[name="id"]').evaluate((field, courseId) => {
      (field as HTMLInputElement).value = courseId;
    }, bData.courseId);
    await deleteForm.evaluate((form) => (form as HTMLFormElement).requestSubmit());
    await expect(pageA.locator('main p[role="alert"]')).toContainText("unavailable");
    expect((await clientB.from("courses").select("name").eq("id", bData.courseId).single()).data?.name).toBe("B Course");

    await pageA.goto("/academic");
    const ownUpdate = pageA.locator('form:has(button:has-text("Save"))').first();
    await ownUpdate.locator('input[name="name"]').fill("A Updated Course");
    await ownUpdate.getByRole("button", { name: "Save" }).click();
    await expect(pageA.getByRole("link", { name: "View A101" })).toBeVisible();
    await pageA.goto(`/academic/courses/${aData.courseId}`);
    await expect(pageA.getByRole("heading", { name: "A101 — A Updated Course" })).toBeVisible();
    await pageA.goto("/academic");
    await pageA.locator('form:has(button:has-text("Delete course"))').first()
      .evaluate((form) => (form as HTMLFormElement).requestSubmit());
    await expect(pageA.getByRole("link", { name: "View A101" })).toHaveCount(0);

    await pageA.getByRole("button", { name: "Sign out" }).click();
    await expect(pageA.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(pageA.getByRole("status")).toContainText("signed out");
    await pageA.goto("/academic");
    await expect(pageA.getByRole("heading", { name: "Sign in" })).toBeVisible();
  } finally {
    await contextA.close().catch(() => undefined);
    await contextB.close().catch(() => undefined);
  }
});
