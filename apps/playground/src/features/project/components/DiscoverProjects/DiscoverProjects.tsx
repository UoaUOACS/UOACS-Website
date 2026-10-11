import { AnimatedSuspense } from "@uoacs/ui"
import { redirect, unstable_rethrow } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { getCurrentMember } from "@/features/member/member.queries"
import { getDiscoverHref, loadDiscoverParams } from "@/features/project/helpers/discover"
import { getLikedProjectIDs } from "@/features/project/like.queries"
import { getProjectsCached } from "@/features/project/project.queries"
import { DiscoverProjectsSkeleton } from "./DiscoverProjectsSkeleton"
import { DiscoverProjectsView } from "./DiscoverProjectsView"

interface DiscoverProjectsProps {
  /**
   * The page's search params, which hold the tab, sort, and page.
   */
  searchParams: Promise<SearchParams>
}

// Liked state only marks the cards, so show them unliked rather than fail the page
const logLikesError = (err: unknown) => {
  unstable_rethrow(err)
  console.error("[DiscoverProjects] failed to load liked projects", { error: err })
}

const DiscoverProjectsContent = async ({ searchParams }: DiscoverProjectsProps) => {
  const state = await loadDiscoverParams(searchParams)
  const [{ projects, totalPages }, member] = await Promise.all([
    getProjectsCached(state),
    getCurrentMember().catch((err) => {
      logLikesError(err)
      return { status: "unavailable" } as const
    }),
  ])

  // Send pages past the end, e.g. from an old link after projects were removed, to the last page
  if (totalPages > 0 && state.page > totalPages) {
    redirect(getDiscoverHref({ ...state, page: totalPages }))
  }

  const likedIDs = await getLikedProjectIDs(
    member,
    projects.map((project) => project.id),
  ).catch((err) => {
    logLikesError(err)
    return []
  })

  return (
    <DiscoverProjectsView
      {...state}
      likedIDs={likedIDs}
      projects={projects}
      totalPages={totalPages}
    />
  )
}

/**
 * The home page's Discover section: a filterable, sortable, paginated list of projects. It reads
 * its state from the URL and fetches the matching page of projects.
 */
export const DiscoverProjects = ({ searchParams }: DiscoverProjectsProps) => (
  <AnimatedSuspense fallback={<DiscoverProjectsSkeleton />}>
    <DiscoverProjectsContent searchParams={searchParams} />
  </AnimatedSuspense>
)
