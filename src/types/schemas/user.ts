import type { User } from "better-auth"
import { z } from "zod"

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.email({ error: "Please enter a valid email" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type CreateUserInput = Omit<z.infer<typeof createUserSchema>, "confirmPassword">

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.email(),
  emailVerified: z.boolean(),
  name: z.string().min(2).max(100),
  image: z.url().optional().nullable(),
}) satisfies z.ZodType<User>
