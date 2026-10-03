import { accountSchema } from "@uoacs/shared"
import { z } from "zod"
import { passwordMismatchIssue, passwordsMatch } from "@/types/schemas/shared"

export const createUserSchema = accountSchema
  .extend({ confirmPassword: z.string().min(1, "Please confirm your password") })
  .refine(passwordsMatch, passwordMismatchIssue)

export type CreateUserInput = z.infer<typeof accountSchema>
