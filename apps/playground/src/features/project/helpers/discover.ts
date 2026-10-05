import {
  createLoader,
  createSerializer,
  parseAsInteger,
  parseAsStringEnum,
  type SearchParams,
} from "nuqs/server"
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

/**
 * URL search param parsers for the Discover section. Missing or invalid values fall back to the
 * defaults, and only enabled tabs are accepted.
 */
export const discoverParsers = {
  tab: parseAsStringEnum<ProjectTab>(
    PROJECT_TABS.filter((tab) => tab.enabled).map((tab) => tab.value),
  ).withDefault(DEFAULT_PROJECT_TAB),
  sort: parseAsStringEnum<ProjectSort>(Object.values(ProjectSort)).withDefault(
    DEFAULT_PROJECT_SORT,
  ),
  page: parseAsInteger.withDefault(1),
}

const loadSearchParams = createLoader(discoverParsers)
const serialize = createSerializer(discoverParsers)

/**
 * Reads the Discover state from the page's search params.
 *
 * @param searchParams The page's search params.
 * @returns The tab, sort, and page to show.
 */
export const loadDiscoverParams = async (
  searchParams: Promise<SearchParams> | SearchParams,
): Promise<DiscoverState> => {
  const { tab, sort, page } = loadSearchParams(await searchParams)
  // parseAsInteger accepts zero and negative numbers, which aren't valid pages
  return { tab, sort, page: Math.max(page, 1) }
}

/**
 * Builds the URL for a Discover state, leaving out defaults so the plain home URL stays clean.
 * Omit `page` to go back to the first page, e.g. after changing the sort.
 *
 * @param state The tab, sort, and page to link to.
 * @returns The home page URL with the matching search params.
 */
export const getDiscoverHref = (state: Partial<DiscoverState>) => serialize(Routes.HOME, state)

export type GetDiscoverHref = (state: Partial<DiscoverState>) => string
