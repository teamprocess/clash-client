# Clash Client

학습 기록 기반 경쟁 서비스 **Clash**의 Electron 데스크톱 클라이언트입니다.

## 목차

1. 프로젝트 개요
2. 기술 스택
3. 아키텍처
4. 디렉토리 구조
5. 시작하기
6. 환경변수
7. 주요 스크립트
8. 개발 규칙
9. 커밋 컨벤션

## 프로젝트 개요

- **Architecture**: Electron + Renderer FSD
- **License**: AGPL-3.0-with-Commons-Clause
- **주요 기능**:
  - 학습/경쟁 데이터 시각화
  - GitHub/Electron OAuth 딥링크 로그인
  - Socket.IO 기반 실시간 기능
  - IDE 사용시간 모니터링

## 기술 스택

### Core

- Electron 39
- React 19
- TypeScript
- react-router-dom 7

### Data & State

- React Query
- Zustand
- Axios
- Socket.IO
- react-hook-form
- zod

### UI

- styled-components
- Chart.js + react-chartjs-2

### Tooling

- electron-vite
- electron-builder
- ESLint + Prettier

## 아키텍처

```text
Main Process (src/main)
  └─ BrowserWindow, IPC, deep-link(clashapp://), AppMonitor
       ↓ IPC
Preload (src/preload)
  └─ contextBridge로 window.api 노출
       ↓
Renderer (src/renderer/src)
  └─ React + FSD + Router + React Query
```

### 프로세스 역할

- `src/main`: 앱 생명주기/윈도우/IPC 핸들러 관리
- `src/preload`: Renderer에 안전한 브릿지 API 제공
- `src/renderer/src`: 화면 렌더링, 상태관리, API 호출

### 핵심 흐름

- **OAuth 딥링크**:
  1. Renderer가 `/auth/electron/*/start` 호출
  2. 외부 브라우저 인증
  3. `clashapp://`로 앱 복귀
  4. Main이 code/state를 Renderer로 전달
  5. Renderer가 `/auth/electron/*/exchange` 호출
- **AppMonitor**:
  - 2초 주기 체크
  - 5분 비활성 시 세션 종료

## 디렉토리 구조

```text
src/
├── main/                # 윈도우, IPC, 딥링크, AppMonitor
├── preload/             # contextBridge API (window.api)
└── renderer/src/
    ├── app/             # 앱 초기화, 전역 Provider, 라우팅/레이아웃
    ├── pages/           # URL 기준 페이지 단위 화면 조합
    ├── widgets/         # 페이지에서 재사용되는 큰 UI 블록
    ├── features/        # 사용자 액션 중심 기능
    ├── entities/        # 도메인 모델과 도메인 API 단위
    └── shared/          # 공통 UI, 유틸, 설정, API 인프라
```

- FSD 의존성 방향: `app -> pages -> widgets -> features -> entities -> shared`
- 하위 레이어는 상위 레이어를 import하지 않습니다.
- 코드 배치 기준:
  - 특정 페이지에서만 쓰는 조합이면 `pages`
  - 여러 페이지에서 재사용되는 상호작용이면 `features`
  - 비즈니스 도메인 데이터/타입/API면 `entities`
  - 도메인과 무관한 범용 코드는 `shared`

## 시작하기

```bash
pnpm install
cp .env.example .env
pnpm dev
```

개발 서버는 `https://local.clash.kr:5173`을 사용합니다.
필요 시 `/etc/hosts`에 아래를 추가하세요.

```text
127.0.0.1 local.clash.kr
```

## 주요 스크립트

```bash
# 개발
pnpm dev

# 정적 검사
pnpm lint
pnpm typecheck

# 빌드
pnpm build:mac
```

## 개발 규칙

- Renderer import는 `@/` alias 사용 (`@/* -> src/renderer/src/*`)
- FSD 의존성 방향 유지: `app -> pages -> widgets -> features -> entities -> shared`
- 스타일은 `styled-components` + theme token 우선
- API 호출은 `src/renderer/src/shared/api/axios.ts` 인스턴스 사용
- 401 응답 기본 동작은 `#/sign-in` 리다이렉트(인증 시작/교환 API 예외)

## 커밋 컨벤션

형식: `{type}: {subject}`

허용 type:
`feat`, `fix`, `hotfix`, `docs`, `style`, `refactor`, `test`, `chore`, `revert`, `delete`

**마지막 업데이트**: 2026-02-18
