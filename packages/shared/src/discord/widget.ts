import { type DiscordWidgetData, discordWidgetDataSchema } from "./schema"

export async function getDiscordWidgetData(): Promise<DiscordWidgetData | null> {
  const serverId = process.env.DISCORD_SERVER_ID
  if (!serverId) {
    console.error("[getDiscordWidgetData] DISCORD_SERVER_ID is not set")
    return null
  }

  try {
    const res = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      console.error("[getDiscordWidgetData] Discord widget API returned non-OK status", {
        status: res.status,
        serverId,
      })
      return null
    }
    const result = discordWidgetDataSchema.safeParse(await res.json())
    if (!result.success) {
      console.error("[getDiscordWidgetData] Discord widget API response failed validation", {
        error: result.error,
        serverId,
      })
      return null
    }
    return result.data
  } catch (error) {
    console.error("[getDiscordWidgetData] Failed to fetch Discord widget data", {
      error,
      serverId,
    })
    return null
  }
}
