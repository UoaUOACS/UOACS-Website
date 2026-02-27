import type { CollectionConfig } from "payload"

export const Member: CollectionConfig = {
  slug: "member",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: {
        description: "First name of the member",
      },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: {
        description: "Last name of the member",
      },
    },
    {
      name: "upi",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "University UPI of the member",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      admin: {
        description: "Email address of the member, either uni or personal",
      },
    },
    {
      name: "uoaID",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "University of Auckland student ID number",
      },
    },
    {
      name: "gender",
      type: "text",
      required: true,
      admin: {
        description: "Gender of the member",
      },
    },
    {
      name: "phoneNumber",
      type: "text",
      required: false,
      admin: {
        description: "Phone number of the member",
      },
    },
    {
      name: "otherMajors",
      type: "text",
      hasMany: true,
      required: false,
      admin: {
        description: "Other majors the member is studying, if any",
      },
    },
    {
      name: "studyYear",
      type: "select",
      options: [
        {
          label: "First Year",
          value: "first-year",
        },
        {
          label: "Second Year",
          value: "second-year",
        },
        {
          label: "Third Year",
          value: "third-year",
        },
        {
          label: "Fourth Year",
          value: "fourth-year",
        },
        {
          label: "Fifth Year or Above",
          value: "fifth-year-or-above",
        },
      ],
      required: true,
      admin: {
        description: "Current year of study at university",
      },
    },
    {
      name: "heardAboutUs",
      type: "text",
      required: true,
      admin: {
        description: "How the member heard about UOACS",
      },
    },
    {
      name: "eventWishList",
      type: "text",
      required: false,
      admin: {
        description: "What kinds of events the member would like to see in the future",
      },
    },
  ],
}
