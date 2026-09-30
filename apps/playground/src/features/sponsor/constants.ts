import { SponsorTier } from "@/features/sponsor/types/enums"

/**
 * Playground has no sponsors page of its own, so link to the one on the main website.
 */
export const SPONSORS_HREF = "https://uoacs.co.nz/sponsors"

export const TIER_SIZES: Record<SponsorTier, { height: number; width: number }> = {
  [SponsorTier.DIAMOND]: {
    height: 120,
    width: 320,
  },
  [SponsorTier.GOLD]: { height: 120, width: 320 },
  [SponsorTier.SILVER]: { height: 80, width: 240 },
}
