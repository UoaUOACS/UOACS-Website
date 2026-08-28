import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { auth } from "@/lib/auth/auth"
import { Routes } from "@/lib/routes"
import { AuthService } from "@/services/auth.service"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { forgotPasswordSchema } from "@/types/schemas/forgot-password"

export async function POST(request: Request) {
  const authService = new AuthService()

  let email: string
  try {
    const body = await request.json()
    ;({ email } = forgotPasswordSchema.parse(body))
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[POST /api/forgot-password] Unexpected error parsing request body", {
      error: err,
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  let step: "checkMember" | "sendCompleteSignUp" | "requestPasswordReset" = "checkMember"
  try {
    const hasUnlinkedMember = await authService.checkMemberExists(email)

    // Members created before Better Auth sign-up existed have no linked account
    // so Better Auth's own reset flow silently no-ops for them.
    if (hasUnlinkedMember) {
      step = "sendCompleteSignUp"
      const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${Routes.SIGN_UP}`
      await PayloadEmailService.sendCompleteSignUp(email, url)
    } else {
      step = "requestPasswordReset"
      await auth.api.requestPasswordReset({
        body: { email, redirectTo: Routes.RESET_PASSWORD },
      })
    }
  } catch (error) {
    console.error("[POST /api/forgot-password] Failed to process request", { email, step, error })
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    )
  }

  return NextResponse.json({
    message: "If an account exists for that email, we've sent a link to continue.",
  })
}
