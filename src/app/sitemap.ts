import type { MetadataRoute } from "next"
import { Routes } from "@/lib/routes"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL

  if (!baseUrl) {
    return []
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}${Routes.TEAM}`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}${Routes.SPONSORS}`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}${Routes.SIGN_UP}`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}${Routes.PRIVACY}`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ]
}
