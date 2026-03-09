import type { SocialLink } from "@/components/Generic"
import { SOCIAL_ICONS } from "@/components/Primitive"
import { SponsorTier } from "@/types/enums"

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: SOCIAL_ICONS.Discord, label: "Discord", href: "https://discord.gg/HsG73WdWFm" },
  {
    icon: SOCIAL_ICONS.Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/uoacs25/",
  },
  {
    icon: SOCIAL_ICONS.TikTok,
    label: "TikTok",
    href: "https://www.tiktok.com/@uoacs?lang=en-GB",
  },
  {
    icon: SOCIAL_ICONS.LinkedIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
]

export const TIER_SIZES: Record<SponsorTier, { height: number; width: number }> = {
  [SponsorTier.DIAMOND]: {
    height: 120,
    width: 320,
  },
  [SponsorTier.GOLD]: { height: 120, width: 320 },
  [SponsorTier.SILVER]: { height: 80, width: 240 },
}
