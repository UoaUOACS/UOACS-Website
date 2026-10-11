"use client"

import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import { Button } from "@uoacs/ui"
import { useSession } from "@/context/SessionContext"
import { Routes, websiteUrl } from "@/lib/routes"
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
  /**
   * The Instagram profile URL, passed through to each {@link Reel}.
   */
  instagramHref: string
}

/**
 * AboutUsSection component for the homepage.
 *
 * @param reels An array of reels to display in the About Us section.
 */
export const AboutUsSection = ({ reels, instagramHref }: AboutUsSectionProps) => {
  const session = useSession()
  return (
    <div className="flex w-full flex-row justify-between gap-18 overflow-x-visible">
      <div className="flex w-full flex-none flex-col items-center gap-8 md:w-auto md:max-w-lg md:items-start md:gap-12">
        <div className="paragraph flex flex-col gap-6">
          <p className="font-mono">
            {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
            <span className="text-primary">// </span>ABOUT US
          </p>
          <p>
            UOACS is the University of Auckland's Computer Science student association, connecting
            students with the skills, people and opportunities that help them grow in tech.
          </p>
        </div>
        <p className="paragraph">
          Through technical workshops, industry events, competitions, educational initiatives and
          social experiences, we create opportunities for students to develop beyond the classroom
          and engage with Auckland's wider technology community.
        </p>
        <div className="flex flex-col items-center gap-6 md:items-start">
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            {!session && (
              <a
                className="w-fit"
                href={authPageUrl(AuthPages.SIGN_UP, websiteUrl(Routes.PROFILE))}
              >
                <Button right={<ArrowRightIcon className="h-4 w-4 md:h-6 md:w-6" />} theme="dark">
                  Join UOACS
                </Button>
              </a>
            )}
            <a className="w-fit" href="mailto:outreach@uoacs.co.nz">
              <Button right={<ArrowRightIcon className="h-4 w-4 md:h-6 md:w-6" />} theme="dark">
                Partner With Us
              </Button>
            </a>
          </div>
          <p className="paragraph-sm font-medium">Membership is 100% free so come join us!</p>
        </div>
      </div>
      <div className="hidden flex-none md:flex">
        <div className="flex h-full flex-row flex-nowrap justify-start gap-4 overflow-x-visible">
          {reels.map((reel) => (
            <Reel instagramHref={instagramHref} key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </div>
  )
}
