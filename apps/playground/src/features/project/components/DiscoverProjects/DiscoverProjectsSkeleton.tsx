import { Skeleton } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { DEFAULT_PROJECT_TAB, PROJECT_TABS } from "@/features/project/project.constants"
import { ProjectGridSkeleton } from "../ProjectGrid/ProjectGridSkeleton"
import { ProjectTabsSkeleton } from "../ProjectTabs/ProjectTabsSkeleton"
import { discoverProjectsVariants } from "./DiscoverProjects.variants"

/**
 * A loading placeholder with the same layout as {@link DiscoverProjectsView}. Each part is sized
 * by the same classes as the content it stands in for, so nothing moves when the content loads.
 */
export const DiscoverProjectsSkeleton = () => {
  const { root, header, sort, heading, pagination } = discoverProjectsVariants()
  const headingLabel = PROJECT_TABS.find((tab) => tab.value === DEFAULT_PROJECT_TAB)?.label ?? ""

  return (
    <div className={root()}>
      <div className={header()}>
        <ProjectTabsSkeleton />
        {/* Matches the sort button, which is shorter below the md breakpoint */}
        <Skeleton className={cn(sort(), "h-6.5 w-25 md:h-8.5")} />
      </div>
      <div className={heading()}>
        <Skeleton
          className="inline-block align-middle"
          shape="text"
          style={{ width: `${headingLabel.length}ch` }}
        />
      </div>
      <ProjectGridSkeleton />
      {/* Most Discover pages are paginated, so reserve the space rather than grow on load */}
      <div className={pagination()}>
        <Skeleton className="h-8 w-72" />
      </div>
    </div>
  )
}
