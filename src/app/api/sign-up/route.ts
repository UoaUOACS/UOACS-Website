import { ZodError } from "zod"
import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/slugs"
import { AuthService, DuplicateFieldError } from "@/services/auth.service"
import { signUpSchema } from "@/types/schemas/sign-up"

export async function POST(request: Request) {
  const authService = new AuthService()

  try {
    const body = await request.json()
    const { password, ...memberData } = signUpSchema.parse(body)

    const existing = await payload.find({
      collection: Slugs.Collections.MEMBER,
      where: { email: { equals: memberData.email } },
      limit: 1,
    })

    const baUser = await authService.signUpBetterAuth({
      name: `${memberData.firstName} ${memberData.lastName}`,
      email: memberData.email,
      password,
    })

    const member =
      existing.docs.length > 0
        ? await authService.linkExistingMember(memberData.email, baUser.id)
        : await authService.signUpPayloadMember(memberData, baUser.id)

    return new Response(JSON.stringify(member), { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify({ error: err.issues }), { status: 400 })
    }
    if (err instanceof DuplicateFieldError) {
      return new Response(JSON.stringify({ error: "Value already in use", field: err.field }), {
        status: 409,
      })
    }
    console.error("[POST /api/sign-up] Unhandled error", { error: err })
    throw err
  }
}
