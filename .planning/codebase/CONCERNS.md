# Codebase Concerns

**Analysis Date:** 2026-04-02

## Tech Debt

**Video Compression Revertion:**
- Issue: Multiple reverts of video compression feature (commit 70f6f26, db7f4d7, 0ae59b7, 3c51828, 60b4716) indicate instability with media processing. Initial attempt caused issues requiring emergency rollback, followed by OOM (Out of Memory) mitigation attempts that still failed.
- Files: `src/payload/collections/Media.ts`, upload configuration in `src/payload.config.ts`
- Impact: Media upload feature is disabled. Videos are not compressed before storage, leading to higher bandwidth costs and slower user experience. Original feature development blocked indefinitely.
- Fix approach: Before reimplementing compression, profile memory usage in production environment (Fly.io). Consider using streaming processor instead of in-memory operations, implement chunked processing, or use dedicated image processing service (Cloudinary, ImageKit).

**Deprecated Component Still in Use:**
- Issue: `ValuesCarousel` component marked `@deprecated` with instruction to use `ValuesAccordion` instead (line 13-14 of `src/components/Composite/ValuesCarousel/ValuesCarousel.tsx`)
- Files: `src/components/Composite/ValuesCarousel/ValuesCarousel.tsx`
- Impact: Creates maintenance burden with two parallel implementations. Future updates need to be applied to both. Increases codebase complexity.
- Fix approach: Migrate all usages to `ValuesAccordion`, verify visual parity, then delete `ValuesCarousel.tsx` entirely.

**Missing Environment Variables Fallbacks:**
- Issue: Payload secret and database URI use empty string fallbacks in `src/payload.config.ts` (lines 42, 47)
  - `secret: process.env.PAYLOAD_SECRET || ""`
  - `url: process.env.DATABASE_URI || ""`
- Files: `src/payload.config.ts`
- Impact: If environment variables are missing, Payload will initialize with invalid/empty configuration. Database connections will silently fail with unclear errors. Secrets configuration will be compromised.
- Fix approach: Replace empty string fallbacks with explicit error throws. Validate environment at startup using a validation schema (Zod). Log missing required environment variables during build/startup.

## Performance Bottlenecks

**Unoptimized Video Autoplay:**
- Problem: Multiple `<video>` elements in Reel components use `autoPlay` attribute (`src/components/Composite/Reel/Reel.tsx`, line 38). When multiple reels are visible on carousel, all videos autoplay simultaneously.
- Files: `src/components/Composite/Reel/Reel.tsx`
- Cause: No visibility detection or preloading strategy. Browser loads and plays all visible videos immediately.
- Improvement path: Implement `IntersectionObserver` to only autoplay videos when they enter viewport. Use `loading="lazy"` attribute. Consider using `<picture>` element with poster frames to reduce initial payload.

**Payload Type Generation Large File:**
- Problem: Generated `src/payload/payload-types.ts` file is 1002 lines. This is an auto-generated file that should not be manually edited.
- Files: `src/payload/payload-types.ts`
- Cause: Payload schema complexity. File is re-generated on schema changes.
- Improvement path: Monitor file size growth. Consider splitting Payload collections into separate type modules if schema becomes more complex. This is a monitoring concern rather than an immediate fix.

**DOM Event Listeners in Multiple Components:**
- Problem: Global `document.addEventListener("mousedown")` / `document.addEventListener("touchstart")` listeners attached in:
  - `MultiSelect` component (line 44 of `src/components/Primitive/MultiSelect/MultiSelect.tsx`)
  - `Dropdown` component (lines 61-62 of `src/components/Primitive/Dropdown/Dropdown.tsx`)
  
  Each instance of these components adds listeners to document without deduplication.
- Files: `src/components/Primitive/MultiSelect/MultiSelect.tsx`, `src/components/Primitive/Dropdown/Dropdown.tsx`
- Cause: Both components independently implement click-outside-to-close pattern, resulting in multiple listeners for same event on document.
- Improvement path: Extract click-outside detection into shared hook (`useClickOutside`) to prevent listener duplication. Ensure single listener per dropdown instance.

**Mobile Navbar Resize Listener Every Render:**
- Problem: `MobileNavbar` component creates resize listener in useEffect (`src/components/Composite/Navbar/MobileNavbar/MobileNavbar.tsx`, lines 24-35) but doesn't include `isOpen` in dependency array.
- Files: `src/components/Composite/Navbar/MobileNavbar/MobileNavbar.tsx`
- Cause: Missing dependency makes listener stale. New listeners are added on every state change without proper cleanup.
- Improvement path: Add `isOpen` to dependency array, or consider moving outside logic to separate hook. Add AbortController for more granular listener cleanup.

