import { toNextJsHandler } from "better-auth/next-js"
import { auth, trustedOrigins } from "@/lib/auth/auth"

const handlers = toNextJsHandler(auth)

/**
 * Better Auth checks the Origin header but never emits CORS headers, so a
 * browser on the website or playground origin would discard the response
 * before the caller ever sees it.
 */
function withCors(request: Request, response: Response): Response {
  const origin = request.headers.get("origin")
  if (!origin || !trustedOrigins.includes(origin)) return response

  response.headers.set("Access-Control-Allow-Origin", origin)
  response.headers.set("Access-Control-Allow-Credentials", "true")
  response.headers.append("Vary", "Origin")
  return response
}

export async function GET(request: Request) {
  return withCors(request, await handlers.GET(request))
}

export async function POST(request: Request) {
  return withCors(request, await handlers.POST(request))
}

export function OPTIONS(request: Request) {
  const response = new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        request.headers.get("access-control-request-headers") ?? "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  })
  return withCors(request, response)
}
