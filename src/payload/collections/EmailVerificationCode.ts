import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/slugs"

export const EmailVerificationCode: CollectionConfig = {
  slug: Slugs.Collections.EMAIL_VERIFICATION_CODE,
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
