# syntax=docker/dockerfile:1.23
ARG NODE_VERSION=24.12.0
FROM node:${NODE_VERSION}-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

LABEL fly_launch_runtime="Next.js"

RUN corepack enable pnpm

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Build the application
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
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
           pnpm run build'

# Stage 3: Production runner (minimal image)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone server output
COPY --from=builder /app/.next/standalone ./
# Copy static assets
COPY --from=builder /app/.next/static ./.next/static
# Copy public assets
COPY --from=builder /app/public ./public

EXPOSE 3000

# Standalone output provides server.js entrypoint
CMD ["node", "server.js"]