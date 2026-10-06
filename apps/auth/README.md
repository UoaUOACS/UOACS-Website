# @uoacs/auth

The hosted auth service for every UOACS app. It runs [Better Auth](https://www.better-auth.com/), serves
the login, sign-up and password reset pages, and owns member data in its Payload CMS.

The website and playground never run Better Auth themselves. They:

1. link people to this app's pages with helpers from `@uoacs/shared`, and
2. read the session server-side with `getSession()` from `@uoacs/shared/auth/server`, which calls this
   service with the person's cookie.

## Running locally

From the repository root:

```bash
cp apps/auth/.env.example apps/auth/.env
pnpm dev --filter @uoacs/auth
```

- **Auth pages**: [http://localhost:3002/login](http://localhost:3002/login)
- **Admin panel**: [http://localhost:3002/payload/admin](http://localhost:3002/payload/admin)

Locally all apps are ports on `localhost`, so the session cookie is already shared between them.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | MongoDB connection string, used by both Payload and Better Auth |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `BETTER_AUTH_SECRET` | Better Auth signing secret — required |
| `NEXT_PUBLIC_AUTH_URL` | This app's public URL — required |
| `NEXT_PUBLIC_WEBSITE_URL`, `NEXT_PUBLIC_PROJECTS_URL` | Trusted origins allowed to call this service and be redirected back to |
| `AUTH_COOKIE_DOMAIN` | Parent domain for cross-subdomain cookies (e.g. `.uoacs.co.nz`). Leave unset locally |
| `RESEND_API_KEY` | Sends verification and password reset emails (optional locally) |

## Scripts

Run with `pnpm --filter @uoacs/auth <script>` or from inside `apps/auth`.

| Command | Description |
|---------|-------------|
| `dev` | Start the dev server on port 3002 |
| `build` / `start` | Build and serve the production app |
| `types:generate` | Regenerate the shared Payload types (see below) and Next.js route types |
| `types:check` | Type check with `tsc` |

## Routes

| Route | Purpose |
|-------|---------|
| `/login`, `/sign-up`, `/forgot-password`, `/reset-password` | Hosted auth pages; accept a `redirect` search param (an absolute URL on a trusted origin) to return to |
| `/api/auth/*` | Better Auth API (sessions, sign-in, password reset) |
| `/api/member/me` | The signed-in person's member record |
| `/api/health` | Health check |
| `/payload/admin` | Payload admin panel |

Paths other apps call are defined once in `AuthApiRoutes` and `AuthPages` in `@uoacs/shared`.
**Renaming a route directory here means updating those constants too.**

## Sign-up

Sign-up is email-verified: the form sends a code (stored in the `email-verification-code` collection),
and the `signUp` server action in `src/actions/sign-up.ts` checks it before creating the account.

## Payload types

Auth owns the `Member` and `EmailVerificationCode` collections, and its generated types are the contract
the other apps consume. `types:generate` writes them to
`packages/shared/src/payload/payload-types.ts`, then `scripts/strip-payload-augmentation.mjs` removes
Payload's global `declare module "payload"` block so it doesn't clash with other apps' generated types.
Don't edit that file by hand.

## Structure

```
src/
├── actions/              # Server actions: sign-up, forgot-password
├── app/
│   ├── (frontend)/       # login, sign-up, forgot-password, reset-password
│   ├── api/              # auth/[...all], member/me, health
│   └── payload/          # Payload admin panel and REST API
├── components/           # Auth forms, AuthNavbar, AuthFooter
├── lib/                  # Better Auth config, trusted origins, Mongo client, verified-email cookie
├── payload/collections/  # Users (admins), Media, Member, EmailVerificationCode
├── services/email/       # Email sending via Payload/Resend
├── types/                # Zod schemas
└── payload.config.ts
scripts/                  # strip-payload-augmentation.mjs
```
