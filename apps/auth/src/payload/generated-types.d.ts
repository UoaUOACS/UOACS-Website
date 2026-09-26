import type { Config } from "@uoacs/shared/payload"

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}
