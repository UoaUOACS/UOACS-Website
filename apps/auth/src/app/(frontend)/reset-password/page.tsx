import { Heading } from "@uoacs/ui"
import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/ResetPasswordForm/ResetPasswordForm"
import { firstParam } from "@/lib/search-params"

export const metadata: Metadata = { title: "Reset Password" }

// No logged-in check: a person can reset a password while logged in.
export default async function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  const params = await searchParams

  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Reset Password
      </Heading>
      <ResetPasswordForm
        error={firstParam(params.error)}
        redirect={firstParam(params.redirect)}
        token={firstParam(params.token)}
      />
    </div>
  )
}
