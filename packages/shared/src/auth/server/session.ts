import "server-only"
import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { cache } from "react"
import { AuthApiRoutes } from "../routes"
import type { AuthSessionData } from "../session"
import { sessionFetch } from "./service"

/**
 * The session now lives in the auth service, so this is a network call rather
 * than a database read. Cached per request so a page that checks it in several
 * places still only asks once.
 *
 * Throws if the auth service cannot be reached.
 */
export const getSessionOrThrow = cache(async (): Promise<AuthSessionData | null> => {
  const response = await sessionFetch(AuthApiRoutes.SESSION, await headers(), {
    signal: AbortSignal.timeout(5000),
  })
  if (response.status === 401) return null
  if (!response.ok) throw new Error(`Auth service answered ${response.status}`)

  // Better Auth answers 200 with a literal `null` body when there is no
  // session, so an empty body is not an error.
  const text = await response.text()
  return text ? (JSON.parse(text) as AuthSessionData | null) : null
})

/** Like `getSessionOrThrow`, but returns `null` if the auth service cannot be reached. */
export const getSession = cache(async (): Promise<AuthSessionData | null> => {
  try {
    return await getSessionOrThrow()
  } catch (err) {
    console.error("[getSession] Failed to reach the auth service", { error: err })
    unstable_rethrow(err)
    return null
  }
})
