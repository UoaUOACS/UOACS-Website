import type { Member } from "@/payload/payload-types"

/** Mirrors `SessionResult`: `unavailable` is not "logged out". */
export type CurrentMemberResult =
  | { status: "authenticated"; member: Member }
  | { status: "unauthenticated" }
  | { status: "unavailable" }
