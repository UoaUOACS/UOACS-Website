/**
 * Origins this service trusts, Add an origin only if you trust it for both.
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
