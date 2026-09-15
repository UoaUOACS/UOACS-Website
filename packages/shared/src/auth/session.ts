/**
 * The session contract every app agrees on.
 *
 * Hand-written rather than inferred from Better Auth: the shared `authClient`
 * lands in #395, and until then `apps/auth` has no instance to infer from.
 * Reconcile these with `authClient.$Infer.Session` when that ticket lands.
 */

export interface AuthUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AuthSession {
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
  ipAddress?: string | null
  userAgent?: string | null
}

export interface AuthSessionData {
  user: AuthUser
  session: AuthSession
}
