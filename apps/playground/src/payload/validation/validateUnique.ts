import type { ArrayFieldValidation } from "payload"

export const validateUnique: ArrayFieldValidation = (rows) => {
  if (!Array.isArray(rows)) return true
  const names = rows.map((row) => row?.name).filter(Boolean)
  return new Set(names).size === names.length || "No duplicates are allowed."
}
