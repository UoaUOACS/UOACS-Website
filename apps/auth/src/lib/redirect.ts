import type { AuthPage } from "@uoacs/shared"
import { trustedOrigins } from "@/lib/auth/trusted-origins"

/** Only `safeRedirect` makes one, so a raw `redirect` param cannot be passed where a checked URL is expected. */
export type SafeRedirectUrl = string & { readonly __brand: "SafeRedirectUrl" }

/**
 * Returns `value` as an absolute URL if it is safe to send the user to, or
 * the website profile page if not.
 *
 * Accepts only http(s) URLs on a trusted origin or the auth origin. Relative
 * values (`/x`, `//evil.com`) get the fallback, because `new URL` with no base
 * throws.
 *
 * Throws if NEXT_PUBLIC_AUTH_URL or NEXT_PUBLIC_WEBSITE_URL is not set.
 */
export function safeRedirect(value: string | null | undefined): SafeRedirectUrl {
  // Literal accesses, so Next inlines them in client bundles.
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  if (!authUrl || !websiteUrl) {
    const missingEnvVars = []
    if (!authUrl) missingEnvVars.push("NEXT_PUBLIC_AUTH_URL")
    if (!websiteUrl) missingEnvVars.push("NEXT_PUBLIC_WEBSITE_URL")
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }

  const fallback = `${new URL(websiteUrl).origin}/profile` as SafeRedirectUrl
  if (!value) return fallback

  const reject = (reason: string, origin?: string): SafeRedirectUrl => {
    if (typeof window === "undefined") {
      console.warn("[safeRedirect] Rejected return URL", { reason, origin })
    }
    return fallback
  }

  let url: URL
  try {
    url = new URL(value)
  } catch {
    return reject("unparseable")
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return reject("bad protocol", url.origin)
  }

  // See trusted-origins.ts: this list is also the CORS allowlist.
  if (![...trustedOrigins, new URL(authUrl).origin].includes(url.origin)) {
    return reject("untrusted origin", url.origin)
  }

  return url.href as SafeRedirectUrl
}

/** Same-origin link to another auth page that keeps the `redirect` param. */
export function withRedirect(path: AuthPage, redirect: string | null): string {
  if (!redirect) return path
  return `${path}?${new URLSearchParams({ redirect })}`
}
