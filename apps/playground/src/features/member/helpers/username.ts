const MAX_NAME_PART_LENGTH = 10
const SUFFIX_DIGITS = 10

const namePart = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, MAX_NAME_PART_LENGTH)

const suffix = (): string =>
  String(Math.floor(Math.random() * 10 ** SUFFIX_DIGITS)).padStart(SUFFIX_DIGITS, "0")

/**
 * A username in the form `alexander-montgomery-4829105736`.
 *
 * A name with nothing left after stripping to `a-z0-9` (one written only in
 * Chinese, say) is dropped rather than left as an empty segment. The digits
 * make it unique, so a caller that hits a taken username can simply ask again.
 */
export const buildUsername = (firstName: string, lastName: string): string => {
  const parts = [namePart(firstName), namePart(lastName)].filter(Boolean)
  return [...(parts.length > 0 ? parts : ["member"]), suffix()].join("-")
}
