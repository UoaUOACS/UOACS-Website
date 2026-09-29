import { AuthCollectionSlugs } from "@uoacs/shared"
import type { CollectionConfig } from "payload"

export const EmailVerificationCode: CollectionConfig = {
  slug: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "hashedCode",
      type: "text",
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
    },
  ],
}
