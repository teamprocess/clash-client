import { useChapterDomain } from "./useChapterDomain";
import { useChapterHandlers } from "./useChapterHandlers";
import { useChapterView } from "./useChapterView";
import { useChapterDetailsQuery } from "@/entities/roadmap/chapter/api/query/useChapterDetails.query";
import type { Mission } from "@/features/chapter/model/chapter.types";

export const useChapter = (sectionId: number) => {
  const domain = useChapterDomain(sectionId);
  const view = useChapterView({ loading: domain.loading, sectionId });
  const chapterDetailsQuery = useChapterDetailsQuery(domain.currentStageId, {
    enabled: view.missionModalOpen,
  });
  const currentStageMissions = (chapterDetailsQuery.data?.missions ?? []) as Mission[];
  const handlers = useChapterHandlers({ ...domain, ...view, currentStageMissions });

  return {
    chapterRef: view.chapterRef,
    domain: {
      roadmapNodes: domain.roadmapNodes,
      currentStage: domain.currentStage,
      currentStageMissions,
      currentStageMissionsLoading: chapterDetailsQuery.isLoading,
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
      handleCloseQuizModal: handlers.handleCloseQuizModal,
    },
  };
};
