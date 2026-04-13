import type { NextRequest } from "next/server"

export function proxy(_request: NextRequest) {
  // No route protection yet — scaffold for future auth middleware
}

export const config = {
  matcher: [],
}
