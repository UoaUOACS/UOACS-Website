import { useQuery } from "@tanstack/react-query"
import { ApiRoutes } from "@/lib/routes"
import type { Member } from "@/payload/payload-types"
import { QueryKeys } from "./QueryKeys"

export function useMember(userId: string) {
  return useQuery<Member>({
    queryKey: [QueryKeys.MEMBER, userId],
    queryFn: async () => {
      const result = await fetch(ApiRoutes.MEMBER.ME)
      if (!result.ok) throw new Error(`Failed to fetch member: ${result.status}`)
      return result.json()
    },
    enabled: !!userId,
  })
}
