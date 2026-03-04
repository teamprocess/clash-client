# Clash Monorepo

## Workspace

- apps/mac: Electron macOS client
- apps/web: Web frontend
- packages/design-tokens: shared design tokens (theme, palette, typography)
- packages/tsconfig: Shared TypeScript config presets
- packages/eslint-config: Shared ESLint flat config presets

## Commands

- `pnpm install`
- `pnpm dev` (전체 워크스페이스 동시 개발)
- `pnpm dev:mac` (mac 앱 개발 서버)
- `pnpm dev:web` (web 앱 개발 서버)
- `pnpm build` (전체 빌드)
- `pnpm build:mac` (mac 앱 빌드)
- `pnpm build:web` (web 앱 빌드)
- `pnpm release:mac` (mac 로컬 릴리즈 빌드/패키징)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
