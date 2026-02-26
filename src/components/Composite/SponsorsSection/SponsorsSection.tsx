import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { SponsorTicker } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { Sponsor } from "@/payload/payload-types"

/**
 * Props for the {@link SponsorsSection} component
 */
export interface SponsorsSectionProps {
  /**
   * An array of sponsor documents to display in the section
   */
  sponsors: Sponsor[]
}

/**
 * @param className Additional class names to apply to the colour palette container
 * @warning Unless `absolute` positioning is overridden, a `bottom` or `top` and a `left` or `right` class must be provided to position the palette correctly within the section
 */
const ColourPalette = ({ className }: { className: string }) => {
  return (
    <div className={cn("absolute grid h-3 w-44 grid-cols-5", className)}>
      <div className="bg-brand-orange" />
      <div className="bg-brand-blue" />
      <div className="bg-brand-purple" />
      <div className="bg-brand-pink" />
      <div className="bg-black" />
    </div>
  )
}

/**
 * A section component that displays sponsors with a heading, description, ticker, and link to all sponsors
 *
 * @param sponsors An array of sponsor documents to display in the section
 */
export const SponsorsSection = ({ sponsors }: SponsorsSectionProps) => {
  return (
    <div className="flex max-w-360 flex-col items-center justify-center gap-6 overflow-hidden md:gap-12">
      <div className="relative flex flex-col items-center gap-6 px-4 py-12 text-center md:py-12">
        <ColourPalette className="top-0 right-0" />
        <Heading h={2}>Sponsored By</Heading>
        <p className="paragraph">
          These are the people that support us and make this club{" "}
          <span className="text-brand-pink">possible</span>
        </p>
        <ColourPalette className="bottom-0 left-0 hidden md:grid" />
      </div>
      <SponsorTicker containerClassName="max-w-360" items={sponsors} />
      <Link href="/sponsors">
        <Button right={<ArrowRightIcon className="h-4 w-4 md:h-6 md:w-6" />} theme="dark">
          See All Our Sponsors
        </Button>
      </Link>
    </div>
  )
}
