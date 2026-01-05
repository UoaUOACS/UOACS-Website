import type { Executive } from "@/payload/payload-types"
import { TeamPageClient } from "./__components__/TeamPageClient"

const CACHE_TIME = 3600 // 1 hour

export const revalidate = CACHE_TIME

export default async function TeamPage() {
  const execs: { docs: Executive[] } = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/payload/api/executive`,
    {
      method: "GET",
      // next: { revalidate: CACHE_TIME },
    },
  ).then((res) => res.json())

  return <TeamPageClient execs={execs} />
}
