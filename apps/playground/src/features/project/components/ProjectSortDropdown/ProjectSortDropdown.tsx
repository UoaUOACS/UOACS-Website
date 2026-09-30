import { Dropdown } from "@uoacs/ui"
import { getDiscoverHref } from "@/features/project/helpers/discover"
import { PROJECT_SORT_OPTIONS } from "@/features/project/project.constants"
import { ProjectSort, type ProjectTab } from "@/features/project/types/enums"

interface ProjectSortDropdownProps {
  sort: ProjectSort
  /**
   * The current tab, kept when changing the sort.
   */
  tab: ProjectTab
}

/**
 * The sort menu for the Discover section. Each option links to the first page of the new sort.
 */
export const ProjectSortDropdown = ({ sort, tab }: ProjectSortDropdownProps) => (
  <Dropdown
    label={
      <>
        <span className="sr-only">Sort by </span>
        {PROJECT_SORT_OPTIONS[sort].label}
      </>
    }
    options={Object.values(ProjectSort).map((value) => ({
      label: PROJECT_SORT_OPTIONS[value].label,
      href: getDiscoverHref({ tab, sort: value }),
      theme: "ghost" as const,
      className: "w-full",
    }))}
    popoverClassName="items-stretch gap-0 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
    theme="ghost"
    trigger={{
      triggerClassName: "rounded-lg border border-gray-300 font-cartograph text-sm",
    }}
  />
)
