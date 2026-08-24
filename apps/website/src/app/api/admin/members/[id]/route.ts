import { auth } from "@/lib/auth/auth"
import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/payload/slugs"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const { id } = await params

  try {
    const member = await payload.findByID({ collection: Slugs.Collections.MEMBER, id })

    if (!member) {
      return new Response(JSON.stringify({ error: "Member not found" }), { status: 404 })
    }

    if (member.betterAuthUserId) {
      const context = await auth.$context
      await context.internalAdapter.deleteAccounts(member.betterAuthUserId)
      await context.internalAdapter.deleteUser(member.betterAuthUserId)
    }

    await payload.delete({ collection: Slugs.Collections.MEMBER, id })

    return new Response(null, { status: 204 })
  } catch (err) {
    console.error("[DELETE /api/admin/members/:id] Unhandled error", { id, error: err })
    throw err
  }
}
