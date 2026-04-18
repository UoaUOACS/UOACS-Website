import type { Member } from "@/payload/payload-types"
import type {
  ClassIdentity,
  WalletPassClassPayload,
  WalletPassObjectPayload,
} from "./wallet-basics"

export function getPassClass(classIdentity: ClassIdentity): WalletPassClassPayload {
  return {
    id: `${classIdentity.issuerId}.${classIdentity.classId}`,
    // change information below
    issuerName: "UOACS",
  }
}

export function getPassObject(
  classIdentity: ClassIdentity,
  member: Member,
): WalletPassObjectPayload {
  return {
    id: `${classIdentity.issuerId}.${member.id}`,
    classId: `${classIdentity.issuerId}.${classIdentity.classId}`,
    state: "ACTIVE",
    // change information below
    cardTitle: {
      defaultValue: {
        language: "en-US",
        value: "UOACS member",
      },
    },
    header: {
      defaultValue: {
        language: "en-US",
        value: `${member.firstName} ${member.lastName}`,
      },
    },
  }
}
