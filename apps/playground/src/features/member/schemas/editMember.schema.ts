import { z } from "zod"
import { type LinkName, links } from "@/features/member/constants/links.constants"
import { skills } from "@/features/member/constants/skills.constants"

const linkNames = Object.keys(links) as [LinkName, ...LinkName[]]

const linkSchema = z
  .object({
    name: z.enum(linkNames),
    url: z.url(),
  })
  .superRefine(({ name, url }, ctx) => {
    if (url.startsWith(links[name].url)) return
    ctx.addIssue({
      code: "custom",
      path: ["url"],
      message: `${links[name].name} URL must start with ${links[name].url}`,
    })
  })

/**
 * The fields a member may edit on their own profile, mirroring the rules the
 * `member` collection enforces. Shared with the edit form (#446) so the browser
 * and the server action agree on what is valid.
 */
export const editMemberSchema = z.object({
  bio: z.string().nullish(),
  skills: z.array(z.enum(skills)).default([]),
  links: z
    .array(linkSchema)
    .max(linkNames.length)
    .superRefine((rows, ctx) => {
      const seen = new Set<LinkName>()
      for (const [index, row] of rows.entries()) {
        if (seen.has(row.name)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "name"],
            message: `${links[row.name].name} can only appear once.`,
          })
        }
        seen.add(row.name)
      }
    })
    .default([]),
})

export type EditMemberInput = z.infer<typeof editMemberSchema>
