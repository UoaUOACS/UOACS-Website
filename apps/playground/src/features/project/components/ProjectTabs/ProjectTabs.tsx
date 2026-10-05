import Link from "next/link"
import { type GetDiscoverHref, getDiscoverHref } from "@/features/project/helpers/discover"
import { PROJECT_TABS } from "@/features/project/project.constants"
import type { ProjectSort, ProjectTab } from "@/features/project/types/enums"
import { projectTabsVariants } from "./ProjectTabs.variants"

interface ProjectTabsProps {
  activeTab: ProjectTab
  /**
   * The current sort, kept when switching tabs.
   */
  sort: ProjectSort
  /**
   * Builds the link for a state, so the tabs can live on pages other than home. Defaults to the
   * home page's links.
   */
  getHref?: GetDiscoverHref
  /**
   * Shows every tab as disabled, regardless of {@link PROJECT_TABS}.
   */
  disabled?: boolean
  className?: string
}

/**
 * The row of tabs that filter the Discover section. Tabs that aren't enabled in
 * {@link PROJECT_TABS} are shown as "coming soon".
 */
export const ProjectTabs = ({
  activeTab,
  sort,
  getHref = getDiscoverHref,
  disabled = false,
  className,
}: ProjectTabsProps) => {
  const { list, tab } = projectTabsVariants()

  return (
    <nav aria-label="Project categories" className={className}>
      <ul className={list()}>
        {PROJECT_TABS.map(({ value, label, enabled }) => (
          <li key={value}>
            {enabled && !disabled ? (
              <Link
                aria-current={value === activeTab ? "page" : undefined}
                className={tab({ active: value === activeTab })}
                href={getHref({ tab: value, sort })}
              >
                {label}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className={tab({ disabled: true })}
                title={disabled ? undefined : "Coming soon"}
              >
                {label}
                {!disabled && <span className="sr-only"> (coming soon)</span>}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
