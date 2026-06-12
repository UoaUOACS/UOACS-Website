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

  const member = await authService.getMemberFromUser(session.user)
  if (!member) {
    return new Response(JSON.stringify({ error: "Member not found" }), { status: 404 })
  }

  return NextResponse.json(member)
}
