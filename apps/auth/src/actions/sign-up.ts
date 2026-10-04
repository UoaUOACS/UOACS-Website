"use server"

import { type SignUpBody, sendCodeSchema, signUpBodySchema, verifyCodeSchema } from "@uoacs/shared"
import { cookies } from "next/headers"
import { z } from "zod"
import { auth } from "@/lib/auth/auth"
import { clearVerifiedEmail, isEmailVerified, setVerifiedEmail } from "@/lib/verified-email"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import {
  AccountRollbackError,
  DuplicateFieldError,
  MemberService,
  NoUnlinkedMemberError,
} from "@/services/member.service"
import {
  VerificationCodeCooldownError,
  VerificationCodeService,
} from "@/services/verification-code.service"

const codes = new VerificationCodeService()
const members = new MemberService()

export type SendVerificationCodeResult =
  | { ok: true }
  | { ok: false; error: "cooldown"; retryAfter: number }
  | { ok: false; error: "invalid" | "server" }

export type VerifyCodeResult =
  | { ok: true; memberExists: boolean }
  | { ok: false; error: "expired" | "invalid" | "server" }

export type SignUpResult =
  | { ok: true }
  | { ok: false; error: "duplicate"; field: string }
  | { ok: false; error: "no-unlinked-member" }
  | { ok: false; error: "unverified" }
  | { ok: false; error: "invalid"; issues: { field: string; message: string }[] }
  | { ok: false; error: "server" }

/**
 * Emails a sign-up verification code.
 *
 * Anyone can call a server action, so the per-email cooldown is the only
 * limit here. It does not rely on the caller.
 */
export async function sendVerificationCode(email: string): Promise<SendVerificationCodeResult> {
  const parsed = sendCodeSchema.safeParse({ email })
  if (!parsed.success) return { ok: false, error: "invalid" }
  const address = parsed.data.email

  const code = codes.generate()
  try {
    await codes.create(address, code)
  } catch (error) {
    if (error instanceof VerificationCodeCooldownError) {
      return { ok: false, error: "cooldown", retryAfter: error.retryAfterSeconds }
    }
    console.error("[sendVerificationCode] Failed to store code", { error })
    return { ok: false, error: "server" }
  }

  // Not awaited so a slow provider doesn't hold the request open. If delivery
  // fails the stored code is removed, otherwise the caller would be told to
  // check an inbox that never receives anything.
  void PayloadEmailService.sendVerificationCode(address, code).catch(async (error) => {
    console.error("[sendVerificationCode] Delivery failed, removing stored code", { error })
    await codes
      .deleteAll(address)
      .catch((e) =>
        console.error("[sendVerificationCode] CRITICAL: phantom code left behind", { e }),
      )
  })

  return { ok: true }
}

/**
 * Checks a sign-up verification code.
 *
 * Anyone can call a server action. On success it sets a short-lived signed
 * cookie that `signUp` checks. `memberExists` tells the form whether to show
 * the claim-your-account step or the full member form.
 */
export async function verifyCode(email: string, code: string): Promise<VerifyCodeResult> {
  const parsed = verifyCodeSchema.safeParse({ email, code })
  if (!parsed.success) return { ok: false, error: "invalid" }

  try {
    const result = await codes.verify(parsed.data.email, parsed.data.code)
    if (result === "expired" || result === "invalid") return { ok: false, error: result }

    // Counted before the code is spent, so a failed count does not burn it.
    const memberExists = await members.hasUnlinkedMember(parsed.data.email)
    await codes.deleteAll(parsed.data.email)
    // The code is spent now. If this fails, the person must request a new one.
    await setVerifiedEmail(parsed.data.email)
    return { ok: true, memberExists }
  } catch (error) {
    console.error("[verifyCode] Failed to verify", { error })
    return { ok: false, error: "server" }
  }
}

/**
 * Creates the account and its member row, then signs the person in. Better
 * Auth's `nextCookies()` plugin sets the session cookie.
 *
 * Anyone can call a server action, so it only goes ahead if the signed cookie
 * from `verifyCode` proves this browser owns the email.
 */
export async function signUp(body: SignUpBody): Promise<SignUpResult> {
  const parsed = signUpBodySchema.safeParse(body)
  if (!parsed.success) return { ok: false, error: "invalid", issues: toIssues(parsed.error) }

  try {
    if (!(await isEmailVerified(parsed.data.email))) return { ok: false, error: "unverified" }
  } catch (error) {
    console.error("[signUp] Failed to read verified email", { error })
    return { ok: false, error: "server" }
  }

  // The cookie is kept on failure, so the person can fix a duplicate and retry.
  try {
    await members.register(parsed.data)
  } catch (err) {
    if (err instanceof DuplicateFieldError)
      return { ok: false, error: "duplicate", field: err.field }
    if (err instanceof NoUnlinkedMemberError) return { ok: false, error: "no-unlinked-member" }
    if (err instanceof z.ZodError) return { ok: false, error: "invalid", issues: toIssues(err) }
    if (err instanceof AccountRollbackError) await clearSessionCookies()
    console.error("[signUp] Sign up failed", { email: parsed.data.email, error: err })
    return { ok: false, error: "server" }
  }

  // The account exists now, so a failure here is only logged.
  await clearVerifiedEmail().catch((error) =>
    console.error("[signUp] Failed to clear verified email", { error }),
  )
  return { ok: true }
}

function toIssues(error: z.ZodError): { field: string; message: string }[] {
  return error.issues.map((i) => ({ field: i.path.join("."), message: i.message }))
}

/**
 * `nextCookies()` sets the session cookie as soon as the account exists. If
 * the account could not be undone, expire the cookie so the browser does not
 * keep a session that resolves to no member. Same cookies as Better Auth's own
 * `deleteSessionCookie`, with the cross-subdomain domain when it is set.
 */
async function clearSessionCookies(): Promise<void> {
  try {
    const { authCookies } = await auth.$context
    const jar = await cookies()
    for (const { name, attributes } of [
      authCookies.sessionToken,
      authCookies.sessionData,
      authCookies.dontRememberToken,
    ]) {
      // Name, domain and path must match for the browser to replace it;
      // secure is required for the __Secure- prefix.
      const { domain, path, secure } = attributes
      jar.set(name, "", { domain, path, secure, maxAge: 0 })
    }
  } catch (error) {
    console.error("[signUp] CRITICAL: could not clear session cookie after failed rollback", {
      error,
    })
  }
}
