import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiRoutes } from "@/lib/routes"
import type { Member } from "@/payload/payload-types"
import type { UpdateMemberInput } from "@/types/schemas/member"
import { QueryKeys } from "./QueryKeys"

export type ProfileFieldError = { field: keyof UpdateMemberInput; message: string }

export class ProfileUpdateError extends Error {
  constructor(
    public readonly fieldErrors: ProfileFieldError[],
    message = "Failed to update profile",
  ) {
    super(message)
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
        if (Array.isArray(body?.error)) {
          throw new ProfileUpdateError(body.error)
        }
        const message = typeof body?.error === "string" ? body.error : undefined
        throw new ProfileUpdateError([], message)
      }
      return response.json().catch(() => {
        throw new ProfileUpdateError([], "Received an invalid response from the server")
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MEMBER] })
    },
  })
}
