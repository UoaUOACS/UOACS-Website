import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { AuthService } from "@/services/auth.service"

const authService = new AuthService()

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  let member: Awaited<ReturnType<typeof authService.getMemberFromUser>>
  try {
    member = await authService.getMemberFromUser(session.user)
  } catch (err) {
    console.error("[GET /api/member/me] Failed to fetch member from Payload", {
      userId: session.user.id,
      error: err,
    })
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }

  if (!member) {
    return new Response(JSON.stringify({ error: "Member not found" }), { status: 404 })
  }

  return NextResponse.json(member)
}
