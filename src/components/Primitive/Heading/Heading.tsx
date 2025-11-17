import { cn } from "@/lib/utils"
import { type HeadingVariants, headingVariants } from "./variants"

/**
 * Props for the Heading component.
 */
export interface HeadingProps {
  /**
   * Heading level (1-6).
   */
  h: HeadingVariants["h"]
  /**
   * Heading text content.
   */
  children: string
  /**
   * Whether to display a period at the end of the heading.
   */
  period?: boolean
  /**
   * Additional class names for the heading element.
   */
  className?: string
  /**
   * Additional class names for the period element.
   */
  periodClassName?: string
}

/**
 * Heading component for displaying headings with optional period.
 *
 * @param h Heading level (1-6).
 * @param children Heading text content.
 * @param period Whether to display a period at the end of the heading.
 * @param className Additional class names for the heading element.
 * @param periodClassName Additional class names for the period element.
 * @returns Component for rendering a heading.
 * @example
 * <Heading h={1}>Example Heading</Heading>
 * <Heading h={2} period>Heading With Period</Heading>
 */
export const Heading = ({
  h,
  children,
  period = false,
  className,
  periodClassName,
}: HeadingProps) => {
  const { textVariant, periodVariant } = headingVariants({ h })
  return (
    <h1 className={cn(className, textVariant())}>
      {period ? (
        <>
          {children.substring(0, children.lastIndexOf(" ") + 1)}
          <span className="whitespace-nowrap">
            {children.substring(children.lastIndexOf(" ") + 1)}
            {period && <span className={cn(periodVariant(), periodClassName)} />}
          </span>
        </>
      ) : (
        children
      )}
    </h1>
  )
}
