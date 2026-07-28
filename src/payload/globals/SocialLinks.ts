import type { GlobalConfig } from "payload"
import { Slugs } from "@/lib/payload/slugs"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([
  Routes.HOME,
  Routes.TEAM,
  Routes.SPONSORS,
  Routes.PRIVACY,
])

export const SocialLinks: GlobalConfig = {
  slug: Slugs.Globals.SOCIAL_LINKS,
  fields: [
    {
      name: "discordHref",
      label: "Discord",
      type: "text",
      required: true,
    },
    {
      name: "instagramHref",
      label: "Instagram",
      type: "text",
      required: true,
    },
    {
      name: "tiktokHref",
      label: "TikTok",
      type: "text",
      required: true,
    },
    {
      name: "linkedinHref",
      label: "LinkedIn",
      type: "text",
      required: true,
    },
  ],
  hooks: { afterChange: [globalAfterChange] },
}
