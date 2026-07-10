# @clash/ui

Mac과 Web이 함께 사용하는 UI primitive 패키지입니다. 제품 화면을 조합하는 component는 각 app의 feature/widget에 두고, 여러 화면에서 같은 interaction과 style contract를 공유하는 primitive만 이 패키지에 둡니다.

## 사용 규칙

- color와 typography는 `@clash/design-tokens`의 semantic token만 사용합니다.
- 반복되는 차이는 별도 component 복사 대신 `size`, `tone`, `surface`, `state` variant로 표현합니다.
- native HTML attribute, keyboard focus, disabled/loading 상태를 그대로 전달합니다.
- app router, Electron API, app alias(`@/`)에 의존하지 않습니다.

## 현재 component

- `Button`: `primary | secondary | accept | pending`, `sm | md | lg | xl`, static/responsive interaction
- `TextField`: `md | lg`, `alternative | normal | neutral`, invalid state
- `FieldMessage`: `danger | success | neutral`
- `IconButton`: `ghost | soft`, `fit | sm | md | lg`, square/circle
- `InlineNotice`: outline/surface, density와 tone variant
- `FeedbackState`: loading/error/empty semantics와 plain/dashed/surface variant
- `BaseGlobalStyle`: Web document와 desktop shell의 공통 reset/focus/scrollbar 규칙
- `ViewportColumn`: fixed/dynamic viewport와 overflow policy variant
- `ClashLogo`: 공통 brand SVG component
