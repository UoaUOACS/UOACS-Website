import { tv, type VariantProps } from "tailwind-variants"

/**
 * Button variant configurations.
 * Consists of themes, sizes, and border options.
 */
export const buttonVariants = tv({
  base: "paragraph flex h-6.5 w-fit cursor-pointer flex-row items-center gap-2 rounded-sm px-3 py-1 font-medium transition-colors duration-300 ease-in-out md:h-8.5",
  variants: {
    theme: {
      primary: "bg-primary text-white hover:bg-pink-400",
      ghost: "bg-transparent text-black hover:bg-gray-200",
      dark: "bg-black text-white hover:bg-gray-700",
      light: "bg-gray-200 text-black hover:bg-gray-300",
    },
  },
  defaultVariants: {
    theme: "primary",
  },
})

/**
 * Props for the button variant configuration.
 */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>
