export interface TutorialStep {
  id: number;
  title: string;
  roadmapTitle: string;
  tooltip: string;
  description: string;
}

export interface TutorialData {
  id: number;
  title: string;
  intro: string;
  targets: string[];
  steps: TutorialStep[];
}

export const tutorialData: TutorialData[] = [
  {
    id: 1,
    title: "자바스크립트 고급",
    intro:
      "비동기 처리, 성능 최적화 기법, 함수형 프로그래밍, 프로그레시브 웹 앱, 이벤트 처리 심화 기술들을 익히실 수 있습니다.",
    targets: [
      "프론트엔드 기본기 확실하게 다지기",
      "체계적 커리큘럼으로 자바스크립트 마스터하기",
      "미션으로 내 실력을 더 확실히 알기",
    ],
    steps: [
      {
        id: 1,
        title: "기본 문법",
        roadmapTitle: "기본 문법",
        tooltip: "기본 문법",
        description: "자바스크립트 기본 문법을 복습합니다.",
      },
      {
        id: 2,
        title: "비동기 처리",
        roadmapTitle: "비동기 처리",
        tooltip: "비동기 처리",
        description: "Promise, async/await을 학습합니다.",
      },
      {
        id: 3,
        title: "함수형 프로그래밍",
        roadmapTitle: "함수형 프로그래밍",
        tooltip: "함수형 프로그래밍",
        description:
          "상태 관리 용이, 가독성 및 유지보수성 향상과 같은 장점을 실무에 활용할 수 있습니다.",
      },
      {
        id: 4,
        title: "성능 최적화",
        roadmapTitle: "성능 최적화",
        tooltip: "성능 최적화",
        description: "렌더링 최적화와 성능 개선 기법을 학습합니다.",
      },
      {
        id: 5,
        title: "실전 미션",
        roadmapTitle: "실전 미션",
        tooltip: "실전 미션",
        description: "실무와 유사한 미션을 수행합니다.",
      },
    ],
  },
];
