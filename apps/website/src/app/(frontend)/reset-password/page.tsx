import { Heading } from "@uoacs/ui"
import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/Composite"
import { GuestOnly } from "../_components/GuestOnly"

export default function ResetPasswordPage() {
  return (
    <GuestOnly>
      <div className="flex w-full flex-col justify-center gap-8 px-4">
        <Heading className="justify-start" h={3}>
          Reset Password
        </Heading>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </GuestOnly>
  )
}
