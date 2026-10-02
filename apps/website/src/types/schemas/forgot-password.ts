import { forgotPasswordSchema } from "@uoacs/shared"
import type { z } from "zod"

export { forgotPasswordSchema }

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
export type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>
