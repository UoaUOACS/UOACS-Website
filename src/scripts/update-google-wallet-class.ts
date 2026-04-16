import { createPassClass } from "@/lib/wallet-basics"
import { getPassClass } from "@/lib/wallet-designs"
import { googleAuth, identity } from "@/lib/wallet-integration"

console.log(await createPassClass(googleAuth, getPassClass(identity)))
console.log("... class updated")
process.exit(0)
