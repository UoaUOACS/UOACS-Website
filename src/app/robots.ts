import type { MetadataRoute } from "next"
import { isProductionUrl } from "@/lib/helpers"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL

  if (!isProductionUrl(baseUrl)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/payload/admin/", "/payload/api/", "/api/", "/profile/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
