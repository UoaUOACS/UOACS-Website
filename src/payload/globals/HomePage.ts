import type { GlobalConfig } from "payload"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([Routes.HOME])

export const HomePage: GlobalConfig = {
  slug: "home-page",
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
