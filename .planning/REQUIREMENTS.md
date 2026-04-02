# Requirements: Better Auth + Member Authentication

**Defined:** 2026-04-02
**Core Value:** Club members can log in to the website using the email they signed up with — and existing members can claim their account without creating a duplicate membership.

## v1 Requirements

### Infrastructure

- [ ] **INFRA-01**: Rename Payload `User` collection to `Admin` (slug: `admin`, `dbName: "users"` to preserve existing MongoDB data)
- [ ] **INFRA-02**: Install `better-auth` and `mongodb` as direct dependencies
- [ ] **INFRA-03**: Shared `MongoClient` instance exported from `src/lib/mongo.ts` for use by Better Auth
- [ ] **INFRA-04**: Better Auth server config at `src/lib/auth.ts` — MongoDB adapter, email+password enabled, same DB as Payload
- [ ] **INFRA-05**: Better Auth React client at `src/lib/auth-client.ts`
- [ ] **INFRA-06**: Better Auth API catch-all route at `src/app/api/auth/[...all]/route.ts`
- [ ] **INFRA-07**: Middleware scaffolded at `src/middleware.ts` with empty matcher (no route protection yet)

### Member Collection

- [ ] **MEMB-01**: Add nullable `betterAuthUserId` text field to Member collection (unique, readOnly in admin)

### Sign-Up Flow

- [ ] **SGUP-01**: Sign-up wizard Step 1 — user enters email; system checks Member collection for a match
- [ ] **SGUP-02**: Sign-up wizard Step 2 (new members only) — member profile fields (name, student number, degree, etc.)
- [ ] **SGUP-03**: Sign-up wizard Step 3 — password and confirm password entry (min 8 chars, must match)
- [ ] **SGUP-04**: "No match" prompt displayed when email not found — "Already a member? Contact the committee to link your account." with option to proceed as new member
- [ ] **SGUP-05**: Sign-up API creates Better Auth user + new Payload Member atomically for new members
- [ ] **SGUP-06**: Sign-up API links existing Member (`betterAuthUserId`) when email matches existing record — skips Member creation
- [ ] **SGUP-07**: Sign-up API deletes Better Auth user and returns 500 if Payload Member creation fails (no silent orphans)

### Login

- [ ] **AUTH-01**: Login page at `/login` with email + password form (react-hook-form + Zod, follows SignUpForm patterns)
- [ ] **AUTH-02**: Successful login redirects to home
- [ ] **AUTH-03**: `Routes.LOGIN = "/login"` added to `src/lib/routes.ts`

### Navigation

- [ ] **NAV-01**: Navbar shows "Login" link when user is not authenticated
- [ ] **NAV-02**: Navbar shows display name + "Logout" button when user is authenticated
- [ ] **NAV-03**: Logout clears Better Auth session and redirects to home

## v2 Requirements

### Route Protection

- **PROT-01**: Middleware checks Better Auth session cookie and redirects unauthenticated users from protected routes
- **PROT-02**: Members-only area (profile page or dashboard) gated behind authentication

### Account Management

- **ACCT-01**: Member can change their password
- **ACCT-02**: Member can update their email address
- **ACCT-03**: Email verification flow after sign-up

### Admin Tools

- **ADMIN-01**: Committee can manually link a Better Auth user to an existing Member record (for edge cases where emails don't match)

## Out of Scope

| Feature | Reason |
|---------|--------|
| OAuth / social login | Email + password sufficient for v1 |
| Student ID as membership lookup key | No uniqueness guarantee, easy to misspell |
| Email verification on sign-up | Adds friction; v2 when route protection needs it |
| Role-based access control | No protected routes in this milestone |
| Mobile app / push notifications | Web-first |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 1 | Pending |
| INFRA-06 | Phase 1 | Pending |
| INFRA-07 | Phase 1 | Pending |
| MEMB-01 | Phase 1 | Pending |
| SGUP-01 | Phase 2 | Pending |
| SGUP-02 | Phase 2 | Pending |
| SGUP-03 | Phase 2 | Pending |
| SGUP-04 | Phase 2 | Pending |
| SGUP-05 | Phase 2 | Pending |
| SGUP-06 | Phase 2 | Pending |
| SGUP-07 | Phase 2 | Pending |
| AUTH-01 | Phase 3 | Pending |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Pending |
| NAV-01 | Phase 3 | Pending |
| NAV-02 | Phase 3 | Pending |
| NAV-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-02*
*Last updated: 2026-04-02 after initial definition*
