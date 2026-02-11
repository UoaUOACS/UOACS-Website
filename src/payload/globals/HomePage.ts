import type { GlobalConfig } from "payload"

export const HomePage: GlobalConfig = {
  slug: "home-page",
  access: {
    read: () => true,
  },
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
}
