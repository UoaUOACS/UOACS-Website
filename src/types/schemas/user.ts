import type { User } from "better-auth"
import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
}) satisfies z.ZodType<Partial<User>>

export type CreateUserInput = z.infer<typeof createUserSchema>

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.email(),
  emailVerified: z.boolean(),
  name: z.string().min(2).max(100),
  image: z.url().optional().nullable(),
}) satisfies z.ZodType<User>
