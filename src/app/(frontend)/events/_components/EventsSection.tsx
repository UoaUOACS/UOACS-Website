"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { EventCard, Section } from "@/components/Generic"
import { Button, EmptyState, type EmptyStateProps } from "@/components/Primitive"
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
  emptyMessage: EmptyStateProps
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
      <div className="flex w-full flex-row flex-wrap items-start justify-center gap-8 pt-6">
        {query.isError ? (
          <EmptyState
            description="Please try again."
            icon={<ExclamationTriangleIcon className="size-full text-red-500" />}
            title="Failed to load events"
          />
        ) : events.length === 0 ? (
          <EmptyState {...emptyMessage} />
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
