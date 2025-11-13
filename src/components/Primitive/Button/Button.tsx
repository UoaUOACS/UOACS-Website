import { cn } from "@/lib/utils"
import { type ButtonVariantProps, buttonVariants } from "./variants"

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  borderClassName?: string
  variant?: ButtonVariantProps
  type?: HTMLButtonElement["type"]
  left?: React.ReactNode
  right?: React.ReactNode
}

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
