import { AuthPages } from "@uoacs/shared"
import { Heading } from "@uoacs/ui"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm/ForgotPasswordForm"
import { getSession } from "@/lib/auth/auth-session"
import { safeRedirect, withRedirect } from "@/lib/redirect"
import { firstParam } from "@/lib/search-params"

export const metadata: Metadata = { title: "Forgot Password" }

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const redirectParam = firstParam((await searchParams).redirect)
  if (await getSession()) redirect(safeRedirect(redirectParam))

  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Forgot Password
      </Heading>
      <div className="flex w-full flex-col justify-center gap-4">
        <ForgotPasswordForm redirect={redirectParam} />
        <p className="paragraph-xs text-gray-500">
          Remembered your password?{" "}
          <Link
            className="underline transition-colors hover:text-gray-700"
            href={withRedirect(AuthPages.LOGIN, redirectParam)}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
