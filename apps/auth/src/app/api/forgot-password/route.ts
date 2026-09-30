import { z } from "zod"
import { auth } from "@/lib/auth/auth"
import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { MemberService } from "@/services/member.service"

const members = new MemberService()

const bodySchema = z.object({
  email: z.email(),
  /**
   * Absolute, not a path: Better Auth resolves this against its own base URL,
   * so a relative value would land on the auth service rather than the site
   * the caller meant.
   *
   * Guarded by the service token on this route, not by Better Auth here —
   * originCheck skips direct server calls, which have no request to check.
   * The origin is checked when the emailed link is opened, so it has to be in
   * this service's trustedOrigins or every reset link 403s at the callback.
   */
  redirectTo: z.url(),
  /** Path on the website where an unclaimed member finishes signing up. */
  signUpPath: z.string().startsWith("/"),
})

export async function POST(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  let body: z.infer<typeof bodySchema>
  try {
    body = bodySchema.parse(await request.json())
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  try {
    // Members who predate Better Auth have no account to reset, so its own
    // flow would silently do nothing for them. Send them to sign-up instead.
    if (await members.hasUnlinkedMember(body.email)) {
      await PayloadEmailService.sendCompleteSignUp(
        body.email,
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}${body.signUpPath}`,
      )
    } else {
      await auth.api.requestPasswordReset({
        body: { email: body.email, redirectTo: body.redirectTo },
      })
    }
  } catch (error) {
    console.error("[POST /api/forgot-password] Failed to process request", { error })
    return Response.json({ error: "Failed to process request" }, { status: 500 })
  }

  return Response.json({
    message: "If an account exists for that email, we've sent a link to continue.",
  })
}
