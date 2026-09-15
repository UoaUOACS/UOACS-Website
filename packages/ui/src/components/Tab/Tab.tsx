"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../utils"
import { type TabVariantProps, tabVariants } from "./Tab.variants"

/** Horizontal run of the diagonal edge, in px. */
export const SLANT = 35
/** Radius of the rounded corner, in px. */
const ROUND = 10

// Rebuilt from the measured size on every resize, since a fixed path only lines up at one label width.
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
 * A folder-shaped tab button. Presentational only — selection state, keyboard
 * navigation and ARIA wiring belong to the parent tablist.
 *
 * The clip-path is on the button itself, so overlapping tabs hit-test the same
 * way they look: a click falls through to whichever tab is actually visible
 * there, not whichever is on top of the DOM.
 */
export const Tab = ({ active, children, className, first, ref, ...props }: TabProps) => {
  const { root, fill, label, ring } = tabVariants({ active, first })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const node = buttonRef.current
    if (!node) return

    // offsetWidth/Height, not getBoundingClientRect: clip-path resolves against
    // the untransformed border box, and this measures synchronously before paint.
    setSize({ height: node.offsetHeight, width: node.offsetWidth })

    const observer = new ResizeObserver(([entry]) => {
      const borderBox = entry?.borderBoxSize?.[0]
      setSize(
        borderBox
          ? { height: borderBox.blockSize, width: borderBox.inlineSize }
          : { height: node.offsetHeight, width: node.offsetWidth },
      )
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Memoized so resizing doesn't detach and reattach the consumer's ref.
  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const clipPath = buildClipPath(size.width, size.height, Boolean(first))

  return (
    <button
      className={cn(root(), className)}
      ref={setRefs}
      style={clipPath ? { clipPath } : undefined}
      type="button"
      {...props}
    >
      {/* Hidden until measured, so it never flashes as an unclipped rectangle. */}
      <span aria-hidden="true" className={fill()} style={clipPath ? undefined : { opacity: 0 }} />
      <span className={label()}>{children}</span>
      {/* Focus ring on its own layer: above the opaque fill, inset so clip-path can't cut it off. */}
      <span aria-hidden="true" className={ring()} />
    </button>
  )
}
