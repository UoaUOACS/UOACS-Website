import { ZodError } from "zod"
import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/payload/slugs"
import { AuthService, DuplicateFieldError } from "@/services/auth.service"
import { signUpSchema } from "@/types/schemas/sign-up"
import { createUserServerSchema } from "@/types/schemas/user"

export async function POST(request: Request) {
  const authService = new AuthService()

  try {
    const body = await request.json()

    if (body?.existingMember === true) {
      const user = createUserServerSchema.parse(body)
      const { user: baUser, headers } = await authService.signUpBetterAuth(user)
      const member = await authService.linkExistingMember(user.email, baUser.id)
      return new Response(JSON.stringify(member), { status: 201, headers })
    }

    const { password, ...memberData } = signUpSchema.parse(body)

    const existing = await payload.find({
      collection: Slugs.Collections.MEMBER,
      where: { email: { equals: memberData.email } },
      limit: 1,
    })

    const { user: baUser, headers } = await authService.signUpBetterAuth({
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      email: memberData.email,
      password,
    })

    const member =
      existing.docs.length > 0
        ? await authService.linkExistingMember(memberData.email, baUser.id)
        : await authService.signUpPayloadMember(memberData, baUser.id)

    return new Response(JSON.stringify(member), { status: 201, headers })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 })
    }
    if (err instanceof ZodError) {
      const fieldErrors = err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
      return new Response(JSON.stringify({ error: fieldErrors }), { status: 400 })
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
