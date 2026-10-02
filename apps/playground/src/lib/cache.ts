export const CacheTags = {
  SPONSORS: "sponsors",
  MEDIA: "media",
  PROJECTS: "projects",
} as const

export type CacheTag = (typeof CacheTags)[keyof typeof CacheTags]
