import { tv, type VariantProps } from "tailwind-variants"

export const valuesFingerprintVariants = tv({
  slots: {
    svg: "relative",
    container: "relative",
    label: "-translate-y-1/2 absolute top-1/2 transform font-semibold",
  },
  variants: {
    colour: {
      pink: {
        svg: "fill-brand-pink",
      },
      orange: {
        svg: "fill-brand-orange",
      },
      purple: {
        svg: "fill-brand-purple",
      },
      blue: {
        svg: "fill-brand-blue",
      },
    },
    size: {
      sm: {
        svg: "size-32",
        label: "text-5xl ml-7",
      },
      md: {
        svg: "size-38",
        label: "text-6xl ml-8",
      },
      lg: {
        svg: "size-44",
        label: "text-7xl ml-9",
      },
    },
  },
  defaultVariants: {
    colour: "purple",
    size: "md",
  },
})

export type ValuesFingerprintVariants = VariantProps<typeof valuesFingerprintVariants>
