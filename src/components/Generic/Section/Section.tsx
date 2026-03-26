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

export const Section = ({
  title,
  titleProps,
  titleOverlay,
  subtitle,
  subtitleClassName,
  children,
  className,
  ...rest
}: SectionProps) => {
  return (
    <section className={cn("flex w-full flex-col items-center gap-10", className)} {...rest}>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        {titleOverlay ? (
          <div className="relative flex justify-center">
            <Heading h={2} {...titleProps}>
              {title}
            </Heading>
            {titleOverlay}
          </div>
        ) : (
          <Heading h={2} {...titleProps}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <p className={cn("paragraph max-w-lg text-gray-700", subtitleClassName)}>{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  )
}

/**
 * <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <Heading h={2}>Who We Are</Heading>
        <p className="paragraph">
          As well as being a social club, we also help out newer students through workshops and run
          industry related events to connect you with real companies.
        </p>
      </div>

  <div className="flex w-full flex-col items-center gap-14 md:gap-18">
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <Heading h={1} period>
            Our Team
          </Heading>
          <p className="paragraph text-gray-700">
            These are the people who make this club possible.
          </p>
        </div>
 */
