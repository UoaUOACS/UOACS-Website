export const Slugs = {
  Collections: {
    EXECUTIVE: "executive",
    MEDIA: "media",
    MEMBER: "member",
    POLAROID: "polaroid",
    REEL: "reel",
    SPONSOR: "sponsor",
    USER: "user",
  },
  Globals: {
    HOME_PAGE: "home-page",
    PRIVACY_POLICY: "privacy-policy",
    SOCIAL_LINKS: "social-links",
  },
} as const

export type CollectionSlug = (typeof Slugs.Collections)[keyof typeof Slugs.Collections]
export type GlobalSlug = (typeof Slugs.Globals)[keyof typeof Slugs.Globals]
export type Slug = CollectionSlug | GlobalSlug
