"use client"

import { EventCard, Section } from "@/components/Generic"
import { Button } from "@/components/Primitive"
import { useEvents } from "@/queries/useEvents"

export const EventsSection = ({
  upcoming,
  title,
  subtitle,
  emptyMessage,
}: {
  upcoming: boolean
  title: string
  subtitle: string
  emptyMessage: string
}) => {
  const query = useEvents(upcoming)
  const events = query.data?.pages.flatMap((page) => page.docs) ?? []

  return (
    <Section
      subtitle={subtitle}
      subtitleClassName="max-w-sm"
      title={title}
      titleProps={{ h: 1, period: true }}
    >
      <div className="flex w-full flex-row flex-wrap items-start justify-center gap-8">
        {query.isError ? (
          <p className="paragraph text-gray-700">Failed to load events. Please try again.</p>
        ) : events.length === 0 ? (
          <p className="paragraph text-gray-700">{emptyMessage}</p>
        ) : (
          events.map((event) => <EventCard event={event} key={event.id} />)
        )}
      </div>
      {events.length > 0 && query.hasNextPage && (
        <Button disabled={query.isFetchingNextPage} onClick={() => query.fetchNextPage()}>
          {query.isFetchNextPageError ? "Retry" : "See More Events"}
        </Button>
      )}
    </Section>
  )
}
