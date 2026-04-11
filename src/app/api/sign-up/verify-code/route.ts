import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/services/auth.service"

export async function POST(request: NextRequest) {
  const authService = new AuthService()

  try {
    const { email, code } = await request.json()

    const result = await authService.getVerificationCode(email)
    if (!result) {
      return new NextResponse(
        JSON.stringify({ error: "No verification code found for this email" }),
        {
          status: 404,
        },
      )
    }

    const { hashedCode, expiresAt } = result

    if (new Date() > new Date(expiresAt)) {
      return new NextResponse(JSON.stringify({ error: "Verification code has expired" }), {
        status: 400,
      })
    }

    const isVerified = authService.verifyVerificationCode(code, hashedCode)

    if (!isVerified) {
      return new NextResponse(JSON.stringify({ error: "Invalid verification code" }), {
        status: 400,
      })
    }
  } catch (error) {
    console.error("[SignUp] Failed to verify code", { error })
    return new NextResponse(JSON.stringify({ error: "Failed to verify code" }), {
      status: 500,
    })
  }

  return new NextResponse(JSON.stringify({ message: "Verification successful" }))
}
