"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Button, EmptyState, type EmptyStateProps } from "@uoacs/ui"
import Image from "next/image"
import { EventCard, Section } from "@/components/Generic"
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
  emptyMessage: Omit<EmptyStateProps, "icon" | "image">
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
          <EmptyState
            description="Please try again."
            icon={<ExclamationTriangleIcon className="size-full text-red-500" />}
            title="Failed to load events"
          />
        ) : events.length === 0 ? (
          <EmptyState
            {...emptyMessage}
            image={
              upcoming ? (
                <Image
                  alt="UOACS mascot"
                  className="mx-auto h-auto w-32 md:w-48"
                  height={2993}
                  loading="eager"
                  src="/computa_tabby.png"
                  width={3663}
                />
              ) : (
                <Image
                  alt="UOACS mascot"
                  className="mx-auto h-auto w-24 md:w-32"
                  height={3012}
                  loading="eager"
                  src="/sad_tabby.png"
                  width={2539}
                />
              )
            }
          />
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
