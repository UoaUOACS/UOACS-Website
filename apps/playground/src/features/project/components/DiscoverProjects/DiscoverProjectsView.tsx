import { Pagination } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useId } from "react"
import { type DiscoverState, getDiscoverHref } from "@/features/project/helpers/discover"
import { PROJECT_TABS } from "@/features/project/project.constants"
import type { Project } from "../ProjectCard/ProjectCard"
import { ProjectGrid } from "../ProjectGrid/ProjectGrid"
import { ProjectSortDropdown } from "../ProjectSortDropdown/ProjectSortDropdown"
import { ProjectTabs } from "../ProjectTabs/ProjectTabs"
import { discoverProjectsVariants } from "./DiscoverProjects.variants"

interface DiscoverProjectsViewProps extends DiscoverState {
  projects: Project[]
  totalPages: number
  className?: string
}

/**
 * The Discover section's layout: tabs and sort, the current page of projects, and pagination.
 * {@link DiscoverProjects} fetches the data; this component only renders it.
 */
export const DiscoverProjectsView = ({
  tab,
  sort,
  page,
  projects,
  totalPages,
  className,
}: DiscoverProjectsViewProps) => {
  const { root, header, sort: sortClass, heading, pagination } = discoverProjectsVariants()
  const tabLabel = PROJECT_TABS.find((option) => option.value === tab)?.label
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className={cn(root(), className)}>
      <div className={header()}>
        <ProjectTabs activeTab={tab} sort={sort} />
        <div className={sortClass()}>
          <ProjectSortDropdown sort={sort} tab={tab} />
        </div>
      </div>

      <h2 className={heading()} id={headingId}>
        {tabLabel}
      </h2>

      <ProjectGrid projects={projects} />

      {totalPages > 1 && (
        <Pagination
          aria-label="Projects pagination"
          className={pagination()}
          getHref={(target) => getDiscoverHref({ tab, sort, page: target })}
          page={page}
          totalPages={totalPages}
        />
      )}
    </section>
  )
}
