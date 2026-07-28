import { NextResponse } from "next/server"
import {
  checkValidateRequest,
  credentials,
  getLinkFromMember,
  identity,
} from "@/lib/wallet/wallet-integration"

export async function GET(request: Request) {
  // returns link that adds digital pass to wallet
  const validateMember = await checkValidateRequest()
  if (validateMember instanceof Response) {
    return validateMember
  }

  const result = getLinkFromMember(validateMember, identity, credentials)
  return NextResponse.redirect(new URL(result, request.url))
}
