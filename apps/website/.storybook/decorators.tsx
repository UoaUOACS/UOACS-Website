import type { Decorator } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { SessionResult } from "@uoacs/shared"
import { type Session, SessionContext } from "@/context/SessionContext"

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

export const withProviders: Decorator = (Story, context) => {
  const session = context.parameters.session as Session | undefined
  const result: SessionResult = session
    ? { status: "authenticated", session }
    : { status: "unauthenticated" }
  return (
    <SessionContext.Provider value={result}>
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </SessionContext.Provider>
  )
}
