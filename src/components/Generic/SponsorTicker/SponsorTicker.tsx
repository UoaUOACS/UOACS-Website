"use client"

import Link from "next/link"
import { SmartTicker } from "react-smart-ticker"
import { LazyImage } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { Sponsor } from "@/payload/payload-types"
import { SponsorTier } from "@/types/enums"

/**
 * Props for the SponsorTicker component
 */
export interface SponsorTickerProps {
  /**
   * A list of sponsors to display in the ticker
   */
  items: Sponsor[]
  /**
   * Optional additional class names to apply to the wrapping container
   */
  containerClassName?: string
}

/**
 * A ticker component that displays a list of sponsors in a scrolling marquee.
 *
 * @param items a list of sponsors to display in the ticker
 * @param containerClassName optional additional class names to apply to the component
 * @returns a sponsor ticker component
 */
export const SponsorTicker = ({ items, containerClassName }: SponsorTickerProps) => {
  const tierSizes: Record<SponsorTier, { height: number; width: number }> = {
    [SponsorTier.DIAMOND]: {
      height: 120,
      width: 320,
    },
    [SponsorTier.GOLD]: { height: 120, width: 320 },
    [SponsorTier.SILVER]: { height: 80, width: 240 },
  }

  // Duplicate items to cover full width of page
  const repeatedItems = [...items, ...items]

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-white to-transparent md:w-64" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-white to-transparent md:w-64" />

      <SmartTicker isText={false} pauseOnHover>
        {repeatedItems.map((sponsor, index) => {
          const logo = sponsor.logo
          let src: string | undefined

          if (!logo) {
            src = undefined
          } else if (typeof logo === "string") {
            src = logo
          } else if (typeof logo === "object" && logo !== null) {
            const maybeMedia = logo as { url?: string | null; thumbnailURL?: string | null }
            src = maybeMedia.url ?? maybeMedia.thumbnailURL ?? undefined
          }

          if (!src) return null

          return (
            <Link
              className="mx-3 flex shrink-0 items-center justify-center px-3 md:mx-12 md:px-6"
              href={sponsor.link || "#"}
              key={`${sponsor.id}-${index}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LazyImage
                alt={sponsor.name || "Sponsor Logo"}
                className="max-h-full max-w-full object-contain"
                height={tierSizes[sponsor.tier as SponsorTier].height}
                src={src}
                width={tierSizes[sponsor.tier as SponsorTier].width}
              />
            </Link>
          )
        })}
      </SmartTicker>
    </div>
  )
}
