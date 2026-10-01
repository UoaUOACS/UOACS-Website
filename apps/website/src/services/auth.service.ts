import { AuthApiRoutes } from "@uoacs/shared"
import type { CreateMemberInput, Member, UpdateMemberInput } from "@uoacs/shared/payload"
import { serviceFetch, sessionFetch } from "@/lib/auth/auth-service"

export class DuplicateFieldError extends Error {
  constructor(public readonly field: string) {
    super("Value already in use")
    this.name = "DuplicateFieldError"
  }
}

export class VerificationCodeCooldownError extends Error {
  constructor(public readonly retryAfterSeconds: number) {
    super("Verification code requested too recently")
    this.name = "VerificationCodeCooldownError"
  }
}

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

function fieldFrom(body: unknown): string | null {
  if (body && typeof body === "object" && "field" in body) {
    const field = (body as { field: unknown }).field
    if (typeof field === "string") return field
  }
  return null
}

async function unwrap<T>(response: Response, context: string): Promise<T> {
  const body = await readBody(response)
  if (response.ok) return body as T

  const field = fieldFrom(body)
  if (response.status === 409 && field !== null) throw new DuplicateFieldError(field)

  throw new AuthServiceError(`${context} failed with ${response.status}`, response.status, body)
}

export type SignUpResult = { member: Member; setCookie: string[] }

export class AuthService {
  /**
   * Creates the account and member row in one call. The auth service's
   * Set-Cookie headers come back so the caller can pass them to the browser,
   * which signs the person in without a second round trip.
   */
  public async signUp(
    data: (CreateMemberInput & { password: string }) | (SignUpAccount & { existingMember: true }),
  ): Promise<SignUpResult> {
    const response = await serviceFetch(AuthApiRoutes.MEMBER, {
      method: "POST",
      body: JSON.stringify(data),
    })
    const member = await unwrap<Member>(response, "signUp")
    return { member, setCookie: response.headers.getSetCookie() }
  }

  /** Null for both "not signed in" and "no member", for callers that treat them alike. */
  public async getMember(headers: Headers): Promise<Member | null> {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, headers)
    if (response.status === 401 || response.status === 404) return null
    return unwrap<Member>(response, "getMember")
  }

  /** Keeps 401 and 404 apart, for the route that proxies them to the browser. */
  public async fetchMember(
    headers: Headers,
  ): Promise<{ member: Member; status: 200 } | { member: null; status: number }> {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, headers)
    if (response.ok) return { member: (await readBody(response)) as Member, status: 200 }
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
    if (response.ok) return { member: body as Member, status: response.status }
    return { error: body, status: response.status }
  }

  public async deleteMember(id: string): Promise<number> {
    const response = await serviceFetch(AuthApiRoutes.MEMBER_BY_ID(id), {
      method: "DELETE",
    })
    return response.status
  }

  public async sendVerificationCode(email: string): Promise<void> {
    const response = await serviceFetch(AuthApiRoutes.VERIFICATION_CODE, {
      method: "POST",
      body: JSON.stringify({ email }),
    })

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("Retry-After") ?? "60")
      throw new VerificationCodeCooldownError(Number.isFinite(retryAfter) ? retryAfter : 60)
    }
    await unwrap<unknown>(response, "sendVerificationCode")
  }

  public async verifyCode(
    email: string,
    code: string,
  ): Promise<{ ok: true; memberExists: boolean } | { ok: false; error: string }> {
    const response = await serviceFetch(AuthApiRoutes.VERIFICATION_CODE, {
      method: "PUT",
      body: JSON.stringify({ email, code }),
    })
    const body = (await readBody(response)) as { memberExists?: boolean; error?: string } | null

    if (response.ok) return { ok: true, memberExists: Boolean(body?.memberExists) }
    if (response.status === 400) {
      return { ok: false, error: body?.error ?? "Invalid verification code" }
    }
    throw new AuthServiceError("verifyCode failed", response.status, body)
  }

  public async forgotPassword(
    email: string,
    redirectTo: string,
    signUpPath: string,
  ): Promise<void> {
    const response = await serviceFetch(AuthApiRoutes.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify({ email, redirectTo, signUpPath }),
    })
    await unwrap<unknown>(response, "forgotPassword")
  }
}

type SignUpAccount = {
  firstName: string
  lastName: string
  email: string
  password: string
}
