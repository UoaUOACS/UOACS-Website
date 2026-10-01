import { accountSchema } from "@uoacs/shared"
import type { User } from "better-auth"
import { z } from "zod"
import { passwordMismatchIssue, passwordsMatch } from "@/types/schemas/shared"

export const createUserServerSchema = accountSchema

export const createUserSchema = createUserServerSchema
  .extend({ confirmPassword: z.string().min(1, "Please confirm your password") })
  .refine(passwordsMatch, passwordMismatchIssue)

export type CreateUserInput = z.infer<typeof createUserServerSchema>

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.email(),
  emailVerified: z.boolean(),
  name: z.string().min(2).max(100),
  image: z.url().optional().nullable(),
}) satisfies z.ZodType<User>
