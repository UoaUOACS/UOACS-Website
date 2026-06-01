import { z } from "zod"
import { memberSchema } from "./schemas/member"
import { userSchema } from "./schemas/user"

export const memberWithAuthSchema = z.union([memberSchema, userSchema])

export type MemberWithAuth = z.infer<typeof memberWithAuthSchema>
