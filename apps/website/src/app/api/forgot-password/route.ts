import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { Routes } from "@/lib/routes"
import { AuthService } from "@/services/auth.service"
import { forgotPasswordSchema } from "@/types/schemas/forgot-password"

export async function POST(request: Request) {
  let email: string
  try {
    ;({ email } = forgotPasswordSchema.parse(await request.json()))
  } catch (err) {
    if (err instanceof SyntaxError || err instanceof ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    console.error("[POST /api/forgot-password] Unexpected error parsing request body", {
      error: err,
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }

  try {
    // Absolute for the reset link: Better Auth resolves it against its own
    // base URL, so a bare path would send members to the auth service.
    await new AuthService().forgotPassword(
      email,
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}${Routes.RESET_PASSWORD}`,
      Routes.SIGN_UP,
    )
  } catch (error) {
    console.error("[POST /api/forgot-password] Failed to process request", { email, error })
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    )
  }

  return NextResponse.json({
    message: "If an account exists for that email, we've sent a link to continue.",
  })
}
