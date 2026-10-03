import path from "node:path"
import { fileURLToPath } from "node:url"
import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// The auth pages moved to the auth app. Old links and emails still point here,
// so send them on. Next keeps the query string, so `?token=` in old reset
// emails still works.
const movedAuthPaths = ["/login", "/sign-up", "/forgot-password", "/reset-password"]

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    // Check both URLs here, not at module level: `next typegen` and Storybook
    // load this file without them. The navbar and footer build return URLs
    // from the website URL, so a missing one fails build or dev start here
    // instead of crashing the render for every logged-out visitor.
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
    if (!authUrl) throw new Error("NEXT_PUBLIC_AUTH_URL is not set")
    if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
      throw new Error("NEXT_PUBLIC_WEBSITE_URL is not set")
    }
    const authOrigin = new URL(authUrl).origin
    return movedAuthPaths.map((source) => ({
      source,
      destination: `${authOrigin}${source}`,
      permanent: true,
    }))
  },
  output: "standalone",
  // Trace from the workspace root so standalone output resolves dependencies
  // hoisted to the monorepo's node_modules, not just this app's.
  outputFileTracingRoot: path.join(dirname, "../.."),
  // @uoacs/ui and @uoacs/shared are published as raw TypeScript source, so Next
  // has to compile them.
  transpilePackages: ["@uoacs/ui", "@uoacs/shared"],
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
      },
    ],
  },
}

export default withPayload(nextConfig)
