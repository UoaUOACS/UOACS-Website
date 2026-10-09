import { Toaster } from "@uoacs/ui/toast"
import type { ReactNode } from "react"
import { SessionProvider } from "@/features/user/context/SessionContext"

export const Providers = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    {children}
    <Toaster />
  </SessionProvider>
)
