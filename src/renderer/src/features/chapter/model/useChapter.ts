import { useChapterDomain } from "./useChapterDomain";
import { useChapterHandlers } from "./useChapterHandlers";
import { useChapterView } from "./useChapterView";
import { useChapterDetailsQuery } from "@/entities/roadmap/chapter/api/query/useChapterDetails.query";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { useMemo } from "react";

export const useChapter = (sectionId: number) => {
  const domain = useChapterDomain(sectionId);
  const view = useChapterView({ loading: domain.loading, sectionId });

  // 모달 열릴 때만 상세 조회
  const chapterDetailsQuery = useChapterDetailsQuery(domain.currentStageId, {
    enabled: view.missionModalOpen,
  });

  // missions 응답이 일정하지 않아서 여기서 한 번 정리
  const currentStageMissions = useMemo(() => {
    const missions = (chapterDetailsQuery.data?.missions ?? []) as Mission[];

    // 완료 개수만 내려오는 경우 대비
    const completedCount = Math.max(0, domain.currentStage.currentProgress ?? 0);

    const getOrderIndex = (mission: Mission) => {
      const raw = (mission as Mission & { orderIndex?: unknown }).orderIndex;
      const num = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;

      return Number.isFinite(num) ? num : null;
    };

    const orderedMissions = [...missions].sort((a, b) => {
      const aOrder = getOrderIndex(a);
      const bOrder = getOrderIndex(b);

      // orderIndex 있는 것만 우선 정렬
      if (aOrder == null && bOrder == null) return 0;
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      return aOrder - bOrder;
    });

    return orderedMissions.map((mission, index) => {
      const maybeMission = mission as Mission & {
        isCleared?: boolean;
        isMissionCleared?: boolean;
        cleared?: boolean;
      };

      // 완료 플래그가 제각각이라 여기서 통합
      const completed =
        Boolean(mission.completed) ||
        maybeMission.isCleared === true ||
        maybeMission.isMissionCleared === true ||
        maybeMission.cleared === true ||
        index < completedCount;

      return { ...mission, completed };
    });
  }, [chapterDetailsQuery.data?.missions, domain.currentStage.currentProgress]);

  const handlers = useChapterHandlers({
    ...domain,
    ...view,
    currentStageMissions,
  });

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
