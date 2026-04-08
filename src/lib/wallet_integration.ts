import type { GoogleAuth } from "google-auth-library"
import type {
  ServiceAccountCredentials,
  WalletPassClassPayload,
  WalletPassObjectPayload,
} from "@/lib/wallet_basics"
import { createPassClass, createPassObject, generateWalletLink } from "@/lib/wallet_basics"
import type { Member } from "@/payload/payload-types"

export interface ClassIdentity {
  issuerId: string
  classId: string
}

export async function initialiseClass(
  auth: GoogleAuth,
  classIdentity: ClassIdentity,
): Promise<Record<string, unknown>> {
  const classData: WalletPassClassPayload = {
    // change this when card design is updated
    id: `${classIdentity.issuerId}.${classIdentity.classId}`,
    issuerName: "UoACS",
  }
  return createPassClass(auth, classData)
}

export async function passFromMember(
  auth: GoogleAuth,
  member: Member,
  classIdentity: ClassIdentity,
): Promise<Record<string, unknown>> {
  const objectinfo: WalletPassObjectPayload = {
    id: `${classIdentity.issuerId}.${member.id}`,
    classId: `${classIdentity.issuerId}.${classIdentity.classId}`,
    state: "ACTIVE",

    // specific design aspects to follow
    cardTitle: {
      defaultValue: {
        language: "en-US",
        value: "UoACS member",
      },
    },
    header: {
      defaultValue: {
        language: "en-US",
        value: `${member.firstName} ${member.lastName}`,
      },
    },
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
