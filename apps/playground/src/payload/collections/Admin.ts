import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/payload/slugs"

export const Admin: CollectionConfig = {
  slug: Slugs.Collections.ADMIN,
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
  ],
}
