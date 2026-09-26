import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Payload appends a `declare module "payload"` augmentation to its generated
 * types. That augmentation is global to any TypeScript program that includes
 * the file, so shipping it from @uoacs/shared would collide with the website's
 * own generated augmentation the moment it imports these types. Auth re-declares
 * it locally in src/payload/generated-types.d.ts instead.
 */
const target = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../packages/shared/src/payload/payload-types.ts",
)

const source = readFileSync(target, "utf8")
const stripped = source.replace(/\n*declare module ['"]payload['"] \{[\s\S]*?\n\}\s*$/, "\n")

if (stripped === source) {
  throw new Error(`No payload module augmentation found in ${target}`)
}

writeFileSync(target, stripped)
