import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
