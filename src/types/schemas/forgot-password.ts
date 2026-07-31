import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
})

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
export type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>
