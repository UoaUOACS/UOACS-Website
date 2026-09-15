import { tv, type VariantProps } from "tailwind-variants"

export const tabVariants = tv({
  slots: {
    root: "group relative isolate inline-flex cursor-pointer items-center justify-center py-4 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    // Shape comes from a clip-path Tab.tsx sets from the measured size.
    fill: "absolute inset-0 z-0 transition-colors duration-200 ease-in-out",
    label: "relative z-10 whitespace-nowrap font-bold font-mono text-lg",
    // Own layer, above the fill, inset so clip-path doesn't cut it off.
    ring: "pointer-events-none absolute inset-0 z-20 opacity-0 ring-2 ring-inset ring-primary transition-opacity group-focus-visible:opacity-100",
  },
  variants: {
    // Design-specific pinks, not a pink-* token. Opaque, not one colour at reduced
    // opacity, since tabs overlap and a translucent fill would show through.
    // #FFA5C6 doubles as the inactive label (tinted, not greyed); #FFFFFF is
    // explicit because this theme's --color-white is gray-50, not pure white.
    active: {
      true: {
        fill: "bg-[#FFA5C6]",
        label: "text-[#FFFFFF]",
      },
      false: {
        fill: "bg-[#FF4A8D]",
        label: "text-[#FFA5C6]",
      },
    },
    // Lopsided padding for the first tab keeps its label centred against a
    // one-sided slant; a trailing tab is slanted on both sides and needs more.
    first: {
      true: { root: "pr-24 pl-16" },
      false: { root: "px-28" },
    },
  },
  defaultVariants: {
    active: false,
    first: false,
  },
})

export type TabVariantProps = VariantProps<typeof tabVariants>