## Fragile Areas

**Form Error Handling Ambiguity:**
- Problem: `SignUpForm` component (`src/components/Composite/SignUpForm/SignUpForm.tsx`) has asymmetric error handling. Catches 409 conflicts with specific toast message, but all other errors (400, 500, network errors) show generic "An error occurred" message.
- Files: `src/components/Composite/SignUpForm/SignUpForm.tsx`, `src/app/api/sign-up/route.ts`
- Why fragile: API route throws unhandled errors (line 22: `throw err`). If Payload validation returns unexpected error format, the 409 detection logic (lines 16-18 of route.ts) will fail silently, and user sees generic error with no useful information.
- Safe modification: Add proper error logging on backend. Define explicit error response shapes. Test with unexpected validation error formats. Add client-side logging for debugging.
- Test coverage: No tests for error paths in SignUpForm.

**Type Safety Gap in TeamPageClient:**
- Problem: `TeamPageClient` component (`src/app/(frontend)/team/_components/TeamPageClient.tsx`) uses type coercion without validation in `toTeam` function (lines 82-87):
  ```typescript
  const toTeam = (str: string): ExecutiveTeam => {
    if (Object.values(ExecutiveTeam).includes(str as ExecutiveTeam)) {
      return str as ExecutiveTeam
    }
    throw new Error(`Invalid team: ${str}`)
  }
  ```
- Files: `src/app/(frontend)/team/_components/TeamPageClient.tsx`
- Why fragile: If `execsInTeam` filters return data with unexpected team values, or if database data is corrupted, runtime error thrown. No client-side error boundary to catch this.
- Safe modification: Add error boundary around component. Return null team value instead of throwing. Add data validation at fetch time. Log invalid teams for monitoring.
- Test coverage: No tests for invalid team data handling.

**Missing Error Boundaries:**
- Problem: No `error.tsx` files found in route directories. Server components can throw unhandled errors with no fallback UI.
- Files: `src/app/(frontend)/`, `src/app/api/`
- Cause: Error boundaries not implemented for frontend routes or API error handling.
- Impact: Any unhandled error in server component causes blank page. API errors return raw error responses instead of standardized format.
- Safe modification: Add `error.tsx` to all route segments. Wrap API responses in try-catch with standardized error format.

**Member Schema Validation Type Mismatch:**
- Problem: `Member` collection schema (`src/payload/collections/Member.ts`) defines `otherMajors` as `type: "text"` with `hasMany: true`, but form sends this as string array. Database validation relies on Payload's implicit type coercion.
- Files: `src/payload/collections/Member.ts`, `src/types/schemas/member.ts`
- Cause: Type definition should be explicit in Payload schema. Currently relies on Payload CMS internals to handle array serialization.
- Impact: If Payload version changes or validation logic updates, array handling may break.
- Safe modification: Verify Payload handles `text` type with `hasMany: true` correctly. Add explicit serialization tests. Consider using Payload's `array` type instead if available.

**Hardcoded Gender and Study Year Options:**
- Problem: Form options are hardcoded in two places:
  - `SignUpForm.tsx` (lines 129, 163-168)
  - `Member.ts` schema (lines 98-119)
  
  Options must be kept in sync manually.
- Files: `src/components/Composite/SignUpForm/SignUpForm.tsx`, `src/payload/collections/Member.ts`
- Impact: Adding new options requires changes in multiple files. Easier to miss one location and create data inconsistency.
- Safe modification: Extract options to single source of truth enum/constant. Import in both schema and form.

## Missing Critical Features

**No Input Sanitization:**
- Problem: Form inputs from `SignUpForm` sent directly to API without sanitization. Comment fields and text inputs like "heardAboutUs" accept any text.
- Files: `src/app/api/sign-up/route.ts`
- Impact: Risk of stored XSS if data is later displayed without escaping. No protection against spam/abuse.
- Recommendation: Add input sanitization middleware or use schema validation with trimming/filtering (Zod `.trim()` methods). Consider rate limiting on sign-up endpoint.

