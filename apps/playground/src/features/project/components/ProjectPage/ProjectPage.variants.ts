import { tv } from "tailwind-variants"

/**
 * The project page's layout, shared with the editor's preview so they look the same
 */
export const projectPageVariants = tv({
  slots: {
    base: "flex w-full flex-col gap-10 md:gap-14",
    blocks: "flex flex-col gap-8",
  },
})
