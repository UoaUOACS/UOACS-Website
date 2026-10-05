import { AnimatedSuspense, Heading } from "@uoacs/ui"
import Form from "next/form"
import { redirect } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { DiscoverProjectsSkeleton } from "@/features/project/components/DiscoverProjects/DiscoverProjectsSkeleton"
import { DiscoverProjectsView } from "@/features/project/components/DiscoverProjects/DiscoverProjectsView"
import { getProjectsCached } from "@/features/project/project.queries"
import { SearchBar } from "@/features/search/components/SearchBar/SearchBar"
import { getSearchHref, loadSearchState } from "@/features/search/helpers/search"
import { Routes } from "@/lib/routes"

interface SearchResultsProps {
  /**
   * The page's search params, which hold the query, tab, sort, and page.
   */
  searchParams: Promise<SearchParams>
}

const SearchResultsContent = async ({ searchParams }: SearchResultsProps) => {
  const state = await loadSearchState(searchParams)
  const { q } = state
  const { projects, totalPages } = await getProjectsCached(state)

  // Send pages past the end to the last page
  if (totalPages > 0 && state.page > totalPages) {
    redirect(getSearchHref({ ...state, page: totalPages }))
  }

  return (
    <div className="flex w-full max-w-full flex-col items-center gap-10 px-2 pt-16 md:gap-16 md:px-0 md:pt-32">
      <Heading className="text-center text-secondary" h={3}>
        {q ? `"${q}"` : "Search projects"}
      </Heading>

      <Form action={Routes.SEARCH} className="w-full md:w-1/2">
        <SearchBar defaultValue={q} name="q" />
      </Form>

      {projects.length > 0 ? (
        <DiscoverProjectsView
          {...state}
          disableTabs
          getHref={(next) => getSearchHref({ ...next, q })}
          projects={projects}
          totalPages={totalPages}
        />
      ) : (
        <p className="text-center text-secondary">No projects found.</p>
      )}
    </div>
  )
}

/**
 * The search page: the query, a search bar, and the matching projects with the same tabs, sort,
 * and pagination as the home page's Discover section.
 */
export const SearchResults = ({ searchParams }: SearchResultsProps) => (
  <AnimatedSuspense fallback={<DiscoverProjectsSkeleton />}>
    <SearchResultsContent searchParams={searchParams} />
  </AnimatedSuspense>
)
