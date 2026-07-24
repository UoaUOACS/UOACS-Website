"use client"

import { useEffect, useState } from "react"

/**
 * Tracks whether a CSS media query currently matches.
 *
 * @param query the media query to evaluate, e.g. "(min-width: 768px)"
 * @returns whether the query matches (false before mount, to avoid a server/client hydration mismatch)
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    setMatches(mediaQueryList.matches)

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQueryList.addEventListener("change", onChange)
    return () => mediaQueryList.removeEventListener("change", onChange)
  }, [query])

  return matches
}
