import type { SaveProjectResult } from "../saveProject"

export async function saveProject(_input: unknown): Promise<SaveProjectResult> {
  return { ok: true, id: "000000000000000000000001" }
}
