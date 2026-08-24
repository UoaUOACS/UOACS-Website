import { tv, type VariantProps } from "tailwind-variants"

export const encryptedBannerLayerVariants = tv({
  base: "pointer-events-none block w-full font-mono text-xs leading-none whitespace-nowrap select-none md:text-base",
  variants: {
    colour: {
      pink: "text-brand-pink",
      orange: "text-brand-orange",
      purple: "text-brand-purple",
      blue: "text-brand-blue",
    },
  },
  defaultVariants: {
    colour: "blue",
  },
})

export type EncryptedBannerLayerVariants = VariantProps<typeof encryptedBannerLayerVariants>
