import { z } from "zod"

export { sendCodeSchema, verifyCodeSchema } from "@uoacs/shared"

/** Form-only: the code field on its own, with the copy the input shows. */
export const emailVerificationCodeFormSchema = z.object({
  code: z.string().length(6, "Please enter a 6-digit code").regex(/^\d+$/, "Code must be numeric"),
})

export type EmailVerificationCodeForm = z.infer<typeof emailVerificationCodeFormSchema>
