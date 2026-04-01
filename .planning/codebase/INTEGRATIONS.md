# External Integrations

**Analysis Date:** 2026-04-02

## APIs & External Services

**None detected** - The application does not consume external REST/GraphQL APIs beyond Payload CMS internal APIs.

## Data Storage

**Databases:**
- MongoDB
  - Connection: `DATABASE_URI` env var (required)
  - Client/Adapter: @payloadcms/db-mongodb 3.80.0
  - Configuration: `src/payload.config.ts` lines 46-48
  - Collections managed: User, Media, Member, Executive, Sponsor, Reel, Polaroid
  - Payload generates types to: `src/payload/payload-types.ts`

**File Storage:**
- AWS S3 (primary storage)
  - SDK/Plugin: @payloadcms/storage-s3 3.80.0
  - Configuration: `src/payload.config.ts` lines 56-68
  - Bucket: `S3_BUCKET` env var (required)
  - Prefix: "media" for media collection files
  - Credentials: `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` env vars
  - Region: `S3_REGION` env var
  - File size limit: 32MB (33_554_432 bytes)

**Image Processing:**
- Sharp 0.34.4
  - Used for image optimization during upload
  - Integrated in Payload config (`src/payload.config.ts` line 49)
  - Handles image processing for media collection

**Caching:**
- None detected - No explicit caching layer (Redis, Memcached, etc.)
- Next.js built-in caching via revalidatePath hooks

## Authentication & Identity

**Auth Provider:**
- Payload CMS Custom - Built-in authentication
  - Admin user collection: `User` (slug defined in payload.config.ts)
  - Authentication via Payload admin interface
  - No external OAuth/OIDC detected

**Protected Routes:**
- Payload admin: `/payload/admin` (access controlled by User collection)
- API endpoints: Public by default, gated via Payload's access control

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, Rollbar, DataDog, etc.

**Logs:**
- Console logging - Via Payload logger (payload.logger.info)
- Example: Revalidation logs in `src/payload/hooks/revalidate.ts` lines 14
- Deployment logs: Via Fly.io dashboard

**Health Checks:**
- Endpoint: `/api/health` (GET)
- Purpose: Fly.io health check (configured in fly.toml)
- Interval: 15 seconds
- Grace period: 30 seconds
- Timeout: 10 seconds
- Returns: HTTP 200 from `src/app/api/health/route.ts`

## CI/CD & Deployment

**Hosting:**
- Fly.io (primary)
  - App name: `uoacs-website`
  - Primary region: Sydney (syd)
  - Concurrency: 20 soft limit, 25 hard limit
  - Min machines: 1 always running
  - Swap: 256MB

**Staging:**
- Configured: `fly.staging.toml`
- Deployment environment: Separate Fly app

**CI Pipeline:**
- None detected in codebase
- No GitHub Actions, GitLab CI, etc. configured

**Build Process:**
- Docker multi-stage build (Dockerfile)
- Stage 1: deps - Install dependencies
- Stage 2: builder - Build Next.js app
- Uses pnpm with frozen lockfile
- Secrets: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_URL, S3_*

## Environment Configuration

**Required env vars:**
- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret for Payload CMS
- `NEXT_PUBLIC_URL` - Public app URL (visible in browser)
  - Used for: OG tags, sitemap, metadata base URL
  - Default fallback: `http://localhost:3000`
- `S3_BUCKET` - AWS S3 bucket name
- `S3_ACCESS_KEY_ID` - AWS S3 access key
- `S3_SECRET_ACCESS_KEY` - AWS S3 secret key
- `S3_REGION` - AWS region for S3

**Optional env vars:**
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` - Default to empty strings if not set (lines 60, 63-64 in payload.config.ts)

**Secrets location:**
- `.env` file (local development, not committed)
- Docker secrets: Referenced in Dockerfile via `--mount=type=secret`
- Fly.io secrets: Managed via Fly dashboard (not in codebase)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- ISR/Revalidation: Next.js revalidatePath() hooks
  - Triggered by: Payload collection changes and deletes
  - Implementation: `src/payload/hooks/revalidate.ts`
  - Used for: Cache invalidation of static pages
  - Collections: Member, Executive, Sponsor, Reel, Polaroid, Media, and globals (HomePage, PrivacyPolicy, SocialLinks)

## Data Models

**Payload Collections:**
- `user` - Admin users (`src/payload/collections/User.ts`)
- `media` - Files with S3 storage (`src/payload/collections/Media.ts`)
- `member` - Community members with email uniqueness constraint
- `executive` - Leadership team data (`src/payload/collections/Executive.ts`)
- `sponsor` - Sponsors with links (`src/payload/collections/Sponsor.ts`)
- `reel` - Video/media content (`src/payload/collections/Reel.ts`)
- `polaroid` - Photo gallery items (`src/payload/collections/Polaroid.ts`)

**Payload Globals:**
- `home-page` - Homepage content (`src/payload/globals/HomePage.ts`)
- `privacy-policy` - Privacy policy content (`src/payload/globals/PrivacyPolicy.ts`)
- `social-links` - Social media links (`src/payload/globals/SocialLinks.ts`)

## API Endpoints

**Public:**
- `GET /api/health` - Health check (src/app/api/health/route.ts)
- `POST /api/sign-up` - Create new member (src/app/api/sign-up/route.ts)
- `GET /api/og` - OG image generation (src/app/og/route.tsx)

**Payload Admin API:**
- `GET/POST /payload/api/*` - Authenticated CMS API
- Type definitions auto-generated to `src/payload/payload-types.ts`

**Payload Admin UI:**
- `GET /payload/admin` - Admin dashboard (requires User authentication)

---

*Integration audit: 2026-04-02*
