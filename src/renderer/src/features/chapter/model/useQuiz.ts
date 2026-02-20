import { useRef, useState } from "react";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import { getErrorMessage } from "@/shared/lib";

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
  const [error, setError] = useState<string | null>(null);

  const isClosingRef = useRef(false);
  const isRequestingMissionResultRef = useRef(false);
  const missionResultDoneRef = useRef(false);
  const isResettingMissionRef = useRef(false);

  const questions = mission.questions;
  const currentQuestion = questions[state.currentIndex];
  const selectedChoiceId = state.answers[state.currentIndex];

  const isLocallyPassed = (correctCount: number) =>
    questions.length > 0 && correctCount === questions.length;

  const requestMissionResult = async (fallbackCorrectCount?: number) => {
    if (missionResultDoneRef.current) return;
    if (isRequestingMissionResultRef.current) return;
    isRequestingMissionResultRef.current = true;

    try {
      const response = await chapterApi.submitMissionResult(mission.id);
      const passedByServer = response.success && response.data?.isCleared === true;
      const passedByLocal =
        fallbackCorrectCount != null ? isLocallyPassed(fallbackCorrectCount) : undefined;

      setError(null);

      if (passedByServer) {
        missionResultDoneRef.current = true;
        onMissionComplete?.(mission.id);
        return;
      }

      if (!response.success) {
        setError(response.message || "미션 결과 저장에 실패했습니다.");
        console.error("미션 결과 저장/조회에 실패했습니다.", response);
      } else if (passedByLocal === true) {
        console.error(
          "서버는 미션 미통과로 응답했지만( isCleared=false ), 로컬 기준으로는 통과입니다.",
          { missionId: mission.id, fallbackCorrectCount, response }
        );
      }

      if (passedByLocal === true) {
        onMissionComplete?.(mission.id);
      }

      missionResultDoneRef.current = true;
    } catch (error: unknown) {
      console.error("미션 결과 저장/조회 요청에 실패했습니다.", error);
      setError(getErrorMessage(error, "미션 결과 저장에 실패했습니다."));
      if (fallbackCorrectCount != null && isLocallyPassed(fallbackCorrectCount)) {
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
        setError(response.message || "정답 제출에 실패했습니다.");
        setState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      setError(null);

      const result = response.data;
      const isLastQuestion = state.currentIndex === questions.length - 1;
      const nextCorrectCount = result.isCorrect ? state.correctCount + 1 : state.correctCount;
      const nextPassed = isLocallyPassed(nextCorrectCount);

      setState(prev => ({
        ...prev,
        correctCount: result.isCorrect ? prev.correctCount + 1 : prev.correctCount,
        lastResult: result.isCorrect,
        explanation: result.explanation ?? "",
        view: "result",
        isSubmitting: false,
      }));

      if (isLastQuestion && nextPassed) await requestMissionResult(nextCorrectCount);
    } catch (error: unknown) {
      console.error("정답 제출 요청에 실패했습니다.", error);
      setError(getErrorMessage(error, "정답 제출에 실패했습니다."));
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
    setError(null);
  };

  const handleRestart = async () => {
    if (isResettingMissionRef.current) return;
    isResettingMissionRef.current = true;

    try {
      const response = await chapterApi.resetMission(mission.id);
      if (!response.success) {
        setError(response.message || "미션 초기화에 실패했습니다.");
        return;
      }

      resetState();
    } catch (error: unknown) {
      setError(getErrorMessage(error, "미션 초기화에 실패했습니다."));
    } finally {
      isResettingMissionRef.current = false;
    }
  };

  const handleClose = async () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    try {
      if (state.view === "final" && isLocallyPassed(state.correctCount)) {
        await requestMissionResult(state.correctCount);
      }
    } finally {
      resetState();
      onClose();
      isClosingRef.current = false;
    }
  };

  return {
    state,
    error,
    questions,
    currentQuestion,
    selectedChoiceId,
    handleSelectChoice,
    handleConfirm,
    handleNextOrClose,
    resetState,
    handleRestart,
    handleClose,
  };
};
