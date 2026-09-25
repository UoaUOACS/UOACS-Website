export const Slugs = {
  Collections: {
    MEDIA: "media",
    ADMIN: "admin",
  },
  Globals: {},
} as const

export type CollectionSlug = (typeof Slugs.Collections)[keyof typeof Slugs.Collections]
export type GlobalSlug = (typeof Slugs.Globals)[keyof typeof Slugs.Globals]
export type Slug = CollectionSlug | GlobalSlug
