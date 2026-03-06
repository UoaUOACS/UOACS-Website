import { ValidationError } from "payload"
import { payload } from "@/lib/payload"
import { createMemberSchema } from "@/types/schemas/member"

export async function POST(request: Request) {
  const member = createMemberSchema.parse(await request.json())

  try {
    const createdMember = await payload.create({
      collection: "member",
      data: member,
    })
    return new Response(JSON.stringify(createdMember), { status: 201 })
  } catch (err) {
    if (
      err instanceof ValidationError &&
      err.data?.errors?.some((e) => e.message === "Value must be unique")
    ) {
      const field = err.data.errors.find((e) => e.message === "Value must be unique")?.path
      return new Response(JSON.stringify({ error: "Value already in use", field }), { status: 409 })
    }
    throw err
  }
}
