import {
  checkValidateRequest,
  google_auth,
  identity,
  passFromMember,
} from "@/lib/wallet-integration"

export async function POST(request: Request) {
  // creates a digital pass object for the specific member
  const validate_member = await checkValidateRequest(request)
  if (validate_member instanceof Response) {
    return validate_member
  }

  const _result = await passFromMember(google_auth, validate_member, identity)
  return new Response(JSON.stringify({ result: "successful" }))
}
