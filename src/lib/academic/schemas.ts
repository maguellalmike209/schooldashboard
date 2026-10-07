import { z } from "zod";

export const idSchema = z.uuid();

const boundedText = (max: number) => z.string().trim().min(1).max(max);

export const termInput = z.strictObject({
  name: boundedText(80),
});

export const courseInput = z.strictObject({
  termId: idSchema,
  code: boundedText(24),
  name: boundedText(120),
});

export const courseUpdateInput = z.strictObject({
  id: idSchema,
  code: boundedText(24),
  name: boundedText(120),
});

export const courseDeleteInput = z.strictObject({ id: idSchema });

export const credentialsInput = z.strictObject({
  email: z.email().max(254),
  password: z.string().min(8).max(128),
});

export function formFields(formData: FormData) {
  return Object.fromEntries(
    [...formData.entries()].filter(([key]) => !key.startsWith("$ACTION_")),
  );
}
