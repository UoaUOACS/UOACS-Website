# Codebase Structure

**Analysis Date:** 2026-04-02

## Directory Layout

```
/Users/mikaisomerville/localdocs/UOACS-Website/
├── src/                            # Main source code
│   ├── app/                        # Next.js app directory (routes & pages)
│   │   ├── (frontend)/             # Public website pages (route group)
│   │   ├── api/                    # REST API routes
│   │   ├── payload/                # Payload CMS routes (admin & API proxy)
│   │   └── og/                     # OpenGraph image generation
│   ├── components/                 # React components (3-tier hierarchy)
│   │   ├── Primitive/              # Base UI elements
│   │   ├── Generic/                # Reusable UI patterns
│   │   └── Composite/              # Full sections & forms
│   ├── lib/                        # Utility functions & constants
│   ├── payload/                    # Payload CMS configuration
│   │   ├── collections/            # Data models (Member, Executive, etc.)
│   │   ├── globals/                # Global settings (HomePage, SocialLinks, etc.)
│   │   └── hooks/                  # Payload hooks (revalidation, etc.)
│   ├── types/                      # TypeScript type definitions
│   │   └── schemas/                # Zod validation schemas
│   ├── mocks/                      # Mock data for testing/development
│   ├── payload.config.ts           # Payload CMS root config
│   └── app/(frontend)/globals.css  # Global styles
├── public/                         # Static assets
│   └── fonts/                      # Web fonts
├── .storybook/                     # Storybook config
├── .planning/                      # GSD planning documents
│   └── codebase/                   # Architecture & analysis docs
├── node_modules/                   # Dependencies
├── package.json                    # Project metadata & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── vitest.config.ts                # Vitest configuration
├── postcss.config.mjs              # PostCSS configuration
└── .env                            # Environment variables (secrets)
```

## Directory Purposes

**`src/app/`** — Next.js App Router with route groups and API handlers
- Contains page components (async Server Components)
- API route handlers for REST endpoints
- Payload CMS integration routes

**`src/app/(frontend)/`** — Public website pages
- Route group providing shared layout and structure
- Contains pages: home, team, sponsors, sign-up, privacy
- _components subdirectories for page-specific client components

**`src/app/api/`** — Backend REST endpoints
- `sign-up/route.ts` — POST endpoint for member registration
- `health/route.ts` — Health check endpoint

**`src/app/payload/`** — Payload CMS integration
- `admin/[[...segments]]/page.tsx` — Admin UI entry point
- `api/[...slug]/route.ts` — API proxy to Payload endpoints
- `layout.tsx` — Layout for Payload routes

**`src/components/`** — Reusable React components in 3 layers

**`src/components/Primitive/`** — Basic unstyled/lightly styled elements
- `Button/` — Clickable button with variants (dark/light)
- `Input/` — Text input with validation error display
- `Radio/` — Radio button group
- `Select/` — Dropdown select
- `MultiSelect/` — Multi-select dropdown
- `Heading/` — Heading component with responsive sizing
- `Container/` — Layout container
- `Icons/` — Icon components
- `LazyImage/` — Image with lazy loading
- `BorderButton/` — Button with border styling
- `Toast/` — Toast notification display
- `Dropdown/` — Dropdown menu

**`src/components/Generic/`** — Reusable composite patterns
- `ExecCard/` — Executive team member card
- `Section/` — Page section wrapper
- `SocialLinks/` — Social media link list
- `SponsorBadge/` — Sponsor logo badge
- `SponsorTicker/` — Animated sponsor ticker
- `Polaroid/` — Polaroid-style image card
- `ValueCard/` — Value proposition card
- `ValuesAccordion/` — Expandable values list
- `ValuesFingerprint/` — Visual values representation

**`src/components/Composite/`** — Full page sections & forms
- `HeroSection/` — Hero banner section
- `AboutUsSection/` — About Us with reels
- `WhoWeAreSection/` — Team/culture section with polaroids
- `ValuesSection/` — Values carousel section
- `ValuesCarousel/` — Carousel of values
- `SponsorsSection/` — Sponsors grid
- `SignUpForm/` — Member registration form
- `Navbar/` — Navigation bar with links & social
- `Footer/` — Footer with navigation
- `Reel/` — Instagram reel embed

