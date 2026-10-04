import { useQuery } from "@tanstack/react-query"
import type { Member } from "@uoacs/shared/payload"
import { api } from "@/lib/api/api-client"
import { ApiRoutes } from "@/lib/routes"
import { QueryKeys } from "./QueryKeys"

export function useMember(userId: string) {
  return useQuery<Member>({
    queryKey: [QueryKeys.MEMBER, userId],
    queryFn: async () => api.get<Member>(ApiRoutes.MEMBER.ME),
    enabled: !!userId,
  })
}
