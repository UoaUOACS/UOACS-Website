# @uoacs/ui

The UOACS design system, shared by every app: brand tokens, fonts, and primitive components built with
Tailwind CSS and [tailwind-variants](https://www.tailwind-variants.org/).

The package ships raw TypeScript and CSS — there's no build step. Apps compile it by listing it in
`transpilePackages` in their `next.config.ts`.

## Usage

Add it to an app:

```json
"dependencies": {
  "@uoacs/ui": "workspace:*"
}
```

Import the styles in the app's global stylesheet. `cartograph.css` must come before the Tailwind import
because it carries a remote `@import`:

```css
@import "@uoacs/ui/styles/cartograph.css";
@import "tailwindcss";
@import "@uoacs/ui/styles/theme.css";
@import "@uoacs/ui/styles/rich-text.css"; /* only if you render rich text */
```

`theme.css` also tells Tailwind to scan this package (`@source`), so classes used only inside `@uoacs/ui`
aren't purged.

Then use the components:

```tsx
import { Button, Dialog, Input } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { toast, Toaster } from "@uoacs/ui/toast"
```

## Exports

| Entry point | Contents |
|-------------|----------|
| `@uoacs/ui` | Components (see below) |
| `@uoacs/ui/utils` | `cn()` — merges class names with `clsx` + `tailwind-merge` |
| `@uoacs/ui/toast` | `toast` API and `<Toaster />`. Mount `<Toaster />` once or `toast()` does nothing |
| `@uoacs/ui/styles/theme.css` | Brand colour tokens, typography and Tailwind theme |
| `@uoacs/ui/styles/fonts.css` | Self-hosted font faces (Inter Tight, Switzer, IBM Plex Mono, Neulis Cursive) |
| `@uoacs/ui/styles/cartograph.css` | Cartograph font from Adobe Fonts |
| `@uoacs/ui/styles/rich-text.css` | `rich-text` utility for Payload / Lexical rich text |

## Components

AnimatedSuspense, BorderButton, Button, Container, Dialog, Dropdown, EmptyState, FileUpload, Heading,
Icons, Input, LazyImage, MultiSelect, Pagination, PinInput, Radio, RichTextEditor (Lexical), Section,
Select, Skeleton, TextArea, Toast.

Each lives in `src/components/<Name>/` with its component, variants and a Storybook story, and is
re-exported from `src/components/index.ts`.

## What belongs here

Generic, brand-level building blocks with **no app-specific dependencies** — no Payload types, app
routes or auth session. If a component needs any of those, keep it in the app.

## Storybook

This package has no Storybook of its own. Its stories are picked up by the website (port 6006) and
playground (port 6008) Storybooks:

```bash
pnpm --filter @uoacs/website storybook
```

## Scripts

| Command | Description |
|---------|-------------|
| `types:check` | Type check with `tsc` |
