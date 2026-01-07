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
      maxRows: 2,
    },
  ],
}
