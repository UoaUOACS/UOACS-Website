<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# @uoacs/playground

- Cache Components is on. Read data through `src/features/*/*.queries.ts` using `"use cache"` with `cacheTag` and `cacheLife`.
- Add new cache tags to `CacheTags` in `src/lib/cache.ts`, and revalidate them from Payload hooks via `src/payload/hooks/revalidate.ts`.
- Code is organised by feature in `src/features/<domain>/`; `src/features/example` shows an example folder layout.
