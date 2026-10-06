import type { authClient } from "./client"

export type AuthSessionData = typeof authClient.$Infer.Session
export type AuthUser = AuthSessionData["user"]
export type AuthSession = AuthSessionData["session"]

/**
 * What a session lookup found. `unavailable` means the auth service could not
 * be reached or answered with an error, so the person may still be signed in —
 * callers must not treat it as signed out.
 */
export type SessionResult =
  | { status: "authenticated"; session: AuthSessionData }
  | { status: "unauthenticated" }
  | { status: "unavailable" }
