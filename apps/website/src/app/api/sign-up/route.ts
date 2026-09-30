import { ZodError } from "zod"
import { AuthService, AuthServiceError, DuplicateFieldError } from "@/services/auth.service"
import { signUpSchema } from "@/types/schemas/sign-up"
import { createUserServerSchema } from "@/types/schemas/user"

export async function POST(request: Request) {
  const authService = new AuthService()

  try {
    const body = await request.json()

    const payload =
      body?.existingMember === true
        ? { ...createUserServerSchema.parse(body), existingMember: true as const }
        : signUpSchema.parse(body)

    const { member, setCookie } = await authService.signUp(payload)

    // Relayed one by one: Better Auth may set more than one cookie, and a
    // plain object would keep only the last.
    const headers = new Headers({ "Content-Type": "application/json" })
    for (const cookie of setCookie) headers.append("set-cookie", cookie)

    return new Response(JSON.stringify(member), { status: 201, headers })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    if (err instanceof ZodError) {
      const error = err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
      return Response.json({ error }, { status: 400 })
    }
    if (err instanceof DuplicateFieldError) {
      return Response.json({ error: "Value already in use", field: err.field }, { status: 409 })
    }
    if (err instanceof AuthServiceError) {
      console.error("[POST /api/sign-up] Auth service rejected the request", {
        status: err.status,
        body: err.body,
      })
      return Response.json({ error: "Internal server error" }, { status: 500 })
    }
    console.error("[POST /api/sign-up] Unhandled error", { error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
