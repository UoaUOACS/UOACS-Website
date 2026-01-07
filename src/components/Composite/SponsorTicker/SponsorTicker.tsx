import Image from "next/image"
import Link from "next/link"
import Marquee from "react-fast-marquee"
import type { Sponsor } from "@/payload/payload-types"

/**
 * Props for the SponsorTicker component
 */
export interface SponsorTickerProps {
  /**
   * A list of sponsors to display in the ticker
   */
  items: Sponsor[]
  /**
   * Optional additional class names to apply to the component
   */
  className?: string
}

/**
 * A ticker component that displays a list of sponsors in a scrolling marquee.
 *
 * @param items a list of sponsors to display in the ticker
 * @param className optional additional class names to apply to the component
 * @returns a sponsor ticker component
 */
export const SponsorTicker = ({ items, className }: SponsorTickerProps) => {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-white to-transparent md:w-64" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-white to-transparent md:w-64" />

      <Marquee className={className} gradient={false} pauseOnHover speed={30}>
        {items.map((sponsor) => {
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

          return (
            <Link
              className="mx-3 flex h-40 w-full items-center justify-center px-3 md:mx-12 md:px-6"
              href={sponsor.link}
              key={sponsor.id}
            >
              {src && (
                <Image
                  alt={sponsor.name || "Sponsor Logo"}
                  className="h-auto w-auto max-w-48 object-contain md:max-w-64"
                  height={0}
                  src={src}
                  width={0}
                />
              )}
            </Link>
          )
        })}
      </Marquee>
    </>
  )
}
