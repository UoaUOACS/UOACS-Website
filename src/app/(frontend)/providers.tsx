"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { useState } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
  // Factory initializer prevents a new QueryClient from being created on every render.
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
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}
