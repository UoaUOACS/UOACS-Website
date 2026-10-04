import type { Project as ProjectCardData } from "@/features/project/components/ProjectCard/ProjectCard"
import { PLACEHOLDER_LIKES, UNKNOWN_AUTHOR_NAME } from "@/features/project/project.constants"
import type { Project } from "@/payload/payload-types"

/**
 * Maps a Payload project to the data a {@link ProjectCard} displays.
 *
 * @param project A project with its author and cover image populated (`depth: 1`).
 * @returns The card data for the project.
 */
export const toProjectCard = (
  project: Pick<Project, "id" | "name" | "author" | "coverImage">,
): ProjectCardData => ({
  id: project.id,
  title: project.name,
  imageURL:
    typeof project.coverImage === "object" ? (project.coverImage.url ?? undefined) : undefined,
  // An unpopulated author is just an ID, e.g. when the member has since been deleted
  authorName: typeof project.author === "object" ? project.author.username : UNKNOWN_AUTHOR_NAME,
  // TODO: use the real like count once likes are stored on projects
  likes: PLACEHOLDER_LIKES,
})
