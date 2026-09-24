import { tv, type VariantProps } from "tailwind-variants"

export const projectCardVariants = tv({
  slots: {
    base: "group relative flex w-full max-w-sm flex-col overflow-hidden bg-white p-1 transition-shadow duration-200 hover:shadow-lg",
    imageWrapper: "relative aspect-4/3 w-full overflow-hidden bg-gray-200",
    titleTab: "absolute inset-x-0 bottom-0 flex h-[38%] items-center bg-white",
    title: "font-mono text-lg font-medium tracking-wider text-[#FF307C] truncate",
  },
  variants: {
    variant: {
      default: {},
      rounded: {
        base: "rounded-3xl",
        imageWrapper: "rounded-[20px]",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ProjectCardVariants = VariantProps<typeof projectCardVariants>
