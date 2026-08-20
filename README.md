# UOACS Website

A modern, full-stack website for the University of Auckland Computer Science Society (UOACS), built with Next.js, Payload CMS, and TypeScript.

## 📋 Prerequisites

- **Node.js**
- **pnpm**
- **MongoDB** instance (local or cloud)

### Node.js installation

#### nvm (Node Version Manager)

In the root directory of the project, you can find a `.nvmrc` file specifying the required Node.js version. If you have `nvm` installed, you can run:

```bash
nvm install
nvm use
```

#### Volta

If you use [Volta](https://volta.sh/), the project will automatically use the correct Node.js version specified in `package.json`.

Follow the [Volta installation instructions](https://docs.volta.sh/guide/getting-started) if you don't have it installed.

## 🛠️ Setting Up the Project

### 1. Install Dependencies

```bash
corepack enable

pnpm install
```

### 2. Environment Setup

Environment variables are per-app. Copy the example file into the app you're running and update the variables as needed:

```bash
cp apps/website/.env.example apps/website/.env
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/payload/admin](http://localhost:3000/payload/admin)

## 🔧 Important Scripts

Run from the repository root. Turborepo fans these out to every workspace package that defines the script.

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build production application |
| `pnpm types:check` | Run TypeScript type checking |
| `pnpm lint:check` | Run Biome linter and formatter checks |
| `pnpm lint:fix` | Fix Biome lint and format issues |
| `pnpm lint:fix:unsafe` | Unsafely Fix Biome lint and format issues |
| `pnpm storybook` | Start Storybook development server |
| `pnpm storybook:build` | Build Storybook static site |

Use `--filter` to target a single package, e.g. `pnpm turbo run build --filter @uoacs/website`.

### App-scoped Scripts

These live on `@uoacs/website` and can be run with `pnpm --filter @uoacs/website <script>`, or from inside `apps/website`.

| Command | Description |
|---------|-------------|
| `pnpm start` | Start production server |
| `pnpm types:generate` | Generate Payload CMS TypeScript types |
| `pnpm code:generate` | Scaffold a new component with Plop |
| `pnpm migrate:user-admin` | Rename the `users` table to `admins` |
| `pnpm update:google-wallet-class` | Update Google Wallet class configuration |

## 🧹 Linting & Formatting

This project uses **[Biome](https://biomejs.dev/)** for fast linting and formatting.

### Running Linting

```bash
# Check for issues
pnpm lint:check

# Auto-fix issues where possible
pnpm lint:fix

# For some issues, you may need to run the following command to fix them:
pnpm lint:fix:unsafe

```

Do note that we have a pre-commit hook set up using Lefthook to automatically run linting and formatting before each commit. This helps maintain code quality and consistency. Therefore, it should be rare that you need to run these commands manually.

## 💻 IDE Setup

### VS Code (Recommended)

If you are using `VSCode`, extensions will be recommended to you (namely Biome's extension). You can open the extensions sidebar and install the recommended extensions. VSCode files have already been set up as part of the repository and will assist with Biome formatting.

Otherwise, you are responsible for figuring out how to configure those plugins for yourself. We encourage you to contribute any configuration files back to the repository to help others.

## 📝 Type Generation

This project uses Payload CMS's automatic type generation for type-safe database operations.

```bash
pnpm --filter @uoacs/website types:generate
```

This will create/update:

- `apps/website/src/payload/payload-types.ts` - Auto-generated TypeScript interfaces
- Never edit this file manually - it's regenerated automatically

## 🏗️ Project Structure

This is a pnpm workspace orchestrated by [Turborepo](https://turborepo.com/), so UOACS apps can share
branding and UI without duplicating them.

```
apps/
└── website/                     # The main UOACS website (@uoacs/website)
    ├── src/
    │   ├── app/
    │   │   ├── (frontend)/      # Public website pages (homepage, team, sponsors, etc.)
    │   │   │   ├── _components/ # Frontend-only components
    │   │   │   ├── page.tsx     # Homepage
    │   │   │   └── layout.tsx   # Frontend layout
    │   │   ├── api/             # Custom API routes
    │   │   ├── og/              # Open Graph image generation
    │   │   ├── payload/         # Payload CMS admin panel
    │   │   ├── robots.ts        # robots.txt generation
    │   │   └── sitemap.ts       # Sitemap generation
    │   ├── components/
    │   │   ├── Composite/       # Page-level components (Navbar, Footer, sections, etc.)
    │   │   └── Generic/         # Reusable feature components
    │   ├── lib/                 # Auth, wallet, payload, and utility helpers
    │   ├── payload/
    │   │   ├── collections/     # CMS collections (Members, Executives, Sponsors, Media, etc.)
    │   │   ├── globals/         # Global settings (HomePage, SocialLinks, etc.)
    │   │   ├── components/      # Custom Payload UI components
    │   │   ├── hooks/           # Payload lifecycle hooks
    │   │   └── payload-types.ts # Auto-generated types (do not edit)
    │   ├── queries/             # React Query hooks
    │   ├── services/            # Business logic and external service integrations
    │   ├── types/               # Shared TypeScript types, enums, and Zod schemas
    │   ├── mocks/               # Mock data for development/testing
    │   ├── scripts/             # Standalone maintenance scripts
    │   └── payload.config.ts    # Payload CMS configuration
    ├── .storybook/              # Storybook configuration
    ├── generators/              # Plop templates for scaffolding components
    ├── public/                  # Static assets (SVGs, fonts, images)
    ├── Dockerfile               # Built from the repo root, not this directory
    ├── fly.toml                 # Fly.io production deployment config
    └── fly.staging.toml         # Fly.io staging deployment config

packages/
├── ui/                          # Shared design system (@uoacs/ui)
│   └── src/
│       ├── Primitive/           # Low-level UI blocks (Button, Input, Select, etc.)
│       ├── hooks/               # Hooks backing the primitives
│       ├── utils/               # cn() class-merging helper
│       └── styles/theme.css     # Brand tokens and typography
└── config/                      # Shared tsconfig bases (@uoacs/config)

.github/
├── actions/                     # Reusable composite actions for use in workflows
├── ISSUE_TEMPLATE/              # Issue templates (frontend, backend, devops, bug)
├── workflows/                   # CI/CD pipelines (lint, build, deploy, renovate)
└── pull-request-template.md     # PR template

package.json                     # Root tooling and Turborepo entrypoints
pnpm-workspace.yaml              # Workspace package globs
turbo.json                       # Task graph and caching
biome.json                       # Biome linter configuration
lefthook.yaml                    # Git hooks configuration
```

### Where should a component go?

- **`packages/ui` (Primitive)** — generic, brand-level building blocks with no app-specific
  dependencies. Anything here is available to every UOACS app.
- **`apps/*/src/components` (Generic / Composite)** — anything that depends on that app's Payload
  types, routes, or auth session.

`pnpm --filter @uoacs/website code:generate` scaffolds into the right place based on the tier you pick.

## 🧪 Testing

### Storybook Component Testing

```bash
# Start Storybook
pnpm storybook
```

### Component Development

- Write stories for components in `*.stories.tsx` files
- Use Storybook for isolated component development

## 🚀 Tech Stack

### Core Framework

- **[Next.js](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[React](https://react.dev/)** - UI library with latest concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Content Management

- **[Payload CMS](https://payloadcms.com/)** - Headless CMS with admin panel
- **[MongoDB](https://www.mongodb.com/)** - Document database via Mongoose adapter

### Authentication

- **[Better Auth](https://www.better-auth.com/)** - TypeScript-first auth
- **[Payload CMS Built-in Auth](https://payloadcms.com/docs/authentication/overview)** - Auth management via Payload CMS for Admin users

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** - Form state management and schema validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight client state management
- **[Motion](https://motion.dev/)** - Animations

### Integrations

- **[AWS S3](https://aws.amazon.com/s3/)** - Media asset storage via `@payloadcms/storage-s3`
- **[Resend](https://resend.com/)** - Transactional email via `@payloadcms/email-resend`
- **[Google Wallet](https://developers.google.com/wallet)** - Membership pass generation and management

### Development & Testing

- **[Storybook](https://storybook.js.org/)** - Component development environment
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Lefthook](https://lefthook.dev/)** - Git hooks manager

### Deployment

- **[Fly.io](https://fly.io/)** - Production and staging environments
- **[Docker](https://www.docker.com/)** - Containerised builds via standalone Next.js output

### Package Management

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 📚 Learn More

### Framework Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Development Tools

- [Storybook Docs](https://storybook.js.org/docs)
- [Biome Documentation](https://biomejs.dev/guides/getting-started/)
- [Lefthook Documentation](https://lefthook.dev/)

## 🤝 Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.
