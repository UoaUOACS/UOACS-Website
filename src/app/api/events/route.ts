import { type NextRequest, NextResponse } from "next/server"
import { payload, Slugs } from "@/lib/payload"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const upcoming = searchParams.get("upcoming") === "true"
  const page = Number(searchParams.get("page") ?? "1")

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { error: `Invalid page parameter: ${searchParams.get("page")}` },
      { status: 400 },
    )
  }

  const data = await payload.find({
    collection: Slugs.Collections.EVENT,
    pagination: true,
    page,
    limit: 8,
    sort: upcoming ? "date" : "-date",
    where: {
      _status: { equals: "published" },
      date: upcoming
        ? { greater_than_equal: new Date().toISOString() }
        : { less_than: new Date().toISOString() },
    },
  })

  return NextResponse.json(data)
}
