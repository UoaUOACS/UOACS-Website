import { tv, type VariantProps } from "tailwind-variants"

export const projectCardVariants = tv({
  slots: {
    base: "group relative flex w-full max-w-sm flex-col transition-all duration-200",
    imageWrapper: "relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-100",
    overlay:
      "pointer-events-none absolute inset-x-0 bottom-0 flex h-2/5 items-end bg-linear-to-t from-black/70 via-black/25 via-50% to-transparent p-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100",
    title: "font-cartograph text-lg text-white",
    footer: "flex min-w-0 items-center justify-between px-2 py-3",
    authorGroup: "flex min-w-0 items-center gap-2",
    avatarIcon: "shrink-0 stroke-2 text-gray-900",
    authorName: "font-neulis truncate text-sm font-semibold text-gray-900",
    statsGroup: "flex shrink-0 items-center gap-3",
    awardIcon: "shrink-0 stroke-2 text-gray-900",
    likesGroup: "flex items-center gap-1",
    heartIcon: "shrink-0 stroke-2 text-gray-900",
    likesCount: "text-xs font-medium text-gray-500",
    content: "",
    description: "",
    awardGroup: "",
    awardTitle: "",
    awardSubtitle: "",
  },
  variants: {
    variant: {
      default: {},
      profile: {
        base: "max-w-none gap-6 rounded-md bg-white p-8 lg:flex-row lg:gap-10",
        imageWrapper: "lg:w-100 lg:shrink-0",
        title: "font-switzer text-3xl font-bold break-words text-gray-900",
        heartIcon: "size-5",
        likesCount: "text-sm font-normal text-gray-500",
        content: "relative flex min-w-0 flex-1 flex-col gap-4 lg:grid lg:grid-rows-[1fr_auto_1fr]",
        description: "paragraph mt-2 line-clamp-3 text-gray-900",
        awardIcon: "size-8",
        awardGroup: "flex items-start gap-2 lg:absolute lg:top-0 lg:right-0 lg:w-80",
        awardTitle: "paragraph font-semibold text-gray-900",
        awardSubtitle: "paragraph-sm text-gray-400",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ProjectCardVariants = VariantProps<typeof projectCardVariants>
