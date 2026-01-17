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
  explanation: string;
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
        explanation:
          "함수형 컴포넌트에서는 this.state를 사용할 수 없기 때문에 상태를 관리하려면 useState 훅을 사용해야 합니다.",
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
        explanation:
          "JSX는 JavaScript의 확장 문법으로, UI 구조를 코드로 선언적으로 표현할 수 있게 해줍니다.",
      },
      {
        id: 3,
        title: "React 컴포넌트의 올바른 반환값은?",
        choices: [
          { id: 1, text: "문자열" },
          { id: 2, text: "숫자" },
          { id: 3, text: "JSX 요소" },
          { id: 4, text: "배열만" },
        ],
        answerId: 3,
        explanation: "React 컴포넌트는 JSX 요소를 반환해야 하며, 이는 UI를 나타냅니다.",
      },
      {
        id: 4,
        title: "React에서 key prop의 용도는?",
        choices: [
          { id: 1, text: "스타일 지정" },
          { id: 2, text: "요소 식별" },
          { id: 3, text: "이벤트 처리" },
          { id: 4, text: "데이터 저장" },
        ],
        answerId: 2,
        explanation: "key prop은 React가 리스트의 각 요소를 고유하게 식별하는 데 사용됩니다.",
      },
      {
        id: 5,
        title: "Virtual DOM의 장점은?",
        choices: [
          { id: 1, text: "메모리 절약" },
          { id: 2, text: "렌더링 최적화" },
          { id: 3, text: "코드 압축" },
          { id: 4, text: "보안 강화" },
        ],
        answerId: 2,
        explanation: "Virtual DOM은 실제 DOM 조작을 최소화하여 렌더링 성능을 최적화합니다.",
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
        id: 6,
        title: "부모에서 자식으로 데이터를 전달할 때 사용하는 것은?",
        choices: [
          { id: 1, text: "state" },
          { id: 2, text: "props" },
          { id: 3, text: "context" },
          { id: 4, text: "ref" },
        ],
        answerId: 2,
        explanation:
          "props는 부모 컴포넌트가 자식 컴포넌트로 데이터를 전달할 때 사용하는 속성입니다.",
      },
      {
        id: 7,
        title: "이벤트 핸들러로 올바른 것은?",
        choices: [
          { id: 1, text: "onclick()" },
          { id: 2, text: "onClick={handleClick}" },
          { id: 3, text: "onClick: handleClick" },
          { id: 4, text: "click={handleClick}" },
        ],
        answerId: 2,
        explanation: "React에서는 이벤트 핸들러를 camelCase로 작성하고 함수 자체를 전달합니다.",
      },
      {
        id: 8,
        title: "Props의 특징은?",
        choices: [
          { id: 1, text: "자식이 수정 가능" },
          { id: 2, text: "읽기 전용" },
          { id: 3, text: "전역 변수" },
          { id: 4, text: "상태 관리용" },
        ],
        answerId: 2,
        explanation: "Props는 읽기 전용(read-only)이며 자식 컴포넌트에서 직접 수정할 수 없습니다.",
      },
      {
        id: 9,
        title: "State 변경 시 사용하는 것은?",
        choices: [
          { id: 1, text: "직접 할당" },
          { id: 2, text: "setState 함수" },
          { id: 3, text: "변수 재선언" },
          { id: 4, text: "props 수정" },
        ],
        answerId: 2,
        explanation:
          "State는 반드시 setState 함수를 통해서만 변경해야 React가 변경을 감지하고 리렌더링합니다.",
      },
      {
        id: 10,
        title: "합성 이벤트(Synthetic Event)의 장점은?",
        choices: [
          { id: 1, text: "크로스 브라우징" },
          { id: 2, text: "메모리 절약" },
          { id: 3, text: "속도 향상" },
          { id: 4, text: "코드 간소화" },
        ],
        answerId: 1,
        explanation: "React의 합성 이벤트는 모든 브라우저에서 동일하게 동작하도록 보장합니다.",
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
        id: 11,
        title: "useState의 반환값은?",
        choices: [
          { id: 1, text: "값 하나" },
          { id: 2, text: "객체" },
          { id: 3, text: "배열" },
          { id: 4, text: "함수" },
        ],
        answerId: 3,
        explanation: "useState는 [state, setState] 형태의 배열을 반환합니다.",
      },
      {
        id: 12,
        title: "useEffect는 언제 실행되는가?",
        choices: [
          { id: 1, text: "컴파일 시" },
          { id: 2, text: "렌더링 이후" },
          { id: 3, text: "이벤트 발생 시" },
          { id: 4, text: "언마운트 시만" },
        ],
        answerId: 2,
        explanation: "useEffect는 컴포넌트가 렌더링된 이후에 실행됩니다.",
      },
      {
        id: 13,
        title: "useEffect의 의존성 배열이 빈 배열일 때는?",
        choices: [
          { id: 1, text: "매 렌더링마다 실행" },
          { id: 2, text: "최초 1회만 실행" },
          { id: 3, text: "실행 안됨" },
          { id: 4, text: "언마운트 시만 실행" },
        ],
        answerId: 2,
        explanation: "의존성 배열이 빈 배열이면 컴포넌트가 마운트될 때 최초 1회만 실행됩니다.",
      },
      {
        id: 14,
        title: "Hook의 규칙으로 올바른 것은?",
        choices: [
          { id: 1, text: "조건문 안에서 호출 가능" },
          { id: 2, text: "최상위에서만 호출" },
          { id: 3, text: "반복문 안에서 호출 가능" },
          { id: 4, text: "어디서든 호출 가능" },
        ],
        answerId: 2,
        explanation:
          "Hook은 항상 컴포넌트의 최상위에서 호출해야 하며, 조건문이나 반복문 안에서는 호출할 수 없습니다.",
      },
      {
        id: 15,
        title: "useEffect의 cleanup 함수는 언제 실행되는가?",
        choices: [
          { id: 1, text: "마운트 시" },
          { id: 2, text: "렌더링 시" },
          { id: 3, text: "언마운트 시" },
          { id: 4, text: "에러 발생 시" },
        ],
        answerId: 3,
        explanation:
          "cleanup 함수는 컴포넌트가 언마운트될 때 또는 다음 effect가 실행되기 전에 실행됩니다.",
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
        id: 16,
        title: "커스텀 훅의 이름 규칙은?",
        choices: [
          { id: 1, text: "hook으로 시작" },
          { id: 2, text: "use로 시작" },
          { id: 3, text: "대문자로 시작" },
          { id: 4, text: "자유" },
        ],
        answerId: 2,
        explanation: "React 훅은 반드시 use로 시작해야 훅 규칙을 정상적으로 적용받을 수 있습니다.",
      },
      {
        id: 17,
        title: "useContext의 목적은?",
        choices: [
          { id: 1, text: "DOM 접근" },
          { id: 2, text: "전역 상태 공유" },
          { id: 3, text: "렌더링 최적화" },
          { id: 4, text: "비동기 처리" },
        ],
        answerId: 2,
        explanation: "useContext는 props drilling 없이 전역 데이터를 공유하기 위해 사용됩니다.",
      },
      {
        id: 18,
        title: "Context를 생성하는 함수는?",
        choices: [
          { id: 1, text: "useState" },
          { id: 2, text: "createContext" },
          { id: 3, text: "useContext" },
          { id: 4, text: "makeContext" },
        ],
        answerId: 2,
        explanation: "React.createContext()를 사용하여 새로운 Context 객체를 생성합니다.",
      },
      {
        id: 19,
        title: "useReducer의 장점은?",
        choices: [
          { id: 1, text: "간단한 상태 관리" },
          { id: 2, text: "복잡한 상태 로직 관리" },
          { id: 3, text: "성능 향상" },
          { id: 4, text: "메모리 절약" },
        ],
        answerId: 2,
        explanation: "useReducer는 복잡한 상태 로직을 더 예측 가능하고 관리하기 쉽게 만들어줍니다.",
      },
      {
        id: 20,
        title: "useMemo의 용도는?",
        choices: [
          { id: 1, text: "상태 관리" },
          { id: 2, text: "값 메모이제이션" },
          { id: 3, text: "이벤트 처리" },
          { id: 4, text: "라우팅" },
        ],
        answerId: 2,
        explanation:
          "useMemo는 계산 비용이 높은 값을 메모이제이션하여 불필요한 재계산을 방지합니다.",
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
        id: 21,
        title: "페이지 이동에 사용하는 컴포넌트는?",
        choices: [
          { id: 1, text: "a" },
          { id: 2, text: "Link" },
          { id: 3, text: "Route" },
          { id: 4, text: "Switch" },
        ],
        answerId: 2,
        explanation: "React Router에서는 페이지 이동 시 Link 컴포넌트를 사용합니다.",
      },
      {
        id: 22,
        title: "URL 파라미터를 읽는 훅은?",
        choices: [
          { id: 1, text: "useParams" },
          { id: 2, text: "useState" },
          { id: 3, text: "useEffect" },
          { id: 4, text: "useNavigate" },
        ],
        answerId: 1,
        explanation: "useParams 훅을 사용하면 URL에 포함된 파라미터 값을 읽을 수 있습니다.",
      },
      {
        id: 23,
        title: "프로그래매틱 네비게이션에 사용하는 훅은?",
        choices: [
          { id: 1, text: "useHistory" },
          { id: 2, text: "useNavigate" },
          { id: 3, text: "useRoute" },
          { id: 4, text: "useLink" },
        ],
        answerId: 2,
        explanation:
          "useNavigate 훅을 사용하면 코드 내에서 프로그래매틱하게 페이지를 이동할 수 있습니다.",
      },
      {
        id: 24,
        title: "중첩 라우팅을 위한 컴포넌트는?",
        choices: [
          { id: 1, text: "Nested" },
          { id: 2, text: "Outlet" },
          { id: 3, text: "Children" },
          { id: 4, text: "SubRoute" },
        ],
        answerId: 2,
        explanation: "Outlet 컴포넌트는 중첩된 라우트의 자식 요소를 렌더링할 위치를 지정합니다.",
      },
      {
        id: 25,
        title: "현재 위치 정보를 가져오는 훅은?",
        choices: [
          { id: 1, text: "useLocation" },
          { id: 2, text: "usePosition" },
          { id: 3, text: "usePath" },
          { id: 4, text: "useRoute" },
        ],
        answerId: 1,
        explanation: "useLocation 훅은 현재 URL의 pathname, search, hash 등의 정보를 제공합니다.",
      },
    ],
  },
];
