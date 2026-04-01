# Architecture

**Analysis Date:** 2026-04-02

## Pattern Overview

**Overall:** Headless CMS with Next.js frontend - Component-based UI layer with Payload CMS providing data and content management.

**Key Characteristics:**
- Server-side rendering (SSR) with React Server Components (RSCs) for data fetching
- Hybrid client/server rendering strategy
- Content managed centrally through Payload CMS (MongoDB backend)
- ISR (Incremental Static Revalidation) for cache invalidation on content changes
- Component-driven architecture with strict layering (Primitive → Generic → Composite)

## Layers

**Data Layer (CMS & Database):**
- Purpose: Manages all persistent data and content
- Location: `src/payload/` and Payload CMS admin interface
- Contains: Collection definitions (Member, Executive, Sponsor, Reel, Polaroid, Media), global settings (HomePage, PrivacyPolicy, SocialLinks)
- Depends on: MongoDB (via `@payloadcms/db-mongodb`)
- Used by: API layer and server components

**API Layer:**
- Purpose: Provides server-side data access and route handlers
- Location: `src/app/api/` and `src/lib/payload.ts`
- Contains: REST endpoints (sign-up, health check) and Payload SDK initialization
- Depends on: Payload CMS, data validation schemas
- Used by: Server components, client-side fetch calls

**Component Layer:**
- Purpose: Renders UI in three abstraction levels
- Location: `src/components/Primitive/`, `src/components/Generic/`, `src/components/Composite/`
- Contains: Reusable UI building blocks organized by complexity
- Depends on: React, Tailwind CSS, type definitions
- Used by: Page components and higher-level components

**Page/Route Layer:**
- Purpose: Maps routes to page components and orchestrates data fetching
- Location: `src/app/(frontend)/` and `src/app/api/`
- Contains: Server components (async functions) and client entry points
- Depends on: Component layer, API layer, Payload data
- Used by: Next.js router

**Configuration & Infrastructure:**
- Purpose: Initializes Payload CMS, defines collections/globals, and environment setup
- Location: `src/payload.config.ts`, `.env` variables
- Contains: Database adapters (MongoDB), storage (S3), plugins, field configurations
- Depends on: External services (MongoDB, S3, AWS)
- Used by: Entire application stack

## Data Flow

**Homepage Render Flow:**

1. `src/app/(frontend)/page.tsx` (Server Component) executes
2. Calls `payload.findGlobal({ slug: HOME_PAGE })` to fetch home content
3. Calls `getSocialLinks()` helper which queries `SocialLinks` global
4. Resolves related documents (reels as Reel[], polaroids as Polaroid[])
5. Passes resolved data as props to section components: `HeroSection`, `AboutUsSection`, `WhoWeAreSection`, `ValuesSection`, `SponsorsServerSection`
6. Each section component renders with data from Payload
7. User sees pre-rendered content with server-side data integration

**Sign-Up Flow:**

1. User submits form on `src/app/(frontend)/sign-up/page.tsx`
2. `SignUpForm` (Client Component) validates with `createMemberSchema` via Zod
3. POST to `src/app/api/sign-up/route.ts` with form data
4. Route handler parses/validates with schema, calls `payload.create({ collection: 'member', data })`
5. On success: revalidates ISR cache, redirects to home, shows success toast
6. On error: shows error toast (duplicate email = 409, other = generic error)
7. Payload hook `afterChange` triggers `revalidatePath()` to clear Next.js cache

**Content Update & Cache Invalidation:**

1. Admin updates Executive/Sponsor/HomePage content in Payload CMS
2. Payload executes `afterChange` or `afterDelete` hook (defined in collection config)
3. Hook calls `revalidatePath()` for affected routes (e.g., `/team`, `/sponsors`, `/`)
4. Next.js ISR clears static cache for those paths
5. Next request to those routes re-renders with fresh data

**State Management:**

- **Server State:** Managed via Payload CMS (source of truth)
- **Component State:** Local React hooks for UI state (open/closed, form state, loading flags)
- **Cache Management:** Next.js ISR with Payload-triggered revalidation
- **Client-side Data:** React hooks (useForm, useState) for transient form/UI state

## Key Abstractions

**Payload Collections:**
- Purpose: Define data schema and admin UI for each content type
- Examples: `src/payload/collections/Executive.ts`, `src/payload/collections/Member.ts`, `src/payload/collections/Sponsor.ts`
- Pattern: CollectionConfig objects with fields, hooks, relationships, and validation logic

