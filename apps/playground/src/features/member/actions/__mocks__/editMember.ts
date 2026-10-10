import { fn } from "storybook/test"
import type { EditMemberResult } from "../editMember"

export const editMember = fn(async (_input: unknown): Promise<EditMemberResult> => ({ ok: true }))