**No API Rate Limiting:**
- Problem: `/api/sign-up` endpoint has no rate limiting or CAPTCHA protection.
- Files: `src/app/api/sign-up/route.ts`
- Impact: Endpoint vulnerable to spam attacks, bot registrations, brute force email enumeration (409 response reveals if email exists).
- Recommendation: Implement rate limiting (IP-based, per-session). Add CAPTCHA (hCaptcha, reCAPTCHA) to form. Log suspicious activity.

**No Data Export/Privacy Compliance:**
- Problem: Member data is stored but no mechanism to export member data for GDPR compliance.
- Files: `src/payload/collections/Member.ts`
- Impact: If member requests their data, no automated way to provide it. Violates GDPR Article 15 (right to access).
- Recommendation: Add endpoint to export member data in standard format (JSON/CSV). Implement data deletion mechanism.

## Security Considerations

**S3 Credentials in Memory:**
- Risk: S3 credentials passed as plain objects in Payload S3 storage config (`src/payload.config.ts`, lines 60-67). Credentials visible in process memory and potentially in error logs.
- Files: `src/payload.config.ts`
- Current mitigation: Environment variables used (best practice for secret management).
- Recommendations: 
  - Use AWS IAM roles instead of access keys if running on AWS/compatible service.
  - Ensure S3 bucket has appropriate ACLs and block public access.
  - Rotate credentials regularly.
  - Add bucket versioning to protect against accidental deletions.

**Database URI in Env:**
- Risk: MongoDB connection string in environment variable may contain password in plaintext.
- Files: `src/payload.config.ts`
- Current mitigation: Likely in `.env` (not committed to git).
- Recommendations: Use connection string with IP whitelisting. Enable MongoDB authentication. Use IAM database authentication if provider supports.

**NEXT_PUBLIC_URL Fallback to Localhost:**
- Risk: In `src/app/(frontend)/layout.tsx` (line 42), `NEXT_PUBLIC_URL` falls back to `http://localhost:3000` if not set in production.
- Files: `src/app/(frontend)/layout.tsx`
- Impact: Open Graph metadata will use localhost URL in production if env not set, causing social media preview failures. Not a security risk but a deployment risk.
- Recommendation: Make NEXT_PUBLIC_URL required for production builds. Fail fast if missing.

**EventWishlist Field Name Case Mismatch:**
- Risk: Form submits `eventWishlist` but Member schema defines it as `eventWishList` (capital L) on line 134.
- Files: `src/components/Composite/SignUpForm/SignUpForm.tsx` (line 209), `src/payload/collections/Member.ts` (line 134)
- Impact: Form field will not match schema field. Data may be stored under wrong key or validation may fail silently.
- Recommendation: Standardize naming convention (camelCase vs other). Add schema validation tests to catch mismatches.

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: No test files found in `src/` directory despite test infrastructure in place (Vitest, Storybook, Playwright).
- Files: All source files lack corresponding `.test.ts` or `.spec.ts` files
- Risk: Cannot confidently refactor or optimize code. Breaking changes not caught before deployment.
- Priority: High

**API Routes Not Tested:**
- What's not tested: `/api/sign-up` error cases (malformed input, database errors, 409 conflicts)
- Files: `src/app/api/sign-up/route.ts`
- Risk: Error handling paths never executed in testing. Unknown if error responses format correctly.
- Priority: High

**Form Component Not Tested:**
- What's not tested: SignUpForm validation, error messages, async submission, loading state
- Files: `src/components/Composite/SignUpForm/SignUpForm.tsx`
- Risk: Form regressions released to production. UX bugs in form flow.
- Priority: High

**Click-Outside Behavior Not Tested:**
- What's not tested: Dropdown/MultiSelect click-outside detection, keyboard interactions
- Files: `src/components/Primitive/Dropdown/Dropdown.tsx`, `src/components/Primitive/MultiSelect/MultiSelect.tsx`
- Risk: UI becomes unresponsive or stuck open in production without detection.
- Priority: Medium

## Scaling Limits

**Payload Types File Growth:**
- Current capacity: 1002 lines for generated types
- Limit: As schema grows (more collections, fields), generated file will grow. May impact build times and IDE responsiveness.
- Scaling path: Monitor file size. Consider breaking into separate type modules per collection if > 2000 lines.

**Database Query Optimization Unknown:**
- Current: No database query optimization visible (no indexes, aggregation pipelines, or query analysis).
- Limit: As member table grows (100s of thousands of records), filters on form data may slow down without proper indexing.
- Scaling path: Add database indexes on frequently queried fields (`email` is already unique). Profile queries with production data load.

---

*Concerns audit: 2026-04-02*
