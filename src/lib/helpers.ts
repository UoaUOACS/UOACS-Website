import type { SocialLink } from "@/components/Generic"
import { type DiscordWidgetData, discordWidgetDataSchema } from "@/types/schemas/discord"
import { PRODUCTION_HOSTNAME } from "./constants"
import { payload } from "./payload"
import { Slugs } from "./slugs"

export function isProductionUrl(baseUrl: string | undefined): baseUrl is string {
  if (!baseUrl) return false
  try {
    return new URL(baseUrl).hostname === PRODUCTION_HOSTNAME
  } catch {
    return false
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { discordHref, instagramHref, tiktokHref, linkedinHref } = await payload.findGlobal({
    slug: Slugs.Globals.SOCIAL_LINKS,
  })
  return [
    { icon: "instagram", label: "Instagram", href: instagramHref ?? "" },
    { icon: "tiktok", label: "TikTok", href: tiktokHref ?? "" },
    { icon: "linkedin", label: "LinkedIn", href: linkedinHref ?? "" },
    { icon: "discord", label: "Discord", href: discordHref ?? "" },
  ]
}

export async function getDiscordWidgetData(): Promise<DiscordWidgetData | null> {
  const serverId = process.env.DISCORD_SERVER_ID
  if (!serverId) {
    console.error("[getDiscordWidgetData] DISCORD_SERVER_ID is not set")
    return null
  }

  try {
    const res = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      console.error("[getDiscordWidgetData] Discord widget API returned non-OK status", {
        status: res.status,
        serverId,
      })
      return null
    }
    const result = discordWidgetDataSchema.safeParse(await res.json())
    if (!result.success) {
      console.error("[getDiscordWidgetData] Discord widget API response failed validation", {
        error: result.error,
        serverId,
      })
      return null
    }
    return result.data
  } catch (error) {
    console.error("[getDiscordWidgetData] Failed to fetch Discord widget data", {
      error,
      serverId,
    })
    return null
  }
}
