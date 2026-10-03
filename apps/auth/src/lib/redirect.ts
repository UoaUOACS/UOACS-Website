import type { AuthPage } from "@uoacs/shared"
import { trustedOrigins } from "@/lib/auth/trusted-origins"

/**
 * Returns `value` as an absolute URL if it is safe to send the user to, or
 * the website profile page if not.
 *
 * Accepts only http(s) URLs on a trusted origin or the auth origin. Relative
 * values (`/x`, `//evil.com`) fail, because `new URL` with no base throws.
 */
export function safeRedirect(value: string | null | undefined): string {
  // Literal accesses, so Next inlines them in client bundles.
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  if (!authUrl || !websiteUrl) {
    throw new Error(
      "Missing required environment variables: NEXT_PUBLIC_AUTH_URL, NEXT_PUBLIC_WEBSITE_URL",
    )
  }

  const fallback = `${new URL(websiteUrl).origin}/profile`
  if (!value) return fallback

  let url: URL
  try {
    url = new URL(value)
  } catch {
    return fallback
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return fallback

  // trustedOrigins is also the CORS and Better Auth origin list. Add an origin
  // there only if you trust it for both jobs.
  const allowed = [...trustedOrigins, new URL(authUrl).origin]
  return allowed.includes(url.origin) ? url.href : fallback
}

/** Same-origin link to another auth page that keeps the `redirect` param. */
export function withRedirect(path: AuthPage, redirect: string | null): string {
  if (!redirect) return path
  return `${path}?${new URLSearchParams({ redirect })}`
}
