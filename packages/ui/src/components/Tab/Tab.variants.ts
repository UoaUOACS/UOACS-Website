import { tv, type VariantProps } from "tailwind-variants"

export const tabVariants = tv({
  slots: {
    root: "relative inline-flex cursor-pointer items-center justify-center px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    fill: "absolute inset-0 -z-10 rounded-tl-md transition-colors duration-200 ease-in-out [clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)]",
    label: "relative z-10 whitespace-nowrap font-bold font-mono",
  },
  variants: {
    active: {
      true: {
        fill: "bg-primary opacity-100",
        label: "text-white",
      },
      false: {
        fill: "bg-primary opacity-40",
        label: "text-white/70",
      },
    },
  },
  defaultVariants: {
    active: false,
  },
})

export type TabVariantProps = VariantProps<typeof tabVariants>
