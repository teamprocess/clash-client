# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS deps
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/design-tokens/package.json ./packages/design-tokens/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

RUN pnpm install --frozen-lockfile --filter @clash/web...

FROM node:24-alpine AS build
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/ ./
COPY apps/web ./apps/web
COPY packages/design-tokens ./packages/design-tokens
COPY packages/eslint-config ./packages/eslint-config
COPY packages/tsconfig ./packages/tsconfig

RUN --mount=type=secret,id=frontend_env,target=/app/apps/web/.env \
    pnpm --filter @clash/web build

FROM node:24-alpine AS runtime
WORKDIR /app

RUN npm i -g serve

COPY --from=build /app/apps/web/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "/app/dist", "-l", "5173"]
