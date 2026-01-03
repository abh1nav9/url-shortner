import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email address" }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});
