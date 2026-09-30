import type { SocialLink } from "@/components/Generic"
import { PRODUCTION_HOSTNAME } from "./constants"
import { payload } from "./payload"
import { Slugs } from "./payload/slugs"

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
