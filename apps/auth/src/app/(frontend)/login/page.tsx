import { Heading } from "@uoacs/ui"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/LoginForm/LoginForm"
import { getSession } from "@/lib/auth/auth-session"
import { safeRedirect } from "@/lib/redirect"
import { firstParam } from "@/lib/search-params"

export const metadata: Metadata = { title: "Log In" }

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const redirectParam = firstParam((await searchParams).redirect)
  const returnTo = safeRedirect(redirectParam)
  if (await getSession()) redirect(returnTo)

  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Log In
      </Heading>
      <LoginForm redirect={redirectParam} returnTo={returnTo} />
    </div>
  )
}
