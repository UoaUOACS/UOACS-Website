import { tv, type VariantProps } from "tailwind-variants"

export const profileAboutVariants = tv({
  slots: {
    root: "flex w-full flex-col gap-8",
    section: "flex flex-col items-start gap-2",
    paragraph: "paragraph whitespace-pre-line",
    placeholder: "paragraph text-gray-400",
    list: "flex flex-col items-start gap-1",
  },
})

export type ProfileAboutVariants = VariantProps<typeof profileAboutVariants>
