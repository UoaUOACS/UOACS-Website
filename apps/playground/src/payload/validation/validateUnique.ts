import type { ArrayFieldValidation } from "payload"

export const validateUnique: ArrayFieldValidation = (rows) => {
  if (!Array.isArray(rows)) return true
  const names = (rows as { name?: string }[]).flatMap((row) => (row?.name ? [row.name] : []))
  const duplicates = [...new Set(names.filter((name, i) => names.indexOf(name) !== i))]
  if (duplicates.length === 0) return true
  return `Duplicate entries: ${duplicates.join(", ")}. Each one can appear only once.`
}
