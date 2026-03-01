import { z } from "zod"
import type { Member } from "@/payload/payload-types"

export const memberSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  upi: z.string().min(1, "UPI is required"),
  email: z.email({ error: "Please enter a valid email" }),
  uoaID: z.string().min(1, "UOA ID is required"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    error: "Please select a gender",
  }),
  phoneNumber: z.string().nullable().optional(),
  compsciStudent: z.boolean(),
  otherMajors: z.array(z.string()).nullable().optional(),
  studyYear: z.enum(
    ["first-year", "second-year", "third-year", "fourth-year", "fifth-year-or-above"],
    {
      error: "Please select a year of study",
    },
  ),
  heardAboutUs: z.string().min(1, "This field is required"),
  eventWishlist: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<Member>

export const createMemberSchema = memberSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .superRefine((data, ctx) => {
    if (!data.compsciStudent && (!data.otherMajors || data.otherMajors.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter your major(s)",
        path: ["otherMajors"],
      })
    }
  })
