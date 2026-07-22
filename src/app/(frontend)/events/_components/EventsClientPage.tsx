"use client"
import { EventCard, Section } from "@/components/Generic"
import { Button } from "@/components/Primitive"
import { useEvents } from "@/queries/useEvents"

export const EventsClientPage = () => {
  const upcoming = useEvents(true)
  const past = useEvents(false)

  const upcomingEvents = upcoming.data?.pages.flatMap((page) => page.docs) ?? []
  const pastEvents = past.data?.pages.flatMap((page) => page.docs) ?? []

  return (
    <>
      <Section
        subtitle="Where members register to learn, connect, or simply enjoy the good vibes"
        subtitleClassName="max-w-sm"
        title="Upcoming Events"
        titleProps={{ h: 1, period: true }}
      >
        <div className="flex w-full flex-row flex-wrap items-start justify-center gap-8">
          {upcoming.isLoading || (upcoming.isError && upcomingEvents.length === 0)
            ? null
            : upcomingEvents.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
        {upcomingEvents.length > 0 && upcoming.hasNextPage && (
          <Button disabled={upcoming.isFetchingNextPage} onClick={() => upcoming.fetchNextPage()}>
            {upcoming.isFetchNextPageError ? "Retry" : "See More Events"}
          </Button>
        )}
      </Section>
      <Section
        subtitle="Take a trip down memory lane with us"
        subtitleClassName="max-w-sm"
        title="Past Events"
        titleProps={{ h: 1, period: true }}
      >
        <div className="flex w-full flex-row flex-wrap items-start justify-center gap-8">
          {past.isLoading || (past.isError && pastEvents.length === 0)
            ? null
            : pastEvents.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
        {pastEvents.length > 0 && past.hasNextPage && (
          <Button disabled={past.isFetchingNextPage} onClick={() => past.fetchNextPage()}>
            {past.isFetchNextPageError ? "Retry" : "See More Events"}
          </Button>
        )}
      </Section>
    </>
  )
}
