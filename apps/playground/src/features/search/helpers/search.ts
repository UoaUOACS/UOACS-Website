import { createLoader, createSerializer, parseAsString, type SearchParams } from "nuqs/server"
import { type DiscoverState, discoverParsers } from "@/features/project/helpers/discover"
import { Routes } from "@/lib/routes"

/**
 * The search page's state, as stored in the URL: the query, sort, and page.
 */
export interface SearchState extends Omit<DiscoverState, "tab"> {
  q: string
}

/**
 * URL search param parsers for the search page. Reuses the Discover sort and page parsers.
 */
export const searchParsers = {
  sort: discoverParsers.sort,
  page: discoverParsers.page,
  q: parseAsString.withDefault(""),
}

const loadParams = createLoader(searchParsers)
const serialize = createSerializer(searchParsers)

/**
 * Reads the search state from the page's search params.
 *
 * @param searchParams The page's search params.
 * @returns The query, sort, and page to show.
 */
export const loadSearchState = async (
  searchParams: Promise<SearchParams> | SearchParams,
): Promise<SearchState> => {
  const { q, sort, page } = loadParams(await searchParams)
  return { q: q.trim(), sort, page: Math.max(page, 1) }
}

/**
 * Builds the URL for a search state, leaving out defaults. Omit `page` to go back to the first
 * page, e.g. after changing the sort.
 *
 * @param state The query, sort, and page to link to.
 * @returns The search page URL with the matching search params.
 */
export const getSearchHref = (state: Partial<SearchState>) => serialize(Routes.SEARCH, state)
