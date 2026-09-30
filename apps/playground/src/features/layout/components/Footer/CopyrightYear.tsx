import { cacheLife } from "next/cache"

/**
 * Renders the current year. Cached because reading the clock in an uncached server component
 * opts the whole footer out of prerendering under `cacheComponents`; the year only changes once
 * a year, so a days-long cache life is accurate enough.
 */
export const CopyrightYear = async () => {
  "use cache"
  cacheLife("days")

  return <>{new Date().getFullYear()}</>
}
