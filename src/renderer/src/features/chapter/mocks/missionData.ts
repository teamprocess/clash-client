export type StageStatus = "locked" | "current" | "completed";

export interface Stage {
  id: number;
  title: string;
  currentProgress: number;
  totalMissions: number;
  missions: Mission[];
  status: StageStatus;
}

export interface Mission {
  id: number;
  title: string;
  completed: boolean;
  questions: Question[];
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
    status: "current",
    missions: [
      {
        id: 1,
        title: "React 기본 개념 이해하기",
        completed: false,
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
            id: 3,
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
            id: 4,
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
          {
            id: 5,
            title: "컴포넌트 이름은 어떻게 작성해야 하는가?",
            choices: [
              { id: 1, text: "소문자로 시작" },
              { id: 2, text: "대문자로 시작" },
              { id: 3, text: "숫자로 시작" },
              { id: 4, text: "자유롭게" },
            ],
            answerId: 2,
            explanation: "React 컴포넌트는 반드시 대문자로 시작해야 HTML 태그와 구분됩니다.",
          },
        ],
      },
      {
        id: 2,
        title: "JSX 문법 익히기",
        completed: false,
        questions: [
          {
            id: 6,
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
            id: 7,
            title: "JSX에서 JavaScript 표현식을 사용하려면?",
            choices: [
              { id: 1, text: "[] 사용" },
              { id: 2, text: "{} 사용" },
              { id: 3, text: "() 사용" },
              { id: 4, text: "<> 사용" },
            ],
            answerId: 2,
            explanation: "JSX 내에서 JavaScript 표현식을 사용하려면 중괄호 {}로 감싸야 합니다.",
          },
          {
            id: 8,
            title: "JSX에서 class 속성은 어떻게 작성하는가?",
            choices: [
              { id: 1, text: "class" },
              { id: 2, text: "className" },
              { id: 3, text: "classList" },
              { id: 4, text: "classname" },
            ],
            answerId: 2,
            explanation:
              "JSX에서는 class 대신 className을 사용합니다. class는 JavaScript 예약어이기 때문입니다.",
          },
          {
            id: 9,
            title: "JSX에서 인라인 스타일을 적용하려면?",
            choices: [
              { id: 1, text: "문자열로 작성" },
              { id: 2, text: "객체로 작성" },
              { id: 3, text: "배열로 작성" },
              { id: 4, text: "함수로 작성" },
            ],
            answerId: 2,
            explanation: "JSX에서 인라인 스타일은 객체 형태로 작성해야 합니다.",
          },
          {
            id: 10,
            title: "JSX에서 주석을 작성하는 올바른 방법은?",
            choices: [
              { id: 1, text: "// 주석" },
              { id: 2, text: "<!-- 주석 -->" },
              { id: 3, text: "{/* 주석 */}" },
              { id: 4, text: "/* 주석 */" },
            ],
            answerId: 3,
            explanation: "JSX 내에서 주석은 {/* */} 형태로 작성해야 합니다.",
          },
        ],
      },
      {
        id: 3,
        title: "컴포넌트 만들어보기",
        completed: false,
        questions: [
          {
            id: 11,
            title: "함수형 컴포넌트를 만드는 방법은?",
            choices: [
              { id: 1, text: "class 사용" },
              { id: 2, text: "function 사용" },
              { id: 3, text: "const 사용" },
              { id: 4, text: "function 또는 화살표 함수" },
            ],
            answerId: 4,
            explanation: "함수형 컴포넌트는 일반 함수나 화살표 함수로 만들 수 있습니다.",
          },
          {
            id: 12,
            title: "컴포넌트는 반드시 무엇을 반환해야 하는가?",
            choices: [
              { id: 1, text: "문자열" },
              { id: 2, text: "숫자" },
              { id: 3, text: "JSX 또는 null" },
              { id: 4, text: "객체" },
            ],
            answerId: 3,
            explanation:
              "컴포넌트는 JSX를 반환하거나, 아무것도 렌더링하지 않을 때 null을 반환합니다.",
          },
          {
            id: 13,
            title: "Fragment를 사용하는 이유는?",
            choices: [
              { id: 1, text: "스타일링을 위해" },
              { id: 2, text: "불필요한 DOM 노드 추가 방지" },
              { id: 3, text: "성능 향상" },
              { id: 4, text: "에러 방지" },
            ],
            answerId: 2,
            explanation:
              "Fragment(<></>)를 사용하면 불필요한 div 등의 DOM 노드를 추가하지 않고 여러 요소를 그룹화할 수 있습니다.",
          },
          {
            id: 14,
            title: "컴포넌트 합성(Composition)이란?",
            choices: [
              { id: 1, text: "컴포넌트를 상속하는 것" },
              { id: 2, text: "컴포넌트를 조합하는 것" },
              { id: 3, text: "컴포넌트를 복사하는 것" },
              { id: 4, text: "컴포넌트를 삭제하는 것" },
            ],
            answerId: 2,
            explanation:
              "컴포넌트 합성은 작은 컴포넌트들을 조합하여 더 복잡한 UI를 만드는 React의 핵심 패턴입니다.",
          },
          {
            id: 15,
            title: "props.children의 용도는?",
            choices: [
              { id: 1, text: "자식 컴포넌트 접근" },
              { id: 2, text: "부모 컴포넌트 접근" },
              { id: 3, text: "컴포넌트 사이의 내용 표시" },
              { id: 4, text: "상태 관리" },
            ],
            answerId: 3,
            explanation:
              "props.children을 사용하면 컴포넌트 태그 사이에 포함된 내용을 렌더링할 수 있습니다.",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "2단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    status: "locked",
    missions: [
      {
        id: 4,
        title: "Props 전달하기",
        completed: false,
        questions: [
          {
            id: 16,
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
            id: 17,
            title: "Props의 특징은?",
            choices: [
              { id: 1, text: "자식이 수정 가능" },
              { id: 2, text: "읽기 전용" },
              { id: 3, text: "전역 변수" },
              { id: 4, text: "상태 관리용" },
            ],
            answerId: 2,
            explanation:
              "Props는 읽기 전용(read-only)이며 자식 컴포넌트에서 직접 수정할 수 없습니다.",
          },
          {
            id: 18,
            title: "Props의 기본값을 설정하는 방법은?",
            choices: [
              { id: 1, text: "defaultProps" },
              { id: 2, text: "initialProps" },
              { id: 3, text: "기본 매개변수 문법" },
              { id: 4, text: "1번과 3번 모두" },
            ],
            answerId: 4,
            explanation:
              "defaultProps 또는 ES6 기본 매개변수 문법을 사용하여 props의 기본값을 설정할 수 있습니다.",
          },
          {
            id: 19,
            title: "구조 분해 할당으로 props를 받는 예시는?",
            choices: [
              { id: 1, text: "function App(props)" },
              { id: 2, text: "function App({name, age})" },
              { id: 3, text: "function App[name, age]" },
              { id: 4, text: "function App<name, age>" },
            ],
            answerId: 2,
            explanation: "구조 분해 할당 문법 {}를 사용하여 props를 직접 추출할 수 있습니다.",
          },
          {
            id: 20,
            title: "Props로 함수를 전달할 수 있는가?",
            choices: [
              { id: 1, text: "불가능하다" },
              { id: 2, text: "가능하다" },
              { id: 3, text: "특별한 경우만 가능" },
              { id: 4, text: "성능 문제가 있다" },
            ],
            answerId: 2,
            explanation:
              "Props로 함수를 전달하는 것은 매우 일반적이며, 자식에서 부모로 데이터를 전달하는 방법입니다.",
          },
        ],
      },
      {
        id: 5,
        title: "State 관리하기",
        completed: false,
        questions: [
          {
            id: 21,
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
            id: 22,
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
            id: 23,
            title: "State 업데이트가 비동기인 이유는?",
            choices: [
              { id: 1, text: "버그 때문에" },
              { id: 2, text: "성능 최적화를 위해" },
              { id: 3, text: "보안을 위해" },
              { id: 4, text: "메모리 절약" },
            ],
            answerId: 2,
            explanation: "React는 여러 state 업데이트를 배치 처리하여 성능을 최적화합니다.",
          },
          {
            id: 24,
            title: "이전 state 값을 기반으로 업데이트하려면?",
            choices: [
              { id: 1, text: "setState(newValue)" },
              { id: 2, text: "setState(prev => prev + 1)" },
              { id: 3, text: "state = state + 1" },
              { id: 4, text: "updateState(newValue)" },
            ],
            answerId: 2,
            explanation: "함수형 업데이트를 사용하면 이전 state 값을 안전하게 참조할 수 있습니다.",
          },
          {
            id: 25,
            title: "State와 Props의 차이는?",
            choices: [
              { id: 1, text: "없다" },
              { id: 2, text: "State는 변경 가능, Props는 읽기 전용" },
              { id: 3, text: "Props는 변경 가능, State는 읽기 전용" },
              { id: 4, text: "둘 다 변경 불가능" },
            ],
            answerId: 2,
            explanation:
              "State는 컴포넌트 내부에서 관리되고 변경 가능하지만, Props는 부모로부터 받아 읽기만 가능합니다.",
          },
        ],
      },
      {
        id: 6,
        title: "이벤트 핸들링 구현하기",
        completed: false,
        questions: [
          {
            id: 26,
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
            id: 27,
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
          {
            id: 28,
            title: "이벤트 기본 동작을 막으려면?",
            choices: [
              { id: 1, text: "return false" },
              { id: 2, text: "e.preventDefault()" },
              { id: 3, text: "e.stopPropagation()" },
              { id: 4, text: "e.cancel()" },
            ],
            answerId: 2,
            explanation:
              "preventDefault() 메서드를 호출하여 이벤트의 기본 동작을 막을 수 있습니다.",
          },
          {
            id: 29,
            title: "이벤트 버블링을 막으려면?",
            choices: [
              { id: 1, text: "e.preventDefault()" },
              { id: 2, text: "e.stopPropagation()" },
              { id: 3, text: "return false" },
              { id: 4, text: "e.stop()" },
            ],
            answerId: 2,
            explanation: "stopPropagation() 메서드를 사용하여 이벤트 버블링을 중단할 수 있습니다.",
          },
          {
            id: 30,
            title: "이벤트 핸들러에 인자를 전달하는 방법은?",
            choices: [
              { id: 1, text: "onClick={handleClick(id)}" },
              { id: 2, text: "onClick={() => handleClick(id)}" },
              { id: 3, text: "onClick=handleClick(id)" },
              { id: 4, text: "onClick={handleClick.bind(id)}" },
            ],
            answerId: 2,
            explanation: "화살표 함수를 사용하여 이벤트 핸들러에 인자를 전달할 수 있습니다.",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "3단계 미션",
    currentProgress: 0,
    totalMissions: 3,
    status: "locked",
    missions: [
      {
        id: 7,
        title: "함수형 컴포넌트 만들기",
        completed: false,
        questions: [
          {
            id: 31,
            title: "함수형 컴포넌트의 장점은?",
            choices: [
              { id: 1, text: "코드가 간결하다" },
              { id: 2, text: "Hook 사용 가능" },
              { id: 3, text: "테스트가 쉽다" },
              { id: 4, text: "모두 해당" },
            ],
            answerId: 4,
            explanation:
              "함수형 컴포넌트는 코드가 간결하고, Hook을 사용할 수 있으며, 테스트하기도 쉽습니다.",
          },
          {
            id: 32,
            title: "클래스 컴포넌트와 함수형 컴포넌트의 차이는?",
            choices: [
              { id: 1, text: "성능 차이가 크다" },
              { id: 2, text: "문법과 Hook 사용 여부" },
              { id: 3, text: "렌더링 방식이 다르다" },
              { id: 4, text: "차이가 없다" },
            ],
            answerId: 2,
            explanation: "주요 차이는 문법(class vs function)과 Hook 사용 가능 여부입니다.",
          },
          {
            id: 33,
            title: "함수형 컴포넌트에서 라이프사이클을 다루려면?",
            choices: [
              { id: 1, text: "componentDidMount 사용" },
              { id: 2, text: "useEffect 사용" },
              { id: 3, text: "useState 사용" },
              { id: 4, text: "불가능하다" },
            ],
            answerId: 2,
            explanation: "함수형 컴포넌트에서는 useEffect Hook으로 라이프사이클을 다룹니다.",
          },
          {
            id: 34,
            title: "React.memo의 용도는?",
            choices: [
              { id: 1, text: "상태 저장" },
              { id: 2, text: "불필요한 리렌더링 방지" },
              { id: 3, text: "이벤트 처리" },
              { id: 4, text: "라우팅" },
            ],
            answerId: 2,
            explanation:
              "React.memo는 props가 변경되지 않으면 컴포넌트를 리렌더링하지 않도록 최적화합니다.",
          },
          {
            id: 35,
            title: "순수 함수 컴포넌트란?",
            choices: [
              { id: 1, text: "side effect가 없는 컴포넌트" },
              { id: 2, text: "같은 props에 같은 결과" },
              { id: 3, text: "외부 상태를 변경하지 않음" },
              { id: 4, text: "모두 해당" },
            ],
            answerId: 4,
            explanation:
              "순수 함수 컴포넌트는 side effect가 없고, 같은 입력에 같은 출력을 반환하며, 외부 상태를 변경하지 않습니다.",
          },
        ],
      },
      {
        id: 8,
        title: "useState 사용하기",
        completed: false,
        questions: [
          {
            id: 36,
            title: "useState의 초기값으로 가능한 것은?",
            choices: [
              { id: 1, text: "원시값만" },
              { id: 2, text: "객체만" },
              { id: 3, text: "함수만" },
              { id: 4, text: "모든 JavaScript 값" },
            ],
            answerId: 4,
            explanation: "useState의 초기값으로는 모든 JavaScript 값을 사용할 수 있습니다.",
          },
          {
            id: 37,
            title: "여러 개의 useState를 사용할 수 있는가?",
            choices: [
              { id: 1, text: "불가능하다" },
              { id: 2, text: "최대 3개까지" },
              { id: 3, text: "가능하다" },
              { id: 4, text: "권장하지 않는다" },
            ],
            answerId: 3,
            explanation: "하나의 컴포넌트에서 여러 개의 useState를 자유롭게 사용할 수 있습니다.",
          },
          {
            id: 38,
            title: "지연 초기화(lazy initialization)는 언제 사용하는가?",
            choices: [
              { id: 1, text: "초기값 계산 비용이 클 때" },
              { id: 2, text: "항상 사용" },
              { id: 3, text: "객체 state일 때만" },
              { id: 4, text: "사용하지 않는다" },
            ],
            answerId: 1,
            explanation:
              "초기값을 계산하는 비용이 클 때 함수를 전달하여 최초 렌더링 시에만 실행되도록 할 수 있습니다.",
          },
          {
            id: 39,
            title: "setState 호출 직후 state 값은?",
            choices: [
              { id: 1, text: "즉시 변경됨" },
              { id: 2, text: "다음 렌더링에 반영됨" },
              { id: 3, text: "변경 안됨" },
              { id: 4, text: "예측 불가능" },
            ],
            answerId: 2,
            explanation: "state 업데이트는 비동기로 처리되며 다음 렌더링에 반영됩니다.",
          },
          {
            id: 40,
            title: "객체 state를 업데이트할 때 주의사항은?",
            choices: [
              { id: 1, text: "직접 수정하면 안됨" },
              { id: 2, text: "새 객체를 생성해야 함" },
              { id: 3, text: "스프레드 연산자 활용" },
              { id: 4, text: "모두 해당" },
            ],
            answerId: 4,
            explanation: "객체 state는 직접 수정하지 않고 새 객체를 생성하여 업데이트해야 합니다.",
          },
        ],
      },
      {
        id: 9,
        title: "useEffect 이해하기",
        completed: false,
        questions: [
          {
            id: 41,
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
            id: 42,
            title: "useEffect의 의존성 배열이 빈 배열일 때는?",
            choices: [
              { id: 1, text: "매 렌더링마다 실행" },
              { id: 2, text: "최초 1회만 실행" },
              { id: 3, text: "실행 안됨" },
              { id: 4, text: "언마운트 시만 실행" },
            ],
            answerId: 2,
            explanation: "의존성 배열이 빈 배열이면 컴포넌트가 마운트될 때",
          },
          {
            id: 42,
            title: "useEffect의 의존성 배열이 빈 배열일 때는?",
            choices: [
              { id: 1, text: "매 렌더링마다 실행" },
              { id: 2, text: "최초 1회만 실행" },
              { id: 3, text: "실행 안됨" },
              { id: 4, text: "언마운트 시만 실행" },
            ],
            answerId: 2,
            explanation:
              "의존성 배열이 빈 배열([])이면 컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.",
          },
          {
            id: 43,
            title: "useEffect에서 정리(clean-up) 함수는 언제 실행되는가?",
            choices: [
              { id: 1, text: "렌더링 직후" },
              { id: 2, text: "다음 effect 실행 전 또는 언마운트 시" },
              { id: 3, text: "이벤트 발생 시" },
              { id: 4, text: "컴파일 시" },
            ],
            answerId: 2,
            explanation:
              "clean-up 함수는 다음 effect가 실행되기 전이나 컴포넌트가 언마운트될 때 실행됩니다.",
          },
          {
            id: 44,
            title: "useEffect에서 주의해야 할 점은?",
            choices: [
              { id: 1, text: "state를 사용하면 안 된다" },
              { id: 2, text: "의존성 배열을 정확히 지정해야 한다" },
              { id: 3, text: "비동기 코드를 사용할 수 없다" },
              { id: 4, text: "한 컴포넌트에 하나만 사용 가능하다" },
            ],
            answerId: 2,
            explanation:
              "의존성 배열을 잘못 지정하면 불필요한 렌더링이나 버그가 발생할 수 있습니다.",
          },
          {
            id: 45,
            title: "useEffect 안에서 주로 처리하는 작업은?",
            choices: [
              { id: 1, text: "UI 렌더링" },
              { id: 2, text: "side effect 처리" },
              { id: 3, text: "상태 선언" },
              { id: 4, text: "라우팅" },
            ],
            answerId: 2,
            explanation:
              "useEffect는 데이터 fetching, 구독, DOM 조작 등 side effect를 처리하는 용도로 사용됩니다.",
          },
        ],
      },
    ],
  },
];
