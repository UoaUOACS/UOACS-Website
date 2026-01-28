import Image from "next/image"
import { Button } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { Reel as ReelDocument } from "@/payload/payload-types"
import { Reel } from "../Reel/Reel"

/**
 *
 */
export interface AboutUsSectionProps {
  reels: ReelDocument[]
}

/**
 *
 */
export const AboutUsSection = ({ reels }: AboutUsSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-42 md:flex-row md:flex-wrap md:justify-between md:gap-12">
      <div className="flex flex-1 flex-col gap-8 font-light leading-[100%] md:min-w-54 md:max-w-xl md:gap-12">
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
        <div className="flex flex-col gap-6">
          <a
            className="w-fit"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button borderClassName="w-fit" variant={{ theme: "dark", size: "sm" }}>
              INTERESTED? JOIN US
            </Button>
          </a>
          <p className="paragraph-sm font-medium">Membership is 100% free so come join us!</p>
        </div>
      </div>
      <div className="-z-1 mx-auto flex max-h-132 flex-row-reverse flex-wrap justify-center gap-4 md:flex-nowrap">
        {reels.map((reel, index) => (
          <div className={cn("relative", index === 0 ? "" : "hidden sm:inline")} key={reel.id}>
            {index === 0 && (
              <Image
                alt="Mascot"
                className="-top-42.5 md:-top-47.5 -translate-x-1/2 -z-2 pointer-events-none absolute left-1/2"
                height={360}
                loading="lazy"
                src="/mascot.png"
                width={360}
              />
            )}
            <Reel reel={reel} />
          </div>
        ))}
      </div>
    </div>
  )
}
