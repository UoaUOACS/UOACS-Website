import { tv, type VariantProps } from "tailwind-variants"

/**
 * Dropdown variant configurations.
 * Consists of themes and sizes for the trigger button and popover.
 */
export const dropdownVariants = tv({
  slots: {
    popover:
      "absolute top-full left-1/2 -translate-x-1/2 z-10 mt-1 flex flex-col w-max origin-top rounded-2xl border-4 border-transparent bg-clip-padding p-1",
    icon: "transition-transform duration-200",
  },
  variants: {
    theme: {
      primary: {
        popover: "bg-primary text-white",
      },
      dark: {
        popover: "bg-black text-white",
      },
      light: {
        popover: "bg-gray-300 text-black",
      },
    },
    size: {
      sm: {
        icon: "size-2",
      },
      "sm-wide": {
        icon: "size-2",
      },
      md: {
        icon: "size-3",
      },
      "md-wide": {
        icon: "size-3",
      },
      lg: {
        icon: "size-4",
      },
      "lg-wide": {
        icon: "size-4",
      },
    },
    isOpen: {
      true: {
        icon: "-rotate-180",
      },
      false: {
        icon: "rotate-0",
      },
    },
  },
  defaultVariants: {
    theme: "primary",
    size: "md",
    isOpen: false,
  },
})

/**
 * Props for the dropdown variant configuration.
 */
export type DropdownVariantProps = VariantProps<typeof dropdownVariants>
