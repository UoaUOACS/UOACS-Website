import { tv, type VariantProps } from "tailwind-variants"

export const projectTabsVariants = tv({
  slots: {
    list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-2",
    tab: "font-cartograph text-sm transition-colors duration-150",
  },
  variants: {
    active: {
      true: { tab: "text-black" },
      false: { tab: "text-gray-400 hover:text-gray-700" },
    },
    disabled: {
      true: { tab: "cursor-not-allowed text-gray-300 hover:text-gray-300" },
    },
  },
  defaultVariants: {
    active: false,
  },
})

export type ProjectTabsVariants = VariantProps<typeof projectTabsVariants>
