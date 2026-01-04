import { tv, type VariantProps } from "tailwind-variants"

/**
 * Heading component variants for different heading levels.
 */
export const headingVariants = tv({
  slots: {
    textVariant:
      "flex flex-row flex-wrap items-end justify-start font-semibold gap-x-[0.2em] text-base font-inter",
    periodVariant: "ml-0.5 bg-primary inline-block",
  },
  variants: {
    h: {
      1: { textVariant: "text-9xl", periodVariant: "size-3 rounded-xs" },
      2: { textVariant: "text-8xl", periodVariant: "size-2.5 rounded-xs" },
      3: { textVariant: "text-6xl", periodVariant: "size-2 rounded-xs" },
      4: { textVariant: "text-4xl", periodVariant: "size-1.5 rounded-xs" },
      5: { textVariant: "text-3xl", periodVariant: "size-1 rounded-2xs" },
      6: { textVariant: "text-2xl", periodVariant: "size-1 rounded-2xs" },
    },
  },
  defaultVariants: {
    h: 1,
  },
})

export type HeadingVariants = VariantProps<typeof headingVariants>
