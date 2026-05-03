<p>
  <img src="./docs/clash-background.svg" width="100%" alt="Clash" />
</p>

<h1>
  <img src="./docs/assets/readme-title.svg" alt="Clash" />
</h1>

**학습 기록 기반 경쟁 애플리케이션, Clash**

Clash는 IDE 사용 시간과 GitHub 활동을 기반으로 개발 학습을 기록하고, 라이벌·그룹·로드맵을 통해 꾸준한 성장을 돕는 애플리케이션입니다.

이 저장소는 Clash의 macOS 데스크톱 앱과 온보딩/인증 웹을 함께 관리하는 모노레포입니다.

## Service

- **학습 기록**: 날짜별 개발 시간, 할 일, GitHub 활동을 모아 학습 기록을 보여줍니다.
- **로드맵**: 로드맵과 챕터 진행률을 통해 다음 학습 목표를 확인할 수 있습니다.
- **경쟁**: 라이벌, 그룹, 랭킹을 통해 개인 학습 기록을 비교 가능한 지표로 보여줍니다.
- **보상**: 학습 활동으로 얻은 재화를 상점과 프로필 꾸미기에 사용할 수 있습니다.

## Product Surface

| 영역 | 설명                                        |
| --- |-------------------------------------------|
| `apps/mac` | Electron 기반 macOS 데스크톱 클라이언트              |
| `apps/web` | 온보딩, 다운로드, 인증을 담당하는 웹                     |
| `packages/*` | 앱 공통 상수, 디자인 토큰, ESLint 설정, TypeScript 설정 |

## Features

- **Home**: 오늘의 학습 현황, 주요 활동, 성장 상태 요약
- **Record**: 날짜별 학습 기록과 할 일 관리
- **Roadmap**: 전공/섹션/챕터 기반 학습 진행률 확인
- **Competition**: 라이벌 등록 및 학습 기록 비교
- **Group**: 그룹 단위 학습 기록 조회
- **Shop**: 활동 보상 기반 상품 구매와 프로필 꾸미기
- **Notification**: 서비스 공지와 사용자 알림
- **App Monitor**: IDE 사용 시간 측정

## Tech Stack

| 분류 | 기술                                  |
| --- |-------------------------------------|
| Desktop | Electron                            |
| Frontend | React, TypeScript                   |
| Server State | React Query, Axios                  |
| Client State | Zustand                             |
| Realtime | Socket.IO                           |
| Form & Validation | react-hook-form, zod                |
| UI | styled-components                   |
| Workspace | pnpm, Turborepo                     |

## Architecture

Clash macOS 앱은 Electron의 `main`, `preload`, `renderer` 프로세스를 분리하고, Renderer는 FSD 구조로 관리합니다.

```text
apps/mac/src
├── main                  # 앱 생명주기, BrowserWindow, IPC, 딥링크, 트레이, 업데이트
├── preload               # contextBridge 기반 window.api 노출
└── renderer/src
    ├── app               # 앱 초기화, Provider, 전역 스타일, 레이아웃
    ├── pages             # 라우트 단위 화면
    ├── widgets           # 여러 페이지에서 재사용되는 큰 UI 블록
    ├── features          # 사용자 액션 중심 기능
    ├── entities          # 도메인 모델, 타입, API
    └── shared            # 공통 UI, 유틸, API 인프라, 훅
```

Renderer 레이어 의존성은 아래 방향을 유지합니다.

```text
app -> pages -> widgets -> features -> entities -> shared
```

## Repository Structure

```text
clash-client
├── apps
│   ├── mac               # macOS Electron 앱
│   └── web               # 온보딩/인증 웹 앱
├── packages
│   ├── constants         # 런타임 공통 상수
│   ├── design-tokens     # 테마, 팔레트, 폰트 토큰
│   ├── eslint-config     # 공유 ESLint 설정
│   └── tsconfig          # 공유 TypeScript 설정
└── docs/assets           # README 전용 에셋
```