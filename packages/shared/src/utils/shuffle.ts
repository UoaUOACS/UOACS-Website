/**
 * Returns a shuffled copy of `items` (Fisher-Yates), leaving the input untouched.
 */
export const shuffle = <T>(items: readonly T[]): T[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
