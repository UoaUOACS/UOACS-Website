import { Pagination } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useId } from "react"
import {
  type DiscoverState,
  type GetDiscoverHref,
  getDiscoverHref,
} from "@/features/project/helpers/discover"
import { PROJECT_TABS } from "@/features/project/project.constants"
import type { Project } from "../ProjectCard/ProjectCard"
import { ProjectGrid } from "../ProjectGrid/ProjectGrid"
import { ProjectSortDropdown } from "../ProjectSortDropdown/ProjectSortDropdown"
import { ProjectTabs } from "../ProjectTabs/ProjectTabs"
import { discoverProjectsVariants } from "./DiscoverProjects.variants"

interface DiscoverProjectsViewProps extends DiscoverState {
  projects: Project[]
  totalPages: number
  /**
   * Builds the link for a state, so the view can live on pages other than home. Defaults to the
   * home page's links.
   */
  getHref?: GetDiscoverHref
  /**
   * Shows every tab as disabled, e.g. on the search page.
   */
  disableTabs?: boolean
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
  getHref = getDiscoverHref,
  disableTabs = false,
  className,
}: DiscoverProjectsViewProps) => {
  const { root, header, sort: sortClass, heading, pagination } = discoverProjectsVariants()
  const tabLabel = PROJECT_TABS.find((option) => option.value === tab)?.label
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className={cn(root(), className)}>
      <div className={header()}>
        <ProjectTabs activeTab={tab} disabled={disableTabs} getHref={getHref} sort={sort} />
        <div className={sortClass()}>
          <ProjectSortDropdown getHref={getHref} sort={sort} tab={tab} />
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
          getHref={(target) => getHref({ tab, sort, page: target })}
          page={page}
          totalPages={totalPages}
        />
      )}
    </section>
  )
}
