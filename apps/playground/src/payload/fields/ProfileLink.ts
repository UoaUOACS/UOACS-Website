import type { ArrayField, TextFieldSingleValidation } from "payload"
import type { LinkName } from "@/features/member/constants/links.constants"
import { links } from "@/features/member/constants/links.constants"
import { validateUnique } from "../validation/validateUnique"

const validateUrl: TextFieldSingleValidation = (value, { siblingData }) => {
  const name = (siblingData as { name?: string }).name
  if (!name || !(name in links)) return true
  const { url } = links[name as LinkName]
  if (!value) return "URL is required."
  return value.startsWith(url) || `${links[name as LinkName].name} URL must start with ${url}`
}

export const ProfileLink: ArrayField = {
  name: "links",
  type: "array",
  required: false,
  maxRows: Object.keys(links).length,
  validate: validateUnique,
  fields: [
    {
      name: "name",
      type: "select",
      required: true,
      options: Object.entries(links).map(([value, { name }]) => ({ label: name, value })),
    },
    {
      name: "url",
      type: "text",
      required: true,
      validate: validateUrl,
    },
  ],
}
