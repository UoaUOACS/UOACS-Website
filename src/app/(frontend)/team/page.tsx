import type { Metadata } from "next"
import { getPayload } from "payload"
import type { Executive } from "@/payload/payload-types"
import config from "@/payload.config"
import { TeamPageClient } from "./_components/TeamPageClient"

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the team behind the University of Auckland Computer Society.",
}

export default async function TeamPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const execs: { docs: Executive[] } = await payload.find({
    collection: "executive",
    limit: 100,
  })

  return <TeamPageClient execs={execs} />
}
