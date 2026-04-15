import type { GoogleAuth } from "google-auth-library"
import type { ClassIdentity, WalletPassClassPayload } from "@/lib/wallet-basics"
import { createPassClass } from "@/lib/wallet-basics"
import { passClass } from "@/lib/wallet-designs"
import { google_auth, identity } from "@/lib/wallet-integration"

export async function initialiseClass(
  auth: GoogleAuth,
  classIdentity: ClassIdentity,
): Promise<Record<string, unknown>> {
  const classData: WalletPassClassPayload = {
    id: `${classIdentity.issuerId}.${classIdentity.classId}`,
    ...passClass,
  }
  return createPassClass(auth, classData)
}

console.log("updating class ...")
console.log(await initialiseClass(google_auth, identity))
console.log("... class updated")
