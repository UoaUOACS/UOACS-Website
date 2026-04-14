import { GoogleAuth } from "google-auth-library"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import type { ClassIdentity } from "@/lib/wallet_integration"
import { initialiseClass, linkFromMember, passFromMember } from "@/lib/wallet_integration"
import { AuthService } from "@/services/auth.service"
import data from "./service_account.json"

const credentials = {
  // service account credientails for Oauth and key signing
  client_email: data.client_email,
  private_key: data.private_key,
}

const google_auth = new GoogleAuth({
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
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
  const message = await request.json()
  if (message == null) {
    return new Response(JSON.stringify({ hello: "world" }))
  }

  const authService = new AuthService()
  const member = await authService.userToMember(session.user)

  if (!member) {
    return new Response("Member doesn't have betterAuthUserId field", { status: 500 })
  }

  if ("getJWT" in message) {
    // returns link that adds digital pass to wallet
    const result = linkFromMember(member, identity, credentials)
    return new Response(JSON.stringify({ result: result }))
  }
  if ("createPassObject" in message) {
    // creates a digital pass object for the specific member
    const _result = await passFromMember(google_auth, member, identity)
    return new Response(JSON.stringify({ result: "successful" }))
  }
  if ("createPassClass" in message) {
    // creates the class defining how passes should look
    const _result = await initialiseClass(google_auth, identity)
    return new Response(JSON.stringify({ result: "successful" }))
  }
  return new Response(JSON.stringify({ result: "no action requested" }))
}
