import { type SignUpBody, signUpBodySchema } from "@uoacs/shared"
import { z } from "zod"
import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import {
  DuplicateFieldError,
  MemberService,
  NoUnlinkedMemberError,
} from "@/services/member.service"

const members = new MemberService()

/**
 * Creates the account and its member row together. Better Auth's nextCookies()
 * plugin sets the session cookie on the response.
 *
 * Service-token guarded rather than open: the website gates sign-up behind an
 * emailed verification code, and an unauthenticated endpoint here would let
 * anyone create member records without ever proving they own the address.
 */
export async function POST(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  let body: SignUpBody
  try {
    body = signUpBodySchema.parse(await request.json())
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

  try {
    const member = await members.register(body)
    return Response.json(member, { status: 201 })
  } catch (err) {
    if (err instanceof NoUnlinkedMemberError) {
      return Response.json(
        { error: "No membership awaiting an account for that email", field: "email" },
        { status: 404 },
      )
    }
    if (err instanceof DuplicateFieldError) {
      return Response.json({ error: "Value already in use", field: err.field }, { status: 409 })
    }
    console.error("[POST /api/member] Sign up failed", { email: body.email, error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
