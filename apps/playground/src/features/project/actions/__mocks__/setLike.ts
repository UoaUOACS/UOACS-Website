import type { SetLikeResult } from "../setLike"

export async function setLike(_projectID: string, liked: boolean): Promise<SetLikeResult> {
  return { ok: true, liked }
}
