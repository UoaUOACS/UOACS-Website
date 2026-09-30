import { Skeleton, SocialIcon } from "@uoacs/ui"
import { DiscordSectionLayout } from "./DiscordSectionLayout"

/**
 * Suspense fallback for {@link DiscordSection}, mirroring its layout while the widget loads.
 */
export const DiscordSectionSkeleton = () => (
  <DiscordSectionLayout>
    <div className="flex shrink-0 flex-row items-center gap-2">
      <SocialIcon className="h-6 w-6" icon="discord" />
      <Skeleton className="h-4 w-16 bg-gray-700" shape="text" />
    </div>
    <div className="flex-1 md:w-full md:flex-none" />
    <Skeleton className="h-9 w-32 shrink-0 bg-gray-700" />
  </DiscordSectionLayout>
)
