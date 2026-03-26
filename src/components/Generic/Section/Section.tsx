import { Heading, type HeadingProps } from "@/components/Primitive"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  titleProps?: Omit<HeadingProps, "children">
  titleOverlay?: React.ReactNode
  subtitle?: string
  subtitleClassName?: string
  children: React.ReactNode
}

export function Section({
  title,
  titleProps,
  titleOverlay,
  subtitle,
  subtitleClassName,
  children,
  className,
  ...rest
}: SectionProps) {
  const heading = (
    <Heading h={2} {...titleProps}>
      {title}
    </Heading>
  )

  return (
    <section className={cn("flex w-full flex-col items-center gap-10", className)} {...rest}>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        {titleOverlay ? (
          <div className="relative flex justify-center">
            {heading}
            {titleOverlay}
          </div>
        ) : (
          heading
        )}
        {subtitle && (
          <p className={cn("paragraph max-w-lg text-gray-700", subtitleClassName)}>{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  )
}
