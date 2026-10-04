/** Narrows a search param to its first value, or `null` if it is not set. */
export function firstParam(value: string | string[] | undefined): string | null {
  return (Array.isArray(value) ? value[0] : value) ?? null
}
