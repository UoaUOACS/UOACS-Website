import type { Metadata } from "next"
import { payload } from "@/lib/payload"
import type { Executive } from "@/payload/payload-types"
import { TeamPageClient } from "./_components/TeamPageClient"

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the team behind the University of Auckland Computer Society.",
}

export default async function TeamPage() {
  const execs: { docs: Executive[] } = await payload.find({
    collection: "executive",
    limit: 100,
    depth: 2,
    sort: "createdAt",
  })

  return <TeamPageClient execs={execs} />
}
