# Better Auth + Member Authentication

## What This Is

Member authentication for the UOACS website. Club members can currently sign up via `/sign-up` but have no way to log back in. This milestone adds Better Auth (standalone, MongoDB) for member-facing auth, renames the Payload `User` collection to `Admin` to clearly separate concerns, and rebuilds the sign-up flow as a multi-step wizard that handles both new members and existing members claiming their account.

## Core Value

Club members can log in to the website using the email they signed up with — and existing members can claim their account without creating a duplicate membership.

## Requirements

### Validated

- ✓ Member sign-up via `/sign-up` (single-page form) — existing
- ✓ Payload CMS admin panel at `/payload/admin` with built-in User auth — existing
- ✓ Member, Executive, Sponsor, Reel, Polaroid, Media collections in Payload — existing
- ✓ Public frontend routes (all unauthenticated) — existing
- ✓ ISR cache invalidation via Payload afterChange hooks — existing

### Active

- [ ] Rename Payload `User` collection → `Admin` (slug: `admin`, `dbName: "users"` to preserve existing data)
- [ ] Install Better Auth + direct `mongodb` dependency
- [ ] Better Auth server config (`src/lib/auth.ts`) — MongoDB adapter, same DB as Payload
- [ ] Shared MongoClient instance (`src/lib/mongo.ts`) for Better Auth
- [ ] Better Auth React client (`src/lib/auth-client.ts`)
- [ ] Better Auth API catch-all route (`src/app/api/auth/[...all]/route.ts`)
- [ ] Add `betterAuthUserId` field to Member collection (nullable, unique)
- [ ] Multi-step sign-up wizard: Step 1 (email) → membership lookup → Step 2 (member fields, new only) → Step 3 (password)
- [ ] "No match" prompt on sign-up: "Already a member? Contact the committee to link your account."
- [ ] Updated sign-up API route: create Better Auth user + Payload Member atomically; delete BA user + return 500 on Member creation failure
- [ ] Login page (`/login`) with `LoginForm` — email + password, redirect to home on success
- [ ] Session-aware navbar: show Login link when logged out, display name + Logout when logged in
- [ ] Scaffold `src/middleware.ts` with empty matcher

### Out of Scope

- Gated/protected routes — middleware is scaffolded but matcher is empty; route protection is a future milestone
- OAuth / social login — email + password sufficient for v1
- Student ID as a membership lookup key — too error-prone (easy to misspell, no uniqueness guarantee)
- Retroactive account linking for existing members who used a different email — edge case handled operationally by committee

## Context

- **Stack:** Next.js 16 (App Router), Payload CMS 3.80 (MongoDB), TypeScript, Tailwind CSS, react-hook-form + Zod, Sonner toasts
- **Database:** Single MongoDB instance shared by Payload and Better Auth. Better Auth creates its own collections (`user`, `session`, `account`, `verification`) alongside Payload's collections.
- **Admin data preservation:** `User` → `Admin` rename uses `dbName: "users"` so the underlying MongoDB collection stays `users` — no migration needed.
- **Sign-up wizard logic:** Step 1 checks Member collection by email. If match found → skip member fields, link existing Member to new Better Auth user. If no match → full member form flow. Sign-up API creates both records; on Payload failure it deletes the Better Auth user before returning 500.
- **Form patterns:** Follow existing `SignUpForm` conventions — react-hook-form + Zod resolver, Primitive `Input` components, Sonner toast on success/error.

## Constraints

- **Tech stack:** Better Auth must use the same MongoDB instance (no separate DB or connection string)
- **Data compatibility:** Admin collection rename must not require a MongoDB migration — use `dbName: "users"`
- **Rollback:** If Member creation fails after Better Auth user is created, call `auth.api.deleteUser()` and return 500 — no silent orphans
- **Existing members:** Email is the only reliable lookup key — no student ID lookup

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Better Auth shares Payload's MongoDB DB | Single connection string, simpler ops | — Pending |
| `dbName: "users"` on Admin collection | Avoids one-time MongoDB migration for existing admin records | — Pending |
| Email lookup for membership claim | Only reliable unique identifier; student ID too error-prone | — Pending |
| Multi-step sign-up wizard | Existing vs new member paths diverge after email entry | — Pending |
| Delete BA user on Member creation failure | No silent orphans; atomic UX from member's perspective | — Pending |
| Session-aware navbar (name + Logout) | Immediate feedback that auth is working | — Pending |

---
*Last updated: 2026-04-02 after initialization*
