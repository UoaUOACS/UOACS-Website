"use client"

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid"
import type { User } from "better-auth"
import { Button, Heading } from "@/components/Primitive"
import { authClient } from "@/lib/auth/auth-client"
import { useMember } from "@/queries/useMember"
import { MemberDetailsForm } from "./MemberDetailsForm"

export type ProfilePageClientProps = {
  user: User
}

export const ProfilePageClient = ({ user }: ProfilePageClientProps) => {
  const { data: member, isLoading, isError } = useMember(user.id)
  const displayName = `${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim() || user.name

  return (
    <div className="flex w-full flex-col gap-12">
      <section className="flex w-full flex-col items-start gap-2">
        <p className="font-mono font-paragraph">
          {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
          <span className="text-primary">// </span>YOUR ACCOUNT
        </p>
        <Heading h={2} period>
          {displayName}
        </Heading>
        <p className="flex flex-row justify-start gap-2 font-mono text-paragraph-sm">
          <span>
            UPI{" "}
            <span className="font-bold text-black">
              {isLoading ? (
                <span className="inline-block h-4 w-12 animate-pulse rounded bg-gray-200 align-middle" />
              ) : (
                (member?.upi ?? "N/A")
              )}
            </span>
          </span>
          <span> / </span>
          <span>
            ID{" "}
            <span className="font-bold text-black">
              {isLoading ? (
                <span className="inline-block h-4 w-12 animate-pulse rounded bg-gray-200 align-middle" />
              ) : (
                (member?.uoaID ?? "N/A")
              )}
            </span>
          </span>
        </p>
      </section>

      <section className="flex w-full flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-2">
          <p className="font-mono font-paragraph">
            {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
            <span className="text-primary">// </span>MEMBER DETAILS
          </p>
          <Heading h={3}>Your Info</Heading>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Failed to load member details. Please try again.</p>
        ) : member ? (
          <MemberDetailsForm member={member} />
        ) : null}
      </section>

      <section className="flex flex-col justify-start gap-2 md:flex-row md:justify-between">
        <p className="font-mono">
          Logged in as <span className="font-bold">{displayName}</span>
        </p>
        <Button
          className="whitespace-nowrap"
          left={<ArrowLeftEndOnRectangleIcon className="h-4 w-4" />}
          onClick={async () => {
            try {
              await authClient.signOut()
            } catch (err) {
              console.error("[ProfilePageClient] signOut failed", { error: err })
            }
          }}
          theme="dark"
        >
          Log Out
        </Button>
      </section>
    </div>
  )
}
