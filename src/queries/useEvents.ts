import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query"
import type { PaginatedDocs } from "payload"
import { api } from "@/lib/api-client"
import { ApiRoutes } from "@/lib/routes"
import type { Event } from "@/payload/payload-types"
import { QueryKeys } from "./QueryKeys"

export const getEventsQueryOptions = (upcoming: boolean) =>
  infiniteQueryOptions({
    queryKey: [QueryKeys.EVENTS, upcoming],
    queryFn: ({ pageParam }) =>
      api.get<PaginatedDocs<Event>>(ApiRoutes.EVENTS(upcoming, pageParam), {
        toastOnError: false,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedDocs<Event>) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  })

export function useEvents(upcoming: boolean) {
  return useInfiniteQuery(getEventsQueryOptions(upcoming))
}
