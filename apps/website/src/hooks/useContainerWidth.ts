"use client"

import { type RefObject, useEffect, useState } from "react"

/**
 * Tracks the rendered width (in pixels) of a container element.
 *
 * @param ref ref to the element to measure
 * @returns the element's current content-box width, or 0 before it has been measured
 */
export const useContainerWidth = (ref: RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width)
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return width
}
