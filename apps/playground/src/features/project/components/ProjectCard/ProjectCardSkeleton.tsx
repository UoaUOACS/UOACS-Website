import { Skeleton } from "@uoacs/ui"

/**
 * A loading placeholder with the same shape as a {@link ProjectCard}.
 */
export const ProjectCardSkeleton = () => (
  <div className="flex w-full max-w-sm flex-col">
    <Skeleton className="aspect-4/3 h-auto rounded-2xl" />
    <div className="flex items-center justify-between px-2 py-3">
      <div className="flex items-center gap-2">
        <Skeleton className="size-4.5 rounded-sm" />
        <Skeleton className="w-28 text-sm" shape="text" />
      </div>
      <Skeleton className="w-10 text-xs" shape="text" />
    </div>
  </div>
)