**`src/lib/`** — Utility functions and constants
- `helpers.ts` — `getSocialLinks()` - fetches social links from Payload
- `payload.ts` — Payload SDK initialization
- `routes.ts` — Route constants (Routes.HOME, ApiRoutes.SIGN_UP)
- `slugs.ts` — Collection/global slug definitions
- `toast.tsx` — Toast notification helpers (success, error, warning)
- `utils.ts` — General utilities (cn for className merging)
- `constants.ts` — Application constants
- `enums.ts` — Enum types (ExecutiveTeam, ExecutiveLevel, SponsorTier, ValueColour)

**`src/payload/`** — Payload CMS configuration and definitions

**`src/payload/collections/`** — Data model definitions
- `User.ts` — Admin user account
- `Member.ts` — Sign-up member (firstName, lastName, email, UPI, year, etc.)
- `Executive.ts` — Executive team member (name, role, photo, level)
- `Sponsor.ts` — Sponsor (name, logo, link, tier)
- `Reel.ts` — Instagram reel link
- `Polaroid.ts` — Polaroid image with caption
- `Media.ts` — File upload collection (alt text required)

**`src/payload/globals/`** — Global settings
- `HomePage.ts` — Homepage content (reels, polaroids relationships)
- `PrivacyPolicy.ts` — Privacy policy text
- `SocialLinks.ts` — Social media links (Discord, Instagram, TikTok, LinkedIn)

**`src/payload/hooks/`** — Payload lifecycle hooks
- `revalidate.ts` — `makeRevalidateHooks()` factory that triggers Next.js ISR invalidation

**`src/types/`** — TypeScript definitions
- `common.ts` — Shared interfaces (Value type)
- `enums.ts` — Enum definitions (ExecutiveTeam, ExecutiveLevel, SponsorTier, ValueColour)
- `schemas/` — Zod validation schemas

**`src/types/schemas/`** — Zod validation
- `member.ts` — `createMemberSchema` validates form input against Member collection

**`src/mocks/`** — Mock data for testing

**`src/payload/payload-types.ts`** — Auto-generated types (do not edit)
- Generated by: `payload generate:types`
- Contains: All TypeScript types from Payload schema (Executive, Member, Sponsor, etc.)

**`public/`** — Static assets served directly
- `fonts/` — Web fonts (Inter Tight, Switzer, IBM Plex Mono)

**`.storybook/`** — Storybook component library config
- Component documentation and visual testing

## Key File Locations

**Entry Points:**

- `src/app/(frontend)/layout.tsx` — Root frontend layout (fonts, metadata, navbar/footer)
- `src/app/payload/layout.tsx` — Payload admin layout
- `src/app/(frontend)/page.tsx` — Homepage (fetches HomePage global + reels/polaroids)
- `src/app/(frontend)/sign-up/page.tsx` — Sign-up page (renders SignUpForm component)

**Configuration:**

- `src/payload.config.ts` — Payload CMS main config (collections, globals, database, storage)
- `tsconfig.json` — TypeScript config with `@/*` alias for `src/*` and `@payload-config`
- `next.config.ts` — Next.js app config
- `vitest.config.ts` — Test runner config
- `postcss.config.mjs` — CSS post-processing config

**Core Logic:**

- `src/lib/payload.ts` — Payload SDK initialization (exported const `payload`)
- `src/lib/helpers.ts` — `getSocialLinks()` helper for fetching global data
- `src/lib/routes.ts` — Route and API endpoint string constants
- `src/lib/slugs.ts` — Collection/global slug constants
- `src/app/api/sign-up/route.ts` — Member registration endpoint

**Testing:**

- Component `.stories.tsx` files — Storybook stories (located alongside components)
- No dedicated test files currently (components can have .test.tsx alongside)

## Naming Conventions

**Files:**

- Components: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- Utilities/helpers: camelCase (e.g., `helpers.ts`, `utils.ts`)
- Collections: PascalCase matching the model (e.g., `Executive.ts`, `Member.ts`)
- Hooks: camelCase with `use` prefix for custom hooks (e.g., `useForm`)
- Configs: camelCase (e.g., `payload.config.ts`)
- Routes: lowercase with hyphens (e.g., `/sign-up`, `/team`)

**Directories:**

- Component directories: PascalCase (e.g., `src/components/Composite/HeroSection/`)
- Feature directories: kebab-case or PascalCase based on function (e.g., `(frontend)`, `api`)
- Config/infrastructure: lowercase (e.g., `src/payload/`, `src/lib/`)

