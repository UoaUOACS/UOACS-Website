import { Skeleton } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { ProjectGridSkeleton } from "../ProjectGrid/ProjectGridSkeleton"
import { discoverProjectsVariants } from "./DiscoverProjects.variants"

/**
 * A loading placeholder with the same layout as {@link DiscoverProjectsView}.
 */
export const DiscoverProjectsSkeleton = () => {
  const { root, header, sort, heading } = discoverProjectsVariants()

  return (
    <div className={root()}>
      <div className={header()}>
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className={cn(sort(), "h-8.5 w-24")} />
      </div>
      <div className={heading()}>
        <Skeleton className="w-20" shape="text" />
      </div>
      <ProjectGridSkeleton />
    </div>
  )
}
