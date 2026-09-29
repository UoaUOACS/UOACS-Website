import type { CollectionConfig } from "payload"
import { skills } from "@/features/member/constants/skills.constants"
import { Slugs } from "@/lib/payload/slugs"
import { ProfileLink } from "../fields/ProfileLink"

export const Member: CollectionConfig = {
  slug: Slugs.Collections.MEMBER,
  admin: {
    useAsTitle: "username",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "authServiceID",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "profilePicture",
      type: "relationship",
      relationTo: Slugs.Collections.MEDIA,
      required: false,
    },
    {
      name: "bio",
      type: "textarea",
      required: false,
    },
    {
      name: "skills",
      type: "select",
      required: false,
      hasMany: true,
      options: skills.map((skill) => ({ label: skill, value: skill })),
    },
    ProfileLink,
  ],
}
