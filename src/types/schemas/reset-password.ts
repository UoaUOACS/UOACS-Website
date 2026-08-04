import { z } from "zod"
import { passwordMismatchIssue, passwordsMatch } from "@/types/schemas/shared"

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(passwordsMatch, passwordMismatchIssue)

export type ResetPasswordInput = z.input<typeof resetPasswordSchema>
export type ResetPasswordOutput = z.output<typeof resetPasswordSchema>
