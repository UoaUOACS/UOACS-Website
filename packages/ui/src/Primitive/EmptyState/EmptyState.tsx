import { cn } from "../../utils/cn"
import { type EmptyStateVariantProps, emptyStateVariants } from "./EmptyState.variants"

/**
 * Props for the {@link EmptyState} component
 */
export type EmptyStateProps = EmptyStateVariantProps & {
  title?: string
  description?: React.ReactNode
  action?: React.ReactNode
  children?: React.ReactNode
  className?: string
} & ({ icon?: React.ReactNode; image?: never } | { icon?: never; image?: React.ReactNode })

/**
 * A placeholder shown in place of content when there is nothing to display,
 * e.g. an empty list, a missing page, or a search with no results.
 *
 * @param icon Optional icon displayed above the title. Mutually exclusive with `image`.
 * @param image Optional full-width illustration displayed above the title. Mutually exclusive with `icon`.
 * @param title Optional short heading describing the empty state.
 * @param description Optional supporting text with more detail. Pass a `<br/>` between fragments for multi-line text.
 * @param action Optional call-to-action, typically a `Button`.
 * @param children Optional extra content rendered below the action.
 * @returns A centered, styled empty state element.
 */
export const EmptyState = ({
  icon,
  image,
  title,
  description,
  action,
  children,
  size,
  className,
}: EmptyStateProps) => {
  const {
    root,
    icon: iconClass,
    image: imageClass,
    title: titleClass,
    description: descriptionClass,
    titleDescriptionGroup: titleDescriptionGroupClass,
    actions,
  } = emptyStateVariants({ size })

  return (
    <div className={cn(root(), className)}>
      {icon && <div className={iconClass()}>{icon}</div>}
      {image && <div className={imageClass()}>{image}</div>}
      <div className={titleDescriptionGroupClass()}>
        {title && <p className={titleClass()}>{title}</p>}
        {description && <p className={descriptionClass()}>{description}</p>}
      </div>
      {action && <div className={actions()}>{action}</div>}
      {children}
    </div>
  )
}
