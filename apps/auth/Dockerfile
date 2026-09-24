# syntax=docker/dockerfile:1.23
# Build context is the monorepo root, not this directory.
FROM node:24.18.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

LABEL fly_launch_runtime="Next.js"

RUN corepack enable pnpm

# Stage 1: Prune the workspace down to @uoacs/auth and its dependencies
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Root manifests only. This install exists to get turbo at the version the
# lockfile pins, so it should cache on dependency changes, not source changes.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts --filter uoacs-monorepo
COPY . .
# --docker splits the output in two: out/json holds every workspace manifest in
# its original directory layout beside a pruned lockfile, out/full holds their
# sources. Turbo discovers the packages, so adding one needs no change here.
RUN pnpm turbo prune @uoacs/auth --docker

# Stage 2: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Manifests only, so this layer caches on dependency changes rather than on
# every application source change.
COPY --from=pruner /app/out/json/ ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Stage 3: Build the application
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Carry over the whole installed tree rather than naming each package's
# node_modules, so adding a workspace package doesn't silently break the build.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages
# Sources merge in on top of the installed node_modules. out/full carries the
# workspace root files the build needs (package.json, turbo.json,
# pnpm-workspace.yaml) alongside each in-scope package.
COPY --from=pruner /app/out/full/ ./

ENV NODE_ENV=production

# Each secret must be present and non-empty, so a missing value fails the
# build instead of being compiled in as an empty string.
RUN --mount=type=secret,id=DATABASE_URI,required=true \
    --mount=type=secret,id=PAYLOAD_SECRET,required=true \
    --mount=type=secret,id=NEXT_PUBLIC_AUTH_URL,required=true \
    sh -euc 'for name in DATABASE_URI PAYLOAD_SECRET NEXT_PUBLIC_AUTH_URL; do \
               value=$(cat "/run/secrets/$name"); \
               [ -n "$value" ] || { echo "Build secret $name is empty" >&2; exit 1; }; \
               export "$name=$value"; \
             done; \
             pnpm --filter @uoacs/auth build'

# Stage 4: Production runner (minimal image)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Standalone output mirrors the workspace layout beneath outputFileTracingRoot,
# so it unpacks to /app/apps/auth/server.js with /app/node_modules alongside.
COPY --from=builder /app/apps/auth/.next/standalone ./
# Copy static assets
COPY --from=builder /app/apps/auth/.next/static ./apps/auth/.next/static

EXPOSE 3000

# Standalone output provides server.js entrypoint
CMD ["node", "apps/auth/server.js"]
