import { Heading } from "@uoacs/ui"
import Link from "next/link"
import { ForgotPasswordForm } from "@/components/Composite"
import { Routes } from "@/lib/routes"
import { GuestOnly } from "../_components/GuestOnly"

export default function ForgotPasswordPage() {
  return (
    <GuestOnly>
      <div className="flex w-full flex-col justify-center gap-8 px-4">
        <Heading className="justify-start" h={3}>
          Forgot Password
        </Heading>
        <div className="flex w-full flex-col justify-center gap-4">
          <ForgotPasswordForm />
          <p className="paragraph-xs text-gray-500">
            Remembered your password?{" "}
            <Link className="underline transition-colors hover:text-gray-700" href={Routes.LOGIN}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </GuestOnly>
  )
}
