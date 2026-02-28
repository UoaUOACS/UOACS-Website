import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Button } from "@/components/Primitive"
import type { Reel as ReelDocument } from "@/payload/payload-types"
import { Reel } from "../Reel/Reel"

/**
 * Props for the {@link AboutUsSection} component.
 */
export interface AboutUsSectionProps {
  /**
   * An array of reels to display in the About Us section.
   */
  reels: ReelDocument[]
}

/**
 * AboutUsSection component for the homepage.
 *
 * @param reels An array of reels to display in the About Us section.
 */
export const AboutUsSection = ({ reels }: AboutUsSectionProps) => {
  return (
    <div className="flex w-full flex-row justify-between gap-18 overflow-x-visible">
      <div className="flex w-full flex-none flex-col items-center gap-8 md:w-auto md:max-w-lg md:items-start md:gap-12">
        <div className="paragraph flex flex-col gap-6">
          <p className="font-mono">
            {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
            <span className="text-primary">// </span>ABOUT US
          </p>
          <p>
            Computer science students are known to be slightly more on the antisocial end of the
            spectrum, and as a club, we hope to break that stereotype.
          </p>
        </div>
        <p className="paragraph">
          University life can be daunting at times, and we hope to serve as the catalyst for
          lifelong friendships. We do this through our mix of social, industry, educational and
          competitive events.
        </p>
        <div className="flex flex-col items-center gap-6 md:items-start">
          <Link className="w-fit" href="/sign-up">
            <Button right={<ArrowRightIcon className="h-4 w-4 md:h-6 md:w-6" />} theme="dark">
              Interested? Join UOACS
            </Button>
          </Link>
          <p className="paragraph-sm font-medium">Membership is 100% free so come join us!</p>
        </div>
      </div>
      <div className="hidden flex-none md:flex">
        <div className="flex h-full flex-row flex-nowrap justify-start gap-4 overflow-x-visible">
          {reels.map((reel) => (
            <Reel key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </div>
  )
}
