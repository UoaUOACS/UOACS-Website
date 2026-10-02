import { type NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { AuthService } from "@/services/auth.service"
import { updateMemberSchema } from "@/types/schemas/member"

export async function PATCH(req: NextRequest) {
  try {
    const data = updateMemberSchema.parse(await req.json())

    // Validation, duplicate fields and the CS-major rule are all enforced by
    // the auth service, so its status and body pass straight through.
    const result = await new AuthService().updateMember(req.headers, data)
    if ("member" in result) return NextResponse.json(result.member, { status: 200 })

    return NextResponse.json(result.error, { status: result.status })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    if (err instanceof ZodError) {
      const error = err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
      return NextResponse.json({ error }, { status: 400 })
    }
    console.error("[PATCH /api/profile] Unhandled error", { error: err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
