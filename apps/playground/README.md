# @uoacs/playground

The UOACS projects playground: a place for members to showcase their projects and discover what others
are building. It has its own Payload CMS for it's app-specific data.

Members sign in through the hosted auth service in [`apps/auth`](../auth/README.md); the playground reads
the session from it and links to its pages using the helpers in `@uoacs/shared`.

## Running locally

From the repository root:

```bash
cp apps/playground/.env.example apps/playground/.env
pnpm dev --filter @uoacs/playground
```

- **Site**: [http://localhost:3001](http://localhost:3001)
- **Admin panel**: [http://localhost:3001/payload/admin](http://localhost:3001/payload/admin)

Run `apps/auth` alongside it if you need to sign in.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | MongoDB connection string |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `NEXT_PUBLIC_PROJECTS_URL` | This app's public URL |
| `NEXT_PUBLIC_AUTH_URL` | Auth service URL |
| `NEXT_PUBLIC_WEBSITE_URL` | Main website URL |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Media storage (under the `playground/media` prefix) |
| `DISCORD_SERVER_ID` | Discord server widget in the footer |

## Scripts

Run with `pnpm --filter @uoacs/playground <script>` or from inside `apps/playground`.

| Command | Description |
|---------|-------------|
| `dev` | Start the dev server on port 3001 |
| `build` / `start` | Build and serve the production app |
| `types:generate` | Regenerate `src/payload/payload-types.ts` and Next.js route types |
| `types:check` | Type check with `tsc` |
| `storybook` / `storybook:build` | Storybook on port 6008 (includes `@uoacs/ui` stories) |

## Structure

Code is organised by feature rather than by file type. Each feature owns its components and whatever
supporting code it needs.

```
src/
├── app/
│   ├── (frontend)/       # Pages and the root layout
│   ├── api/health/       # Health check
│   └── payload/          # Payload admin panel and REST API
├── features/
│   ├── example/          # Template showing the folder layout for a new feature
│   ├── layout/           # Navbar, Footer, HeroSection, DiscordSection
│   ├── member/
│   ├── profile/          # Member profile page
│   ├── project/          # Project cards, grid, tabs, sorting, Discover section
│   ├── search/           # SearchBar
│   ├── sponsor/          # Sponsors section, logos and ticker
│   └── user/             # Signed-in user context
├── lib/payload/          # Payload helpers
├── payload/
│   ├── collections/      # Admin, Like, Media, Member, Project, Sponsor
│   ├── blocks/ fields/ hooks/ validation/
│   └── payload-types.ts  # Generated — do not edit
└── payload.config.ts
```

A feature folder may contain any of `components/`, `actions/`, `services/`, `queries/`, `helpers/`,
`schemas/`, `types/`, `constants/` and `mocks/` — see `features/example`. Generic UI that other apps could
use belongs in [`@uoacs/ui`](../../packages/ui/README.md) instead.
