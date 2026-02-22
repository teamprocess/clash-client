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
    const missions = (chapterDetailsQuery.data?.missions ?? []) as Mission[];
    const completedCount = Math.max(0, domain.currentStage.currentProgress ?? 0);

    const orderedMissions = [...missions].sort((a, b) => {
      const aOrder = (a as Mission & { orderIndex?: number }).orderIndex;
      const bOrder = (b as Mission & { orderIndex?: number }).orderIndex;

      if (typeof aOrder === "number" && typeof bOrder === "number") return aOrder - bOrder;
      return 0;
    });

    return orderedMissions.map((mission, index) => {
      const maybeMission = mission as Mission & {
        isCleared?: boolean;
        isMissionCleared?: boolean;
        cleared?: boolean;
      };

      const completed =
        Boolean(mission.completed) ||
        maybeMission.isCleared === true ||
        maybeMission.isMissionCleared === true ||
        maybeMission.cleared === true ||
        index < completedCount;

      return { ...mission, completed };
    });
  }, [chapterDetailsQuery.data?.missions, domain.currentStage.currentProgress]);
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
