import config from "@payload-config"
import { getPayload, type Payload } from "payload"
import type { SocialLink } from "@/components/Generic"

export const payload: Payload = await getPayload({ config })

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
