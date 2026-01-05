import { tv, type VariantProps } from "tailwind-variants"

/**
 * Heading component variants for different heading levels.
 */
export const headingVariants = tv({
  slots: {
    textVariant:
      "flex flex-row flex-wrap items-end justify-center font-semibold gap-x-[0.2em] text-base font-inter text-center",
    periodVariant: "bg-primary inline-block",
  },
  variants: {
    h: {
      1: {
        textVariant: "text-7xl md:text-9xl",
        periodVariant: "size-2 ml-1.5 md:size-3 md:ml-3 rounded-xs",
      },
      2: {
        textVariant: "text-6xl md:text-8xl",
        periodVariant: "size-1.5 ml-1 md:size-2.5 md:ml-2.5 rounded-xs",
      },
      3: {
        textVariant: "text-5xl md:text-6xl",
        periodVariant: "size-1.5 ml-1 md:size-2 md:ml-2 rounded-xs",
      },
      4: {
        textVariant: "text-3xl md:text-4xl",
        periodVariant: "size-1 ml-0.5 md:size-1.5 md:ml-1.5 rounded-xs",
      },
      5: {
        textVariant: "text-2xl md:text-3xl",
        periodVariant: "size-1 ml-0.5 md:ml-1 rounded-2xs",
      },
      6: {
        textVariant: "text-xl md:text-2xl",
        periodVariant: "size-1 ml-0.5 md:ml-1 rounded-2xs",
      },
    },
  },
  defaultVariants: {
    h: 1,
  },
})

export type HeadingVariants = VariantProps<typeof headingVariants>
