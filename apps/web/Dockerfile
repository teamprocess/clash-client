# syntax=docker/dockerfile:1.7

############################
# 1) deps (install only)
############################
FROM node:24-alpine AS deps
WORKDIR /app

# pnpm 활성화
RUN corepack enable

# 의존성 캐시를 위해 lockfile 먼저 복사
COPY package.json pnpm-lock.yaml ./
# (워크스페이스/설정 파일 쓰면 필요할 수 있음)
# COPY pnpm-workspace.yaml ./
# COPY .npmrc ./

RUN pnpm install --frozen-lockfile


############################
# 2) build (vite build)
############################
FROM node:24-alpine AS build
WORKDIR /app

RUN corepack enable

# node_modules 재사용 (빌드 캐시 효율↑)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 소스 복사
COPY . .

# ✅ GitHub Secret(.env 통째)를 빌드 순간에만 주입
# - 이 파일은 빌드 중에는 존재하지만, 이미지 레이어에 저장되지 않음
# - Vite는 기본적으로 mode=production으로 빌드하며 .env를 읽는다
RUN --mount=type=secret,id=frontend_env,target=/app/.env \
    pnpm run build


############################
# 3) runtime (static serve)
############################
FROM node:24-alpine AS runtime
WORKDIR /app

RUN npm i -g serve

# Vite 산출물(dist)
COPY --from=build /app/dist ./dist

# 너가 기존에 5173 쓰던 흐름 유지
EXPOSE 5173
CMD ["serve", "-s", "/app/dist", "-l", "5173"]
