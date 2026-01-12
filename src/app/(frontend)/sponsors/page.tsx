import type { Metadata } from "next"
import { getPayload } from "payload"
import { SponsorBadge } from "@/components/Generic"
import { Heading, LazyImage } from "@/components/Primitive"
import type { Sponsor } from "@/payload/payload-types"
import config from "@/payload.config"
import { SPONSOR_TIER_ORDER, SponsorTier } from "@/types/enums"

export const metadata: Metadata = {
  title: "Sponsors",
}

export default async function SponsorsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: sponsors }: { docs: Sponsor[] } = await payload.find({
    collection: "sponsor",
  })

  const tiers = sponsors
    .map((sponsor) => sponsor.tier)
    .filter((tier, index, self) => self.indexOf(tier) === index)
    .sort(
      (a, b) =>
        SPONSOR_TIER_ORDER.indexOf(a as SponsorTier) - SPONSOR_TIER_ORDER.indexOf(b as SponsorTier),
    )
  const sponsorsByTier: Record<string, Sponsor[]> = {}
  tiers.forEach((tier) => {
    sponsorsByTier[tier] = sponsors
      .filter((sponsor) => sponsor.tier === tier)
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  const tierSizes: Record<SponsorTier, { height: number; width: number }> = {
    [SponsorTier.DIAMOND]: {
      height: 120,
      width: 320,
    },
    [SponsorTier.GOLD]: { height: 120, width: 320 },
    [SponsorTier.SILVER]: { height: 80, width: 240 },
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Heading h={1} period>
          Our Sponsors
        </Heading>
        <p className="text-md md:text-lg">
          These are the organisations who make this club possible.
        </p>
      </div>
      <div className="flex max-w-330 flex-row flex-wrap items-center justify-center gap-x-24 gap-y-12">
        {tiers.map((tier) => (
          <div className="flex flex-col items-center justify-center gap-9 md:gap-6" key={tier}>
            <SponsorBadge tier={tier} />
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-18 gap-y-12 md:gap-24">
              {sponsorsByTier[tier].map((sponsor) => {
                const photo = sponsor.logo
                let src: string | undefined

                if (!photo) {
                  src = undefined
                } else if (typeof photo === "string") {
                  src = photo
                } else if (typeof photo === "object" && photo !== null) {
                  const maybeMedia = photo as { url?: string | null; thumbnailURL?: string | null }
                  src = maybeMedia.url ?? maybeMedia.thumbnailURL ?? undefined
                }

                if (!src) return null

                return (
                  <a
                    className="relative flex items-center justify-center"
                    href={sponsor.link || "#"}
                    key={sponsor.name}
                    rel="noopener noreferrer"
                    style={{
                      height: `${tierSizes[tier as SponsorTier].height}px`,
                      width: `${tierSizes[tier as SponsorTier].width}px`,
                    }}
                    target="_blank"
                  >
                    <LazyImage alt={sponsor.name} src={src} {...tierSizes[tier as SponsorTier]} />
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
