import { Pagination } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import type { Project } from "../ProjectCard/ProjectCard"
import { ProjectGrid } from "../ProjectGrid/ProjectGrid"
import { paginatedProjectGridVariants } from "./PaginatedProjectGrid.variants"

interface PaginatedProjectGridProps {
  projects: Project[]
  page: number
  totalPages: number
  /**
   * Builds the link for a page, so the grid can live on any page.
   */
  getPageHref: (page: number) => string
  className?: string
}

/**
 * A page of projects with pagination below it. Shared by the Discover section and search.
 */
export const PaginatedProjectGrid = ({
  projects,
  page,
  totalPages,
  getPageHref,
  className,
}: PaginatedProjectGridProps) => {
  const { root, pagination } = paginatedProjectGridVariants()

  return (
    <div className={cn(root(), className)}>
      <ProjectGrid projects={projects} />

      {totalPages > 1 && (
        <Pagination
          aria-label="Projects pagination"
          className={pagination()}
          getHref={getPageHref}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
