import "server-only"
import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { cache } from "react"
import { z } from "zod"
import { AuthApiRoutes } from "../routes"
import type { AuthSessionData, SessionResult } from "../session"
import { sessionFetch } from "./service"

/** Just enough of a session to trust it is one, not an error or proxy page. */
const sessionShape = z.object({
  user: z.object({ id: z.string() }),
  session: z.object({ id: z.string() }),
})

/**
 * The session lives in the auth service, so this is a network call rather
 * than a database read. Cached per request so a page that checks it in several
 * places still only asks once.
 *
 * Returns `unavailable` when the auth service cannot be reached within 5s,
 * answers with an error, or returns something that is not a session.
 */
export const getSession = cache(async (): Promise<SessionResult> => {
  let response: Response
  let text: string
  try {
    response = await sessionFetch(AuthApiRoutes.SESSION, await headers(), {
      signal: AbortSignal.timeout(5000),
    })
    text = await response.text()
  } catch (err) {
    unstable_rethrow(err)
    console.error("[getSession] Failed to reach the auth service", { error: err })
    return { status: "unavailable" }
  }

  if (response.status === 401) return { status: "unauthenticated" }
  if (!response.ok) {
    console.error("[getSession] Auth service answered with an error", { status: response.status })
    return { status: "unavailable" }
  }

  // Better Auth answers 200 with a literal `null` body when there is no
  // session, so an empty body is not an error. The body is never logged, as a
  // real session holds its token.
  let body: unknown
  try {
    body = text ? JSON.parse(text) : null
  } catch (err) {
    console.error("[getSession] Auth service returned a body that is not JSON", {
      contentType: response.headers.get("content-type"),
      error: err,
    })
    return { status: "unavailable" }
  }
  if (body === null) return { status: "unauthenticated" }

  const parsed = sessionShape.safeParse(body)
  if (!parsed.success) {
    console.error("[getSession] Auth service returned something that is not a session", {
      issues: parsed.error.issues.map((issue) => issue.path.join(".")),
    })
    return { status: "unavailable" }
  }
  return { status: "authenticated", session: body as AuthSessionData }
})
