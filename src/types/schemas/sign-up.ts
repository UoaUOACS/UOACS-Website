import { z } from "zod"
import { createMemberSchema } from "@/types/schemas/member"

export const signUpSchema = createMemberSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
})
