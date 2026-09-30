import { createMemberSchema } from "@uoacs/shared/payload"
import { isAPIError } from "better-auth/api"
import { z } from "zod"
import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import { DuplicateFieldError, MemberService } from "@/services/member.service"

const members = new MemberService()

const accountSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
})

const bodySchema = z.union([
  z.object({ existingMember: z.literal(true) }).and(accountSchema),
  createMemberSchema.extend({ password: z.string().min(8) }),
])

/**
 * Creates the account and its member row together, and hands back Better
 * Auth's Set-Cookie so the caller can sign the person straight in.
 *
 * Service-token guarded rather than open: the website gates sign-up behind an
 * emailed verification code, and an unauthenticated endpoint here would let
 * anyone create member records without ever proving they own the address.
 */
export async function POST(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  let body: z.infer<typeof bodySchema>
  try {
    body = bodySchema.parse(await request.json())
  } catch (err) {
    if (err instanceof SyntaxError) {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    if (err instanceof z.ZodError) {
      const error = err.issues.map((i) => ({ field: i.path.join("."), message: i.message }))
      return Response.json({ error }, { status: 400 })
    }
    throw err
  }

  let user: Awaited<ReturnType<MemberService["signUp"]>>
  try {
    user = await members.signUp(body)
  } catch (err) {
    if (isAPIError(err) && err.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      return Response.json({ error: "Value already in use", field: "email" }, { status: 409 })
    }
    console.error("[POST /api/member] Sign up failed", { email: body.email, error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }

  try {
    const linkOnly = "existingMember" in body || (await members.hasUnlinkedMember(body.email))
    const member = linkOnly
      ? await members.link(body.email, user.user.id)
      : await members.create(createMemberSchema.parse(body), user.user.id)

    return Response.json(member, { status: 201, headers: user.headers })
  } catch (err) {
    // The account exists but has no member row, so it would be a login that
    // resolves to nothing. Undo it rather than leave that behind.
    await members.deleteAccount(user.user.id).catch((cleanupError) => {
      console.error("[POST /api/member] CRITICAL: account rollback failed, record leaked", {
        betterAuthUserId: user.user.id,
        error: cleanupError,
      })
    })

    if (err instanceof DuplicateFieldError) {
      return Response.json({ error: "Value already in use", field: err.field }, { status: 409 })
    }
    console.error("[POST /api/member] Member creation failed, account rolled back", { error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
