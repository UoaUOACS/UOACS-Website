"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@uoacs/ui/toast"
import { type ReactNode, useState } from "react"
import { type Session, SessionProvider } from "@/context/SessionContext"

export function Providers({
  children,
  initialSession,
}: {
  children: ReactNode
  initialSession?: Session
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes("401")) return false
              return failureCount < 1
            },
          },
        },
      }),
  )
  return (
    <SessionProvider initialSession={initialSession}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
