import type { CollectionConfig } from "payload"
import { skills } from "@/features/member/constants/skills.constants"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload/slugs"
import { ProfileLink } from "../fields/ProfileLink"
import { makeDeleteLikesHook } from "../hooks/deleteLikes"
import { makeRevalidateHooks } from "../hooks/revalidate"
import type { Member as MemberDoc } from "../payload-types"

// `skipCreate`, as a member that has just been created cannot be in any cached
// data yet, and `getCurrentMember` creates one mid-render, where revalidating
// throws.
const { afterChange, afterDelete } = makeRevalidateHooks(
  (doc: MemberDoc) => [CacheTags.MEMBERS.ID(doc.id)],
  { skipCreate: true },
)

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
    // Copied from the auth service, which only exposes the caller's own member,
    // so there is no other way to show someone else's name.
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: { readOnly: true },
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
  hooks: {
    afterChange: [afterChange],
    beforeDelete: [makeDeleteLikesHook("member")],
    afterDelete: [afterDelete],
  },
}
