import { createPassClass } from "@/lib/wallet/wallet-basics"
import { getPassClass } from "@/lib/wallet/wallet-designs"
import { googleAuth, identity } from "@/lib/wallet/wallet-integration"

console.log(await createPassClass(googleAuth, getPassClass(identity)))
console.log("... class updated")
process.exit(0)
