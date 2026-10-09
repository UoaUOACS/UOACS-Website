import { tv, type VariantProps } from "tailwind-variants"

export const paginatedProjectGridVariants = tv({
  slots: {
    root: "flex w-full flex-col gap-8",
    pagination: "self-center pt-4",
  },
})

export type PaginatedProjectGridVariants = VariantProps<typeof paginatedProjectGridVariants>
