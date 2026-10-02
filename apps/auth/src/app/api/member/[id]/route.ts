import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import { MemberService } from "@/services/member.service"

const members = new MemberService()

/**
 * Admin deletion. The caller is responsible for checking that its own operator
 * is allowed to do this; the service token only proves the request came from a
 * trusted app, not that a human authorised it.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  const { id } = await params

  try {
    const member = await members.findById(id)
    if (!member) return Response.json({ error: "Member not found" }, { status: 404 })

    await members.deleteWithAccount(id, member.betterAuthUserId)
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error("[DELETE /api/member/:id] Unhandled error", { id, error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
