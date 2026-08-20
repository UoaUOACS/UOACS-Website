import path from "node:path"
import { fileURLToPath } from "node:url"
import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  // Trace from the workspace root so standalone output resolves dependencies
  // hoisted to the monorepo's node_modules, not just this app's.
  outputFileTracingRoot: path.join(dirname, "../.."),
  // @uoacs/ui is published as raw TypeScript source, so Next has to compile it.
  transpilePackages: ["@uoacs/ui"],
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
