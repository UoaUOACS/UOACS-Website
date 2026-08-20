"use client"

import { cn } from "@uoacs/ui"
import { useRef } from "react"
import { useContainerWidth } from "@/hooks/useContainerWidth"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { EncryptedBannerLayer } from "./EncryptedBannerLayer"
import type { EncryptedBannerLayerVariants } from "./variants"

/** Tailwind's `md` breakpoint, matching the text-xs -> md:text-base switch in variants.ts */
const MD_BREAKPOINT_QUERY = "(min-width: 768px)"

/**
 * Approximate rendered width (px) of one monospace character, at each font
 * size the banner uses (text-xs below `md`, text-base from `md` up)
 */
const CHAR_WIDTH_PX = { mobile: 6.4, desktop: 8.5 } as const

/**
 * Props for the EncryptedBanner component
 */
export interface EncryptedBannerProps {
  /**
   * Number of scrambled character bands to overlay
   */
  layers?: 1 | 2
  /**
   * Number of characters to render per band. Defaults to however many are
   * needed to fill the container's width, so the full wave/arc is visible
   * edge-to-edge instead of overflowing and being cropped.
   */
  length?: number
  /**
   * Colour of the primary band
   */
  colour?: EncryptedBannerLayerVariants["colour"]
  /**
   * Colour of the secondary band, when `layers` is 2
   */
  secondaryColour?: EncryptedBannerLayerVariants["colour"]
  /**
   * Additional class names to apply to the wrapping container
   */
  className?: string
}

/**
 * A decorative banner that displays a static "wavy" strip of random
 * nonalphanumeric characters, with an optional second overlayed band.
 *
 * @param layers number of scrambled character bands to overlay (1 or 2)
 * @param length number of characters to render per band (auto-fit to width if omitted)
 * @param colour colour of the primary band
 * @param secondaryColour colour of the secondary band, when `layers` is 2
 * @param className additional class names to apply to the container
 * @returns an encrypted-style banner component
 */
export const EncryptedBanner = ({
  layers = 1,
  length,
  colour = "blue",
  secondaryColour = "pink",
  className,
}: EncryptedBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerWidth = useContainerWidth(containerRef)
  const isMdUp = useMediaQuery(MD_BREAKPOINT_QUERY)
  const charWidthPx = isMdUp ? CHAR_WIDTH_PX.desktop : CHAR_WIDTH_PX.mobile
  const computedLength = length ?? Math.max(40, Math.ceil(containerWidth / charWidthPx))

  return (
    <div
      className={cn("relative h-32 w-full overflow-hidden md:h-48", className)}
      ref={containerRef}
    >
      <div className="absolute inset-0 flex -rotate-2 items-center">
        <EncryptedBannerLayer
          colour={colour}
          length={computedLength}
          sweep={{ startOffset: 0, intervalMs: 30, count: 3 }}
          wave={{ amplitude: 42, maxRotate: 12, steepness: 5 }}
        />
      </div>
      {layers === 2 && (
        <div className="absolute inset-0 flex -rotate-3 items-center">
          <EncryptedBannerLayer
            colour={secondaryColour}
            length={computedLength}
            sweep={{ startOffset: 0.5, intervalMs: 45, count: 2 }}
            wave={{ amplitude: 34, flip: true, maxRotate: 9, steepness: 4 }}
          />
        </div>
      )}
    </div>
  )
}
