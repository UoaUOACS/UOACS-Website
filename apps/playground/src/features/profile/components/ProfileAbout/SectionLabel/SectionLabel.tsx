import type { ReactNode } from "react"

/**
 * A `// LABEL` section heading in the pink monospace style shared by profile sections.
 */
export const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-primary">
    <span aria-hidden="true">/&#47; </span>
    {children}
  </p>
)
