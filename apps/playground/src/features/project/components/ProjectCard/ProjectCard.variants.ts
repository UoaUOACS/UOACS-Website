import { tv, type VariantProps } from "tailwind-variants"

export const projectCardVariants = tv({
  slots: {
    base: "group flex w-full flex-col gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
    imageWrapper:
      "relative aspect-4/3 w-full overflow-hidden bg-white shadow-md transition-shadow duration-200 group-hover:shadow-lg",
    title: "px-1 font-medium text-sm sm:text-base",
  },
  variants: {
    variant: {
      default: {},
      rounded: {
        base: "rounded-lg",
        imageWrapper: "rounded-lg",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ProjectCardVariants = VariantProps<typeof projectCardVariants>
