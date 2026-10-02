import type { Where } from "payload"
import { ProjectSort, ProjectTab } from "./types/enums"

/**
 * How many projects to show per page of the Discover section.
 */
export const PROJECTS_PER_PAGE = 9

/**
 * Like count shown on every project card until likes are stored on projects.
 */
export const PLACEHOLDER_LIKES = 0

/**
 * Author name shown on a project card when the project's author can't be loaded.
 */
export const UNKNOWN_AUTHOR_NAME = "Unknown author"

export const DEFAULT_PROJECT_SORT = ProjectSort.RECENT

/**
 * Sort options in the order they appear in the sort dropdown, mapped to Payload's `sort` syntax.
 */
export const PROJECT_SORT_OPTIONS: Record<ProjectSort, { label: string; payloadSort: string }> = {
  [ProjectSort.RECENT]: { label: "Recent", payloadSort: "-createdAt" },
  [ProjectSort.A_TO_Z]: { label: "A-Z", payloadSort: "name" },
  [ProjectSort.Z_TO_A]: { label: "Z-A", payloadSort: "-name" },
}

export const DEFAULT_PROJECT_TAB = ProjectTab.DISCOVER

export interface ProjectTabOption {
  value: ProjectTab
  label: string
  /**
   * Disabled tabs are shown as "coming soon" and can't be selected, even from the URL.
   */
  enabled: boolean
  /**
   * The Payload filter for projects in this tab. Omit to show every project.
   */
  where?: Where
}

/**
 * Tabs in the order they appear. To enable a tab once its data exists, set `enabled` and add a
 * `where` filter, e.g. `{ featured: { equals: true } }`.
 */
export const PROJECT_TABS: ProjectTabOption[] = [
  { value: ProjectTab.DISCOVER, label: "Discover", enabled: true },
  { value: ProjectTab.FEATURED, label: "Featured", enabled: false },
  { value: ProjectTab.HACKATHON, label: "Hackathon", enabled: false },
  { value: ProjectTab.AWARDS, label: "Awards", enabled: false },
  { value: ProjectTab.STAFF_PICKS, label: "Staff-picks", enabled: false },
]
