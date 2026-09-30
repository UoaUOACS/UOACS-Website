export const CacheTags = {
  SPONSORS: "sponsors",
} as const

export type CacheTag = (typeof CacheTags)[keyof typeof CacheTags]
