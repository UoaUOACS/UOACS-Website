import type { CollectionConfig } from "payload"
import { Routes } from "@/lib/routes"
import { Slugs } from "@/lib/slugs"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([Routes.EVENTS])

export const Event: CollectionConfig = {
  slug: Slugs.Collections.EVENT,
  admin: {
    useAsTitle: "name",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Name of the event",
      },
    },
    {
      name: "description",
      type: "text",
      required: false,
      admin: {
        description: "Short description of the event",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      index: true,
      admin: {
        description: "Date and time that the event is being run",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "design",
      type: "relationship",
      relationTo: "media",
      required: true,
      admin: {
        description: "The image posted to socials for this event and to be shown on the site",
      },
    },
    {
      name: "signUpForm",
      type: "text",
      required: false, // once sign up is integrated to the website, new events can leave this field blank and be routed to internal sign up
      admin: {
        description:
          "Link to the google form for this event. Do not include when retroactively adding events.",
      },
    },
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
