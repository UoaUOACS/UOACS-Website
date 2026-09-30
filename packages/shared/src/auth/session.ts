import type { authClient } from "./client"

export type AuthSessionData = typeof authClient.$Infer.Session
export type AuthUser = AuthSessionData["user"]
export type AuthSession = AuthSessionData["session"]
