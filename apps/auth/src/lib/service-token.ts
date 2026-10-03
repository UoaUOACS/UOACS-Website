import { timingSafeEqual } from "node:crypto"

/**
 * Guards admin deletion (`DELETE /api/member/:id`), which another app calls on
 * behalf of its operator. Everything else authenticates as the member, via the
 * Better Auth session cookie.
 *
 * The secret is read per call so it stays a runtime concern; reading it at
 * module scope would make it a build-time requirement for every route here.
 */
export function hasServiceToken(request: Request): boolean {
  const secret = process.env.AUTH_SERVICE_TOKEN
  if (!secret) {
    console.error("[service-token] AUTH_SERVICE_TOKEN is not set, refusing every request")
    return false
  }

  const header = request.headers.get("authorization")
  if (!header?.startsWith("Bearer ")) return false

  const provided = Buffer.from(header.slice("Bearer ".length))
  const expected = Buffer.from(secret)
  if (provided.length !== expected.length) return false
  return timingSafeEqual(provided, expected)
}

export function serviceTokenRequired(): Response {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}
