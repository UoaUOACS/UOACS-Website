"use server"

import { AuthPages, authPageUrl, forgotPasswordSchema } from "@uoacs/shared"
import { auth } from "@/lib/auth/auth"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { MemberService } from "@/services/member.service"

const members = new MemberService()

export type ForgotPasswordResult = { ok: true } | { ok: false; error: "invalid" | "server" }

/**
 * Sends a password reset link, or a finish-sign-up link to a member who has no
 * account yet. Replaces `POST /api/forgot-password`.
 *
 * Anyone can call a server action. `redirect` is user input, so it is passed
 * on only when it is an absolute URL. The pages check it with `safeRedirect`
 * when the person returns.
 */
export async function forgotPassword(
  email: string,
  redirect: string | null,
): Promise<ForgotPasswordResult> {
  const parsed = forgotPasswordSchema.safeParse({ email })
  if (!parsed.success) return { ok: false, error: "invalid" }
  const address = parsed.data.email
  const returnTo = redirect && URL.canParse(redirect) ? redirect : undefined

  try {
    // Members who predate Better Auth have no account to reset, so its own
    // flow would silently do nothing for them. Send them to sign-up instead.
    if (await members.hasUnlinkedMember(address)) {
      await PayloadEmailService.sendCompleteSignUp(
        address,
        authPageUrl(AuthPages.SIGN_UP, returnTo),
      )
    } else {
      await auth.api.requestPasswordReset({
        body: { email: address, redirectTo: authPageUrl(AuthPages.RESET_PASSWORD, returnTo) },
      })
    }
  } catch (error) {
    console.error("[forgotPassword] Failed to process request", { error })
    return { ok: false, error: "server" }
  }

  return { ok: true }
}
