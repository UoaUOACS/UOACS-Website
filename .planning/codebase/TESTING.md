# Testing Patterns

**Analysis Date:** 2026-04-02

## Test Framework

**Runner:**
- Vitest 4.0.18 - Primary test runner
- Config: `vitest.config.ts`
- Browser testing enabled via Playwright provider

**Assertion Library:**
- Built-in Vitest assertions

**Test Browser Provider:**
- Playwright with Chromium browser
- Headless mode enabled
- Single instance configuration

**Run Commands:**
```bash
pnpm types:check              # Type check TypeScript
pnpm test                     # Run tests (command not shown in package.json - uses default vitest)
pnpm test:watch              # Watch mode (inferred from standard Vitest setup)
pnpm test:coverage           # Coverage report (via @vitest/coverage-v8)
```

## Test File Organization

**Location:**
- No dedicated `.test.ts` or `.spec.ts` files found in repository
- All testing currently done via Storybook component stories (`.stories.tsx` files)
- Co-located with component files in same directory

**Story Files Structure:**
- 29 Storybook story files identified in `src/components/`
- Pattern: One story file per component that needs documentation/testing
- Located alongside component implementations

**Directory Pattern:**
```
src/components/Primitive/[ComponentName]/
├── [ComponentName].tsx          # Component implementation
├── [ComponentName].stories.tsx  # Storybook stories (if UI needs testing/docs)
└── variants.ts                  # Optional variant definitions
```

## Test Structure

**Suite Organization:**
```typescript
// From src/components/Primitive/Input/Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Primitive Components/Input",
  component: Input,
  args: { ... },
  argTypes: { ... },
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {}
export const WithError: Story = { args: { ... } }
export const Required: Story = { args: { ... } }
```

**Patterns:**
- Storybook Meta object defines component title and default props
- Story type aliases (`type Story = StoryObj<typeof Component>`) for cleaner exports
- Named exports for each story variant
- `argTypes` control configuration shows available props and controls

