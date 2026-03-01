import type { GlobalConfig } from "payload"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "@/payload/hooks/revalidate"

const { globalAfterChange } = makeRevalidateHooks([Routes.privacy])

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
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
