import { AuthCollectionSlugs } from "@uoacs/shared"

export const Slugs = {
  Collections: {
    ...AuthCollectionSlugs,
    EXECUTIVE: "executive",
    MEDIA: "media",
    POLAROID: "polaroid",
    REEL: "reel",
    SPONSOR: "sponsor",
    ADMIN: "admin",
    EVENT: "event",
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
