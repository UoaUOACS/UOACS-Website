import { type SponsorBadgeVariantProps, sponsorBadgeVariants } from "./variants"

/**
 * Props for the SponsorBadge component.
 */
export interface SponsorBadgeProps extends SponsorBadgeVariantProps {}

/**
 * Renders a sponsorship badge based on the provided tier.
 *
 * @param tier The sponsorship tier to display
 * @returns A badge component representing the sponsorship tier
 * @deprecated Use the `Container` component with appropriate styling instead.
 */
export const SponsorBadge = ({ tier }: SponsorBadgeProps) => {
  const { border, inner } = sponsorBadgeVariants({ tier })
  return (
    <div className={border()}>
      <p className={inner()}>{`${tier?.toUpperCase()} SPONSORS`}</p>
    </div>
  )
}
