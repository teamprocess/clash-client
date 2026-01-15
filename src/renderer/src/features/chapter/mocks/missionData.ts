export interface Stage {
  id: number;
  title: string;
  currentProgress: number;
  totalMissions: number;
  missions: Mission[];
}

interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

export const stagesData: Stage[] = [
  {
    id: 1,
    title: "1단계 미션",
    currentProgress: 3,
    totalMissions: 3,
    missions: [
      { id: 1, title: "React 기본 개념 이해하기", completed: true },
      { id: 2, title: "JSX 문법 익히기", completed: true },
      { id: 3, title: "컴포넌트 만들어보기", completed: true },
    ],
  },
  {
    id: 2,
    title: "2단계 미션",
    currentProgress: 2,
    totalMissions: 3,
    missions: [
      { id: 4, title: "Props 전달하기", completed: true },
      { id: 5, title: "State 관리하기", completed: true },
      { id: 6, title: "이벤트 핸들링 구현하기", completed: false },
    ],
  },
  {
    id: 3,
    title: "3단계 미션",
    currentProgress: 1,
    totalMissions: 3,
    missions: [
      { id: 7, title: "React에서 함수형 컴포넌트 만들기", completed: true },
      { id: 8, title: "React Hooks useState 사용하기", completed: false },
      { id: 9, title: "React Hooks useEffect 이해하기", completed: false },
    ],
  },
  {
    id: 4,
    title: "4단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 10, title: "커스텀 Hook 만들기", completed: false },
      { id: 11, title: "useContext로 전역 상태 관리", completed: false },
      { id: 12, title: "useMemo와 useCallback 최적화", completed: false },
    ],
  },
  {
    id: 5,
    title: "5단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 13, title: "React Router 설정하기", completed: false },
      { id: 14, title: "동적 라우팅 구현하기", completed: false },
      { id: 15, title: "중첩 라우팅 이해하기", completed: false },
      { id: 16, title: "Protected Route 구현하기", completed: false },
    ],
  },
  {
    id: 6,
    title: "6단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 17, title: "API 호출하기", completed: false },
      { id: 18, title: "로딩 상태 처리하기", completed: false },
      { id: 19, title: "에러 핸들링 구현하기", completed: false },
      { id: 20, title: "데이터 캐싱 전략 적용하기", completed: false },
    ],
  },
  {
    id: 7,
    title: "7단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 21, title: "Redux 설정하기", completed: false },
      { id: 22, title: "Action과 Reducer 만들기", completed: false },
      { id: 23, title: "Redux Toolkit 사용하기", completed: false },
    ],
  },
  {
    id: 8,
    title: "8단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 24, title: "styled-components 사용하기", completed: false },
      { id: 25, title: "테마 시스템 구축하기", completed: false },
      { id: 26, title: "반응형 디자인 구현하기", completed: false },
      { id: 27, title: "애니메이션 추가하기", completed: false },
    ],
  },
  {
    id: 9,
    title: "9단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 28, title: "폼 유효성 검사 구현하기", completed: false },
      { id: 29, title: "제어 컴포넌트 vs 비제어 컴포넌트", completed: false },
      { id: 30, title: "React Hook Form 사용하기", completed: false },
    ],
  },
  {
    id: 10,
    title: "10단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 31, title: "성능 최적화 - React.memo", completed: false },
      { id: 32, title: "성능 최적화 - 코드 스플리팅", completed: false },
      { id: 33, title: "성능 최적화 - 가상화", completed: false },
      { id: 34, title: "React DevTools로 성능 분석하기", completed: false },
    ],
  },
  {
    id: 11,
    title: "11단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 35, title: "Jest로 단위 테스트 작성하기", completed: false },
      { id: 36, title: "React Testing Library 사용하기", completed: false },
      { id: 37, title: "통합 테스트 구현하기", completed: false },
    ],
  },
  {
    id: 12,
    title: "12단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 38, title: "빌드 최적화하기", completed: false },
      { id: 39, title: "배포 환경 설정하기", completed: false },
      { id: 40, title: "CI/CD 파이프라인 구축하기", completed: false },
      { id: 41, title: "프로젝트 완성 및 배포하기", completed: false },
    ],
  },
];
