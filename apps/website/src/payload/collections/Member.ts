import { Member as SharedMember } from "@uoacs/shared/payload"
import type { CollectionConfig } from "payload"

/**
 * The shared definition plus the website-only delete control, which calls this
 * app's own admin API. Registration moves out entirely in #396.
 */
export const Member: CollectionConfig = {
  ...SharedMember,
  admin: {
    ...SharedMember.admin,
    components: {
      edit: {
        beforeDocumentControls: ["@/payload/components/DeleteMemberButton#DeleteMemberButton"],
      },
    },
  },
}
