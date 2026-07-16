export const HELP_CONTENT_KEYS = [
  "exp-tooltip",
  "cookie-tooltip",
  "ranking-reward-tooltip",
  "chapter-ranking-tooltip",
  "activity-analysis-tooltip",
  "major-change-tooltip",
  "rival-limit-tooltip",
] as const;

export type HelpContentKey = (typeof HELP_CONTENT_KEYS)[number];

export const fallbackHelpContents: Record<HelpContentKey, string> = {
  "exp-tooltip": `GitHub (1시간 간격으로 반영)

커밋: 1개당 50점 (최대 50개)
리뷰: 1개당 100점 (최대 5개)
PR: 1개당 100점 (최대 5개)
이슈: 1개당 10점 (최대 5개)

학습 시간

1분당 10점 (최대 10시간)
오전 6시 갱신
`,
  "cookie-tooltip": `쿠키는 상점에서 사용 할 수 있어요!

로드맵 챕터 클리어: 100 쿠키
로드맵 섹션 클리어: 1,000 쿠키

EXP 하루 랭킹
1위: 1,000쿠키
2위: 500쿠키
3위: 300쿠키

출석
하루 출석: 300쿠키 (한 주 전체 출석 시: +700쿠키)
`,
  "ranking-reward-tooltip": `Aura: 150,000 EXP & 상위 1등
Master: 100,000 EXP & 상위 3등
Diamond: 50,000 EXP
Gold: 30,000 EXP
Silver: 10,000 EXP
Bronze: 1,000 EXP`,
  "chapter-ranking-tooltip": "챕터 랭킹은 상위 20명까지 표시됩니다.",
  "activity-analysis-tooltip": "GitHub 관련 데이터는 1시간마다 업데이트 됩니다.",
  "major-change-tooltip": "전공 테스트와 새로운 전공을 만나보세요",
  "rival-limit-tooltip": "최대 라이벌 수는 4명입니다.",
};

export const isHelpContentKey = (value: unknown): value is HelpContentKey =>
  typeof value === "string" && HELP_CONTENT_KEYS.includes(value as HelpContentKey);
