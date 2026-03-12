import type { GlobalConfig } from "payload"
import { Routes } from "@/lib/routes"
import { Slugs } from "@/lib/slugs"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([Routes.HOME])

export const HomePage: GlobalConfig = {
  slug: Slugs.Globals.homePage,
  fields: [
    {
      name: "reels",
      type: "relationship",
      relationTo: "reel",
      hasMany: true,
      maxRows: 3,
    },
    {
      name: "polaroids",
      type: "relationship",
      relationTo: "polaroid",
      hasMany: true,
      maxRows: 3,
    },
  ],
  hooks: { afterChange: [globalAfterChange] },
}
