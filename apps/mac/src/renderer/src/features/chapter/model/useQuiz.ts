import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Mission } from "@/features/chapter/model/chapter.types";
import type { GetChapterDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "@/entities/roadmap/chapter/api/query/chapterQueryKeys";
import {
  useChapterResultMutation,
  useResetChapterMutation,
  useSubmitAnswerMutation,
} from "@/entities/roadmap/chapter";
import { getErrorMessage } from "@/shared/lib";

type QuizState = {
  currentIndex: number;
  answers: Record<number, number>;
  correctCount: number;
  view: "quiz" | "result" | "final";
  lastResult: boolean | null;
  explanation: string;
  isSubmitting: boolean;
  isPassed: boolean | null;
};

const createInitialState = (): QuizState => {
  return {
    currentIndex: 0,
    answers: {},
    correctCount: 0,
    view: "quiz",
    lastResult: null,
    explanation: "",
    isSubmitting: false,
    isPassed: null,
  };
};

type UseQuizParams = {
  mission: Mission;
  onMissionComplete?: (missionId: number) => void;
  onClose: () => void;
};

export const useQuiz = ({ mission, onMissionComplete, onClose }: UseQuizParams) => {
  const queryClient = useQueryClient();
  const resetChapterMutation = useResetChapterMutation();
  const chapterResultMutation = useChapterResultMutation();
  const submitAnswerMutation = useSubmitAnswerMutation();
  const [state, setState] = useState<QuizState>(() => createInitialState());
  const [error, setError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(!mission.completed);

  const isClosingRef = useRef(false);
  const isRequestingChapterResultRef = useRef(false);
  const chapterResultDoneRef = useRef(false);
  const isResettingChapterRef = useRef(false);
  const isMountedRef = useRef(true);

  const isReviewMode = mission.completed;
  const questions = mission.questions;
  const currentQuestion = questions[state.currentIndex];
  const selectedChoiceId = state.answers[state.currentIndex];

  const isLocallyPassed = (correctCount: number) =>
    questions.length > 0 && correctCount === questions.length;

  const syncChapterCache = (
    updater: (old: GetChapterDetailsResponse) => GetChapterDetailsResponse
  ) => {
    queryClient.setQueryData<GetChapterDetailsResponse>(
      chapterQueryKeys.chapterDetails(mission.id),
      old => (old ? updater(old) : old)
    );
  };

  const applyResetToCache = () => {
    syncChapterCache(old => ({
      ...old,
      currentQuestionIndex: 0,
      correctCount: 0,
      isCleared: false,
    }));
  };

  const resetState = () => {
    chapterResultDoneRef.current = false;
    setState(createInitialState());
    setError(null);
  };

  const performResetMission = async () => {
    if (isReviewMode) {
      if (isMountedRef.current) {
        resetState();
        setIsPreparing(false);
      }
      return true;
    }

    if (isResettingChapterRef.current) return false;
    isResettingChapterRef.current = true;

    if (isMountedRef.current) {
      setIsPreparing(true);
    }

    try {
      const response = await resetChapterMutation.mutateAsync({ chapterId: mission.id });

      if (!response.success) {
        if (isMountedRef.current) {
          setError(response.message || "챕터 초기화에 실패했습니다.");
        }
        return false;
      }

      applyResetToCache();

      if (isMountedRef.current) {
        resetState();
      }

      return true;
    } catch (error: unknown) {
      if (isMountedRef.current) {
        setError(getErrorMessage(error, "챕터 초기화에 실패했습니다."));
      }
      return false;
    } finally {
      isResettingChapterRef.current = false;

      if (isMountedRef.current) {
        setIsPreparing(false);
      }
    }
  };

  const resetMissionOnOpen = useEffectEvent(async () => {
    await performResetMission();
  });

  useEffect(() => {
    isMountedRef.current = true;
    resetState();

    if (isReviewMode) {
      setIsPreparing(false);
    } else {
      void resetMissionOnOpen();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [isReviewMode, mission.id]);

  const requestChapterResult = async (fallbackCorrectCount?: number) => {
    if (chapterResultDoneRef.current) return;
    if (isRequestingChapterResultRef.current) return;
    isRequestingChapterResultRef.current = true;

    try {
      const response = await chapterResultMutation.mutateAsync(mission.id);
      const passedByServer = response.success && response.data?.isCleared === true;
      const passedByLocal =
        fallbackCorrectCount != null ? isLocallyPassed(fallbackCorrectCount) : undefined;

      setError(null);

      if (response.success && response.data) {
        syncChapterCache(old => ({
          ...old,
          isCleared: response.data!.isCleared,
          correctCount: response.data!.correctCount,
          currentQuestionIndex: response.data!.isCleared
            ? Math.max(old.totalQuestions - 1, 0)
            : old.currentQuestionIndex,
        }));

        setState(prev => ({
          ...prev,
          correctCount: response.data!.correctCount,
          isPassed: response.data!.isCleared,
        }));
      }

      if (passedByServer) {
        chapterResultDoneRef.current = true;
        onMissionComplete?.(mission.id);
        return;
      }

      if (!response.success) {
        setError(response.message || "챕터 결과 조회에 실패했습니다.");
        console.error("챕터 결과 조회에 실패했습니다.", response);
      }

      if (passedByLocal === true) {
        onMissionComplete?.(mission.id);
        setState(prev => ({ ...prev, isPassed: true }));
      } else if (response.success && response.data) {
        setState(prev => ({ ...prev, isPassed: response.data?.isCleared ?? false }));
      }

      chapterResultDoneRef.current = true;
    } catch (error: unknown) {
      console.error("챕터 결과 조회 요청에 실패했습니다.", error);
      setError(getErrorMessage(error, "챕터 결과 조회에 실패했습니다."));
      if (fallbackCorrectCount != null && isLocallyPassed(fallbackCorrectCount)) {
        onMissionComplete?.(mission.id);
        setState(prev => ({ ...prev, isPassed: true }));
      }
    } finally {
      isRequestingChapterResultRef.current = false;
    }
  };

  const handleSelectChoice = (choiceId: number) => {
    if (isReviewMode) return;

    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentIndex]: choiceId,
      },
    }));
  };

  const handleConfirm = async () => {
    if (
      isReviewMode ||
      !currentQuestion ||
      selectedChoiceId == null ||
      state.isSubmitting ||
      isPreparing
    ) {
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await submitAnswerMutation.mutateAsync({
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

      setState(prev => ({
        ...prev,
        correctCount: nextCorrectCount,
        lastResult: result.isCorrect,
        explanation: result.explanation ?? "",
        view: "result",
        isSubmitting: false,
        isPassed: isLastQuestion ? result.isChapterCleared : prev.isPassed,
      }));

      if (isLastQuestion) {
        await requestChapterResult(nextCorrectCount);
      }
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

  const handleRestart = async () => {
    if (isReviewMode) return;

    await performResetMission();
  };

  const handleClose = async () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    try {
      if (
        state.view === "final" &&
        state.isPassed !== true &&
        isLocallyPassed(state.correctCount)
      ) {
        await requestChapterResult(state.correctCount);
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
    isPreparing,
    isReviewMode,
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
