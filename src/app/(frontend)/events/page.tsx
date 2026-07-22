import type { Metadata } from "next"
import { EventsClientPage } from "./_components/EventsClientPage"

export const metadata: Metadata = {
  title: "Events",
  description:
    "See what UOACS has coming up and browse past events. Workshops, socials, and more for members to learn, connect, and enjoy.",
}

export default function EventsPage() {
  return <EventsClientPage />
}
