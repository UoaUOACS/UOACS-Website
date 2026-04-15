import { NextResponse } from "next/server"
import {
  checkValidateRequest,
  googleAuth,
  identity,
  passFromMember,
} from "@/lib/wallet-integration"

export async function POST(request: Request) {
  // creates a digital pass object for the specific member
  const validateMember = await checkValidateRequest(request)
  if (validateMember instanceof Response) {
    return validateMember
  }

  await passFromMember(googleAuth, validateMember, identity) // this returns the pass object details
  return new NextResponse(JSON.stringify({ result: "successful" }))
}
