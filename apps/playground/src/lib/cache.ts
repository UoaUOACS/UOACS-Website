export const CacheTags = {
  SPONSORS: "sponsors",
  MEDIA: "media",
} as const

export type CacheTag = (typeof CacheTags)[keyof typeof CacheTags]
