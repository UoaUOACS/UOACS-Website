import type { Executive } from "@/payload/payload-types"
import { TeamPageClient } from "./__components__/TeamPageClient"

export default async function TeamPage() {
  const execs: { docs: Executive[] } = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/payload/api/executive`,
    {
      method: "GET",
    },
  ).then((res) => res.json())

  return <TeamPageClient execs={execs} />
}
