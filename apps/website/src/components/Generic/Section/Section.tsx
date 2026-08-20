import { cn, Heading, type HeadingProps } from "@uoacs/ui"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  titleProps?: Omit<HeadingProps, "children">
  titleOverlay?: React.ReactNode
  headerClassName?: string
  subtitle?: React.ReactNode
  subtitleClassName?: string
  children: React.ReactNode
}

export function Section({
  title,
  titleProps,
  titleOverlay,
  headerClassName,
  subtitle,
  subtitleClassName,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("flex w-full flex-col items-center gap-10", className)} {...rest}>
      <div
        className={cn(
          "flex flex-col items-center gap-2 px-4 text-center",
          titleOverlay && "relative",
          headerClassName,
        )}
      >
        <Heading h={2} {...titleProps}>
          {title}
        </Heading>
        {titleOverlay}
        {subtitle && (
          <p className={cn("paragraph max-w-xl text-gray-700", subtitleClassName)}>{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  )
}
