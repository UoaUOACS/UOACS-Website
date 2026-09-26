import { tv, type VariantProps } from "tailwind-variants"

export const projectCardVariants = tv({
  slots: {
    base: "group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg",
    imageWrapper: "relative aspect-4/3 w-full overflow-hidden bg-gray-100",
    footer: "flex items-center justify-between border-t border-gray-100 px-4 py-3",
    authorGroup: "flex items-center gap-2 min-w-0",
    avatarIcon: "shrink-0 text-gray-900 stroke-2",
    authorName: "font-neulis truncate text-sm font-semibold text-gray-900",
    statsGroup: "flex shrink-0 items-center gap-3",
    trophyIcon: "shrink-0 text-gray-900 stroke-2",
    likesGroup: "flex items-center gap-1",
    heartIcon: "shrink-0 text-gray-900 stroke-2",
    likesCount: "text-xs font-medium text-gray-500",
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
