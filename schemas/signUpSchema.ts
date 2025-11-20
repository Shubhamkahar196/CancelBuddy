import z from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  password: z
    .string()
    .min(5, "Password must be more then 5 characters")
    .optional(), //required for credentials provider
  timezone: z.string().optional(),
  locale: z.string().optional(),
});
