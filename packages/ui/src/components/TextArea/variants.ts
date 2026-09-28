import { tv, type VariantProps } from "tailwind-variants"

/**
 * TextArea variant configurations.
 * Also styles other multi-line text boxes, such as the rich text editor.
 */
export const textAreaVariants = tv({
  base: "field-sizing-content min-h-16 w-full rounded border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-600",
  variants: {
    resize: {
      vertical: "resize-y",
      none: "resize-none",
    },
  },
  defaultVariants: {
    resize: "vertical",
  },
})

/**
 * Props for the textarea variant configuration.
 */
export type TextAreaVariantProps = VariantProps<typeof textAreaVariants>
