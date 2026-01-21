import { useState } from "react";
import { Mission } from "@/features/chapter/mocks/missionData";

interface QuizState {
  currentIndex: number;
  answers: Record<number, number>;
  correctCount: number;
  view: "quiz" | "result" | "final";
  lastResult: boolean | null;
}

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  correctCount: 0,
  view: "quiz",
  lastResult: null,
};

interface UseQuizParams {
  mission: Mission;
  onMissionComplete?: (missionId: number) => void;
  onClose: () => void;
}

export const useQuiz = ({ mission, onMissionComplete, onClose }: UseQuizParams) => {
  const [state, setState] = useState<QuizState>(initialState);

  const questions = mission.questions;
  const currentQuestion = questions[state.currentIndex];
  const selectedChoiceId = state.answers[state.currentIndex];

  const handleSelectChoice = (choiceId: number) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentIndex]: choiceId,
      },
    }));
  };

  const handleConfirm = () => {
    if (selectedChoiceId == null) return;

    const correct = selectedChoiceId === currentQuestion.answerId;

    setState(prev => ({
      ...prev,
      correctCount: correct ? prev.correctCount + 1 : prev.correctCount,
      lastResult: correct,
      view: "result",
    }));
  };

  const handleNextOrClose = () => {
    setState(prev => {
      const isLast = prev.currentIndex === questions.length - 1;

      return {
        ...prev,
        currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
        view: isLast ? "final" : "quiz",
        lastResult: null,
      };
    });
  };

  const resetState = () => {
    setState(initialState);
  };

  const handleClose = () => {
    if (state.view === "final" && state.correctCount >= 4) {
      onMissionComplete?.(mission.id);
    }
    resetState();
    onClose();
  };

  return {
    state,
    questions,
    currentQuestion,
    selectedChoiceId,
    handleSelectChoice,
    handleConfirm,
    handleNextOrClose,
    resetState,
    handleClose,
  };
};
