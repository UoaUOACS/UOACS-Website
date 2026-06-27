import { type NextRequest, NextResponse } from "next/server"
import { ValidationError } from "payload"
import { ZodError } from "zod"
import { auth } from "@/lib/auth"
import { AuthService, DuplicateFieldError } from "@/services/auth.service"
import { updateMemberSchema } from "@/types/schemas/member"

export async function PATCH(req: NextRequest) {
  let session: Awaited<ReturnType<typeof auth.api.getSession>> | undefined
  let member: Awaited<ReturnType<InstanceType<typeof AuthService>["getMemberFromUser"]>> | undefined

  try {
    session = await auth.api.getSession({ headers: req.headers })
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const authService = new AuthService()
    member = await authService.getMemberFromUser(session.user)
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    const body = await req.json()
    const data = updateMemberSchema.parse(body)

    const effectiveCompsciStudent = data.compsciStudent ?? member.compsciStudent
    const effectiveOtherMajors = data.otherMajors ?? member.otherMajors
    if (
      effectiveCompsciStudent === false &&
      (!effectiveOtherMajors || effectiveOtherMajors.length === 0)
    ) {
      return NextResponse.json(
        { error: [{ field: "otherMajors", message: "Please enter your major(s)" }] },
        { status: 400 },
      )
    }

    const updated = await authService.updateMember(member.id, data)
    await authService.updateAuthUser(data, member, req.headers)

    return NextResponse.json(updated, { status: 200 })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    if (err instanceof ZodError) {
      const fieldErrors = err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
      return NextResponse.json({ error: fieldErrors }, { status: 400 })
    }
    if (err instanceof DuplicateFieldError) {
      return NextResponse.json(
        { error: [{ field: err.field, message: "Value already in use" }] },
        { status: 409 },
      )
    }
    if (err instanceof ValidationError) {
      const fieldErrors =
        err.data?.errors?.map((e) => ({ field: e.path ?? "", message: e.message })) ?? []
      return NextResponse.json({ error: fieldErrors }, { status: 422 })
    }
    console.error("[PATCH /api/profile] Unhandled error", {
      memberId: member?.id,
      userId: session?.user?.id,
      error: err,
    })
    throw err
  }
}
