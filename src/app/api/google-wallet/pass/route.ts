import { NextResponse } from "next/server"
import { createPassObject } from "@/lib/wallet-basics"
import { getPassObject } from "@/lib/wallet-designs"
import { checkValidateRequest, googleAuth, identity } from "@/lib/wallet-integration"

export async function POST(request: Request) {
  // creates a digital pass object for the specific member
  const validateMember = await checkValidateRequest(request)
  if (validateMember instanceof Response) {
    return validateMember
  }
  const objectData = getPassObject(identity, validateMember)

  await createPassObject(googleAuth, objectData) // this returns the pass object details
  return new NextResponse(JSON.stringify({ result: "successful" }))
}
