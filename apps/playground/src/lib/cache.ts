export const CacheTags = {
  SPONSORS: "sponsors",
  MEDIA: "media",
  PROJECTS: "projects",
} as const

export const projectTag = (projectID: string) => `project:${projectID}` as const

export const memberLikesTag = (memberID: string) => `member-likes:${memberID}` as const

export type CacheTag =
  | (typeof CacheTags)[keyof typeof CacheTags]
  | ReturnType<typeof projectTag>
  | ReturnType<typeof memberLikesTag>
