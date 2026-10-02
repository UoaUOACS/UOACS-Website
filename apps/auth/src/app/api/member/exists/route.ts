import { hasServiceToken, serviceTokenRequired } from "@/lib/service-token"
import { MemberService } from "@/services/member.service"

const members = new MemberService()

/**
 * Whether the address belongs to a member who has no account yet, which is how
 * the caller decides between "finish setting up" and a normal password reset.
 * Service-token guarded because the answer reveals membership.
 */
export async function GET(request: Request) {
  if (!hasServiceToken(request)) return serviceTokenRequired()

  const email = new URL(request.url).searchParams.get("email")
  if (!email) return Response.json({ error: "email is required" }, { status: 400 })

  return Response.json({ unlinked: await members.hasUnlinkedMember(email) })
}
