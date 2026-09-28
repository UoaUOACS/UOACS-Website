import { tv, type VariantProps } from "tailwind-variants"

export const skeletonVariants = tv({
  base: "block animate-pulse bg-gray-200 motion-reduce:animate-none",
  variants: {
    shape: {
      rect: "h-24 w-full rounded-lg",
      text: "h-[1em] w-full rounded-sm",
      circle: "size-10 rounded-full",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
})

/**
 * Props for the skeleton variant configuration.
 */
export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>
