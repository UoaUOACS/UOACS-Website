import type { ProjectAuthor } from "@/features/project/components/ProjectHeader/ProjectHeader"
import type { Member } from "@/payload/payload-types"

/**
 * Picks the fields a project page shows of its author, so the rest of the member stays on the
 * server
 */
export const toProjectAuthor = ({
  firstName,
  lastName,
  username,
  profilePicture,
}: Member): ProjectAuthor => ({ firstName, lastName, username, profilePicture })
