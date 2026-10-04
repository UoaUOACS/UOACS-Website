import { AuthPages } from "@uoacs/shared"
import { Heading } from "@uoacs/ui"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SignUpForm } from "@/components/SignUpForm/SignUpForm"
import { getSession } from "@/lib/auth/auth-session"
import { safeRedirect, withRedirect } from "@/lib/redirect"
import { firstParam } from "@/lib/search-params"

export const metadata: Metadata = { title: "Sign Up" }

export default async function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  const redirectParam = firstParam((await searchParams).redirect)
  const returnTo = safeRedirect(redirectParam)
  if (await getSession()) redirect(returnTo)

  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Sign Up
      </Heading>
      <div className="flex w-full flex-col justify-center gap-4">
        <SignUpForm redirect={redirectParam} returnTo={returnTo} />
        <p className="paragraph-xs text-gray-500">
          Already Signed Up?{" "}
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
