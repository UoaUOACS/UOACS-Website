"use client"

import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/AuthContext"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
