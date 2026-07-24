import { tv, type VariantProps } from "tailwind-variants"

/**
 * EmptyState variant configurations.
 * Consists of a size variant controlling icon size and spacing density.
 */
export const emptyStateVariants = tv({
  slots: {
    root: "flex flex-col items-center justify-center text-center",
    icon: "text-gray-400",
    image: "h-auto w-full",
    title: "heading-4",
    description: "paragraph text-gray-700",
    titleDescriptionGroup: "flex flex-col items-center justify-center gap-1",
    actions: "mt-2 flex flex-row flex-wrap items-center justify-center gap-3",
  },
  variants: {
    size: {
      sm: {
        root: "gap-1",
        titleDescriptionGroup: "gap-1",
        icon: "size-8",
        description: "paragraph-sm",
      },
      default: { root: "gap-2", titleDescriptionGroup: "gap-1", icon: "size-12" },
    },
  },
  defaultVariants: { size: "default" },
})

/**
 * Props for the EmptyState variant configuration.
 */
export type EmptyStateVariantProps = VariantProps<typeof emptyStateVariants>
