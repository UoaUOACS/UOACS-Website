import { tv, type VariantProps } from "tailwind-variants"

/**
 * Heading component variants for different heading levels.
 */
export const headingVariants = tv({
  slots: {
    textVariant: "flex flex-row flex-wrap items-end justify-center gap-x-[0.2em] text-center",
    periodVariant: "bg-primary inline-block",
  },
  variants: {
    h: {
      1: {
        textVariant: "heading-1",
        periodVariant: "size-2 ml-1.5 md:size-3 md:ml-3 rounded-xs",
      },
      2: {
        textVariant: "heading-2",
        periodVariant: "size-1.5 ml-1 md:size-2.5 md:ml-2.5 rounded-xs",
      },
      3: {
        textVariant: "heading-3",
        periodVariant: "size-1.5 ml-1 md:size-2 md:ml-2 rounded-xs",
      },
      4: {
        textVariant: "heading-4",
        periodVariant: "size-1 ml-0.5 md:size-1.5 md:ml-1.5 rounded-xs",
      },
    },
  },
  defaultVariants: {
    h: 1,
  },
})

export type HeadingVariants = VariantProps<typeof headingVariants>
