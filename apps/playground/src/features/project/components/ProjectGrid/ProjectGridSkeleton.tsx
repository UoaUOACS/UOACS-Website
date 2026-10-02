import { PROJECTS_PER_PAGE } from "@/features/project/project.constants"
import { ProjectCardSkeleton } from "../ProjectCard/ProjectCardSkeleton"
import { projectGridClassName } from "./ProjectGrid"

interface ProjectGridSkeletonProps {
  /**
   * How many card placeholders to show. Defaults to a full page.
   */
  count?: number
}

/**
 * A loading placeholder with the same layout as a {@link ProjectGrid}.
 */
export const ProjectGridSkeleton = ({ count = PROJECTS_PER_PAGE }: ProjectGridSkeletonProps) => (
  <div
    aria-busy="true"
    aria-label="Loading projects"
    className={projectGridClassName}
    role="status"
  >
    {Array.from({ length: count }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: placeholders are identical and never reorder
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
)
