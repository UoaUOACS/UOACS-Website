import { tv, type VariantProps } from "tailwind-variants"

/**
 * Variants for the MobileNavbar component.
 */
export const mobileNavbarVariants = tv({
  base: "md:hidden fixed flex left-0 top-0 z-50 h-full w-full gap-16 flex-col items-center justify-start bg-white overscroll-y-hidden pt-6",
  variants: {
    isOpen: {
      true: "flex",
      false: "hidden",
    },
  },
})

export type MobileNavbarVariants = VariantProps<typeof mobileNavbarVariants>