**Setup:**
- Vitest setup file: `.storybook/vitest.setup.ts`
- Storybook Vitest plugin configured in `vitest.config.ts`
- Accessibility (a11y) addon configured with "todo" level (violations shown but don't fail CI)

Example from `.storybook/vitest.setup.ts`:
```typescript
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview"
import { setProjectAnnotations } from "@storybook/nextjs-vite"
import * as projectAnnotations from "./preview"

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
```

## Mocking

**Framework:** No explicit mocking framework configured

**Patterns:**
- Mock data files with `.mock.ts` suffix: `Executive.mock.ts`, `Sponsor.mock.ts`, `Reel.mock.ts`
- Located in `src/mocks/` directory
- Structured mock objects that extend real types for consistency

Example from `src/mocks/Executive.mock.ts`:
```typescript
export const mockExecutive: Executive = {
  id: "68e390f21023fb09c6a454da",
  name: "Joshua Li",
  isCurrent: true,
  role: { ... },
  updatedAt: "2025-05-01T12:00:00Z",
  createdAt: "2024-05-01T12:00:00Z",
}

export const mockExecutiveWithPhoto: Executive = {
  ...mockExecutive,
  photo: { ... },
}
```

**Mock Patterns:**
- Spread operator used to build variations on base mock objects
- Each mock is a named export for easy reuse
- Types imported from actual Payload CMS types

**What to Mock:**
- External API responses and database entities
- Media files and photo URLs
- User data objects (executives, members, sponsors)

**What NOT to Mock:**
- React components (tested via Storybook instead)
- Utility functions (assumed to work correctly)
- Form validation logic (handled by Zod schemas)

## Fixtures and Factories

**Test Data:**
- Mock data files serve as test fixtures
- Each mock file contains multiple variations of the same entity
- Objects built using spread operator for composition

Example pattern from `src/mocks/Executive.mock.ts`:
```typescript
// Base mock
export const mockExecutive: Executive = { ... }

// Variations built from base
export const mockExecutiveWithPhoto: Executive = {
  ...mockExecutive,
  photo: { ... },
}

export const mockExecutiveWithLinkedin: Executive = {
  ...mockExecutiveWithPhoto,
  linkedin: "https://www.linkedin.com/in/joshua-li",
}

export const mockExecutiveWithLinkedinFallback: Executive = {
  ...mockExecutive,
  linkedin: "https://www.linkedin.com/in/joshua-li",
}
```

**Location:**
- `src/mocks/` directory
- Organized by entity type (Executive, Sponsor, Reel, etc.)
- Imported directly in components or stories

## Coverage

**Requirements:** Not enforced (no coverage threshold configured)

**View Coverage:**
```bash
pnpm test:coverage    # Generates coverage report via @vitest/coverage-v8
```

**Coverage Tool:**
- `@vitest/coverage-v8` installed but coverage collection not actively enforced
- Can be run manually to check coverage metrics

## Test Types

**Unit Tests:**
- Scope: Individual component functionality
- Approach: Storybook stories serve as visual unit tests
- No unit test files (`.test.ts`/`.spec.ts`) present - relying on Storybook

**Integration Tests:**
- Scope: Form submission, API integration, data flow
- Approach: Form testing via component stories with controlled inputs
- Example: `SignUpForm.tsx` form validation tested through form story variations

**E2E Tests:**
- Framework: Vitest Browser with Playwright
- Provider: Playwright + Chromium
- Scope: Full application workflows
- Not currently implemented (configuration present but no E2E test files)

## Browser Testing

**Configuration:**
- Vitest browser plugin enabled in `vitest.config.ts`
- Provider: Playwright
- Browser: Chromium
- Mode: Headless

From `vitest.config.ts`:
```typescript
test: {
  browser: {
    enabled: true,
    headless: true,
    provider: playwright(),
    instances: [{ browser: "chromium" }],
  },
}
```

## Storybook Integration

**Setup:**
- Storybook 10.2.7 with Next.js Vite integration
- Addons configured:
  - `@chromatic-com/storybook` - Visual regression testing
  - `@storybook/addon-docs` - Documentation generation
  - `@storybook/addon-onboarding` - Setup wizard
  - `@storybook/addon-a11y` - Accessibility testing
  - `@storybook/addon-vitest` - Vitest integration

**Run Commands:**
```bash
pnpm storybook              # Start Storybook dev server on port 6006
pnpm storybook:build        # Build static Storybook
```

## Testing Best Practices

**Component Stories:**
- Each story represents a distinct state or variant
- Named exports: `Primary`, `WithError`, `Required`, `Email`, etc.
- Args define default props for the story
- ArgTypes define prop controls shown in Storybook UI

**Form Testing Pattern:**
- Create story variants for different form states
- Test error states with error messages
- Test required vs optional fields
- Test different input types and options

Example from input testing:
```typescript
export const Primary: Story = {}
export const WithError: Story = {
  args: { error: "This field is required" }
}
export const Required: Story = {
  args: { required: true }
}
export const Email: Story = {
  args: { label: "Email", type: "email" }
}
```

**Accessibility Testing:**
- Storybook a11y addon configured with "todo" level
- Violations shown in test UI but don't fail CI
- Can be upgraded to "error" level to enforce strict a11y compliance

## Configuration Files

**Vitest Config:**
- Location: `vitest.config.ts`
- Storybook plugin integration via `@storybook/addon-vitest/vitest-plugin`
- Setup file: `.storybook/vitest.setup.ts`

**Storybook Config:**
- Location: `.storybook/main.ts`
- Story files: `../src/**/*.mdx` and `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Static assets: `../public`

**Storybook Preview:**
- Location: `.storybook/preview.ts`
- Global styles: `../src/app/globals.css` and `./fonts.css`
- Control matchers for props (color, date)
- A11y test level: "todo"

---

*Testing analysis: 2026-04-02*
