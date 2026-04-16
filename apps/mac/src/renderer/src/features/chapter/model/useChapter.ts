import { useChapterDomain } from "./useChapterDomain";
import { useChapterHandlers } from "./useChapterHandlers";
import { useChapterView } from "./useChapterView";
import { useChapterDetailsQuery } from "@/entities/roadmap/chapter/api/query/useChapterDetails.query";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { chapterQueryKeys } from "@/entities/roadmap/chapter/api/query/chapterQueryKeys";
import { useResetChapterMutation } from "@/entities/roadmap/chapter";
import type {
  GetChapterDetailsResponse,
  GetSectionDetailsResponse,
  SectionChapter,
} from "@/entities/roadmap/chapter/model/chapter.types";
import { getErrorMessage } from "@/shared/lib";

const isSameSectionChapter = (chapter: SectionChapter, chapterId: number) =>
  chapter.id === chapterId || chapter.chapterId === chapterId;

const resetChapterDetails = (
  chapter: GetChapterDetailsResponse
): GetChapterDetailsResponse => ({
  ...chapter,
  currentQuestionIndex: 0,
  correctCount: 0,
  isCleared: false,
});

const resetSectionDetails = (
  sectionDetails: GetSectionDetailsResponse,
  chapterId: number
): GetSectionDetailsResponse => {
  const targetChapter = sectionDetails.chapters.find(chapter =>
    isSameSectionChapter(chapter, chapterId)
  );

  return {
    ...sectionDetails,
    currentChapterId: chapterId,
    currentOrderIndex: targetChapter?.orderIndex ?? sectionDetails.currentOrderIndex,
    chapters: sectionDetails.chapters.map(chapter =>
      isSameSectionChapter(chapter, chapterId)
        ? {
            ...chapter,
            completedMissions: 0,
          }
        : chapter
    ),
  };
};

