import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { majorApi } from "@/entities/major/api/majorApi";
import { useMajorQuestionsQuery } from "@/entities/major/api/query/useMajorQuestions.query";
import { Major } from "@/entities/major/model/major.types";

export type FeatureItem = "TEST" | "CHOICE" | null;
export type MajorItem = "WEB" | "APP" | "SERVER" | "AI" | "GAME" | null;
export type StepType = "FEATURE" | "TEST" | "LOADING" | "RESULT" | "CHOICE";

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

  const [answers, setAnswers] = useState<(number | null | undefined)[]>([]);

  const { postMyMajor } = majorApi;

  const { data: questionsResponse } = useMajorQuestionsQuery();
  const questionData = questionsResponse?.data?.majorQuestions ?? [];

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
  const [analyzedMajor, setAnalyzedMajor] = useState<MajorItem>(null);
  const isAllAnswered =
    questionData.length > 0 &&
    answers.length === questionData.length &&
    questionData.every((_, idx) => answers[idx] != null);

  // 전공 성향 검사에서 답을 선택받는 함수
  const handleSelect = (questionId: number, answerId: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId] = answerId;
    setAnswers(newAnswers);
  };

  // 전공 성향 검사 테스트 제출 시 점수 계산 및 결과 도출 함수
  // 결과를 서버에 보내는 API 연동 예정
  const handleComplete = () => {
    if (!isAllAnswered) return;

    const scores = { web: 0, app: 0, server: 0, ai: 0, game: 0 };
    answers.forEach((answer, index) => {
      if (answer == null) return;
      const question = questionData[index];
      const multiplier = answer - 3;
      Object.keys(scores).forEach(key => {
        const major = key as keyof typeof scores;
        scores[major] += (question.weight[major] || 0) * multiplier;
      });
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

  const onSubmit = () => {
    postMyMajor({
      major: major as Major,
    }).then(() => {
      navigate("/roadmap");
    });
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
      onSubmit,
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
