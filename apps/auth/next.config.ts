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
  images: {
    localPatterns: [
      {
        pathname: "/payload/api/media/file/**",
      },
    ],
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
}

export default withPayload(nextConfig)
