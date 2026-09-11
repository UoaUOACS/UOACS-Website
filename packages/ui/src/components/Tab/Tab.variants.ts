import { tv, type VariantProps } from "tailwind-variants"

export const tabVariants = tv({
  slots: {
    root: "group relative isolate inline-flex cursor-pointer items-center justify-center py-4 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    // The trapezoid comes from a clip-path Tab.tsx sets from the measured size.
    fill: "absolute inset-0 z-0 transition-colors duration-200 ease-in-out",
    label: "relative z-10 whitespace-nowrap font-bold font-mono text-lg",
    // Its own layer above the fill, shown only on focus-visible. Inset (not
    // offset) so it stays inside the button's clip-path instead of being cut
    // off at the edge, and above the opaque fill instead of painted underneath it.
    ring: "pointer-events-none absolute inset-0 z-20 opacity-0 ring-2 ring-inset ring-primary transition-opacity group-focus-visible:opacity-100",
  },
  variants: {
    // These pinks are design-specific and match no pink-* token. Both fills are
    // opaque rather than one colour at reduced opacity, because tabs overlap and
    // a translucent active tab lets the darker tab behind it show through.
    //
    // #FFA5C6 is reused as the inactive label: inactive tabs are tinted, not
    // greyed. #FFFFFF is written out because this theme maps --color-white to
    // gray-50, which reads dimmer than the design's white.
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
    // Padding only. The first tab is slanted on its trailing edge alone, so its
    // padding is lopsided to keep the label looking centred; a trailing tab is
    // slanted on both edges and needs more room to leave the same margin around
    // its label.
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
