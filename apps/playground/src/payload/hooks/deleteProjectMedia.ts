import type { CollectionAfterDeleteHook } from "payload"
import { getRelationID } from "@/lib/payload/getRelationID"
import { Slugs } from "@/lib/payload/slugs"
import type { Project } from "../payload-types"

const getMediaIDs = (project: Pick<Project, "coverImage" | "pageContent">): string[] => [
  getRelationID(project.coverImage),
  ...project.pageContent.flatMap((block) =>
    block.blockType === Slugs.Blocks.IMAGE_GRID ? block.images.map(getRelationID) : [],
  ),
]

/**
 * Deletes a deleted project's images, except any that another project still uses
 *
 * Runs in the delete's transaction, so an image that cannot be deleted stops the project delete.
 */
export const deleteProjectMedia: CollectionAfterDeleteHook<Project> = async ({ doc, req }) => {
  const ids = [...new Set(getMediaIDs(doc))]

  const { docs: others } = await req.payload.find({
    collection: Slugs.Collections.PROJECT,
    where: { or: [{ coverImage: { in: ids } }, { "pageContent.images": { in: ids } }] },
    select: { coverImage: true, pageContent: true },
    depth: 0,
    pagination: false,
    req,
  })
  const stillUsed = new Set(others.flatMap(getMediaIDs))
  const unused = ids.filter((id) => !stillUsed.has(id))
  if (unused.length === 0) return

  const { errors } = await req.payload.delete({
    collection: Slugs.Collections.PROJECT_MEDIA,
    where: { id: { in: unused } },
    depth: 0,
    req,
  })

  if (errors.length > 0) {
    throw new Error(`Failed to delete ${errors.length} image(s) of project ${doc.id}`)
  }
}
