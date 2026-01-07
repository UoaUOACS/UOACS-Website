import { tv, type VariantProps } from "tailwind-variants"

/**
 * Button variant configurations.
 * Consists of themes, sizes, and border options.
 */
export const buttonVariants = tv({
  slots: {
    inner:
      "flex flex-row gap-4 items-center rounded-xl border-4 border-transparent bg-black p-4 font-mono text-white text-left",
    border:
      "rounded-2xl border-4 border-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
  },
  variants: {
    theme: {
      primary: {
        inner: "bg-primary",
        border: "border-primary-border",
      },
      secondary: {
        inner: "bg-secondary",
        border: "",
      },
      ghost: {
        inner: "bg-transparent text-black",
        border: "border-gray-300",
      },
      dark: {
        inner: "bg-black",
        border: "border-gray-300",
      },
      light: {
        inner: "bg-gray-300 text-black",
        border: "border-gray-200",
      },
    },
    size: {
      navbar: {
        inner: "text-sm px-6 py-3 gap-2",
      },
      sm: {
        inner: "text-sm px-4 py-2 gap-2",
      },
      "sm-wide": {
        inner: "text-sm px-6 py-2 gap-2",
      },
      md: {
        inner: "text-md p-4 gap-4",
      },
      "md-wide": {
        inner: "text-md px-6 py-4 gap-4",
      },
      lg: {
        inner: "text-lg p-6 gap-6",
      },
      "lg-wide": {
        inner: "text-lg px-10 py-6 gap-6",
      },
    },
    border: {
      true: {},
      false: {
        border: "border-transparent",
      },
      none: {
        border: "border-0",
        inner: "border-0",
      },
    },
  },
  defaultVariants: {
    theme: "primary",
    size: "md",
    border: true,
  },
})

/**
 * Props for the button variant configuration.
 */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>
