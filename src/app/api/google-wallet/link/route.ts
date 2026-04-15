import { NextResponse } from "next/server"
import {
  checkValidateRequest,
  credentials,
  identity,
  linkFromMember,
} from "@/lib/wallet-integration"

export async function GET(request: Request) {
  // returns link that adds digital pass to wallet
  const validate_member = await checkValidateRequest(request)
  if (validate_member instanceof Response) {
    return validate_member
  }

  const result = linkFromMember(validate_member, identity, credentials)
  return NextResponse.redirect(new URL(result, request.url))
}
