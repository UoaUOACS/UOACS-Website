import { getPayload } from "payload"
import type { Executive } from "@/payload/payload-types"
import config from "@/payload.config"
import { TeamPageClient } from "./__components__/TeamPageClient"

export default async function TeamPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const execs: { docs: Executive[] } = await payload.find({
    collection: "executive",
  })

  return <TeamPageClient execs={execs} />
}
