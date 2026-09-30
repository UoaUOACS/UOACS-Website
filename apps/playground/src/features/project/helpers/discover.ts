import {
  DEFAULT_PROJECT_SORT,
  DEFAULT_PROJECT_TAB,
  PROJECT_TABS,
} from "@/features/project/project.constants"
import { ProjectSort, type ProjectTab } from "@/features/project/types/enums"
import { Routes } from "@/lib/routes"

/**
 * The Discover section's filters, as stored in the URL.
 */
export interface DiscoverState {
  tab: ProjectTab
  sort: ProjectSort
  page: number
}

type SearchParams = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

const isProjectSort = (value: string | undefined): value is ProjectSort =>
  Object.values(ProjectSort).includes(value as ProjectSort)

/**
 * Reads the Discover state from the URL, falling back to the defaults for anything missing or
 * invalid, including tabs that aren't enabled yet.
 *
 * @param searchParams The page's search params.
 * @returns The tab, sort, and page to show.
 */
export const parseDiscoverParams = (searchParams: SearchParams): DiscoverState => {
  const tabParam = first(searchParams.tab)
  const sortParam = first(searchParams.sort)
  const page = Number(first(searchParams.page))

  return {
    tab:
      PROJECT_TABS.find((tab) => tab.enabled && tab.value === tabParam)?.value ??
      DEFAULT_PROJECT_TAB,
    sort: isProjectSort(sortParam) ? sortParam : DEFAULT_PROJECT_SORT,
    page: Number.isInteger(page) && page >= 1 ? page : 1,
  }
}

/**
 * Builds the URL for a Discover state, leaving out defaults so the plain home URL stays clean.
 * Omit `page` to go back to the first page, e.g. after changing the sort.
 *
 * @param state The tab, sort, and page to link to.
 * @returns The home page URL with the matching search params.
 */
export const getDiscoverHref = ({ tab, sort, page }: Partial<DiscoverState>) => {
  const params = new URLSearchParams()
  if (tab && tab !== DEFAULT_PROJECT_TAB) params.set("tab", tab)
  if (sort && sort !== DEFAULT_PROJECT_SORT) params.set("sort", sort)
  if (page && page > 1) params.set("page", String(page))

  const query = params.toString()
  return query ? `${Routes.HOME}?${query}` : Routes.HOME
}
