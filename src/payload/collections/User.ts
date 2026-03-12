import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/slugs"

export const User: CollectionConfig = {
  slug: Slugs.Collections.user,
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
