import { z } from "zod"

export const discordWidgetMemberSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar_url: z.string(),
  status: z.enum(["online", "idle", "dnd", "offline"]),
  game: z.object({ name: z.string() }).optional(),
})

export const discordWidgetDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  instant_invite: z.string().nullable(),
  presence_count: z.number(),
  members: z.array(discordWidgetMemberSchema),
})

export type DiscordWidgetData = z.infer<typeof discordWidgetDataSchema>
export type DiscordWidgetMember = z.infer<typeof discordWidgetMemberSchema>
