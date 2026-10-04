// Proof that this browser entered a valid sign-up code for an email. The code
// is spent once it is checked, so `signUp` reads this signed cookie instead.

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "uoacs.verified-email"
const TTL_SECONDS = 15 * 60
// Prefix so this signature cannot be reused as another signature made with BETTER_AUTH_SECRET.
const PURPOSE = "verified-email:"

function sign(payload: string): Buffer {
  // Read per call so the secret is not needed at build time.
  const secret = process.env.BETTER_AUTH_SECRET
  if (!secret) throw new Error("Missing required environment variables: BETTER_AUTH_SECRET")
  return createHmac("sha256", secret)
    .update(PURPOSE + payload)
    .digest()
}

export function signVerifiedEmail(email: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ email, exp: now + TTL_SECONDS * 1000 })).toString(
    "base64url",
  )
  return `${payload}.${sign(payload).toString("base64url")}`
}

/** True only for a valid, unexpired value for this exact email. Throws if the secret is missing. */
export function isValidVerifiedEmail(
  value: string | undefined,
  email: string,
  now = Date.now(),
): boolean {
  if (!value) return false
  const parts = value.split(".")
  if (parts.length !== 2) return false
  const [payload, signature] = parts

  const provided = Buffer.from(signature, "base64url")
  const expected = sign(payload)
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return false

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    return data?.email === email && typeof data.exp === "number" && data.exp > now
  } catch (error) {
    console.error("[verified-email] Signed payload failed to parse", { error })
    return false
  }
}

// Host-only: no domain, so other subdomains never see it.
function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  } as const
}

export async function setVerifiedEmail(email: string): Promise<void> {
  const jar = await cookies()
  jar.set(COOKIE_NAME, signVerifiedEmail(email), cookieOptions(TTL_SECONDS))
}

export async function isEmailVerified(email: string): Promise<boolean> {
  const jar = await cookies()
  return isValidVerifiedEmail(jar.get(COOKIE_NAME)?.value, email)
}

export async function clearVerifiedEmail(): Promise<void> {
  const jar = await cookies()
  // Same name and path with maxAge 0, so the browser deletes it.
  jar.set(COOKIE_NAME, "", cookieOptions(0))
}
