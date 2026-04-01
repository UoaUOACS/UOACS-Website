# Coding Conventions

**Analysis Date:** 2026-04-02

## Naming Patterns

**Files:**
- PascalCase for component files: `BorderButton.tsx`, `Input.tsx`, `SignUpForm.tsx`
- camelCase for utility/helper files: `utils.ts`, `helpers.ts`, `payload.ts`, `constants.ts`, `routes.ts`
- `.stories.tsx` suffix for Storybook files: `BorderButton.stories.tsx`, `Input.stories.tsx`
- `.mock.ts` suffix for mock data files: `Executive.mock.ts`, `Sponsor.mock.ts`

**Functions:**
- camelCase for all function and variable names: `getSocialLinks()`, `cn()`, `createMemberSchema`
- Async functions named with action verbs: `getSocialLinks()`, `findGlobal()`, `create()`
- Event handlers prefixed with `on`: `onSubmit()`, `onChange()`

**Variables:**
- camelCase for all variables and constants: `isCompsciStudent`, `resolvedReels`, `mockExecutive`
- UPPERCASE for enum values: `SponsorTier.DIAMOND`, `ExecutiveLevel.PRESIDENT`
- Const assertions for read-only arrays: `SPONSOR_TIER_ORDER`, `EXECUTIVE_LEVEL_ORDER`

**Types:**
- PascalCase for interfaces and types: `BorderButtonProps`, `InputProps`, `Value`, `Executive`
- Suffix with `Props` for component prop interfaces: `BorderButtonProps`, `InputProps`
- Discriminated unions used for variants: `BorderButtonVariantProps`

**Enums:**
- PascalCase for enum names: `SponsorTier`, `ExecutiveTeam`, `ExecutiveLevel`, `ValueColour`
- UPPERCASE for enum variants: `DIAMOND`, `GOLD`, `SILVER`

## Code Style

**Formatting:**
- Tool: Biome 2.4.6
- Indentation: 2 spaces
- Line ending: LF
- Line width: 100 characters
- Semicolons: asNeeded (no semicolons required)

**Linting:**
- Tool: Biome (enabled for JavaScript and React)
- JSX quote style: double quotes
- Trailing commas: all (in multiline constructs)
- Arrow parentheses: always (even for single params)

**Key Rules:**
- `noUnusedVariables`: error - all variables must be used
- `noUnusedImports`: error - all imports must be used
- `noExplicitAny`: warn - avoid any types
- `noParameterAssign`: error - don't reassign function parameters
- `useAsConstAssertion`: error - use `as const` for literal types
- `useDefaultParameterLast`: error - default params must come after required params
- `useSelfClosingElements`: error - self-close empty JSX elements
- `useSingleVarDeclarator`: error - one variable declaration per line
- `useConsistentCurlyBraces`: error - require consistent braces in control flow

## Import Organization

**Order:**
1. External libraries (React, Next.js, third-party packages)
2. Relative imports from other parts of the codebase
3. Type imports marked with `type` keyword

**Pattern:**
```typescript
import { cn } from "@/lib/utils"
import type { BorderButtonVariantProps } from "./variants"
import { borderButtonVariants } from "./variants"
```

**Path Aliases:**
- `@/*` → `./src/*` - Primary alias for all internal modules
- `@payload-config` → `./src/payload.config.ts` - Special alias for Payload config

**Re-exports:**
- Barrel files (`index.ts`) used to export all components from a directory
- Example: `src/components/Primitive/index.ts` exports all primitive components

## Error Handling

**Patterns:**
- Try-catch blocks for async operations in route handlers and client-side functions
- Specific error type checks: `if (err instanceof ValidationError)`
- Payload ValidationError used for database/validation errors
- Generic error messages returned to client to prevent information leakage

Example from `src/app/api/sign-up/route.ts`:
```typescript
try {
  const createdMember = await payload.create({
    collection: "member",
    data: member,
  })
  return new Response(JSON.stringify(createdMember), { status: 201 })
} catch (err) {
  if (err instanceof ValidationError && err.data?.errors?.some(...)) {
    return new Response(JSON.stringify({ error: "Value already in use" }), { status: 409 })
  }
  throw err
}
```

## Logging

**Framework:** console (no dedicated logging library)

**Patterns:**
- No explicit logging patterns in codebase - developers use console methods as needed
- Error logging handled through exception throwing in API routes

## Comments

**When to Comment:**
- JSDoc comments used for public exports and function parameters
- Inline comments rare - code is self-documenting through clear naming
- File-level documentation in interfaces and component exports

**JSDoc/TSDoc:**
- Used extensively on component props and public functions
- Format: `/** ... */` with description lines starting with `*`
- Parameter documentation using `@param` tags
- Return documentation rarely used (types are self-documenting)

Example from `src/components/Primitive/BorderButton/BorderButton.tsx`:
```typescript
/**
 * Props for the {@link BorderButton} component.
 */
export interface BorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button to live in the middle of the button.
   */
  children: React.ReactNode
  /**
   * Variant configuration for the button.
   */
  variant?: BorderButtonVariantProps
}

/**
 * A primitive Button component that supports various themes, sizes, and border options.
 *
 * @param props {@link BorderButtonProps} for the Button component.
 * @returns A styled button element.
 */
export const BorderButton = ({ ... }: BorderButtonProps) => { ... }
```

## Function Design

**Size:** Functions are kept small and focused, typically under 50 lines

**Parameters:**
- Destructured from props objects in React components
- Typed using interfaces extending component base types
- Rest parameters (`...props`) used to pass through HTML attributes

**Return Values:**
- React components return JSX elements
- Async functions return Promises
- Utility functions return simple values or objects

Example pattern from `src/components/Primitive/Input/Input.tsx`:
```typescript
export const Input = ({
  label,
  error,
  containerClassName,
  className,
  required,
  ref,
  ...props
}: InputProps) => { ... }
```

## Module Design

**Exports:**
- Named exports used for all components and utilities
- Default exports used only in Storybook stories (`export default meta`)
- Types exported with `export type` or `export interface`

**Structure:**
- Components grouped by type: `Primitive/`, `Composite/`, `Generic/`
- Each component typically in its own directory with accompanying files
- Styles co-located or defined via Tailwind utilities

**Barrel Files:**
- Used to simplify imports: `export * from "./Component"`
- Example: `src/components/Primitive/index.ts` exports all primitives
- Reduces import depth when consuming multiple components

## Special Patterns

**React Hook Form Integration:**
- `useForm` with Zod schema validation via `zodResolver`
- `Controller` wrapper for custom components
- Form state destructured: `control`, `register`, `handleSubmit`, `watch`, `formState`

**Type Safety:**
- Zod schemas used for runtime validation and type inference
- `z.input<T>` and `z.output<T>` used for form input/output types
- `satisfies` keyword used to ensure types match: `memberSchema satisfies z.ZodType<Member>`

**Next.js Patterns:**
- Server Components (default) for data fetching and layout
- `"use client"` directive for interactive components
- Dynamic metadata via `export const metadata: Metadata = { ... }`
- Promise.all for concurrent async operations

---

*Convention analysis: 2026-04-02*
