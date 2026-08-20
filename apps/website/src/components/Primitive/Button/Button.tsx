import { cn } from "@/lib/utils"
import { type ButtonVariantProps, buttonVariants } from "./variants"

/**
 * Props for the {@link Button} component
 */
export interface ButtonProps
  extends ButtonVariantProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  left?: React.ReactNode
  right?: React.ReactNode
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * A clickable button component with optional left and right icons.
 *
 * @param left Optional left icon or element to display inside the button.
 * @param right Optional right icon or element to display inside the button.
 * @returns A styled button element.
 */
export const Button = ({ children, className, left, right, theme, ...props }: ButtonProps) => {
  const variantClasses = buttonVariants({ theme })

  return (
    <button className={cn(variantClasses, className)} type="button" {...props}>
      {left && <span>{left}</span>}
      {children}
      {right && <span>{right}</span>}
    </button>
  )
}
