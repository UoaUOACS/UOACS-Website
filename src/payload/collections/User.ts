import type { CollectionConfig } from "payload"

export const User: CollectionConfig = {
  slug: "user",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
