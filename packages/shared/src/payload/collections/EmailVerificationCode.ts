import type { CollectionConfig } from "payload"
import { AuthCollectionSlugs } from "../slugs"

/**
 * Registered by both apps/auth and apps/website against the same database until
 * #396 moves the website's verification flow onto the auth service.
 */
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
