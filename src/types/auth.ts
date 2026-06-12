import type { User } from "better-auth"
import type { Member } from "@/payload/payload-types"

export type AuthState = {
  user: User | null
  member: Member | null
  isLoading: boolean
  memberError: Error | null
}
