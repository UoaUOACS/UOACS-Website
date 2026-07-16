export interface DiscordWidgetMember {
  id: string
  username: string
  avatar_url: string
  status: "online" | "idle" | "dnd" | "offline"
  game?: { name: string }
}

export interface DiscordWidgetData {
  id: string
  name: string
  instant_invite: string | null
  presence_count: number
  members: DiscordWidgetMember[]
}
