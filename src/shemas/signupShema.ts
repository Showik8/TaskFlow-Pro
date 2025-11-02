import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  adminInviteToken: z.string().optional(), // Or add rules if required for admin
});

export type SignUpSchemaType = z.infer<typeof signupSchema>;
