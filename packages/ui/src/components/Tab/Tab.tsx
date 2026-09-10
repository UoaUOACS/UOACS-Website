import { cn } from "../../utils"
import { type TabVariantProps, tabVariants } from "./Tab.variants"

export interface TabProps extends TabVariantProps, React.HTMLAttributes<HTMLDivElement> {}

export const Tab = ({ children, className, ...props }: TabProps) => {
  const variantClasses = tabVariants()

  return (
    <div className={cn(variantClasses, className)} {...props}>
      {children}
    </div>
  )
}
