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
        base: "max-w-none flex-row gap-10 rounded-[5px] bg-white px-[22px] pt-[22px] pb-[43px]",
        imageWrapper: "w-100 shrink-0",
        title: "font-inter text-[30px] font-bold break-words text-black",
        likesCount: "font-cartograph text-[15px] font-normal text-[#727272]",
        content: "grid min-w-0 flex-1 grid-rows-[1fr_auto_1fr] gap-4 pr-6",
        description: "font-inter mt-2 line-clamp-3 text-xl font-normal text-black",
        awardGroup: "absolute top-[43px] right-[39px] flex w-80 items-start gap-2",
        awardTitle: "font-inter text-xl font-semibold text-black",
        awardSubtitle: "font-inter text-[15px] font-normal text-[#b5b5b5]",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type ProjectCardVariants = VariantProps<typeof projectCardVariants>
