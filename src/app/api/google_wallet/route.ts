import { GoogleAuth } from "google-auth-library"
import type { ClassIdentity } from "@/lib/wallet_integration"
import { initialiseClass, linkFromMember, passFromMember } from "@/lib/wallet_integration"
import { mockMember } from "@/mocks/Member.mock"
import data from "./service_account.json"

const credentials = {
  // service account credientails for Oauth and key signing
  client_email: data.client_email,
  private_key: data.private_key,
}

const auth = new GoogleAuth({
  // Oauth for posting digital pass classes and objects
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
})

const identity: ClassIdentity = {
  issuerId: "3388000000023114498",
  classId: "membership", // change this to create a different class
}

// routes for testings:

export async function POST(request: Request) {
  const message = await request.json()
  if (message == null) {
    return new Response(JSON.stringify({ hello: "world" }))
  }
  if ("getJWT" in message) {
    // returns link that adds digital pass to wallet
    const result = linkFromMember(mockMember, identity, credentials)
    return new Response(JSON.stringify({ result: result }))
  }
  if ("createPassObject" in message) {
    // creates a digital pass object for the specific member
    const result = await passFromMember(auth, mockMember, identity)
    return new Response(JSON.stringify({ result: result }))
  }
  if ("createPassClass" in message) {
    // creates the class defining how passes should look
    const result = await initialiseClass(auth, identity)
    return new Response(JSON.stringify({ result: result }))
  }
  return new Response(JSON.stringify({ opss: "nothing happend" }))
}
