<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# @uoacs/website

- Cache Components is off, so don't use `"use cache"`, `cacheTag` or `cacheLife` here.
- Client-side data goes through TanStack Query hooks in `src/queries`, with keys in `src/queries/QueryKeys.ts`.
- Components go in `src/components/Generic` or `src/components/Composite`; scaffold them with `pnpm --filter @uoacs/website code:generate`.
