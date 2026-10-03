import { authClient } from "@uoacs/shared/auth"
import type { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Routes } from "@/lib/routes"

// Module state is enough: logging back in goes through the auth app, which is a
// full page load, so neither value outlives the session it describes.
let loggingOut = false
let mountedGuards = 0

/**
 * True once the person has asked to log out. A guarded page uses it to tell a
 * deliberate log-out (go home) from a lost session (go to the login page).
 */
export const isLoggingOut = () => loggingOut

/** Marks the calling page as guarded for as long as it is mounted. */
export function useGuardedPage() {
  useEffect(() => {
    mountedGuards++
    return () => {
      mountedGuards--
    }
  }, [])
}

/**
 * Logs out. On a guarded page the person goes home, because the page they are
 * on is no longer theirs to see. Anywhere else the page refreshes in place.
 */
export async function logOut(router: ReturnType<typeof useRouter>): Promise<void> {
  loggingOut = true
  try {
    await authClient.signOut()
  } catch (error) {
    loggingOut = false
    throw error
  }

  if (mountedGuards > 0) router.replace(Routes.HOME)
  else router.refresh()
}
