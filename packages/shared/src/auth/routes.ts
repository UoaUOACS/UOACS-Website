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

/**
 * Pages the hosted auth app serves.
 *
 * Shared so client apps link to these pages through `authPageUrl` instead of
 * a hand-written URL, and apps/auth uses the same paths for its own links.
 * Renaming a page directory in apps/auth means changing it here too.
 */
export const AuthPages = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  /** Reached from the reset email; needs a `token` search param. */
  RESET_PASSWORD: "/reset-password",
} as const

export type AuthPage = (typeof AuthPages)[keyof typeof AuthPages]

/**
 * Absolute link to a hosted auth page that returns to `returnTo` when done.
 *
 * `returnTo` must be an absolute URL on an origin the auth app trusts, else
 * the person ends on the website /profile. Throws if NEXT_PUBLIC_AUTH_URL is
 * missing or `returnTo` is relative.
 */
export function authPageUrl(page: AuthPage, returnTo?: string): string {
  const base = process.env.NEXT_PUBLIC_AUTH_URL
  if (!base) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_AUTH_URL")
  }
  const url = new URL(page, base)
  if (returnTo !== undefined) {
    if (!URL.canParse(returnTo)) {
      throw new Error(`authPageUrl: returnTo must be an absolute URL, got "${returnTo}"`)
    }
    url.searchParams.set("redirect", returnTo)
  }
  return url.toString()
}
