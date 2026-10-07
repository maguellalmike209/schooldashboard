import { describe, expect, it } from "vitest";
import { courseDeleteInput, courseInput, courseUpdateInput, credentialsInput, termInput } from "@/lib/academic/schemas";

const termId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const courseId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

describe("SD-015 server input contracts", () => {
  it("accepts the exact owned-resource input shape and trims text", () => {
    expect(termInput.parse({ name: "  Fall Quarter  " })).toEqual({ name: "Fall Quarter" });
    expect(courseInput.parse({ termId, code: " PHY 009D ", name: " Modern Physics " }))
      .toEqual({ termId, code: "PHY 009D", name: "Modern Physics" });
    expect(courseUpdateInput.parse({ id: courseId, code: "PHY 009D", name: "Physics" }).id).toBe(courseId);
    expect(courseDeleteInput.parse({ id: courseId })).toEqual({ id: courseId });
  });

  it("rejects owner spoofing and unexpected fields", () => {
    expect(courseInput.safeParse({ termId, code: "A", name: "B", owner_id: courseId }).success).toBe(false);
    expect(courseUpdateInput.safeParse({ id: courseId, code: "A", name: "B", ownerId: courseId }).success).toBe(false);
    expect(termInput.safeParse({ name: "Term", role: "admin" }).success).toBe(false);
  });

  it("rejects malformed IDs, blank fields, and excessive text", () => {
    expect(courseDeleteInput.safeParse({ id: "not-a-uuid" }).success).toBe(false);
    expect(courseInput.safeParse({ termId: "bad", code: "A", name: "B" }).success).toBe(false);
    expect(courseInput.safeParse({ termId, code: "   ", name: "B" }).success).toBe(false);
    expect(courseInput.safeParse({ termId, code: "A", name: "" }).success).toBe(false);
    expect(courseInput.safeParse({ termId, code: "x".repeat(25), name: "B" }).success).toBe(false);
    expect(courseInput.safeParse({ termId, code: "A", name: "x".repeat(121) }).success).toBe(false);
    expect(termInput.safeParse({ name: "x".repeat(81) }).success).toBe(false);
  });

  it("bounds credentials without logging them", () => {
    expect(credentialsInput.safeParse({ email: "synthetic@example.invalid", password: "a".repeat(8) }).success).toBe(true);
    expect(credentialsInput.safeParse({ email: "bad", password: "short" }).success).toBe(false);
  });
});
