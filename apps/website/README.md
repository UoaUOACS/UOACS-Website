# @uoacs/website

The main UOACS website: the public site (homepage, team, events, sponsors, privacy policy), member profiles
with Google Wallet membership passes, and the Payload CMS that manages the site's content.

Members sign in through the hosted auth service in [`apps/auth`](../auth/README.md). The website's own
`/login`, `/sign-up`, `/forgot-password` and `/reset-password` paths permanently redirect there.

## Running locally

From the repository root:

```bash
cp apps/website/.env.example apps/website/.env
pnpm dev --filter @uoacs/website
```

- **Site**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/payload/admin](http://localhost:3000/payload/admin)

Run `apps/auth` alongside it if you need to sign in.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | MongoDB connection string. Shares a database with `apps/auth`, which owns member data |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `NEXT_PUBLIC_WEBSITE_URL` | This app's public URL |
| `NEXT_PUBLIC_AUTH_URL` | Auth service URL — required, `next.config.ts` throws without it |
| `NEXT_PUBLIC_PROJECTS_URL` | Playground URL |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Media storage |
| `RESEND_API_KEY` | Transactional email (optional locally) |
| `GOOGLE_WALLET_ISSUER_ID`, `GOOGLE_WALLET_SERVICE_ACCOUNT_KEY` | Google Wallet membership passes |
| `DISCORD_SERVER_ID` | Discord server widget |

## Scripts

Run with `pnpm --filter @uoacs/website <script>` or from inside `apps/website`.

| Command | Description |
|---------|-------------|
| `dev` | Start the dev server on port 3000 |
| `build` / `start` | Build and serve the production app |
| `types:generate` | Regenerate `src/payload/payload-types.ts` and Next.js route types |
| `types:check` | Type check with `tsc` |
| `code:generate` | Scaffold a component with Plop (see below) |
| `storybook` / `storybook:build` | Storybook on port 6006 (includes `@uoacs/ui` stories) |

## Structure

```
src/
├── app/
│   ├── (frontend)/       # Public pages: home, team, events, sponsors, profile, privacy
│   ├── api/              # events, google-wallet, member, profile, health
│   ├── og/               # Open Graph image generation
│   ├── payload/          # Payload admin panel and REST API
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Composite/        # Page-level sections (Navbar, Footer, HeroSection, …)
│   └── Generic/          # Reusable app components (EventCard, ExecCard, …)
├── context/ hooks/       # React context and hooks
├── lib/                  # api, auth, payload and wallet helpers
├── payload/
│   ├── collections/      # Admin, Event, Executive, Media, Polaroid, Reel, Sponsor
│   ├── globals/          # HomePage, PrivacyPolicy, SocialLinks
│   ├── hooks/
│   └── payload-types.ts  # Generated — do not edit
├── queries/              # TanStack Query hooks
├── services/             # Business logic and external integrations
├── types/                # Shared types, enums and Zod schemas
├── mocks/                # Mock data for Storybook and development
├── scripts/              # Standalone maintenance scripts
└── payload.config.ts
.storybook/               # Storybook config
```
