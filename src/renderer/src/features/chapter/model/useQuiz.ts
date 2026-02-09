import { useRef, useState } from "react";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";

type QuizState = {
  currentIndex: number;
  answers: Record<number, number>;
  correctCount: number;
  view: "quiz" | "result" | "final";
  lastResult: boolean | null;
  explanation: string;
  isSubmitting: boolean;
};

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  correctCount: 0,
  view: "quiz",
  lastResult: null,
  explanation: "",
  isSubmitting: false,
};

type UseQuizParams = {
  mission: Mission;
  onMissionComplete?: (missionId: number) => void;
  onClose: () => void;
};

export const useQuiz = ({ mission, onMissionComplete, onClose }: UseQuizParams) => {
  const [state, setState] = useState<QuizState>(initialState);
  const isClosingRef = useRef(false);
  const isRequestingMissionResultRef = useRef(false);
  const missionResultDoneRef = useRef(false);

  const questions = mission.questions;
  const currentQuestion = questions[state.currentIndex];
  const selectedChoiceId = state.answers[state.currentIndex];

  const requestMissionResult = async (fallbackCorrectCount?: number) => {
    if (missionResultDoneRef.current) return;
    if (isRequestingMissionResultRef.current) return;
    isRequestingMissionResultRef.current = true;

    try {
      const response = await chapterApi.submitMissionResult(mission.id);
      const passedByServer = response.success && response.data?.isCleared === true;
      const passedByLocal = fallbackCorrectCount != null ? fallbackCorrectCount >= 4 : undefined;

      if (passedByServer) {
        missionResultDoneRef.current = true;
        onMissionComplete?.(mission.id);
        return;
      }

      if (!response.success) {
        console.error("미션 결과 저장/조회에 실패했습니다.", response);
      } else if (passedByLocal === true) {
        console.error(
          "서버는 미션 미통과로 응답했지만( isCleared=false ), 로컬 기준으로는 통과입니다.",
          {
            missionId: mission.id,
            fallbackCorrectCount,
            response,
          }
        );
      }

      if (passedByLocal === true) {
        onMissionComplete?.(mission.id);
      }

      missionResultDoneRef.current = true;
    } catch (error: unknown) {
      console.error("미션 결과 저장/조회 요청에 실패했습니다.", error);
      if (fallbackCorrectCount != null && fallbackCorrectCount >= 4) {
        onMissionComplete?.(mission.id);
      }
    } finally {
      isRequestingMissionResultRef.current = false;
    }
  };

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
      const isLastQuestion = state.currentIndex === questions.length - 1;
      const nextCorrectCount = result.isCorrect ? state.correctCount + 1 : state.correctCount;

      setState(prev => ({
        ...prev,
        correctCount: result.isCorrect ? prev.correctCount + 1 : prev.correctCount,
        lastResult: result.isCorrect,
        explanation: result.explanation ?? "",
        view: "result",
        isSubmitting: false,
      }));

      if (isLastQuestion) {
        await requestMissionResult(nextCorrectCount);
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
    missionResultDoneRef.current = false;
    setState(initialState);
  };

  const handleClose = async () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    try {
      if (state.view === "final") await requestMissionResult();
    } catch (error: unknown) {
      console.log(error);
    } finally {
      resetState();
      onClose();
      isClosingRef.current = false;
    }
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
