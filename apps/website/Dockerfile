# syntax=docker/dockerfile:1.23
# Build context is the monorepo root, not this directory.
FROM node:24.18.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

LABEL fly_launch_runtime="Next.js"

RUN corepack enable pnpm

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy only the workspace manifests first so this layer caches on dependency
# changes rather than on every application source change.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/website/package.json ./apps/website/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Build the application
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/website/node_modules ./apps/website/node_modules
COPY . .

RUN --mount=type=secret,id=DATABASE_URI \
    --mount=type=secret,id=PAYLOAD_SECRET \
    --mount=type=secret,id=NEXT_PUBLIC_URL \
    --mount=type=secret,id=S3_ACCESS_KEY_ID \
    --mount=type=secret,id=S3_SECRET_ACCESS_KEY \
    --mount=type=secret,id=S3_REGION \
    --mount=type=secret,id=S3_BUCKET \
    --mount=type=secret,id=NODE_ENV \
    --mount=type=secret,id=BETTER_AUTH_SECRET \
    --mount=type=secret,id=SMTP_PASS \
    --mount=type=secret,id=GOOGLE_WALLET_ISSUER_ID \
    --mount=type=secret,id=GOOGLE_WALLET_SERVICE_ACCOUNT_KEY \
    sh -c 'export DATABASE_URI=$(cat /run/secrets/DATABASE_URI) && \
           export PAYLOAD_SECRET=$(cat /run/secrets/PAYLOAD_SECRET) && \
           export NEXT_PUBLIC_URL=$(cat /run/secrets/NEXT_PUBLIC_URL) && \
           export S3_ACCESS_KEY_ID=$(cat /run/secrets/S3_ACCESS_KEY_ID) && \
           export S3_SECRET_ACCESS_KEY=$(cat /run/secrets/S3_SECRET_ACCESS_KEY) && \
           export S3_REGION=$(cat /run/secrets/S3_REGION) && \
           export S3_BUCKET=$(cat /run/secrets/S3_BUCKET) && \
           export NODE_ENV=$(cat /run/secrets/NODE_ENV) && \
           export BETTER_AUTH_SECRET=$(cat /run/secrets/BETTER_AUTH_SECRET) && \
           export SMTP_PASS=$(cat /run/secrets/SMTP_PASS) && \
           export GOOGLE_WALLET_ISSUER_ID=$(cat /run/secrets/GOOGLE_WALLET_ISSUER_ID) && \
           export GOOGLE_WALLET_SERVICE_ACCOUNT_KEY=$(cat /run/secrets/GOOGLE_WALLET_SERVICE_ACCOUNT_KEY) && \
           pnpm --filter @uoacs/website build'

# Stage 3: Production runner (minimal image)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Standalone output mirrors the workspace layout beneath outputFileTracingRoot,
# so it unpacks to /app/apps/website/server.js with /app/node_modules alongside.
COPY --from=builder /app/apps/website/.next/standalone ./
# Copy static assets
COPY --from=builder /app/apps/website/.next/static ./apps/website/.next/static
# Copy public assets
COPY --from=builder /app/apps/website/public ./apps/website/public

EXPOSE 3000

# Standalone output provides server.js entrypoint
CMD ["node", "apps/website/server.js"]
