import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
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
}

export default nextConfig
