# Clash Client

학습 기록을 통한 경쟁 애플리케이션, Clash

## 프로젝트 구조

**FSD** 아키텍처를 따릅니다.

```
src/
├── main/              # Electron 프로세스
├── preload/           # IPC 브릿지
└── renderer/src/      # React 앱
    ├── app/
    ├── pages/
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

## 기술 스택

Electron, React, TypeScript, styled-components

## 시작하기

```bash
# 설치
pnpm install

# 개발 서버
pnpm dev

# 빌드
pnpm build:win    # Windows
pnpm build:mac    # macOS
```

### 테마 사용법

```typescript
import styled from "styled-components";

const Button = styled.button`
  color: ${({ theme }) => theme.label.normal};
  background: ${({ theme }) => theme.fill.normal};
  border: 1px solid ${({ theme }) => theme.line.normal};
`;
```

### Palette 사용법

```typescript
import { palette } from '@/shared/config/theme/palette'

const Brand = styled.div`
  background: ${palette.blue.50};
  color: ${palette.neutral.99};
`
```

### 폰트 사용법

```typescript
import styled from "styled-components";
import { font } from "@/shared/config/font";

const Title = styled.h1`
  ${font.title1.bold}
`;

const Body = styled.p`
  ${font.body.regular}
`;
```
