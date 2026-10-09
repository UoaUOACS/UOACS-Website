# @uoacs/config

Shared TypeScript configuration for the UOACS monorepo.

## tsconfig bases

| File | Extends | Use for |
|------|---------|---------|
| `tsconfig/base.json` | — | Strict settings every package shares (`moduleResolution: bundler`, `jsx: react-jsx`, `noEmit`) |
| `tsconfig/next.json` | `base.json` | Next.js apps — adds the `next` TypeScript plugin |
| `tsconfig/react-library.json` | `base.json` | Internal libraries such as `@uoacs/ui` and `@uoacs/shared` |

## Usage

Add it as a dev dependency:

```json
"devDependencies": {
  "@uoacs/config": "workspace:*"
}
```

Then extend a base in the package's `tsconfig.json`:

```json
{
  "extends": "@uoacs/config/tsconfig/next.json",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

Keep app-specific settings such as `paths` and `include` in the app's own `tsconfig.json`.

Linting and formatting are configured once at the repository root in `biome.json`, not here.
