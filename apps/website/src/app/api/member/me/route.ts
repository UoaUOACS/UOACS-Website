import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { AuthService } from "@/services/auth.service"

const authService = new AuthService()

export async function GET() {
  try {
    // 401 and 404 mean different things to the client, so the auth service's
    // status is passed through rather than flattened into one.
    const result = await authService.fetchMember(await headers())
    if (result.member) return NextResponse.json(result.member)

    if (result.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (result.status === 404) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    console.error("[GET /api/member/me] Auth service returned", { status: result.status })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } catch (err) {
    console.error("[GET /api/member/me]", { error: err })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
