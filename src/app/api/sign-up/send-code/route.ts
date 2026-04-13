import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/services/auth.service"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { sendCodeSchema } from "@/types/schemas/verification-code"

export async function POST(request: NextRequest) {
  const authService = new AuthService()

  let email: string
  try {
    const body = await request.json()
    const { email: parsedEmail } = sendCodeSchema.parse(body)
    email = parsedEmail
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const code = authService.generateVerificationCode()

  try {
    await authService.createVerificationCode(email, code)
  } catch (error) {
    console.error("[SignUp/send-code] Failed to store verification code", { error })
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  try {
    await PayloadEmailService.sendVerificationCode(email, code)
  } catch (error) {
    console.error("[SignUp/send-code] Email delivery failed — cleaning up stored code", { error })
    await authService
      .deleteVerificationCodes(email)
      .catch((e) =>
        console.error("[SignUp/send-code] CRITICAL: Failed to clean up phantom code", { e }),
      )
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  return NextResponse.json({ message: "Verification code sent" })
}
