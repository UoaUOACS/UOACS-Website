import { tv, type VariantProps } from "tailwind-variants"

export const projectCardVariants = tv({
  slots: {
    base: "group relative flex w-full max-w-sm flex-col overflow-hidden bg-white",
    imageWrapper: "relative aspect-4/3 w-full overflow-hidden bg-gray-100",
    footer: "flex items-center justify-between border-t border-gray-100 py-3",
    authorGroup: "flex items-center gap-2 min-w-0",
    avatarIcon: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
    authorName: "truncate font-serif text-sm font-semibold text-gray-900",
    trophyIcon: "h-7 w-7 shrink-0",
  },
  variants: {
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ProjectCardVariants = VariantProps<typeof projectCardVariants>
