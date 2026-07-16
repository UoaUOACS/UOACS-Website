import type { SocialLink } from "@/components/Generic"
import type { DiscordWidgetData } from "@/types/discord"
import { payload } from "./payload"
import { Slugs } from "./slugs"

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
  if (!serverId) return null

  try {
    const res = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`)
    if (!res.ok) return null
    const data = (await res.json()) as DiscordWidgetData
    return data
  } catch {
    return null
  }
}
