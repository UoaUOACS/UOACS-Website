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
        emptyMessage={{
          title: "Nothing on the calendar just yet.",
          description: (
            <>
              Tabby's busy cooking up the next event. <br /> Check back soon!
            </>
          ),
        }}
        subtitle="Where members register to learn, connect, or simply enjoy the good vibes"
        title="Upcoming Events"
        upcoming
      />
      <EventsSection
        emptyMessage={{
          title: "No past events to show yet.",
          description: "Our first one's still to come, but it'll be here before you know it.",
        }}
        subtitle="Take a trip down memory lane with us"
        title="Past Events"
        upcoming={false}
      />
    </HydrationBoundary>
  )
}
