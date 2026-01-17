import type { CollectionConfig } from "payload"
import { ExecutiveLevel, ExecutiveTeam } from "@/types/enums"

export const Executive: CollectionConfig = {
  slug: "executive",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Full name of the executive member",
      },
    },
    {
      name: "isCurrent",
      type: "checkbox",
      label: "Is Current Member?",
      defaultValue: true,
      required: true,
      admin: {
        description: "Indicates if the member is currently serving in the executive team",
      },
    },
    {
      name: "role",
      type: "group",
      label: "Role Details",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
          admin: {
            description:
              "Title of the executive role (e.g., Co-President, Treasurer). Should be required if a current member.",
          },
        },
        {
          name: "teams",
          type: "select",
          hasMany: true,
          options: Object.values(ExecutiveTeam),
          required: true,
          admin: {
            description: "Team the executive member belongs to",
          },
        },
        {
          name: "level",
          type: "select",
          options: Object.values(ExecutiveLevel),
          required: false,
          admin: {
            description: "Level of the executive role, used for ordering of execs",
          },
        },
      ],
    },
    {
      name: "photo",
      type: "relationship",
      relationTo: "media",
      required: false,
      admin: {
        description: "Photo of the executive member (required if a current member)",
      },
    },
    {
      name: "linkedin",
      type: "text",
      required: false,
      admin: {
        description: "LinkedIn profile URL of the executive member",
      },
    },
  ],
}
