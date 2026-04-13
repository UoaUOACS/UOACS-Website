import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/services/auth.service"

const verifyCodeSchema = z.object({
  email: z.email(),
  code: z.string().length(6).regex(/^\d+$/),
})

export async function POST(request: NextRequest) {
  const authService = new AuthService()
  let memberExists = false

  let email: string
  let code: string
  try {
    const body = await request.json()
    ;({ email, code } = verifyCodeSchema.parse(body))
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
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

    await authService.deleteVerificationCodes(email)

    memberExists = await authService.checkMemberExists(email)
  } catch (error) {
    console.error("[SignUp] Failed to verify code", { error })
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }

  return NextResponse.json({ message: "Verification successful", memberExists })
}