**Revalidation Hooks:**
- Purpose: Trigger ISR cache invalidation when content changes
- Examples: `makeRevalidateHooks()` in `src/payload/hooks/revalidate.ts`
- Pattern: Higher-order function returns afterChange/afterDelete/globalAfterChange hooks that call `revalidatePath()`

**Component Hierarchy:**
- **Primitive:** Basic HTML elements with styling (Button, Input, Radio, Heading, Icons)
- **Generic:** Composite UI patterns reused across pages (ExecCard, Section, SocialLinks, SponsorBadge, ValuesAccordion)
- **Composite:** Full page sections and forms (HeroSection, AboutUsSection, SignUpForm, SponsorsSection, WhoWeAreSection)

**Route Configuration:**
- Purpose: Centralize hardcoded route and API endpoint strings
- Location: `src/lib/routes.ts`
- Pattern: Exported const objects (Routes, ApiRoutes) with typed keys

**Slug Management:**
- Purpose: Centralize collection/global slug definitions to avoid typos
- Location: `src/lib/slugs.ts`
- Pattern: Hierarchical object structure (Slugs.Collections.MEMBER, Slugs.Globals.HOME_PAGE)

**Type Generation:**
- Purpose: Automatically generate TypeScript types from Payload schema
- Pattern: `src/payload/payload-types.ts` auto-generated during build
- Usage: Import types like `Executive`, `Member`, `Reel` for type-safe data handling

## Entry Points

**Website (Frontend):**
- Location: `src/app/(frontend)/layout.tsx`
- Triggers: Browser navigation to `/`
- Responsibilities: Sets up root layout with fonts, metadata, navbar/footer, applies global styles

**Sign-Up API:**
- Location: `src/app/api/sign-up/route.ts`
- Triggers: POST from client form submission
- Responsibilities: Validates request, creates Member record, handles errors (duplicate email), returns 201/409

**Health Check:**
- Location: `src/app/api/health/route.ts`
- Triggers: External monitoring or deployment checks
- Responsibilities: Verifies application is running

**Payload Admin:**
- Location: `src/app/payload/admin/[[...segments]]/page.tsx`
- Triggers: Access to `/payload/admin`
- Responsibilities: Serves Payload CMS admin interface

**Payload API:**
- Location: `src/app/payload/api/[...slug]/route.ts`
- Triggers: REST requests to `/payload/api/...`
- Responsibilities: Proxy route for Payload API endpoints

**OG Image Generation:**
- Location: `src/app/og/route.tsx`
- Triggers: OpenGraph image requests
- Responsibilities: Dynamically generates social media preview images

## Error Handling

**Strategy:** Layered error handling with validation at input, graceful degradation in UI, and specific error responses in API routes.

**Patterns:**

- **Validation Errors:** Zod schemas validate at form submission and API route level
  - Example: `createMemberSchema.parse()` in `src/app/api/sign-up/route.ts` throws on invalid data
  - Caught and returned as 400/409 responses to client

- **Unique Constraint Errors:** Payload throws `ValidationError` on duplicate emails
  - Caught in sign-up route handler, returns 409 with error message and field name
  - Client shows specific toast: "This email is already in use"

- **Server Component Data Fetch Errors:** Propagate up and trigger error boundary
  - If `payload.find()` fails, error boundary in layout catches and renders error page

- **Missing Data:** Defensive code with optional chaining and nullish coalescing
  - Example: `(homePage?.reels ?? [])` in `src/app/(frontend)/page.tsx`
  - Prevents crashes when optional relationships are missing

- **Form Submission Errors:** Try/catch in `onSubmit` with specific error messaging
  - Network errors and non-201/409 responses trigger generic error toast
  - 409 errors get specific message about duplicate email

## Cross-Cutting Concerns

**Logging:** 
- Payload logger used for revalidation tracking: `payload.logger.info(msg)` in hooks
- Client-side errors logged via toast messages (user-facing, not backend logs)

**Validation:**
- Zod schemas define all client input contracts
- Located at: `src/types/schemas/member.ts` (and other schemas)
- Applied at form submission and API route level
- Payload field-level validation defined in collection configs (e.g., `validate()` callback in Member.ts)

**Authentication:**
- No role-based access control for frontend routes (all public)
- Payload Admin requires auth (handled by Payload CMS built-in auth)
- Media collection allows read-only public access: `access: { read: () => true }`

**Image Handling:**
- Sharp image optimization for uploads: `upload.limits.fileSize: 33MB`
- S3 storage plugin for distributed file storage
- Media collection with alt text requirements for accessibility

---

*Architecture analysis: 2026-04-02*
