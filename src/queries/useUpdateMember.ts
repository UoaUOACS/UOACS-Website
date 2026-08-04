import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ApiError, api } from "@/lib/api/api-client"
import { ApiRoutes } from "@/lib/routes"
import type { Member } from "@/payload/payload-types"
import type { UpdateMemberInput } from "@/types/schemas/member"
import { QueryKeys } from "./QueryKeys"

export function useUpdateMember() {
  const queryClient = useQueryClient()

  return useMutation<Member, ApiError, Partial<UpdateMemberInput>>({
    mutationFn: (data) => api.patch<Member>(ApiRoutes.PROFILE, data, { toastOnError: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MEMBER] })
    },
  })
}
