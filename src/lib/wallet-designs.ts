import type { Member } from "@/payload/payload-types"

export const passClass = {
  // change information below
  issuerName: "UOACS",
}

export function passObject(member: Member): object {
  return {
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
