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

Copy the example environment file at `.env.example` to `.env` and update the variables as needed:

```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/payload/admin](http://localhost:3000/payload/admin)

## 🔧 Important Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build production application |
| `pnpm lint:check` | Run Biome linter and formatter checks |
| `pnpm lint:fix` | Fix Biome lint and format issues |
| `pnpm lint:fix:unsafe` | Unsafely Fix Biome lint and format issues |
| `pnpm types:check` | Run TypeScript type checking |
| `pnpm types:generate` | Generate Payload CMS TypeScript types |
| `pnpm storybook` | Start Storybook development server |

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
pnpm generate:types
```

This will create/update:

- `src/payload/payload-types.ts` - Auto-generated TypeScript interfaces
- Never edit this file manually - it's regenerated automatically

## 🏗️ Project Structure

File structure overview:

```
src/
├── app/
│   ├── (frontend)/          # Public website pages
│   │   ├── (route)/         # Example route group
│   │   ├── page.tsx         # Homepage
│   │   └── layout.tsx       # Main layout
│   ├── payload/             # Payload CMS admin
│   │   ├── admin/           # Admin panel
│   │   ├── api/             # API routes
│   │   └── layout.tsx       # Admin layout
│   ├── api/                 # Custom API routes
│   │   ├── (route)/         # Example API route
├── components/              # Reusable React components
├── lib/                     # Utility functions and helpers
├── payload/
│   ├── collections/         # Payload collections (Users, Media)
│   └── payload-types.ts     # Generated types
├── payload.config.ts        # Payload CMS configuration
└── ...

.storybook/                  # Storybook configuration
public/                      # Static assets

package.json                 # Project metadata and scripts
next.config.js               # Next.js configuration
tsconfig.json                # TypeScript configuration
biome.json                   # Biome linter configuration
lefthook.yaml                # Git hooks configuration
```

Feel free to expand this structure as needed for the project.

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

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Development & Testing

- **[Storybook](https://storybook.js.org/)** - Component development environment
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Lefthook](https://lefthook.dev/)** - Git hooks manager

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
