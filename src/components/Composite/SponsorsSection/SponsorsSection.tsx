import Link from "next/link"
import { SponsorTicker } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
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
 * A section component that displays sponsors with a heading, description, ticker, and link to all sponsors
 *
 * @param sponsors An array of sponsor documents to display in the section
 */
export const SponsorsSection = ({ sponsors }: SponsorsSectionProps) => {
  return (
    <div className="flex max-w-360 flex-col items-center justify-center gap-6 overflow-hidden md:gap-12">
      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <Heading h={2}>Sponsored By</Heading>
        <p className="font-light text-md md:text-lg">
          These are the people that support us and make this club possible.
        </p>
      </div>
      <SponsorTicker containerClassName="max-w-360" items={sponsors} />
      <Link href="/sponsors">
        <Button borderClassName="md:hidden" variant={{ theme: "dark", size: "sm", border: true }}>
          SEE ALL SPONSORS
        </Button>
        <Button
          borderClassName="hidden md:inline-flex"
          variant={{ theme: "dark", size: "md", border: true }}
        >
          SEE ALL SPONSORS
        </Button>
      </Link>
    </div>
  )
}
