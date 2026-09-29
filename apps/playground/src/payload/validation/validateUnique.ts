import type { ArrayFieldValidation } from "payload"

export const validateUnique: ArrayFieldValidation = (rows) => {
  const names = (rows as { name: string }[] | null | undefined)?.map((row) => row.name) ?? []
  return new Set(names).size === names.length || "No duplicates are allowed."
}
