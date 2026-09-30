import "server-only"

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL

/**
 * The root layout awaits getSession, so every server-rendered page waits on
 * this. Without a bound, one unhealthy auth machine stalls the whole site
 * rather than rendering it logged out.
 */
const TIMEOUT_MS = 5000

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

function url(path: string): string {
  if (!baseUrl) throw new Error("Missing required environment variable: NEXT_PUBLIC_AUTH_URL")
  return `${baseUrl}${path}`
}

/**
 * Calls the auth service as the website itself, for operations that happen
 * before anyone is signed in. The token never leaves the server.
 */
export function serviceFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(url(path), {
    ...init,
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(TIMEOUT_MS),
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
  path: string,
  headers: Headers,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(url(path), {
    ...init,
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      cookie: headers.get("cookie") ?? "",
    },
  })
}
