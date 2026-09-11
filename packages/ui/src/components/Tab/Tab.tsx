"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../utils"
import { type TabVariantProps, tabVariants } from "./Tab.variants"

/** Horizontal run of the diagonal edge, in px. */
const SLANT = 35
/** Radius of the corner where the flat top meets the diagonal, in px. */
const ROUND = 10

// polygon() can't round the corner where the flat top meets the diagonal, and a
// fixed path() would only line up at one label width, so the path is rebuilt
// whenever the button's size changes.
function buildClipPath(width: number, height: number, first: boolean) {
  if (!width || !height) return undefined

  const slantLength = Math.hypot(SLANT, height)
  const dx = (SLANT / slantLength) * ROUND
  const dy = Math.min((height / slantLength) * ROUND, height)

  if (first) {
    const bend = width - SLANT
    const preX = Math.max(bend - ROUND, 0)
    const postX = Math.min(bend + dx, width)
    return `path("M0 0 L${preX} 0 Q${bend} 0 ${postX} ${dy} L${width} ${height} L0 ${height} Z")`
  }

  const leftBend = SLANT
  const rightBend = width - SLANT
  const leftPostX = Math.min(leftBend + ROUND, rightBend)
  const rightPreX = Math.max(rightBend - ROUND, leftPostX)
  const rightPostX = Math.min(rightBend + dx, width)

  return `path("M0 ${height} L${Math.max(leftBend - dx, 0)} ${dy} Q${leftBend} 0 ${leftPostX} 0 L${rightPreX} 0 Q${rightBend} 0 ${rightPostX} ${dy} L${width} ${height} Z")`
}

export interface TabProps extends TabVariantProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * A folder-shaped tab button.
 *
 * Presentational only: selection state, keyboard navigation and ARIA wiring
 * belong to the parent tablist, which passes them through as props.
 *
 * The fill is a layer of its own rather than a background on the button, so the
 * clip-path can't cut into the focus ring or the label.
 */
export const Tab = ({ active, children, className, first, ref, ...props }: TabProps) => {
  const { root, fill, label } = tabVariants({ active, first })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const node = buttonRef.current
    if (!node) return

    const observer = new ResizeObserver(() => {
      // Border-box, not the observer's contentBoxSize: the fill spans the padded
      // box, so a content-box path would be too small and clip the label.
      const rect = node.getBoundingClientRect()
      setSize({ height: rect.height, width: rect.width })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const setRefs = (node: HTMLButtonElement | null) => {
    buttonRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }

  const clipPath = buildClipPath(size.width, size.height, Boolean(first))

  return (
    <button className={cn(root(), className)} ref={setRefs} type="button" {...props}>
      <span aria-hidden="true" className={fill()} style={clipPath ? { clipPath } : undefined} />
      <span className={label()}>{children}</span>
    </button>
  )
}
