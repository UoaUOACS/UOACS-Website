# Technology Stack

**Analysis Date:** 2026-04-02

## Languages

**Primary:**
- TypeScript 5.x - All source code (.ts, .tsx files)
- JavaScript - Configuration files and build scripts

**Secondary:**
- JSX/TSX - React component syntax
- CSS - Global and component styles (via Tailwind)

## Runtime

**Environment:**
- Node.js 24.14.0 - Specified in `.nvmrc`
- Docker support: Alpine Linux base (Node 24.12.0)

**Package Manager:**
- pnpm 10.27.0 - Lockfile: `pnpm-lock.yaml` (present)
- Built dependencies: @tailwindcss/oxide, core-js-pure, esbuild, lefthook, sharp

## Frameworks

**Core:**
- Next.js 16.2.1 - Full-stack React framework
  - Features: App Router (Next/13+), Server Components, API Routes
  - React Compiler enabled (`reactCompiler: true` in next.config.ts)
  - Standalone output format for Docker

**Backend/CMS:**
- Payload CMS 3.80.0 - Headless CMS and admin panel
  - Admin route: `/payload/admin`
  - API route: `/payload/api`
  - Configuration: `src/payload.config.ts`

**UI & Styling:**
- React 19.2.4 - UI library
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- Tailwind Variants 3.1.1 - Component variant system
- Tailwind Merge 3.3.1 - Merge utility class names

**Testing:**
- Vitest 4.0.18 - Unit/integration test runner
- Playwright 1.58.1 - Browser testing via @vitest/browser-playwright
- Storybook 10.2.7 - Component development and visual testing

**Build/Dev:**
- Turbopack - Next.js bundler (via Turbo)
- PostCSS 4.x (via @tailwindcss/postcss)
- Biome 2.4.6 - Linter and formatter

## Key Dependencies

**Critical:**
- Payload CMS 3.80.0 - Headless content management system
  - @payloadcms/next 3.80.0 - Next.js integration
  - @payloadcms/richtext-lexical 3.80.0 - Rich text editor
  - @payloadcms/db-mongodb 3.80.0 - MongoDB database adapter
  - @payloadcms/storage-s3 3.80.0 - AWS S3 file storage
  - @payloadcms/plugin-import-export 3.80.0 - Data import/export utilities
  - @payloadcms/payload-cloud 3.80.0 - Payload Cloud integration
  - payload 3.80.0 - Core CMS engine

**Data & Validation:**
- Zod 4.3.6 - TypeScript-first schema validation
- react-hook-form 7.71.2 - Form state management
- @hookform/resolvers 5.2.2 - Integration with validation schemas

**Media & Image Processing:**
- Sharp 0.34.4 - Image processing (critical for onlyBuiltDependencies)
- GraphQL 16.11.0 - Graph query language (disabled in config but installed)

**UI Components & Effects:**
- @heroicons/react 2.2.0 - Icon library
- Motion 12.23.24 - Animation library
- react-smart-ticker 1.6.7 - Ticker/scrolling text component
- Sonner 2.0.7 - Toast notifications

**Utilities:**
- clsx 2.1.1 - Class name concatenation
- Babel React Compiler Plugin 1.0.0 - React performance optimization

**Development Tools:**
- TypeScript 5.x - Type checking (`pnpm types:check` for full check)
- @types/* packages - Type definitions for Node, React

## Configuration

**Environment:**
- `.env` file present - Contains environment configuration
- `.env.example` - Template for required env vars
- Key variables: `DATABASE_URI`, `PAYLOAD_SECRET`, `S3_*`, `NEXT_PUBLIC_URL`

**Build:**
- `next.config.ts` - Next.js configuration with Payload integration
- `tsconfig.json` - TypeScript compiler options
  - Path aliases: `@/*` → `./src/*`, `@payload-config` → `./src/payload.config.ts`
  - Target: ES2017, Module: esnext
- `postcss.config.mjs` - PostCSS configuration with Tailwind
- `biome.json` - Linting and formatting rules (100 character line width)
- `.nvmrc` - Node version specification

**Container:**
- `Dockerfile` - Multi-stage Docker build (Node Alpine)
- `docker-compose` - Not detected
- `fly.toml` - Fly.io deployment configuration (primary)
- `fly.staging.toml` - Staging environment configuration

## Platform Requirements

**Development:**
- Node.js 24.14.0
- pnpm 10.27.0
- Git hooks via lefthook 1.x

**Production:**
- Fly.io hosting (configured in fly.toml)
- MongoDB instance (via DATABASE_URI)
- AWS S3 bucket (via S3_* env vars)
- 512MB memory, 1 shared CPU on Fly.io
- HTTPS enforcement, health checks every 15s

**Scripts:**
```bash
pnpm dev                  # Start development server
pnpm build                # Build for production
pnpm start                # Start production server
pnpm types:check          # Type checking with tsc
pnpm types:generate       # Generate Payload types
pnpm lint:check           # Lint with Biome
pnpm lint:fix             # Auto-fix linting issues
pnpm lint:fix:unsafe      # Auto-fix with unsafe transformations
pnpm storybook            # Start Storybook dev server
pnpm storybook:build      # Build Storybook
```

---

*Stack analysis: 2026-04-02*
