import type { Member } from "@/payload/payload-types"

type LinkRow = NonNullable<Member["links"]>[number]

export type LinkName = LinkRow["name"]

export const links = {
  LINKEDIN: { name: "LinkedIn", url: "https://www.linkedin.com/in/" },
  GITHUB: { name: "GitHub", url: "https://github.com/" },
  GITLAB: { name: "GitLab", url: "https://gitlab.com/" },
  PERSONAL_WEBSITE: { name: "Personal Website", url: "https://" },
  BEHANCE: { name: "Behance", url: "https://www.behance.net/" },
  DRIBBBLE: { name: "Dribbble", url: "https://dribbble.com/" },
  FIGMA: { name: "Figma", url: "https://www.figma.com/@" },
  DEVPOST: { name: "Devpost", url: "https://devpost.com/" },
  KAGGLE: { name: "Kaggle", url: "https://www.kaggle.com/" },
  MEDIUM: { name: "Medium", url: "https://medium.com/@" },
  YOUTUBE: { name: "YouTube", url: "https://www.youtube.com/@" },
} as const satisfies Record<LinkName, Pick<LinkRow, "url"> & { name: string }>
