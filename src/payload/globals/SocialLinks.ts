import type { GlobalConfig } from "payload"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([
  Routes.home,
  Routes.team,
  Routes.sponsors,
  Routes.privacy,
])

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
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
