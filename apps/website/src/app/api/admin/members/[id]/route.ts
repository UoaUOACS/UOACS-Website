import { payload } from "@/lib/payload"
import { AuthService } from "@/services/auth.service"

/**
 * Deleting a member now spans two services, so the website checks that a CMS
 * operator is signed in and the auth service, which owns the data, does the
 * deletion. The service token proves the call came from here, not that a human
 * authorised it — hence the check below.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const status = await new AuthService().deleteMember(id)
    if (status === 404) return Response.json({ error: "Member not found" }, { status: 404 })
    if (status !== 204) {
      console.error("[DELETE /api/admin/members/:id] Auth service refused", { id, status })
      return Response.json({ error: "Internal server error" }, { status: 500 })
    }

    return new Response(null, { status: 204 })
  } catch (err) {
    console.error("[DELETE /api/admin/members/:id] Unhandled error", { id, error: err })
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
