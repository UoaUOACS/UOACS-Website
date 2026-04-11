import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/services/auth.service"
import { PayloadEmailService } from "@/services/email/payload-email.service"

export async function POST(request: NextRequest) {
  const authService = new AuthService()

  try {
    const { email } = await request.json()
    const code = authService.generateVerificationCode()

    await authService.createVerificationCode(email, code)
    await PayloadEmailService.sendVerificationCode(email, code)
  } catch (error) {
    console.error("[SignUp] Failed to send verification code", { error })
    return new NextResponse(JSON.stringify({ error: "Failed to send verification code" }), {
      status: 500,
    })
  }

  return new NextResponse(JSON.stringify({ message: "Verification code sent" }))
}
