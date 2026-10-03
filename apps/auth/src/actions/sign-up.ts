"use server"

import { type SignUpBody, sendCodeSchema, signUpBodySchema, verifyCodeSchema } from "@uoacs/shared"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import {
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
  | { ok: false; error: "invalid"; issues: { field: string; message: string }[] }
  | { ok: false; error: "server" }

/**
 * Emails a sign-up verification code. Replaces `POST /api/verification-code`.
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
 * Checks a sign-up verification code. Replaces `PUT /api/verification-code`.
 *
 * Anyone can call a server action. `memberExists` tells the form whether to
 * show the claim-your-account step or the full member form.
 */
export async function verifyCode(email: string, code: string): Promise<VerifyCodeResult> {
  const parsed = verifyCodeSchema.safeParse({ email, code })
  if (!parsed.success) return { ok: false, error: "invalid" }

  try {
    const result = await codes.verify(parsed.data.email, parsed.data.code)
    if (result === "expired" || result === "invalid") return { ok: false, error: result }

    await codes.deleteAll(parsed.data.email)
    const memberExists = await members.hasUnlinkedMember(parsed.data.email)
    return { ok: true, memberExists }
  } catch (error) {
    console.error("[verifyCode] Failed to verify", { error })
    return { ok: false, error: "server" }
  }
}

/**
 * Creates the account and its member row, then signs the person in. Replaces
 * `POST /api/member`. Better Auth's `nextCookies()` plugin sets the session
 * cookie.
 *
 * Anyone can call a server action, so this does not rely on a secret from the
 * caller.
 */
export async function signUp(body: SignUpBody): Promise<SignUpResult> {
  const parsed = signUpBodySchema.safeParse(body)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }))
    return { ok: false, error: "invalid", issues }
  }

  try {
    await members.register(parsed.data)
    return { ok: true }
  } catch (err) {
    if (err instanceof DuplicateFieldError)
      return { ok: false, error: "duplicate", field: err.field }
    if (err instanceof NoUnlinkedMemberError) return { ok: false, error: "no-unlinked-member" }
    console.error("[signUp] Sign up failed", { email: parsed.data.email, error: err })
    return { ok: false, error: "server" }
  }
}
