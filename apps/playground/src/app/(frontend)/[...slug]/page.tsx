import { notFound } from "next/navigation"

// The app has multiple root layouts (frontend and Payload), so Next.js can't pick a layout for
// URLs that match no route and falls back to its built-in 404. A catch-all inside `(frontend)`
// routes those URLs through this group's layout and `not-found.tsx` instead.
// Always throws, so there is no shell for instant-navigation validation to check.
export const instant = false

export default function CatchAllPage() {
  notFound()
}
