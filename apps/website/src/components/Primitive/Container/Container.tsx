import { cn } from "@/lib/utils"
import { type ContainerVariantProps, containerVariants } from "./Container.variants"

/**
 *
 */
export interface ContainerProps extends ContainerVariantProps {
  children: React.ReactNode
  title?: string
  className?: string
}

/**
 *
 * @param param0
 * @returns
 */
export const Container = ({ children, title: titleText, className, theme }: ContainerProps) => {
  const { container, title: titleClass } = containerVariants({ theme })
  return (
    <div className={cn(container(), className)}>
      {titleText && <p className={titleClass()}>{titleText}</p>}
      {children}
    </div>
  )
}
