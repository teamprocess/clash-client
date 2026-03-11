import { useChapterDomain } from "./useChapterDomain";
import { useChapterHandlers } from "./useChapterHandlers";
import { useChapterView } from "./useChapterView";
import { useChapterDetailsQuery } from "@/entities/roadmap/chapter/api/query/useChapterDetails.query";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { useMemo } from "react";

export const useChapter = (sectionId: number) => {
  const domain = useChapterDomain(sectionId);
  const view = useChapterView({ loading: domain.loading, sectionId });

  const chapterDetailsQuery = useChapterDetailsQuery(domain.currentStageId, {
    enabled: view.missionModalOpen,
  });

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

  const handlers = useChapterHandlers({
    ...domain,
    ...view,
    currentStageMissions,
  });

  return {
    chapterRef: view.chapterRef,
    domain: {
      roadmapNodes: domain.roadmapNodes,
      currentStage,
      currentStageDescription: chapterDetailsQuery.data?.description ?? null,
      currentStageMissions,
      currentStageMissionsLoading: chapterDetailsQuery.isLoading,
      currentStageDetailsLoading: chapterDetailsQuery.isLoading,
      currentStageDetailsError:
        chapterDetailsQuery.error instanceof Error ? chapterDetailsQuery.error.message : null,
      sectionTitle: domain.sectionTitle,
      loading: domain.loading,
      error: domain.error,
    },
    view: {
      currentMission: view.currentMission,
      modalOpen: view.modalOpen,
      missionModalOpen: view.missionModalOpen,
    },
    handlers: {
      handleMissionClick: handlers.handleMissionClick,
      handleMissionComplete: handlers.handleMissionComplete,
      handleSelectStage: handlers.handleSelectStage,
      handleCloseMissionPanel: handlers.handleCloseMissionPanel,
      handleCloseQuizModal: handlers.handleCloseQuizModal,
    },
  };
};
