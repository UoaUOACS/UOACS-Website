import { authClient } from "@uoacs/shared/auth"

export const NO_UNLINKED_MEMBER_MESSAGE =
  "We couldn't find a membership waiting on that email.\nStart again and sign up as a new member."

export const SESSION_UNCONFIRMED_MESSAGE =
  "Signed up, but we couldn't confirm your session. Please log in."

export const duplicateMessage = (field: string) =>
  field === "email"
    ? "This email is already in use.\nIf you think this is a mistake, please contact us at admin@uoacs.co.nz"
    : "That UPI or UOA ID is already in use.\nIf you think this is a mistake, please contact us at admin@uoacs.co.nz"

/** The account already exists at this point, so a throw counts as "not confirmed", not a retry. */
export const confirmSession = async (): Promise<boolean> => {
  try {
    const { data: session, error } = await authClient.getSession()
    if (session && !error) return true
    console.error("Session confirmation failed after sign-up", error)
  } catch (error) {
    console.error("Session confirmation failed after sign-up", { error })
  }
  return false
}
