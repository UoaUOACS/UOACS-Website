import { z } from "zod"

export const verifyCodeSchema = z.object({
  email: z.email(),
  code: z.string().length(6).regex(/^\d+$/),
})

export const sendCodeSchema = z.object({ email: z.email() })

export const emailVerificationCodeFormSchema = z.object({
  code: z.string().length(6, "Please enter a 6-digit code").regex(/^\d+$/, "Code must be numeric"),
})

export type EmailVerificationCodeForm = z.infer<typeof emailVerificationCodeFormSchema>
