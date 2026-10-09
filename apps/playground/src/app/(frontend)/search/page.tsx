import { AnimatedSuspense, EmptyState, Heading } from "@uoacs/ui"
import Form from "next/form"
import { redirect } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { PaginatedProjectGrid } from "@/features/project/components/PaginatedProjectGrid/PaginatedProjectGrid"
import { PaginatedProjectGridSkeleton } from "@/features/project/components/PaginatedProjectGrid/PaginatedProjectGridSkeleton"
import { ProjectSortDropdown } from "@/features/project/components/ProjectSortDropdown/ProjectSortDropdown"
import { searchProjects } from "@/features/project/project.queries"
import { SearchBar } from "@/features/search/components/SearchBar/SearchBar"
import { getSearchHref, loadSearchState } from "@/features/search/helpers/search"
import { Routes } from "@/lib/routes"

const SearchResults = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const state = await loadSearchState(searchParams)
  const { q, sort, page } = state
  const { projects, totalPages } = await searchProjects(state)

  // Send pages past the end to the last page
  if (totalPages > 0 && page > totalPages) {
    redirect(getSearchHref({ ...state, page: totalPages }))
  }

  return (
    <>
      <Heading className="text-center text-secondary" h={3}>
        {q ? `"${q}"` : "Search projects"}
      </Heading>

      <Form action={Routes.SEARCH} className="w-full md:w-1/2">
        <SearchBar defaultValue={q} key={q} name="q" />
      </Form>

      {projects.length > 0 ? (
        <div className="flex w-full flex-col gap-8">
          <div className="flex justify-end">
            <ProjectSortDropdown
              getSortHref={(value) => getSearchHref({ q, sort: value })}
              sort={sort}
            />
          </div>
          <PaginatedProjectGrid
            getPageHref={(target) => getSearchHref({ q, sort, page: target })}
            page={page}
            projects={projects}
            totalPages={totalPages}
          />
        </div>
      ) : (
        <EmptyState description="Try a different search term." title="No projects found" />
      )}
    </>
  )
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="flex w-full max-w-full flex-col items-center gap-10 px-2 pt-16 md:gap-16 md:px-0 md:pt-32">
      <AnimatedSuspense fallback={<PaginatedProjectGridSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </AnimatedSuspense>
    </div>
  )
}
