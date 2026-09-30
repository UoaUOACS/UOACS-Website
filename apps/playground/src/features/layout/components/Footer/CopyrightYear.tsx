"use client"

/**
 * Renders the current year. Lives in a client component because reading the clock in a
 * server component opts the whole footer out of prerendering under `cacheComponents`.
 */
export const CopyrightYear = () => <>{new Date().getFullYear()}</>
