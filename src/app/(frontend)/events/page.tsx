import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import type { Metadata } from "next"
import { getEventsQueryOptions } from "@/queries/useEvents"
import { EventsSection } from "./_components/EventsSection"

export const metadata: Metadata = {
  title: "Events",
  description:
    "See what UOACS has coming up and browse past events. Workshops, socials, and more for members to learn, connect, and enjoy.",
}

export default async function EventsPage() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchInfiniteQuery(getEventsQueryOptions(true)),
    queryClient.prefetchInfiniteQuery(getEventsQueryOptions(false)),
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <EventsSection
        emptyMessage="No upcoming events right now, check back soon."
        subtitle="Where members register to learn, connect, or simply enjoy the good vibes"
        title="Upcoming Events"
        upcoming
      />
      <EventsSection
        emptyMessage="No past events to show yet."
        subtitle="Take a trip down memory lane with us"
        title="Past Events"
        upcoming={false}
      />
    </HydrationBoundary>
  )
}
