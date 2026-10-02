import type { CollectionConfig } from "payload"
import { CacheTags, projectTag } from "@/lib/cache"
import { getRelationID } from "@/lib/payload/getRelationID"
import { Slugs } from "@/lib/payload/slugs"
import { adjustLikeCount } from "../hooks/adjustLikeCount"
import { makeRevalidateHooks } from "../hooks/revalidate"
import type { Like as LikeDoc } from "../payload-types"

// The like count is changed outside Payload, so the Project hooks do not revalidate for it
const { afterChange, afterDelete } = makeRevalidateHooks((doc: LikeDoc) => [
  CacheTags.PROJECTS,
  projectTag(getRelationID(doc.project)),
])

export const Like: CollectionConfig = {
  slug: Slugs.Collections.LIKE,
  access: {
    read: () => true,
  },
  indexes: [{ fields: ["project", "member"], unique: true }],
  fields: [
    {
      name: "project",
      type: "relationship",
      relationTo: Slugs.Collections.PROJECT,
      required: true,
      index: true,
    },
    {
      name: "member",
      type: "relationship",
      relationTo: Slugs.Collections.MEMBER,
      required: true,
      index: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === "create") await adjustLikeCount(req, getRelationID(doc.project), 1)
      },
      afterChange,
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await adjustLikeCount(req, getRelationID(doc.project), -1)
      },
      afterDelete,
    ],
  },
}
