import { AuthService, DuplicateFieldError } from "@/services/auth.service"

export async function POST(request: Request) {
  const authService = new AuthService()

  try {
    const data = await request.json()
    const createdMember = await authService.signUpPayloadMember(data)
    return new Response(JSON.stringify(createdMember), { status: 201 })
  } catch (err) {
    if (err instanceof DuplicateFieldError) {
      return new Response(JSON.stringify({ error: "Value already in use", field: err.field }), {
        status: 409,
      })
    }
    throw err
  }
}
