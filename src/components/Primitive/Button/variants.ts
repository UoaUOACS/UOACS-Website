import { tv, type VariantProps } from "tailwind-variants"

export const buttonVariants = tv({
  slots: {
    inner:
      "flex flex-row gap-4 items-center rounded-xl border-4 border-transparent bg-black p-4 font-mono text-white",
    border: "rounded-2xl border-4 border-transparent cursor-pointer",
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
    },
  },
  defaultVariants: {
    theme: "primary",
    size: "md",
    border: true,
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
