import { type SponsorBadgeVariantProps, sponsorBadgeVariants } from "./variants"

export interface SponsorBadgeProps extends SponsorBadgeVariantProps {}

export const SponsorBadge = ({ tier }: SponsorBadgeVariantProps) => {
  const { border, inner } = sponsorBadgeVariants({ tier })
  return (
    <div className={border()}>
      <p className={inner()}>{`${tier?.toUpperCase()} SPONSORS`}</p>
    </div>
  )
}
