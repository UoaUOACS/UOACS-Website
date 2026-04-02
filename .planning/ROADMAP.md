# Roadmap: Better Auth + Member Authentication

## Overview

This milestone adds member-facing authentication to the UOACS website. Phase 1 lays the foundation — renaming the Payload User collection, wiring up Better Auth, and updating the Member data model. Phase 2 replaces the single-page sign-up form with a multi-step wizard that handles both new members and existing members claiming their account. Phase 3 delivers the login page and a session-aware navbar so members can see their authenticated state from every page.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Rename Admin collection, install Better Auth, wire up shared MongoDB client and lib files, scaffold middleware
- [ ] **Phase 2: Sign-Up Flow** - Multi-step wizard that handles new members and existing member account claiming
- [ ] **Phase 3: Login + Navigation** - Login page and session-aware navbar

## Phase Details

### Phase 1: Foundation
**Goal**: Better Auth is installed and configured; the Admin/User collection rename is complete; all shared infrastructure files exist and the app still runs
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, MEMB-01
**Success Criteria** (what must be TRUE):
  1. Payload admin panel loads at `/payload/admin` and existing admin accounts still work (collection rename did not destroy data)
  2. Better Auth API route responds at `/api/auth/*` — a request to the health or session endpoint returns a valid response
  3. `src/lib/auth.ts`, `src/lib/auth-client.ts`, and `src/lib/mongo.ts` exist with no TypeScript errors
  4. Member collection has a `betterAuthUserId` field visible (read-only) in the Payload admin
  5. `src/middleware.ts` exists with an empty matcher and does not break any existing routes
**Plans**: TBD

### Phase 2: Sign-Up Flow
**Goal**: Members can complete registration through a multi-step wizard — new members create a full profile, existing members claim their account by email
**Depends on**: Phase 1
**Requirements**: SGUP-01, SGUP-02, SGUP-03, SGUP-04, SGUP-05, SGUP-06, SGUP-07
**Success Criteria** (what must be TRUE):
  1. A new member can enter their email, fill in their profile, set a password, and end up with both a Better Auth user and a Payload Member record linked by `betterAuthUserId`
  2. An existing member enters their email, skips the profile step, sets a password, and has their existing Member record updated with the new `betterAuthUserId`
  3. When an email has no match, the wizard shows the "Already a member? Contact the committee" prompt and still lets the user proceed as a new member
  4. If the Payload Member creation fails after the Better Auth user is created, the Better Auth user is deleted and a 500 is returned — no orphaned auth records exist
**Plans**: TBD

### Phase 3: Login + Navigation
**Goal**: Members can log in with email and password and see their authenticated state reflected in the navbar from every page
**Depends on**: Phase 2
**Requirements**: AUTH-01, AUTH-02, AUTH-03, NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. A member can visit `/login`, enter their email and password, and be redirected to the home page on success
  2. An incorrect password or unknown email shows a visible error — the member is not redirected
  3. When logged out, the navbar shows a "Login" link pointing to `/login`
  4. When logged in, the navbar shows the member's display name and a "Logout" button
  5. Clicking "Logout" clears the session and returns the member to the home page with the navbar back in logged-out state
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Sign-Up Flow | 0/? | Not started | - |
| 3. Login + Navigation | 0/? | Not started | - |
