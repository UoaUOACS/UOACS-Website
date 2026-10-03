/**
 * Origins allowed to call this service. Better Auth rejects requests from
 * anywhere else, and the route handler only returns CORS headers to these.
 *
 * Normalised, because the route compares these against the Origin header the
 * browser sends. Better Auth normalises its own copy, so a configured value
 * carrying a trailing slash would pass its check and fail the route's.
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
