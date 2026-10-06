# UOACS Website

The monorepo behind the University of Auckland Computer Science Society (UOACS) web platform. It holds
several Next.js + Payload CMS apps that share one design system, one auth service and one set of types.

| App | Package | What it is | Local URL |
|-----|---------|------------|-----------|
| [`apps/website`](apps/website/README.md) | `@uoacs/website` | The main UOACS website: homepage, team, events, sponsors, member profiles and Google Wallet passes | [localhost:3000](http://localhost:3000) |
| [`apps/playground`](apps/playground/README.md) | `@uoacs/playground` | The projects playground, where members showcase and discover projects | [localhost:3001](http://localhost:3001) |
| [`apps/auth`](apps/auth/README.md) | `@uoacs/auth` | The hosted auth service: login, sign-up, password reset and the Better Auth API every app signs in through | [localhost:3002](http://localhost:3002) |

| Package | Name | What it is |
|---------|------|------------|
| [`packages/ui`](packages/ui/README.md) | `@uoacs/ui` | Shared design system: brand tokens, fonts and primitive components |
| [`packages/shared`](packages/shared/README.md) | `@uoacs/shared` | Shared auth client, session helpers, Payload types, schemas and utilities |
| [`packages/config`](packages/config/README.md) | `@uoacs/config` | Shared `tsconfig` bases |

## 🧭 How the pieces fit

```
             ┌──────────────────────┐
             │      apps/auth       │  Better Auth + Payload (Member data)
             │  login · sign-up ·   │  sets the session cookie
             │  /api/auth/*         │
             └──────────┬───────────┘
        session cookie  │  /api/auth/get-session, /api/member/me
          ┌─────────────┴─────────────┐
          ▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│   apps/website   │        │ apps/playground  │
│  Payload: events,│        │ Payload: projects│
│  execs, sponsors │        │ sponsors, likes  │
└──────────────────┘        └──────────────────┘
          └──────── @uoacs/ui · @uoacs/shared ────────┘
```

- **Auth is centralised.** Only `apps/auth` runs Better Auth. The website and playground send people to
  its hosted pages (via `authPageUrl()` from `@uoacs/shared`) and read the session by calling the auth
  service with the person's cookie. In production the cookie is scoped to the shared parent domain so
  every subdomain sees it.
- **Each app owns its own Payload CMS** (admin at `/payload/admin`) for the content it serves.
- **Shared code lives in `packages/`** and is consumed as raw TypeScript source — there is no build
  step for packages; each app lists them in `transpilePackages`.

## 📋 Prerequisites

- **Node.js** — version pinned in `.nvmrc`
- **pnpm** — version pinned in `package.json` (`packageManager`), enabled via Corepack
- **MongoDB** instance (local or cloud)

### Node.js installation

With [nvm](https://github.com/nvm-sh/nvm), from the repository root:

```bash
nvm install
nvm use
```

With [Volta](https://volta.sh/), the correct version is picked up automatically.

## 🛠️ Getting Started

### 1. Install dependencies

```bash
corepack enable
pnpm install
```

`postinstall` installs the Lefthook git hooks.

### 2. Set up environment variables

Environment variables are per-app. Copy each app's example file and fill in the values:

```bash
cp apps/website/.env.example apps/website/.env
cp apps/playground/.env.example apps/playground/.env
cp apps/auth/.env.example apps/auth/.env
```

The apps point at each other through `NEXT_PUBLIC_WEBSITE_URL`, `NEXT_PUBLIC_PROJECTS_URL` and
`NEXT_PUBLIC_AUTH_URL`. Locally these are `http://localhost:3000`, `:3001` and `:3002`. Each app's
README lists the variables it needs.

### 3. Start the dev servers

```bash
pnpm dev
```

This starts every app in parallel through Turborepo. To run a single app:

```bash
pnpm dev --filter @uoacs/website
```

> Signing in from the website or playground needs `apps/auth` running too.

## 🔧 Scripts

Run from the repository root. Turborepo fans these out to every workspace package that defines the script.

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all app dev servers |
| `pnpm build` | Build all apps for production |
| `pnpm types:generate` | Regenerate Payload and Next.js route types for every app |
| `pnpm types:check` | Run TypeScript type checking (regenerates types first) |
| `pnpm lint:check` | Run Biome lint and format checks |
| `pnpm lint:fix` | Fix Biome lint and format issues |
| `pnpm lint:fix:unsafe` | Also apply Biome's unsafe fixes |
| `pnpm storybook` | Start Storybook for the website and playground |
| `pnpm storybook:build` | Build static Storybook sites |

Use `--filter` to target one package, e.g. `pnpm dev --filter @uoacs/playground`. App-specific
scripts are documented in each app's README.

## 🏗️ Project Structure

A pnpm workspace orchestrated by [Turborepo](https://turborepo.com/).

```
apps/
├── website/          # @uoacs/website — main UOACS site
├── playground/       # @uoacs/playground — projects playground
└── auth/             # @uoacs/auth — hosted auth service

packages/
├── ui/               # @uoacs/ui — design system
├── shared/           # @uoacs/shared — auth client, types, schemas, utils
└── config/           # @uoacs/config — tsconfig bases

.github/
├── actions/          # Reusable composite actions (e.g. Fly.io deploy)
├── ISSUE_TEMPLATE/   # Issue templates (frontend, backend, devops, full-stack, bug)
├── workflows/        # CI (lint, types, codegen, build, Storybook) and CD (Fly.io)
└── pull-request-template.md

package.json          # Root tooling and Turborepo entrypoints
pnpm-workspace.yaml   # Workspace globs and dependency catalogs
turbo.json            # Task graph and caching
biome.json            # Biome lint/format configuration
lefthook.yaml         # Git hooks
```

### Where should code go?

- **`packages/ui`** — generic, brand-level UI with no app-specific dependencies (no Payload types, routes
  or session). Available to every app.
- **`packages/shared`** — non-UI code more than one app needs: the auth client and route constants,
  session helpers, cross-app Payload types and Zod schemas.
- **`apps/*`** — anything that depends on that app's Payload collections, routes or pages.

### Dependency versions

Shared dependencies (Next.js, React, Payload, Lexical, Storybook, Tailwind, Zod, …) are pinned once in the
`catalog`/`catalogs` sections of `pnpm-workspace.yaml` and referenced as `catalog:` in each `package.json`.
Bump versions there so every app stays in sync.

## 🧹 Linting & Formatting

[Biome](https://biomejs.dev/) handles both. A Lefthook pre-commit hook runs it on staged files, so you
rarely need to run it manually:

```bash
pnpm lint:check
pnpm lint:fix
pnpm lint:fix:unsafe   # for fixes Biome marks unsafe
```

## 💻 IDE Setup

VS Code will recommend the Biome extension; workspace settings are already committed. For other editors,
configure Biome yourself,  contributions of config files are welcome.

## 🚀 Tech Stack

- **Framework** — [Next.js](https://nextjs.org/) (App Router, Turbopack, React Compiler), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **CMS & data** — [Payload CMS](https://payloadcms.com/) with [MongoDB](https://www.mongodb.com/)
- **Auth** — [Better Auth](https://www.better-auth.com/) for members; Payload's built-in auth for admins
- **UI** — [Tailwind CSS](https://tailwindcss.com/), [tailwind-variants](https://www.tailwind-variants.org/), [Motion](https://motion.dev/), [Lexical](https://lexical.dev/)
- **Forms & state** — [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query](https://tanstack.com/query), [nuqs](https://nuqs.dev/)
- **Integrations** — [AWS S3](https://aws.amazon.com/s3/) (media), [Resend](https://resend.com/) (email), [Google Wallet](https://developers.google.com/wallet) (membership passes), Discord widget
- **Tooling** — [Turborepo](https://turborepo.com/), [pnpm](https://pnpm.io/), [Biome](https://biomejs.dev/), [Lefthook](https://lefthook.dev/), [Storybook](https://storybook.js.org/), [Vitest](https://vitest.dev/)
- **Hosting** — [Fly.io](https://fly.io/) + [Docker](https://www.docker.com/)

## 📚 Learn More

- [Next.js](https://nextjs.org/docs) · [Payload CMS](https://payloadcms.com/docs) · [Better Auth](https://www.better-auth.com/docs) · [Tailwind CSS](https://tailwindcss.com/docs)
- [Turborepo](https://turborepo.com/docs) · [Storybook](https://storybook.js.org/docs) · [Biome](https://biomejs.dev/guides/getting-started/) · [Lefthook](https://lefthook.dev/)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
