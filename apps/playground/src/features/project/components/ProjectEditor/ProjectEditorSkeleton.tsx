import { Skeleton } from "@uoacs/ui"
import { projectCardVariants } from "@/features/project/components/ProjectCard/ProjectCard.variants"

const { base, content } = projectCardVariants({ variant: "profile" })

/**
 * A loading placeholder with the same layout as `ProjectEditor`
 */
export const ProjectEditorSkeleton = () => (
  <div aria-hidden="true" className="flex w-full flex-col gap-4">
    <div className="flex justify-end gap-4 py-3">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-40 rounded-full" />
    </div>
    <div className="flex flex-col gap-15">
      <div className={base({ className: "border border-gray-200" })}>
        <Skeleton className="aspect-4/3 w-full rounded-2xl md:w-64 md:shrink-0 lg:w-100" />
        <div className={content({ className: "md:justify-center" })}>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      <Skeleton className="min-h-80 w-full" />
    </div>
  </div>
)
