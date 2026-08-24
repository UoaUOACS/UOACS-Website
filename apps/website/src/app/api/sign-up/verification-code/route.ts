import { type NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { AuthService } from "@/services/auth.service"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { sendCodeSchema, verifyCodeSchema } from "@/types/schemas/verification-code"

/**
 * Handles POST requests to send a verification code to the provided email.
 * Validates the request body, generates a code, stores it, and sends it via email.
 *
 * @param request The incoming NextRequest containing the email in the body
 * @returns A JSON response indicating success or failure of the operation
 */
export async function POST(request: NextRequest) {
  const authService = new AuthService()

  let email: string
  try {
    const body = await request.json()
    const { email: parsedEmail } = sendCodeSchema.parse(body)
    email = parsedEmail
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[SignUp/verification-code] Unexpected error parsing request body", { err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  const code = authService.generateVerificationCode()

  try {
    await authService.createVerificationCode(email, code)
  } catch (error) {
    console.error("[SignUp/verification-code] Failed to store verification code", { error })
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  try {
    await PayloadEmailService.sendVerificationCode(email, code)
  } catch (error) {
    console.error("[SignUp/verification-code] Email delivery failed — cleaning up stored code", {
      error,
    })
    await authService.deleteVerificationCodes(email).catch((e) =>
      console.error("[SignUp/verification-code] CRITICAL: Failed to clean up phantom code", {
        e,
      }),
    )
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  return NextResponse.json({ message: "Verification code sent" })
}

/**
 * Verifies the provided code for the given email.
 * If valid, deletes all codes for that email and checks if a member account already exists.
 *
 * @param request The incoming NextRequest containing the email and code in the body
 * @returns JSON response indicating success or failure, and whether a member account exists for the email
 */
export async function PUT(request: NextRequest) {
  const authService = new AuthService()
  let memberExists = false

  let email: string
  let code: string
  try {
    const body = await request.json()
    const { email: parsedEmail, code: parsedCode } = verifyCodeSchema.parse(body)
    email = parsedEmail
    code = parsedCode
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[SignUp/verification-code] Unexpected error parsing request body", { err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  try {
    const unexpired = await authService.getUnexpiredVerificationCodes(email)

    if (unexpired.length === 0) {
      return NextResponse.json({ error: "expired" }, { status: 400 })
    }

    const matchingCode = unexpired.find((c) =>
      authService.verifyVerificationCode(code, c.hashedCode),
    )

    if (!matchingCode) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }
  } catch (error) {
    console.error("[SignUp/verification-code] Failed to look up verification codes", { error })
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }

  try {
    await authService.deleteVerificationCodes(email)
    memberExists = await authService.checkMemberExists(email)
  } catch (error) {
    console.error("[SignUp/verification-code] Code was valid but post-verification step failed", {
      email,
      error,
    })
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }

  return NextResponse.json({ message: "Verification successful", memberExists })
}
