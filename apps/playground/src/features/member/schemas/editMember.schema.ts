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
 * What a member may edit on their own profile, mirroring the collection's rules
 * and shared with the form in #446. The arrays are required, so omitting one is
 * rejected rather than silently clearing it.
 */
export const editMemberSchema = z.object({
  // Payload's `defaultMaxTextLength`, which the collection's `bio` inherits.
  bio: z.string().max(40000).nullish(),
  skills: z
    .array(z.enum(skills))
    .refine((rows) => new Set(rows).size === rows.length, "Each skill can only appear once."),
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
    }),
})

export type EditMemberInput = z.infer<typeof editMemberSchema>
