import type { ToggleLikeResult } from "../toggleLike"

export async function toggleLike(_projectID: string): Promise<ToggleLikeResult> {
  return { ok: true, liked: true }
}
