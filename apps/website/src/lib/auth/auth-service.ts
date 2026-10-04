import "server-only"
import type { AuthApiRoute } from "@uoacs/shared"

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL

/**
 * Read per call rather than at module scope: this module is in the import
 * graph of several routes, so a module-level throw would make the token a
 * build-time requirement for an value that is only ever used at runtime.
 */
function serviceToken(): string {
  const token = process.env.AUTH_SERVICE_TOKEN
  if (!token) throw new Error("Missing required environment variable: AUTH_SERVICE_TOKEN")
  return token
}

function url(path: AuthApiRoute): string {
  if (!baseUrl) throw new Error("Missing required environment variable: NEXT_PUBLIC_AUTH_URL")
  return `${baseUrl}${path}`
}

/**
 * Calls the auth service as the website itself, for operations no user
 * session can authorise, such as admin member deletion. The token never
 * leaves the server.
 *
 * Deliberately unbounded: aborting here does not stop the auth service, so a
 * timeout on a write would report failure over work that completed. Callers
 * that need a bound pass their own signal.
 */
export function serviceFetch(path: AuthApiRoute, init: RequestInit = {}): Promise<Response> {
  return fetch(url(path), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      Authorization: `Bearer ${serviceToken()}`,
    },
  })
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
