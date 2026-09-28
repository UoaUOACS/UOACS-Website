import { tv, type VariantProps } from "tailwind-variants"

export const skeletonVariants = tv({
  base: "block bg-gray-200 motion-reduce:animate-none",
  variants: {
    shape: {
      rect: "h-24 w-full rounded-lg",
      text: "h-[1em] w-full rounded-sm",
      circle: "size-10 rounded-full",
    },
    animation: {
      shimmer:
        "animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent bg-size-[200%_100%] motion-reduce:bg-none",
      pulse: "animate-pulse",
      none: "",
    },
  },
  defaultVariants: {
    shape: "rect",
    animation: "shimmer",
  },
})

/**
 * Props for the skeleton variant configuration.
 */
export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>
