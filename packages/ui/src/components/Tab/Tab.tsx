"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../utils"
import { type TabVariantProps, tabVariants } from "./Tab.variants"

/** Horizontal run of the diagonal edge, in px. Exported so a tablist can work out how much to overlap adjacent tabs. */
export const SLANT = 35
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
 * The clip-path sits on the button itself, not just its fill, so a row of
 * overlapping tabs hit-tests the same way it looks: a click lands on whichever
 * tab is visibly on top at that point, and falls through to the tab behind
 * wherever the top tab's shape doesn't cover it. The focus ring lives on its own
 * layer, above the fill and inset rather than offset outward, because clip-path
 * cuts off anything painted outside the border box, and the fill is opaque
 * enough to paint over a ring drawn directly on the button underneath it.
 */
export const Tab = ({ active, children, className, first, ref, ...props }: TabProps) => {
  const { root, fill, label, ring } = tabVariants({ active, first })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const node = buttonRef.current
    if (!node) return

    // offsetWidth/offsetHeight (and borderBoxSize below) are the untransformed
    // border box clip-path resolves against — getBoundingClientRect includes
    // any ancestor scaling or page zoom, which would size the path wrong.
    // Measuring here, synchronously, means the first paint is already clipped
    // correctly instead of showing an unclipped rectangle for a frame.
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

  // Memoized so it only changes identity when the consumer's own ref does,
  // instead of detaching and reattaching both refs on every resize.
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
      {/* Hidden until first measured, so the gap before that never shows as an unclipped rectangle. */}
      <span aria-hidden="true" className={fill()} style={clipPath ? undefined : { opacity: 0 }} />
      <span className={label()}>{children}</span>
      <span aria-hidden="true" className={ring()} />
    </button>
  )
}
