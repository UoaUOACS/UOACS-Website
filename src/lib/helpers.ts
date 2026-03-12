import type { SocialLink } from "@/components/Generic"
import { payload } from "./payload"

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { discordHref, instagramHref, tiktokHref, linkedinHref } = await payload.findGlobal({
    slug: "social-links",
  })
  return [
    { icon: "discord", label: "Discord", href: discordHref ?? "" },
    { icon: "instagram", label: "Instagram", href: instagramHref ?? "" },
    { icon: "tiktok", label: "TikTok", href: tiktokHref ?? "" },
    { icon: "linkedin", label: "LinkedIn", href: linkedinHref ?? "" },
  ]
}
