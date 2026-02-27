import { z } from "zod"
import type { Member } from "@/payload/payload-types"

export const memberSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  upi: z.string(),
  email: z.email(),
  uoaID: z.string(),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    error: "Please select a gender",
  }),
  phoneNumber: z.string().nullable().optional(),
  otherMajors: z.array(z.string()).nullable().optional(),
  studyYear: z.enum(
    ["first-year", "second-year", "third-year", "fourth-year", "fifth-year-or-above"],
    {
      error: "Please select a year of study",
    },
  ),
  heardAboutUs: z.string(),
  eventWishlist: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<Member>

export const createMemberSchema = memberSchema.omit({ id: true, createdAt: true, updatedAt: true })
