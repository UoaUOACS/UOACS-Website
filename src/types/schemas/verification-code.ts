import { z } from "zod"

export const verifyCodeSchema = z.object({
  email: z.email(),
  code: z.string().length(6).regex(/^\d+$/),
})

export const sendCodeSchema = z.object({ email: z.email() })
