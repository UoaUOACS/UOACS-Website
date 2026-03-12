export const Slugs = {
  Collections: {
    executive: "executive",
    media: "media",
    member: "member",
    polaroid: "polaroid",
    reel: "reel",
    sponsor: "sponsor",
    user: "user",
  },
  Globals: {
    homePage: "home-page",
    privacyPolicy: "privacy-policy",
    socialLinks: "social-links",
  },
} as const

export type CollectionSlug = (typeof Slugs.Collections)[keyof typeof Slugs.Collections]
export type GlobalSlug = (typeof Slugs.Globals)[keyof typeof Slugs.Globals]
export type Slug = CollectionSlug | GlobalSlug
