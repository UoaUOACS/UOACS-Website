import { tv, type VariantProps } from "tailwind-variants"

/**
 * Sponsor Badge variant configurations.
 * Consists of themes options.
 */
export const sponsorBadgeVariants = tv({
  slots: {
    inner:
      "flex flex-row gap-4 items-center border-4 border-transparent bg-black p-4 paragraph font-mono text-white text-left w-fit px-3 py-2",
    border:
      "border-4 border-transparent rounded-xs cursor-pointer w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
  },
  variants: {
    tier: {
      gold: {
        inner: "bg-sponsor-gold text-sponsor-gold-text",
        border: "border-sponsor-gold-border",
      },
      silver: {
        inner: "bg-sponsor-silver text-sponsor-silver-text",
        border: "border-sponsor-silver-border",
      },
      diamond: {
        inner: "bg-sponsor-diamond text-sponsor-diamond-text",
        border: "border-sponsor-diamond-border",
      },
    },
  },
  defaultVariants: {
    tier: "gold",
  },
})

/**
 * Props for the button variant configuration.
 */
export type SponsorBadgeVariantProps = VariantProps<typeof sponsorBadgeVariants>
