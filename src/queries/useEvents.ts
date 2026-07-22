import { useInfiniteQuery } from "@tanstack/react-query"
import type { PaginatedDocs } from "payload"
import { ApiRoutes } from "@/lib/routes"
import type { Event } from "@/payload/payload-types"
import { QueryKeys } from "./QueryKeys"

export function useEvents(upcoming: boolean) {
  return useInfiniteQuery({
    queryKey: [QueryKeys.EVENTS, upcoming],
    queryFn: async ({ pageParam }) => {
      const result = await fetch(ApiRoutes.EVENTS(upcoming, pageParam))
      if (!result.ok) throw new Error(`Failed to fetch events: ${result.status}`)
      return result.json() as Promise<PaginatedDocs<Event>>
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
  })
}
