import type { ReactNode } from "react"

/**
 * Shared wrapper so the loaded section and its Suspense skeleton occupy identical space.
 */
export const DiscordSectionLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-row items-center justify-between gap-2 md:flex-col md:items-start md:justify-start md:gap-4">
    {children}
  </div>
)
