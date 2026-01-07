import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questionData = [
  {
    id: 1,
    title: "내가 정성을 들인 결과물이 눈앞에서 즉각적으로 움직이고 바뀔 때 큰 보람을 느끼나요?",
    subTitle: "시각적 피드백과 반응성을 선호하는지 확인합니다.",
    weights: { web: 2, design: 2, server: 0, ai: 0, game: 3 }, // 게임은 실시간 반응이 중요
  },
  {
    id: 2,
    title: "내가 만든 결과물을 사람들이 직접 조작하고 즐거워하는 모습을 보는 게 중요한가요?",
    subTitle: "사용자 경험과 재미 요소를 중요하게 생각하는지 확인합니다.",
    weights: { web: 2, design: 1, server: 0, ai: 0, game: 5 }, // '즐거움'은 게임의 핵심
  },
  {
    id: 3,
    title: "옷을 고르거나 방을 꾸밀 때, 전체적인 분위기와 시각적 배치를 중요하게 생각하시나요?",
    subTitle: "미적 감각과 공간 구성 능력을 확인합니다.",
    weights: { web: 1, design: 5, server: 0, ai: 0, game: 2 },
  },
  {
    id: 4,
    title: "겉모습보다는 내부 시스템의 규칙이나 효율적인 작동 원리에 더 관심이 가나요?",
    subTitle: "구조적인 시스템 설계 성향을 확인합니다.",
    weights: { web: 0, design: 0, server: 5, ai: 1, game: 2 },
  },
  {
    id: 5,
    title: "방대한 정보 속에서 숨겨진 규칙을 찾아내거나 미래를 예측하는 것을 좋아하시나요?",
    subTitle: "데이터 분석 및 패턴 파악 능력을 확인합니다.",
    weights: { web: 0, design: 0, server: 1, ai: 5, game: 0 },
  },
  {
    id: 6,
    title: "영화나 소설을 볼 때 설정이 탄탄한 세계관이나 스토리에 깊게 몰입하는 편인가요?",
    subTitle: "세계관 구축 및 기획적 소양을 확인합니다.",
    weights: { web: 0, design: 2, server: 0, ai: 0, game: 5 }, // 게임 기획/시나리오 요소
  },
  {
    id: 7,
    title: "평소 '왜 이 앱은 버튼이 여기 있을까?' 같은 편리함에 대해 자주 고민하시나요?",
    subTitle: "사용자 편의성(UX)에 대한 본능적인 감각을 확인합니다.",
    weights: { web: 4, design: 3, server: 0, ai: 0, game: 1 },
  },
  {
    id: 8,
    title: "복잡한 퍼즐을 풀거나 수학 문제의 정답을 찾아가는 논리적인 과정을 즐기시나요?",
    subTitle: "알고리즘적 사고와 문제 해결력을 확인합니다.",
    weights: { web: 0, design: 0, server: 3, ai: 4, game: 2 },
  },
  {
    id: 9,
    title:
      "컴퓨터 사양을 높이거나 성능을 최대로 끌어올려 부드럽게 돌아가게 만드는 것에 흥미가 있나요?",
    subTitle: "최적화 및 성능 구현에 대한 관심을 확인합니다.",
    weights: { web: 0, design: 0, server: 2, ai: 1, game: 4 }, // 게임 개발의 물리/성능 요소
  },
  {
    id: 10,
    title: "새로운 가전제품을 사면 기능 하나하나를 깊게 파고들어 완벽히 이해해야 직성이 풀리나요?",
    subTitle: "기술적 탐구심과 분석 성향을 확인합니다.",
    weights: { web: 1, design: 0, server: 2, ai: 4, game: 1 },
  },
];

export const useTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questionData.length).fill(null));
  const isAllAnswered = !answers.includes(null);

  const handleSelect = (questionId: number, answerId: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId] = answerId;
    setAnswers(newAnswers);
  };

  const handleComplete = () => {
    if (answers.includes(null)) {
      return;
    }
    navigate("/result", { state: { answers } });
  };

  const getTestQuestion = () => {
    return questionData;
  };

  return {
    answers,
    isAllAnswered,
    setAnswers,
    navigate,
    handleSelect,
    handleComplete,
    getTestQuestion,
  };
};
