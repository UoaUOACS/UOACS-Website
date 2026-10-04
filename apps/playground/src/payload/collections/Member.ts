import type { CollectionConfig } from "payload"
import { skills } from "@/features/member/constants/skills.constants"
import { Slugs } from "@/lib/payload/slugs"
import { ProfileLink } from "../fields/ProfileLink"
import { makeDeleteLikesHook } from "../hooks/deleteLikes"

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
    },
    {
      name: "authServiceID",
      type: "text",
      required: true,
      unique: true,
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: "profilePicture",
      type: "upload",
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
  hooks: { beforeDelete: [makeDeleteLikesHook("member")] },
}
