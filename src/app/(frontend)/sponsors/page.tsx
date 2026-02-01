import type { Metadata } from "next"
import { getPayload } from "payload"
import { Container, Heading, LazyImage } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { Sponsor } from "@/payload/payload-types"
import config from "@/payload.config"
import { SPONSOR_TIER_ORDER, SponsorTier } from "@/types/enums"

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the organisations that help make the University of Auckland Computer Society possible.",
}

export default async function SponsorsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: sponsors }: { docs: Sponsor[] } = await payload.find({
    collection: "sponsor",
    depth: 2,
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
      height: 150,
      width: 380,
    },
    [SponsorTier.GOLD]: { height: 150, width: 380 },
    [SponsorTier.SILVER]: { height: 80, width: 200 },
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3 px-4 text-center md:gap-6">
        <Heading h={1} period>
          Our Sponsors
        </Heading>
        <p className="paragraph text-gray-700">
          These are the people that support us and make this club possible.
        </p>
      </div>
      <div className="flex w-full max-w-220 flex-col items-stretch justify-between gap-x-6 gap-y-12 md:flex-row md:flex-wrap">
        {tiers.map((tier) => (
          <Container
            className="flex w-auto flex-1 flex-col justify-center gap-4 p-4 md:min-w-1/3 md:flex-row md:flex-wrap"
            key={tier}
            theme={tier as SponsorTier}
            title={`${tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()} Sponsor`}
          >
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
                  className={cn(
                    "flex flex-1 items-center justify-center rounded-lg p-6 transition-all duration-300 hover:bg-gray-500-opaque",
                    sponsor.tier === SponsorTier.DIAMOND || sponsor.tier === SponsorTier.GOLD
                      ? "h-[200px]"
                      : "h-[150px]",
                  )}
                  href={sponsor.link || "#"}
                  key={sponsor.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LazyImage
                    alt={sponsor.name}
                    containerClassName="md:!w-full"
                    src={src}
                    {...tierSizes[tier as SponsorTier]}
                  />
                </a>
              )
            })}
          </Container>
        ))}
      </div>
      <p className="paragraph mx-auto max-w-96 text-center text-gray-700">
        Interested in becoming our sponsors?
        <br />
        contact us via{" "}
        <a className="text-pink-700 underline" href="mailto:outreach@uacs.org">
          outreach@uoacs.org
        </a>
      </p>
    </>
  )
}
