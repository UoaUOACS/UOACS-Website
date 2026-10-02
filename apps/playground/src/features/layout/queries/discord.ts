import { getDiscordWidgetData } from "@uoacs/shared"
import { cacheLife } from "next/cache"

/**
 * Cached wrapper around {@link getDiscordWidgetData} so page renders don't each hit Discord's
 * widget endpoint. Presence counts only need to be roughly current, so hours-old data is fine.
 */
export async function getCachedDiscordWidgetData() {
  "use cache"
  cacheLife("hours")

  return getDiscordWidgetData()
}
