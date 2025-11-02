import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  adminToken: z.string().optional(), // Or add rules if required for admin
  profilePic: z.string().optional(), // Could be a URL or base64
});

export type SignUpSchemaType = z.infer<typeof signupSchema>;
