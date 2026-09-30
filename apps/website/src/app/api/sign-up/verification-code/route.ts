import { type NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { AuthService, VerificationCodeCooldownError } from "@/services/auth.service"
import { sendCodeSchema, verifyCodeSchema } from "@/types/schemas/verification-code"

/** Sends a verification code to the given email. */
export async function POST(request: NextRequest) {
  let email: string
  try {
    ;({ email } = sendCodeSchema.parse(await request.json()))
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[SignUp/verification-code] Unexpected error parsing request body", { err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  try {
    await new AuthService().sendVerificationCode(email)
  } catch (error) {
    if (error instanceof VerificationCodeCooldownError) {
      return NextResponse.json(
        { error: "Please wait before requesting another code" },
        { status: 429, headers: { "Retry-After": String(error.retryAfterSeconds) } },
      )
    }
    console.error("[SignUp/verification-code] Failed to send verification code", { error })
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  return NextResponse.json({ message: "Verification code sent" })
}

/**
 * Verifies the code and reports whether the email already has a member record
 * awaiting an account, which decides the next step in the sign-up form.
 */
export async function PUT(request: NextRequest) {
  let email: string
  let code: string
  try {
    ;({ email, code } = verifyCodeSchema.parse(await request.json()))
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[SignUp/verification-code] Unexpected error parsing request body", { err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  try {
    const result = await new AuthService().verifyCode(email, code)
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 })

    return NextResponse.json({
      message: "Verification successful",
      memberExists: result.memberExists,
    })
  } catch (error) {
    console.error("[SignUp/verification-code] Failed to verify code", { error })
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }
}
