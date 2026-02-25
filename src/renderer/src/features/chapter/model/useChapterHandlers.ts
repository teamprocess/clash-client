import { useRef, type Dispatch, type SetStateAction } from "react";
import type { Stage, Mission, StageStatus } from "@/features/chapter/model/chapter.types";
import type { Node, NodeStatus } from "@/features/chapter/roadmapData";
import { useQueryClient } from "@tanstack/react-query";
import type { GetChapterDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "@/entities/roadmap/chapter/api/query/chapterQueryKeys";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import { getErrorMessage } from "@/shared/lib";

type UseChapterHandlersParams = {
  stages: Stage[];
  setStages: Dispatch<SetStateAction<Stage[]>>;
  roadmapNodes: Node[];
  setRoadmapNodes: Dispatch<SetStateAction<Node[]>>;
  currentStageId: number;
  setCurrentStageId: Dispatch<SetStateAction<number>>;
  currentStageMissions: Mission[];
  setCurrentMission: Dispatch<SetStateAction<Mission | null>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setMissionModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useChapterHandlers = ({
  stages,
  setStages,
  roadmapNodes,
  setRoadmapNodes,
  currentStageId,
  setCurrentStageId,
  currentStageMissions,
  setCurrentMission,
  setModalOpen,
  setMissionModalOpen,
}: UseChapterHandlersParams) => {
  const queryClient = useQueryClient();
  const isOpeningMissionRef = useRef(false);

  const handleCloseQuizModal = () => {
    setModalOpen(false);
    setCurrentMission(null);
  };

  const handleMissionClick = async (missionId: number) => {
    if (isOpeningMissionRef.current) return;

    const mission = currentStageMissions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    isOpeningMissionRef.current = true;
    try {
      const response = await chapterApi.resetMission({
        missionId: mission.id,
      });
      if (!response.success) {
        console.error("미션 초기화에 실패했습니다.", response.message);
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "미션 초기화 요청에 실패했습니다.");
      console.error("미션 초기화 요청에 실패했습니다.", errorMessage, error);
    } finally {
      isOpeningMissionRef.current = false;
      setCurrentMission(mission);
      setModalOpen(true);
    }
  };

  const handleMissionComplete = (missionId: number) => {
    const mission = currentStageMissions.find(m => m.id === missionId);
    if (mission?.completed) return;

    queryClient.setQueryData<GetChapterDetailsResponse>(
      chapterQueryKeys.chapterDetails(currentStageId),
      old => {
        if (!old) return old;
        return {
          ...old,
          missions: old.missions.map(m => (m.id === missionId ? { ...m, completed: true } : m)),
        };
      }
    );

    setStages(prevStages => {
      let nextStageId: number | null = null;

      const updated = prevStages.map((stage, index) => {
        if (stage.id !== currentStageId) return stage;

        const nextProgress = Math.min(stage.currentProgress + 1, stage.totalMissions);
        const isStageCompleted = nextProgress === stage.totalMissions;

        if (isStageCompleted) {
          nextStageId = prevStages[index + 1]?.id ?? null;
        }

        const nextStatus: StageStatus = isStageCompleted ? "completed" : stage.status;

        return {
          ...stage,
          currentProgress: nextProgress,
          status: nextStatus,
        };
      });

      if (nextStageId !== null) {
        const updatedWithNextStage = updated.map(stage => {
          if (stage.id !== nextStageId) return stage;
          return { ...stage, status: "current" as StageStatus };
        });

        setCurrentStageId(nextStageId);
        setRoadmapNodes(prev =>
          prev.map(node => {
            if (node.id === currentStageId) return { ...node, status: "completed" as NodeStatus };
            if (node.id === nextStageId) return { ...node, status: "current" as NodeStatus };
            return node;
          })
        );

        return updatedWithNextStage;
      }

      return updated;
    });
  };

  const handleSelectStage = async (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;

    setCurrentStageId(stageId);
    setMissionModalOpen(true);
  };

  return {
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
    handleCloseQuizModal,
  };
};
