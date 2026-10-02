/**
 * Paths the auth service exposes, as its callers address them.
 *
 * Shared so a consumer cannot invent one. apps/auth defines these by its
 * directory layout, so nothing would otherwise check a caller's string
 * literal against a route that exists — a typo would be a 404 at runtime.
 * Renaming a route directory in apps/auth means changing it here too.
 */
export const AuthApiRoutes = {
  SESSION: "/api/auth/get-session",
  MEMBER: "/api/member",
  MEMBER_ME: "/api/member/me",
  MEMBER_EXISTS: "/api/member/exists",
  MEMBER_BY_ID: (id: string): `/api/member/${string}` => `/api/member/${encodeURIComponent(id)}`,
  VERIFICATION_CODE: "/api/verification-code",
  FORGOT_PASSWORD: "/api/forgot-password",
} as const

type RouteValue<T> = T extends (...args: never[]) => infer R ? R : T

export type AuthApiRoute = RouteValue<(typeof AuthApiRoutes)[keyof typeof AuthApiRoutes]>
