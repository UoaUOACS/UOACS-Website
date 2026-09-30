import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { Button, SocialIcon } from "@uoacs/ui"
import { getCachedDiscordWidgetData } from "../../queries/discord"
import { DiscordAvatars } from "./DiscordAvatars"
import { DiscordSectionLayout } from "./DiscordSectionLayout"

export interface DiscordSectionProps {
  /**
   * Fallback Discord link used when the widget has no invite or fails to load.
   */
  discordHref?: string
}

/**
 * The Discord column of the footer. Fetches the live widget itself, so render it behind a
 * `Suspense` boundary with {@link DiscordSectionSkeleton} as the fallback.
 *
 * @param discordHref Fallback Discord link used when the widget has no invite or fails to load.
 */
export const DiscordSection = async ({ discordHref }: DiscordSectionProps) => {
  const widgetData = await getCachedDiscordWidgetData()
  const joinHref = widgetData?.instant_invite ?? discordHref
  if (!joinHref) return null

  return (
    <DiscordSectionLayout>
      <div className="flex shrink-0 flex-row items-center gap-2">
        <SocialIcon className="h-6 w-6" icon="discord" />
        {widgetData && <p className="paragraph-sm">{widgetData.presence_count} Online</p>}
      </div>
      {widgetData && <DiscordAvatars members={widgetData.members} />}
      <a className="shrink-0" href={joinHref} rel="noopener noreferrer" target="_blank">
        <Button
          className="paragraph-sm"
          right={<ArrowUpRightIcon className="h-3 w-3" />}
          theme="primary"
        >
          Join Discord
        </Button>
      </a>
    </DiscordSectionLayout>
  )
}