export const useChapter = (sectionId: number) => {
  const queryClient = useQueryClient();
  const domain = useChapterDomain(sectionId);
  const view = useChapterView({
    loading: domain.loading,
    sectionId,
    sectionCompleted: domain.sectionCompleted,
  });
  const resetChapterMutation = useResetChapterMutation();
  const currentStageId = domain.currentStageId;
  const [resetOnOpenState, setResetOnOpenState] = useState({
    isLoading: false,
    error: null as string | null,
  });
  const lastResetDetailKeyRef = useRef<string | null>(null);
  const resetChapterAsync = useEffectEvent((chapterId: number) =>
    resetChapterMutation.mutateAsync({ chapterId })
  );

  const chapterDetailsQuery = useChapterDetailsQuery(currentStageId, {
    enabled: view.missionModalOpen,
  });

  const isCurrentStageCompleted =
    chapterDetailsQuery.data?.isCleared ??
    (domain.currentStage.status === "completed" ||
      (domain.currentStage.totalMissions > 0 &&
        domain.currentStage.currentProgress >= domain.currentStage.totalMissions));

  const resetDetailKey =
    view.missionModalOpen && !view.currentMission && currentStageId > 0 && !isCurrentStageCompleted
      ? `${sectionId}:${currentStageId}`
      : null;

  useEffect(() => {
    if (view.missionModalOpen) return;

    lastResetDetailKeyRef.current = null;
    setResetOnOpenState({
      isLoading: false,
      error: null,
    });
  }, [view.missionModalOpen]);

  useEffect(() => {
    if (!resetDetailKey) return;
    if (lastResetDetailKeyRef.current === resetDetailKey) return;

    const chapterId = currentStageId;
    let cancelled = false;

    lastResetDetailKeyRef.current = resetDetailKey;

    const resetChapterOnDetailOpen = async () => {
      setResetOnOpenState({
        isLoading: true,
        error: null,
      });

      try {
        const response = await resetChapterAsync(chapterId);

        if (!response.success) {
          throw new Error(response.message ?? "챕터 초기화에 실패했습니다.");
        }

        queryClient.setQueryData<GetChapterDetailsResponse>(
          chapterQueryKeys.chapterDetails(chapterId),
          old => (old ? resetChapterDetails(old) : old)
        );

        queryClient.setQueryData<GetSectionDetailsResponse>(
          chapterQueryKeys.sectionDetails(sectionId),
          old => (old ? resetSectionDetails(old, chapterId) : old)
        );

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: chapterQueryKeys.chapterDetails(chapterId),
          }),
          queryClient.invalidateQueries({
            queryKey: chapterQueryKeys.sectionDetails(sectionId),
          }),
        ]);

        if (cancelled) return;

        setResetOnOpenState({
          isLoading: false,
          error: null,
        });
      } catch (error: unknown) {
        if (cancelled) return;

        setResetOnOpenState({
          isLoading: false,
          error: getErrorMessage(error, "챕터 초기화에 실패했습니다."),
        });
      }
    };

    void resetChapterOnDetailOpen();

    return () => {
      cancelled = true;
    };
  }, [currentStageId, queryClient, resetDetailKey, sectionId]);

  const currentStageMissions = useMemo(() => {
    const chapter = chapterDetailsQuery.data;

    if (!chapter) return [];

    const orderedQuestions = [...chapter.questions].sort((a, b) => a.orderIndex - b.orderIndex);

    return [
      {
        id: chapter.chapterId,
        title: "문제 풀기",
        completed: chapter.isCleared,
        currentQuestionIndex: chapter.currentQuestionIndex,
        correctCount: chapter.correctCount,
        studyMaterialUrl: chapter.studyMaterialUrl,
        questions: orderedQuestions.map(question => ({
          id: question.questionId,
          content: question.content,
          explanation: question.explanation,
          orderIndex: question.orderIndex,
          difficulty: question.difficulty,
          choices: question.choices.map(choice => ({
            id: choice.choiceId,
            content: choice.content,
          })),
        })),
      } satisfies Mission,
    ];
  }, [chapterDetailsQuery.data]);

  const currentStage = useMemo(() => {
    const chapter = chapterDetailsQuery.data;

    if (!chapter) return domain.currentStage;

    const currentProgress = chapter.isCleared
      ? chapter.totalQuestions
      : chapter.currentQuestionIndex;

    return {
      ...domain.currentStage,
      currentProgress,
      totalMissions: chapter.totalQuestions,
    };
  }, [chapterDetailsQuery.data, domain.currentStage]);

  const currentStageDetailsError =
    resetOnOpenState.error ??
    (chapterDetailsQuery.error instanceof Error ? chapterDetailsQuery.error.message : null);
  const hasCurrentStageDetails = Boolean(chapterDetailsQuery.data);
  const isCurrentStageInitialLoading =
    !hasCurrentStageDetails && (chapterDetailsQuery.isLoading || resetOnOpenState.isLoading);

  const handlers = useChapterHandlers({
    stages: domain.stages,
    setStageOverrides: domain.setStageOverrides,
    currentStageId,
    currentStageTitle: currentStage.title,
    setCurrentStageId: domain.setCurrentStageId,
    currentStageMissions,
    setCurrentMission: view.setCurrentMission,
    setCurrentMissionStageTitle: view.setCurrentMissionStageTitle,
    setMissionModalOpen: view.setMissionModalOpen,
  });

  return {
    chapterRef: view.chapterRef,
    chapterScrollProps: view.chapterScrollProps,
    domain: {
      roadmapNodes: domain.roadmapNodes,
      currentStage,
      currentStageDescription: chapterDetailsQuery.data?.description ?? null,
      currentStageStudyMaterialUrl: chapterDetailsQuery.data?.studyMaterialUrl ?? null,
      currentStageMissions,
      currentStageMissionsLoading: isCurrentStageInitialLoading,
      currentStageDetailsLoading: isCurrentStageInitialLoading,
      currentStageDetailsError,
      sectionCompleted: domain.sectionCompleted,
      sectionTitle: domain.sectionTitle,
      completedChapters: domain.completedChapters,
      totalChapters: domain.totalChapters,
      loading: domain.loading,
      error: domain.error,
    },
    view: {
      currentMission: view.currentMission,
      currentMissionStageTitle: view.currentMissionStageTitle,
      missionModalOpen: view.missionModalOpen,
    },
    handlers: {
      handleMissionClick: handlers.handleMissionClick,
      handleMissionComplete: handlers.handleMissionComplete,
      handleSelectStage: handlers.handleSelectStage,
      handleStartCurrentStageMission: handlers.handleStartCurrentStageMission,
      handleCloseMissionPanel: handlers.handleCloseMissionPanel,
      handleCloseQuizModal: handlers.handleCloseQuizModal,
    },
  };
};