**Variables & Functions:**

- Types/Interfaces: PascalCase (e.g., `AboutUsSectionProps`, `Value`)
- Constants: UPPER_SNAKE_CASE for truly constant values (e.g., `START_YEAR`, `FILE_SIZE`)
- Functions: camelCase (e.g., `getSocialLinks()`, `makeRevalidateHooks()`)
- React Components: PascalCase (e.g., `HeroSection`, `Button`)
- Enum values: PascalCase (e.g., `ExecutiveLevel.EXECUTIVE`)

**Types/Interfaces:**

- Collection types: Match collection slug (e.g., `Member`, `Executive`, `Sponsor`)
- Props interfaces: ComponentName + `Props` suffix (e.g., `AboutUsSectionProps`)
- Imported from `src/payload/payload-types.ts` for auto-generated types

## Where to Add New Code

**New Feature/Page:**

1. Create page in `src/app/(frontend)/[feature-name]/page.tsx` (Server Component)
2. Create page-specific layout/components in `src/app/(frontend)/[feature-name]/_components/`
3. If components are shared across pages, extract to `src/components/Composite/`
4. Create any new Payload collections/globals in `src/payload/collections/` or `src/payload/globals/`
5. Add route constant to `src/lib/routes.ts`

**New Reusable Component:**

1. **If Primitive (basic element):** Create in `src/components/Primitive/ComponentName/`
   - Add `ComponentName.tsx` with JSDoc comments
   - Create `.stories.tsx` for Storybook docs
   - Export from `src/components/Primitive/index.ts`

2. **If Generic (reusable pattern):** Create in `src/components/Generic/ComponentName/`
   - Likely combines multiple Primitives
   - Include TypeScript interfaces for props
   - Export from `src/components/Generic/index.ts`

3. **If Composite (page section):** Create in `src/components/Composite/SectionName/`
   - May fetch data, handle complex interactions
   - Can use "use client" for interactivity
   - Export from `src/components/Composite/index.ts`

**New Data Collection:**

1. Create collection config in `src/payload/collections/NewModel.ts` (e.g., `Event.ts`)
2. Define fields with names matching database schema
3. Add relationships to other collections using `relationTo`
4. If content changes should trigger ISR, add hooks from `makeRevalidateHooks(routes)`
5. Add slug constant to `src/lib/slugs.ts`
6. Import and add to `collections` array in `src/payload.config.ts`
7. Run `pnpm types:generate` to update `payload-types.ts`
8. Create Zod schema in `src/types/schemas/` if used in forms

**New API Route:**

1. Create `src/app/api/[endpoint]/route.ts` (Next.js API route)
2. Export `POST`, `GET`, etc. functions
3. Use `payload.create()`, `payload.find()`, etc. for data access
4. Validate input with Zod schema
5. Return appropriate status codes (200, 201, 400, 409, 500)
6. Add route constant to `src/lib/routes.ts` (ApiRoutes object)

**New Type/Schema:**

1. Create TypeScript interface/type in `src/types/common.ts` for shared types
2. Create Zod schema in `src/types/schemas/[domain].ts` for form validation
3. For Payload-generated types: run `pnpm types:generate` (auto-creates `src/payload/payload-types.ts`)

**New Global/Constant:**

- Routes: Add to `src/lib/routes.ts` (Routes or ApiRoutes object)
- Slugs: Add to `src/lib/slugs.ts` (Slugs.Collections or Slugs.Globals)
- Toast messages: Use `src/lib/toast.ts` helpers
- Enums: Add to `src/types/enums.ts`

## Special Directories

**`.next/`** — Build output
- Generated by: `pnpm build`
- Contains: Compiled assets, static pages, etc.
- Committed: No (add to .gitignore)

**`node_modules/`** — Dependencies
- Installed by: `pnpm install`
- Committed: No (always in .gitignore)

**`.storybook/`** — Component documentation
- Used by: `pnpm storybook` for component library
- Contains: Storybook config, decorators, preview settings

**`public/`** — Static assets
- Committed: Yes
- Served at: `/` path (e.g., `/fonts/Inter.woff2`)
- Contains: Fonts, logos, images

**`src/payload/payload-types.ts`** — Auto-generated Payload types
- Generated by: `pnpm types:generate`
- Committed: Yes (source of truth for type definitions)
- Do not edit manually — regenerate when schema changes

---

*Structure analysis: 2026-04-02*
