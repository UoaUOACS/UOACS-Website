import { AuthApiRoutes, memberResponseSchema } from "@uoacs/shared"
import type { Member, UpdateMemberInput } from "@uoacs/shared/payload"
import type { z } from "zod"
import { sessionFetch } from "@/lib/auth/auth-service"

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message)
    this.name = "AuthServiceError"
  }
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Parses rather than asserts. A cast would make a shape change in the auth
 * service surface somewhere far from here, as a property that is undefined at
 * runtime but typed as present.
 */
async function unwrap<T>(response: Response, schema: z.ZodType<T>, context: string): Promise<T> {
  const body = await readBody(response)

  if (response.ok) {
    const parsed = schema.safeParse(body)
    if (parsed.success) return parsed.data
    throw new AuthServiceError(
      `${context} returned an unexpected shape`,
      response.status,
      parsed.error.issues,
    )
  }

  throw new AuthServiceError(`${context} failed with ${response.status}`, response.status, body)
}

export class AuthService {
  /** Null for both "not signed in" and "no member", for callers that treat them alike. */
  public async getMember(headers: Headers): Promise<Member | null> {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, headers)
    if (response.status === 401 || response.status === 404) return null
    return unwrap(response, memberResponseSchema, "getMember")
  }

  /** Keeps 401 and 404 apart, for the route that proxies them to the browser. */
  public async fetchMember(
    headers: Headers,
  ): Promise<{ member: Member; status: 200 } | { member: null; status: number }> {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, headers)
    if (response.ok) {
      return { member: await unwrap(response, memberResponseSchema, "fetchMember"), status: 200 }
    }
    return { member: null, status: response.status }
  }

  public async updateMember(
    headers: Headers,
    data: UpdateMemberInput,
  ): Promise<{ member: Member; status: number } | { error: unknown; status: number }> {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, headers, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    const body = await readBody(response)
    if (response.ok) return { member: memberResponseSchema.parse(body), status: response.status }
    return { error: body, status: response.status }
  }
}
