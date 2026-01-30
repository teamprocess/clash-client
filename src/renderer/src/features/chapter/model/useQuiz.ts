import { useState } from "react";
import { Mission } from "@/features/chapter/mocks/missionData";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";

interface QuizState {
  currentIndex: number;
  answers: Record<number, number>;
  correctCount: number;
  view: "quiz" | "result" | "final";
  lastResult: boolean | null;
  explanation: string;
  isSubmitting: boolean;
}

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  correctCount: 0,
  view: "quiz",
  lastResult: null,
  explanation: "",
  isSubmitting: false,
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

  const handleConfirm = async () => {
    if (selectedChoiceId == null || state.isSubmitting) return;

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await chapterApi.submitAnswer({
        missionId: mission.id,
        questionId: currentQuestion.id,
        submittedChoiceId: selectedChoiceId,
      });

      if (!response.success || !response.data) {
        setState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      const result = response.data;

      setState(prev => ({
        ...prev,
        correctCount: result.isCorrect ? prev.correctCount + 1 : prev.correctCount,
        lastResult: result.isCorrect,
        explanation: result.explanation ?? "",
        view: "result",
        isSubmitting: false,
      }));

      if (result.isMissionCleared) {
        onMissionComplete?.(mission.id);
      }
    } catch (error: unknown) {
      console.log(error);
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleNextOrClose = () => {
    setState(prev => {
      const isLast = prev.currentIndex === questions.length - 1;

      return {
        ...prev,
        currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
        view: isLast ? "final" : "quiz",
        lastResult: null,
        explanation: "",
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
