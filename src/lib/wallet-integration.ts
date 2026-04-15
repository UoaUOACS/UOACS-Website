import { GoogleAuth } from "google-auth-library"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import type {
  ClassIdentity,
  ServiceAccountCredentials,
  WalletPassObjectPayload,
} from "@/lib/wallet-basics"
import { createPassObject, generateWalletLink } from "@/lib/wallet-basics"
import type { Member } from "@/payload/payload-types"
import { AuthService } from "@/services/auth.service"
import { passObject } from "./wallet-designs"

export async function passFromMember(
  auth: GoogleAuth,
  member: Member,
  classIdentity: ClassIdentity,
): Promise<Record<string, unknown>> {
  const objectinfo: WalletPassObjectPayload = {
    id: `${classIdentity.issuerId}.${member.id}`,
    classId: `${classIdentity.issuerId}.${classIdentity.classId}`,
    state: "ACTIVE",
    ...passObject(member),
  }

  return createPassObject(auth, objectinfo)
}

export function linkFromMember(
  member: Member,
  classIdentity: ClassIdentity,
  credentials: ServiceAccountCredentials,
): string {
  const objectData = {
    id: `${classIdentity.issuerId}.${member.id}`,
    classId: `${classIdentity.issuerId}.${classIdentity.classId}`,
  }
  return generateWalletLink(credentials, objectData)
}

if (!process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_KEY) {
  throw new Error("GOOGLE_WALLET_SERVICE_ACCOUNT_KEY environment variable is not set")
}

if (!process.env.GOOGLE_WALLET_ISSUER_ID) {
  throw new Error("GOOGLE_WALLET_ISSUER_ID environment variable not set")
}

const data = JSON.parse(process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_KEY)

export const credentials = {
  // service account credientails for Oauth and key signing
  client_email: data.client_email,
  private_key: data.private_key,
}

export const google_auth = new GoogleAuth({
  // Oauth for posting digital pass classes and objects
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
})

export const identity: ClassIdentity = {
  issuerId: process.env.GOOGLE_WALLET_ISSUER_ID,
  classId: "membership", // change this to create a different class
}

export async function checkValidateRequest(_request: Request): Promise<Response | Member> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const authService = new AuthService()
  const member = await authService.userToMember(session.user)

  if (!member) {
    return new Response("Member doesn't have betterAuthUserId field", { status: 500 })
  }

  return member
}
