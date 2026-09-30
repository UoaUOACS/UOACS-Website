import { SocialIcon } from "@uoacs/ui"
import { DiscordSectionLayout } from "./DiscordSectionLayout"

/**
 * Suspense fallback for {@link DiscordSection}, mirroring its layout while the widget loads.
 */
export const DiscordSectionSkeleton = () => (
  <DiscordSectionLayout>
    <div className="flex shrink-0 flex-row items-center gap-2">
      <SocialIcon className="h-6 w-6" icon="discord" />
      <div className="h-4 w-16 animate-pulse rounded bg-gray-700" />
    </div>
    <div className="flex-1 md:w-full md:flex-none" />
    <div className="h-9 w-32 shrink-0 animate-pulse rounded-lg bg-gray-700" />
  </DiscordSectionLayout>
)
