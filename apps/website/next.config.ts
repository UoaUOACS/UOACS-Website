import path from "node:path"
import { fileURLToPath } from "node:url"
import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const redirectedAuthPaths = ["/login", "/sign-up", "/forgot-password", "/reset-password"]

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    // Check both URLs here, not at module level: `next typegen` and Storybook
    // load this file without them.
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
    if (!authUrl) throw new Error("NEXT_PUBLIC_AUTH_URL is not set")
    if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
      throw new Error("NEXT_PUBLIC_WEBSITE_URL is not set")
    }
    const authOrigin = new URL(authUrl).origin
    return redirectedAuthPaths.map((source) => ({
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
