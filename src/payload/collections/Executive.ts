import type { CollectionConfig } from "payload"

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
          name: "team",
          type: "select",
          index: true,
          options: [
            { label: "President", value: "president" },
            { label: "Admin", value: "admin" },
            { label: "Events", value: "events" },
            { label: "Marketing", value: "marketing" },
            { label: "Tech/Education", value: "tech-edu" },
            { label: "Design", value: "design" },
          ],
          required: true,
          admin: {
            description: "Team the executive member belongs to",
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
