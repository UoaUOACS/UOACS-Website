import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiRoutes } from "@/lib/routes"
import type { Member } from "@/payload/payload-types"
import type { UpdateMemberInput } from "@/types/schemas/member"
import { QueryKeys } from "./QueryKeys"

export type ProfileFieldError = { field: string; message: string }

export class ProfileUpdateError extends Error {
  constructor(public readonly fieldErrors: ProfileFieldError[]) {
    super("Failed to update profile")
    this.name = "ProfileUpdateError"
  }
}

export function useUpdateMember() {
  const queryClient = useQueryClient()

  return useMutation<Member, ProfileUpdateError, Partial<UpdateMemberInput>>({
    mutationFn: async (data) => {
      const response = await fetch(ApiRoutes.PROFILE, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        const fieldErrors: ProfileFieldError[] = Array.isArray(body?.error) ? body.error : []
        throw new ProfileUpdateError(fieldErrors)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MEMBER] })
    },
  })
}
