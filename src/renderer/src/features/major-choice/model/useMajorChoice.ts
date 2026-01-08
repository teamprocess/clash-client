import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type FeatureItem = "TEST" | "CHOICE" | null;
export type MajorItem = "WEB" | "APP" | "SERVER" | "AI" | "GAME" | null;
export type StepType = "FEATURE" | "TEST" | "LOADING" | "RESULT" | "CHOICE";

export const questionData = [
  {
    id: 1,
    title: "평소에 글보다 화면이나 그림으로 된 자료가 더 이해하기 쉬운가요?",
    subTitle: "정보를 받아들이는 방식",
    weights: { web: 5, app: 4, server: 0, ai: 2, game: 3 },
  },

  {
    id: 2,
    title: "문제가 생기면 원인을 찾을 때까지 차근차근 다시 해보는 편인가요?",
    subTitle: "문제 해결 태도",
    weights: { web: 2, app: 3, server: 6, ai: 4, game: 2 },
  },

  {
    id: 3,
    title: "수학 문제나 보드게임처럼 규칙이 있는 활동이 비교적 재미있나요?",
    subTitle: "규칙 기반 활동 선호",
    weights: { web: 1, app: 1, server: 3, ai: 6, game: 5 },
  },

  {
    id: 4,
    title: "새로운 사이트나 앱을 보면 나라면 어떻게 쓰거나 바꿀지 상상해보나요?",
    subTitle: "디지털 환경 호기심",
    weights: { web: 4, app: 5, server: 3, ai: 2, game: 3 },
  },

  {
    id: 5,
    title: "취미 활동을 할 때 분위기를 꾸미는 역할이 비교적 편한가요?",
    subTitle: "표현 역할 취향",
    weights: { web: 4, app: 4, server: 1, ai: 0, game: 5 },
  },

  {
    id: 6,
    title: "인공지능이나 로봇이 대신 일하는 이야기가 신기하게 느껴지나요?",
    subTitle: "미래 기술 관심",
    weights: { web: 1, app: 2, server: 1, ai: 7, game: 1 },
  },

  {
    id: 7,
    title: "무언가를 쓸 때 스마트폰으로 하는 것이 컴퓨터로 하는 것보다 더 편하나요?",
    subTitle: "사용 환경 익숙도",
    weights: { web: 3, app: 6, server: 1, ai: 0, game: 2 },
  },

  {
    id: 8,
    title: "여러 화면을 동시에 보는 활동은 컴퓨터가 더 쉽다고 느끼나요?",
    subTitle: "멀티 화면 활용",
    weights: { web: 5, app: 3, server: 2, ai: 1, game: 2 },
  },

  {
    id: 9,
    title: "이야기나 캐릭터 설정을 상상해서 만들어본 경험이 있나요?",
    subTitle: "창작 경험",
    weights: { web: 2, app: 2, server: 1, ai: 1, game: 7 },
  },

  {
    id: 10,
    title: "직접 만져보며 배우는 실용적인 공부가 더 자신 있나요?",
    subTitle: "학습 접근 방식",
    weights: { web: 4, app: 5, server: 2, ai: 1, game: 4 },
  },
];

const majorNames: Record<string, string> = {
  web: "Web",
  app: "App",
  server: "Server",
  ai: "AI",
  game: "Game",
};

export const useMajorChoice = () => {
  // 로드맵 페이지 컴포넌트 step useState
  const [step, setStep] = useState<StepType>("FEATURE");

  // Feature Choice 컴포넌트
  const [selected, setSelected] = useState<FeatureItem>(null);
  const select = (path: FeatureItem) => setSelected(path);

  // 전공이 없을 경우 전공 성향 검사 및 전공 선택 중 선택하고 결과를 전달하는 함수
  const handleFeatureChoiceSubmit = () => {
    if (selected === null) {
      return;
    }
    setStep(selected);
    setSelected(null);
  };

  // Major Choice 컴포넌트
  const navigate = useNavigate();

  const [major, setMajor] = useState<MajorItem>(null);

  const selectedMajor = (path: MajorItem) => setMajor(path);

  // Test 컴포넌트
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questionData.length).fill(null));
  const [analyzedMajor, setAnalyzedMajor] = useState<MajorItem>(null);
  const isAllAnswered = !answers.includes(null);

  // 전공 성향 검사에서 답을 선택받는 함수
  const handleSelect = (questionId: number, answerId: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId] = answerId;
    setAnswers(newAnswers);
  };

  // 전공 성향 검사 테스트 제출 시 점수 계산 및 결과 도출 함수
  // 결과를 서버에 보내는 API 연동 예정
  const handleComplete = () => {
    if (answers.includes(null)) return;

    const scores = { web: 0, app: 0, server: 0, ai: 0, game: 0 };
    answers.forEach((answer, index) => {
      if (answer !== null) {
        const question = questionData[index];
        const multiplier = answer - 3;
        Object.keys(scores).forEach(key => {
          const major = key as keyof typeof scores;
          scores[major] += (question.weights[major] || 0) * multiplier;
        });
      }
    });

    const resultMajorKey = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    const finalMajor = majorNames[resultMajorKey];

    setAnalyzedMajor(finalMajor as MajorItem);

    // 임시로 2초 로딩
    setStep("LOADING");
    setTimeout(() => {
      setStep("RESULT");
    }, 2000);

    setAnswers(Array(questionData.length).fill(null));
  };

  // 질문 객체를 return 해주는 함수
  // 질문 객체를 서버에서 받는 API 연동 예정
  const getTestQuestion = () => {
    return questionData;
  };

  return {
    feature: {
      selected,
      select,
      username: "조상철",
      isValid: selected !== null,
      setStep,
      handleFeatureChoiceSubmit,
    },
    step,
    setStep,
    major: {
      selectedMajor,
      isValid: major !== null,
      major,
      username: "조상철",
      setStep,
    },
    test: {
      answers,
      isAllAnswered,
      setAnswers,
      navigate,
      handleSelect,
      handleComplete,
      getTestQuestion,
    },
    result: {
      analyzedMajor,
      username: "조상철",
      setStep,
    },
  };
};

// 타입 불일치 방지 & 코드 중복 제거를 위해 ReturnType을 활용한 타입 추출
export type UseRoadMapReturn = ReturnType<typeof useMajorChoice>;
export type FeatureProps = UseRoadMapReturn["feature"];
export type MajorProps = UseRoadMapReturn["major"];
export type TestProps = UseRoadMapReturn["test"];
export type ResultProps = UseRoadMapReturn["result"];
