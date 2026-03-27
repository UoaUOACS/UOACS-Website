import { SponsorTier } from "@/types/enums"

export const TIER_SIZES: Record<SponsorTier, { height: number; width: number }> = {
  [SponsorTier.DIAMOND]: {
    height: 120,
    width: 320,
  },
  [SponsorTier.GOLD]: { height: 120, width: 320 },
  [SponsorTier.SILVER]: { height: 80, width: 240 },
}

export const UPLOAD_SIZE_LIMIT_BYTES = 33_554_432 // 32MB
