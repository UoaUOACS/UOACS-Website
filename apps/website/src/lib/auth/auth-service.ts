import "server-only"
import type { AuthApiRoute } from "@uoacs/shared"

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL

function url(path: AuthApiRoute): string {
  if (!baseUrl) throw new Error("Missing required environment variable: NEXT_PUBLIC_AUTH_URL")
  return `${baseUrl}${path}`
}

/**
 * Calls the auth service as the signed-in person, by replaying their cookie.
 * Only the cookie is forwarded — passing the whole header set would send the
 * website's Host and Origin too, which Better Auth checks.
 */
export function sessionFetch(
  path: AuthApiRoute,
  headers: Headers,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(url(path), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      cookie: headers.get("cookie") ?? "",
    },
  })
}
