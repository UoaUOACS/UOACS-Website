import { cn } from "@/lib/utils"
import { type ButtonVariantProps, buttonVariants } from "./variants"

/**
 * Props for the {@link Button} component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button to live in the middle of the button.
   */
  children: React.ReactNode
  /**
   * Additional class names for the button inner div.
   */
  className?: string
  /**
   * Additional class names for the button border.
   */
  borderClassName?: string
  /**
   * Variant configuration for the button.
   */
  variant?: ButtonVariantProps
  /**
   * Optional left icon or element.
   */
  left?: React.ReactNode
  /**
   * Optional right icon or element.
   */
  right?: React.ReactNode
}

/**
 * A primitive Button component that supports various themes, sizes, and border options.
 *
 * @param props {@link ButtonProps} for the Button component.
 * @returns A styled button element.
 */
export const Button = ({
  children,
  left,
  right,
  borderClassName = "",
  className = "",
  variant,
  ...props
}: ButtonProps) => {
  const { inner, border } = buttonVariants(variant)

  return (
    <button className={cn(border(), borderClassName)} {...props}>
      <div className={cn(inner(), className)}>
        {left}
        {children}
        {right}
      </div>
    </button>
  )
}
