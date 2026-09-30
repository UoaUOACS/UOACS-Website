import type { AuthSessionData } from "@uoacs/shared"
import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { cache } from "react"
import { sessionFetch } from "./auth-service"

/**
 * The session now lives in the auth service, so this is a network call rather
 * than a database read. Cached per request so a page that checks it in several
 * places still only asks once.
 */
export const getSession = cache(async (): Promise<AuthSessionData | null> => {
  try {
    const response = await sessionFetch("/api/auth/get-session", await headers())
    if (!response.ok) return null

    // Better Auth answers 200 with a literal `null` body when there is no
    // session, so an empty body is not an error.
    const text = await response.text()
    return text ? (JSON.parse(text) as AuthSessionData | null) : null
  } catch (err) {
    unstable_rethrow(err)
    console.error("[getSession] Failed to reach the auth service", { error: err })
    return null
  }
})
