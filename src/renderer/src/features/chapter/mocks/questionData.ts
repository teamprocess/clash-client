export interface Question {
  id: number;
  title: string;
  choices: Choice[];
  answerId: number;
}

interface Choice {
  id: number;
  text: string;
}

export const questionData: Question[] = [
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
    title: "컴포넌트가 처음 렌더링될 때 실행되는 훅은?",
    choices: [
      { id: 1, text: "useState" },
      { id: 2, text: "useEffect" },
      { id: 3, text: "useCallback" },
      { id: 4, text: "useReducer" },
    ],
    answerId: 2,
  },
  {
    id: 3,
    title: "DOM 요소에 직접 접근할 때 사용하는 훅은?",
    choices: [
      { id: 1, text: "useMemo" },
      { id: 2, text: "useState" },
      { id: 3, text: "useRef" },
      { id: 4, text: "useEffect" },
    ],
    answerId: 3,
  },
  {
    id: 4,
    title: "의존성 배열이 비어 있을 때 useEffect는 언제 실행될까?",
    choices: [
      { id: 1, text: "상태 변경 시마다" },
      { id: 2, text: "마운트 시 한 번" },
      { id: 3, text: "렌더링되지 않음" },
      { id: 4, text: "언마운트 시" },
    ],
    answerId: 2,
  },
  {
    id: 5,
    title: "부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 것은?",
    choices: [
      { id: 1, text: "state" },
      { id: 2, text: "props" },
      { id: 3, text: "context" },
      { id: 4, text: "ref" },
    ],
    answerId: 2,
  },
];
