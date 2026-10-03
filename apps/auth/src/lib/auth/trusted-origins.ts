/**
 * Origins this service trusts. The list has two jobs:
 *
 * - Better Auth rejects requests from any other origin, and the /api/auth
 *   route handler returns CORS headers only to these.
 * - `safeRedirect` accepts a return URL only on one of these origins (or the
 *   auth origin itself).
 *
 * Add an origin only if you trust it for both.
 *
 * Normalised to bare origins, because the /api/auth route handler and
 * `safeRedirect` both compare them against `URL.origin` values. Better Auth
 * normalises its own copy, so a configured value with a trailing slash would
 * pass its check and fail ours.
 *
 * Reads only env vars, so client code can import it without pulling in
 * Better Auth or Mongo.
 */
export const trustedOrigins = [
  process.env.NEXT_PUBLIC_WEBSITE_URL,
  process.env.NEXT_PUBLIC_PROJECTS_URL,
]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => new URL(origin).origin)
