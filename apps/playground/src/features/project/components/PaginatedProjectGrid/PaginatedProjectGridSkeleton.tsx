import { Skeleton } from "@uoacs/ui"
import { ProjectGridSkeleton } from "../ProjectGrid/ProjectGridSkeleton"
import { paginatedProjectGridVariants } from "./PaginatedProjectGrid.variants"

/**
 * A loading placeholder with the same layout as {@link PaginatedProjectGrid}.
 */
export const PaginatedProjectGridSkeleton = () => {
  const { root, pagination } = paginatedProjectGridVariants()

  return (
    <div className={root()}>
      <ProjectGridSkeleton />
      {/* Most pages are paginated, so reserve the space rather than grow on load */}
      <div className={pagination()}>
        <Skeleton className="h-8 w-72" />
      </div>
    </div>
  )
}
