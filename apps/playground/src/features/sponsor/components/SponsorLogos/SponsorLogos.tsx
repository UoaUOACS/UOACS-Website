import { LazyImage, Skeleton } from "@uoacs/ui"
import Link from "next/link"
import { SponsorTicker } from "@/features/sponsor/components/SponsorTicker/SponsorTicker"
import { SPONSORS_HREF, TIER_SIZES } from "@/features/sponsor/constants"
import { SponsorTier } from "@/features/sponsor/types/enums"
import { getAllSponsorsCached } from "../../sponsor.queries"

/**
 * Fetches sponsors from Payload and displays their logos in a ticker when there are more than two sponsors, otherwise in a row
 *
 * Async server component, so render inside a Suspense boundary (see {@link SponsorLogosSkeleton})
 */
export const SponsorLogos = async () => {
  const sponsors = await getAllSponsorsCached()

  return sponsors.length > 2 ? (
    <SponsorTicker containerClassName="max-w-360" items={sponsors} />
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      {sponsors.map((sponsor) => {
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
          <Link href={SPONSORS_HREF} key={sponsor.id}>
            <LazyImage
              alt={sponsor.name || "Sponsor Logo"}
              className="max-h-full max-w-full object-contain"
              height={TIER_SIZES[sponsor.tier]?.height}
              src={src}
              width={TIER_SIZES[sponsor.tier]?.width}
            />
          </Link>
        )
      })}
    </div>
  )
}

/**
 * A loading placeholder for {@link SponsorLogos}, sized to match the largest sponsor tier
 */
export const SponsorLogosSkeleton = () => (
  <div
    aria-busy="true"
    className="flex w-full max-w-360 justify-center gap-6 overflow-hidden md:gap-24"
  >
    {Array.from({ length: 3 }, (_, i) => (
      <Skeleton
        className="shrink-0"
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
        key={i}
        style={{
          height: TIER_SIZES[SponsorTier.DIAMOND].height,
          width: TIER_SIZES[SponsorTier.DIAMOND].width,
        }}
      />
    ))}
  </div>
)
