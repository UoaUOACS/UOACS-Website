import { cn } from "@/lib/utils"
import { type EmptyStateVariantProps, emptyStateVariants } from "./EmptyState.variants"

/**
 * Props for the {@link EmptyState} component
 */
export interface EmptyStateProps extends EmptyStateVariantProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/**
 * A placeholder shown in place of content when there is nothing to display,
 * e.g. an empty list, a missing page, or a search with no results.
 *
 * @param icon Optional icon or illustration displayed above the title.
 * @param title Optional short heading describing the empty state.
 * @param description Optional supporting text with more detail.
 * @param action Optional call-to-action, typically a `Button`.
 * @param children Optional extra content rendered below the action.
 * @returns A centered, styled empty state element.
 */
export const EmptyState = ({
  icon,
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
    title: titleClass,
    description: descriptionClass,
    titleDescriptionGroup: titleDescriptionGroupClass,
    actions,
  } = emptyStateVariants({ size })

  return (
    <div className={cn(root(), className)}>
      {icon && <div className={iconClass()}>{icon}</div>}
      <div className={titleDescriptionGroupClass()}>
        {title && <p className={titleClass()}>{title}</p>}
        {description && <p className={descriptionClass()}>{description}</p>}
      </div>
      {action && <div className={actions()}>{action}</div>}
      {children}
    </div>
  )
}
