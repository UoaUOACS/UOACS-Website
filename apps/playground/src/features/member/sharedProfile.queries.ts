import { AuthApiRoutes, memberResponseSchema } from "@uoacs/shared"
import { sessionFetch } from "@uoacs/shared/auth/server"
import type { Member } from "@uoacs/shared/payload"
import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { cache } from "react"
import { z } from "zod"

const memberDetailsSchema = memberResponseSchema.extend({ gender: z.string() })

/** Mirrors `CurrentMemberResult`: `unavailable` is not "logged out". */
export type MemberDetailsResult =
  | { status: "authenticated"; member: Member }
  | { status: "unauthenticated" }
  | { status: "not-found" }
  | { status: "unavailable" }

export const getMemberDetails = cache(async (): Promise<MemberDetailsResult> => {
  try {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, await headers(), {
      signal: AbortSignal.timeout(5000),
    })
    if (response.status === 401) return { status: "unauthenticated" }
    if (response.status === 404) return { status: "not-found" }
    if (!response.ok) {
      console.error("[getMemberDetails] Auth service answered with an error", {
        status: response.status,
      })
      return { status: "unavailable" }
    }
    const parsed = memberDetailsSchema.safeParse(await response.json())
    if (!parsed.success) {
      console.error("[getMemberDetails] Auth service returned an unexpected member shape", {
        issues: parsed.error.issues.map((issue) => issue.path.join(".")),
      })
      return { status: "unavailable" }
    }
    return { status: "authenticated", member: parsed.data as Member }
  } catch (error) {
    unstable_rethrow(error)
    console.error("[getMemberDetails] Failed to reach the auth service", { error })
    return { status: "unavailable" }
  }
})
