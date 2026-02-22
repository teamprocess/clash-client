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
  /** 챕터 상세 API의 missions 응답은 정렬/완료 여부 필드가 항상 일관되지 않을 수 화있어,
   화면에서 사용할 형태로 "정렬 + 완료 여부 정규화" 후 반환
   - 정렬: orderIndex가 있으면 오름차순(없으면 뒤로)
    - 완료: completed / isCleared / isMissionCleared / cleared 또는 진행도(currentProgress) 기준*/
  const currentStageMissions = useMemo(() => {
    const missions = (chapterDetailsQuery.data?.missions ?? []) as Mission[];
    // completedMissions(= currentProgress)만 내려오는 경우, 앞에서부터 N개를 완료 처리
    const completedCount = Math.max(0, domain.currentStage.currentProgress ?? 0);

    const orderedMissions = [...missions].sort((a, b) => {
      // orderIndex가 number/string/undefined 등으로 올 수 있어, 정렬 가능한 number로 정규화
      const getOrderIndex = (mission: Mission) => {
        const raw = (mission as Mission & { orderIndex?: unknown }).orderIndex;
        const num = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
        return Number.isFinite(num) ? num : null;
      };

      const aOrder = getOrderIndex(a);
      const bOrder = getOrderIndex(b);

      // orderIndex가 없는 미션은 뒤로 보내고, 둘 다 없으면 원래 순서를 유지
      if (aOrder == null && bOrder == null) return 0;
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      return aOrder - bOrder;
    });

    return orderedMissions.map((mission, index) => {
      // 서버가 완료 여부를 다른 키(isCleared/isMissionCleared/cleared)로 내려주는 케이스 호환
      const maybeMission = mission as Mission & {
        isCleared?: boolean;
        isMissionCleared?: boolean;
        cleared?: boolean;
      };

      // 완료 조건: 서버 필드 우선 + 진행도 기반 fallback(순서대로 완료된 것으로 간주)
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
