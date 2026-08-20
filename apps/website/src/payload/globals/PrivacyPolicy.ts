import type { GlobalConfig } from "payload"
import { Slugs } from "@/lib/payload/slugs"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([Routes.PRIVACY])

export const PrivacyPolicy: GlobalConfig = {
  slug: Slugs.Globals.PRIVACY_POLICY,
  fields: [
    {
      name: "sections",
      type: "array",
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
  hooks: { afterChange: [globalAfterChange] },
}
