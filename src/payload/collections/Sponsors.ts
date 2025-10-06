import type { CollectionConfig } from "payload"

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Sponsor name, e.g. 'Jane Street'",
      },
    },
    {
      name: "link",
      type: "text",
      required: true,
      admin: {
        description: "Link to visit the Sponsor, e.g. 'https://www.aleckshen.com/'",
      },
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
      required: true,
      admin: {
        description: "Sponsor logo to be displayed",
      },
    },
    {
      name: "tier",
      type: "select",
      options: [
        {
          label: "Diamond",
          value: "diamond",
        },
        {
          label: "Gold",
          value: "gold",
        },
        {
          label: "Silver",
          value: "silver",
        },
      ],
      required: true,
      admin: {
        description: "Sponsor's current tier (diamond, gold, or silver)",
      },
    },
  ],
}
