import { z } from "zod"
import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import { PayloadEmailService } from "@/services/email/payload-email.service"
import { MemberService } from "@/services/member.service"
import {
  VerificationCodeCooldownError,
  VerificationCodeService,
} from "@/services/verification-code.service"

const codes = new VerificationCodeService()
const members = new MemberService()

const sendSchema = z.object({ email: z.email() })
const verifySchema = z.object({
  email: z.email(),
  code: z.string().length(6).regex(/^\d+$/),
})

export async function POST(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  let email: string
  try {
    ;({ email } = sendSchema.parse(await request.json()))
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const code = codes.generate()

  try {
    await codes.create(email, code)
  } catch (error) {
    if (error instanceof VerificationCodeCooldownError) {
      return Response.json(
        { error: "Please wait before requesting another code" },
        { status: 429, headers: { "Retry-After": String(error.retryAfterSeconds) } },
      )
    }
    console.error("[POST /api/verification-code] Failed to store code", { error })
    return Response.json({ error: "Failed to send verification code" }, { status: 500 })
  }

  // Not awaited so a slow provider doesn't hold the request open. If delivery
  // fails the stored code is removed, otherwise the caller would be told to
  // check an inbox that never receives anything.
  void PayloadEmailService.sendVerificationCode(email, code).catch(async (error) => {
    console.error("[POST /api/verification-code] Delivery failed, removing stored code", { error })
    await codes
      .deleteAll(email)
      .catch((e) =>
        console.error("[POST /api/verification-code] CRITICAL: phantom code left behind", { e }),
      )
  })

  return Response.json({ message: "Verification code sent" })
}

export async function PUT(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  let email: string
  let code: string
  try {
    ;({ email, code } = verifySchema.parse(await request.json()))
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  try {
    const result = await codes.verify(email, code)
    if (result === "expired") return Response.json({ error: "expired" }, { status: 400 })
    if (result === "invalid") {
      return Response.json({ error: "Invalid verification code" }, { status: 400 })
    }

    await codes.deleteAll(email)

    // Returned here rather than behind another round trip: the caller needs it
    // immediately to choose between the sign-up and claim-your-account forms.
    const memberExists = await members.hasUnlinkedMember(email)
    return Response.json({ message: "Verification successful", memberExists })
  } catch (error) {
    console.error("[PUT /api/verification-code] Failed to verify", { error })
    return Response.json({ error: "Failed to verify code" }, { status: 500 })
  }
}
