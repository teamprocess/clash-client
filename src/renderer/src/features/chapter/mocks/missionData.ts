export interface Stage {
  id: number;
  title: string;
  currentProgress: number;
  totalMissions: number;
  missions: Mission[];
  questions: Question[];
}

export interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

export interface Question {
  id: number;
  title: string;
  choices: Choice[];
  answerId: number;
}

export interface Choice {
  id: number;
  text: string;
}

export const stagesData: Stage[] = [
  {
    id: 1,
    title: "1단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 1, title: "React 기본 개념 이해하기", completed: false },
      { id: 2, title: "JSX 문법 익히기", completed: false },
      { id: 3, title: "컴포넌트 만들어보기", completed: false },
    ],
    questions: [
      {
        id: 1,
        title: "React에서 함수형 컴포넌트의 상태를 관리하는 훅은?",
        choices: [
          { id: 1, text: "useEffect" },
          { id: 2, text: "useState" },
          { id: 3, text: "useRef" },
          { id: 4, text: "useMemo" },
        ],
        answerId: 2,
      },
      {
        id: 2,
        title: "JSX의 특징으로 올바른 것은?",
        choices: [
          { id: 1, text: "HTML 문법이다" },
          { id: 2, text: "문자열만 반환한다" },
          { id: 3, text: "JavaScript 확장 문법이다" },
          { id: 4, text: "브라우저에서 직접 실행된다" },
        ],
        answerId: 3,
      },
    ],
  },

  {
    id: 2,
    title: "2단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 4, title: "Props 전달하기", completed: false },
      { id: 5, title: "State 관리하기", completed: false },
      { id: 6, title: "이벤트 핸들링 구현하기", completed: false },
    ],
    questions: [
      {
        id: 3,
        title: "부모에서 자식으로 데이터를 전달할 때 사용하는 것은?",
        choices: [
          { id: 1, text: "state" },
          { id: 2, text: "props" },
          { id: 3, text: "context" },
          { id: 4, text: "ref" },
        ],
        answerId: 2,
      },
      {
        id: 4,
        title: "이벤트 핸들러로 올바른 것은?",
        choices: [
          { id: 1, text: "onclick()" },
          { id: 2, text: "onClick={handleClick}" },
          { id: 3, text: "onClick: handleClick" },
          { id: 4, text: "click={handleClick}" },
        ],
        answerId: 2,
      },
    ],
  },

  {
    id: 3,
    title: "3단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 7, title: "함수형 컴포넌트 만들기", completed: false },
      { id: 8, title: "useState 사용하기", completed: false },
      { id: 9, title: "useEffect 이해하기", completed: false },
    ],
    questions: [
      {
        id: 5,
        title: "useState의 반환값은?",
        choices: [
          { id: 1, text: "값 하나" },
          { id: 2, text: "객체" },
          { id: 3, text: "배열" },
          { id: 4, text: "함수" },
        ],
        answerId: 3,
      },
      {
        id: 6,
        title: "useEffect는 언제 실행되는가?",
        choices: [
          { id: 1, text: "컴파일 시" },
          { id: 2, text: "렌더링 이후" },
          { id: 3, text: "이벤트 발생 시" },
          { id: 4, text: "언마운트 시만" },
        ],
        answerId: 2,
      },
    ],
  },

  {
    id: 4,
    title: "4단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    missions: [
      { id: 10, title: "커스텀 Hook 만들기", completed: false },
      { id: 11, title: "useContext 사용하기", completed: false },
      { id: 12, title: "전역 상태 이해하기", completed: false },
    ],
    questions: [
      {
        id: 7,
        title: "커스텀 훅의 이름 규칙은?",
        choices: [
          { id: 1, text: "hook으로 시작" },
          { id: 2, text: "use로 시작" },
          { id: 3, text: "대문자로 시작" },
          { id: 4, text: "자유" },
        ],
        answerId: 2,
      },
      {
        id: 8,
        title: "useContext의 목적은?",
        choices: [
          { id: 1, text: "DOM 접근" },
          { id: 2, text: "전역 상태 공유" },
          { id: 3, text: "렌더링 최적화" },
          { id: 4, text: "비동기 처리" },
        ],
        answerId: 2,
      },
    ],
  },

  {
    id: 5,
    title: "5단계 미션",
    currentProgress: 0,
    totalMissions: 4,
    missions: [
      { id: 13, title: "React Router 설정", completed: false },
      { id: 14, title: "동적 라우팅", completed: false },
      { id: 15, title: "중첩 라우팅", completed: false },
      { id: 16, title: "Protected Route", completed: false },
    ],
    questions: [
      {
        id: 9,
        title: "페이지 이동에 사용하는 컴포넌트는?",
        choices: [
          { id: 1, text: "a" },
          { id: 2, text: "Link" },
          { id: 3, text: "Route" },
          { id: 4, text: "Switch" },
        ],
        answerId: 2,
      },
      {
        id: 10,
        title: "URL 파라미터를 읽는 훅은?",
        choices: [
          { id: 1, text: "useParams" },
          { id: 2, text: "useState" },
          { id: 3, text: "useEffect" },
          { id: 4, text: "useNavigate" },
        ],
        answerId: 1,
      },
    ],
  },
];
