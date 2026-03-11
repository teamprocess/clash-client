import { useRef, type Dispatch, type SetStateAction } from "react";
import type { Stage, Mission, StageStatus } from "@/features/chapter/model/chapter.types";
import type { Node, NodeStatus } from "@/features/chapter/roadmapData";
import { useQueryClient } from "@tanstack/react-query";
import type { GetChapterDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "@/entities/roadmap/chapter/api/query/chapterQueryKeys";

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

  const handleCloseMissionPanel = () => {
    setMissionModalOpen(false);
  };

  const handleMissionClick = (missionId: number) => {
    if (isOpeningMissionRef.current) return;

    const mission = currentStageMissions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    isOpeningMissionRef.current = true;
    setCurrentMission(mission);
    setModalOpen(true);
    isOpeningMissionRef.current = false;
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
          isCleared: true,
          correctCount: old.totalQuestions,
          currentQuestionIndex: old.totalQuestions > 0 ? old.totalQuestions - 1 : 0,
        };
      }
    );

    setStages(prevStages => {
      let nextStageId: number | null = null;

      const updated = prevStages.map((stage, index) => {
        if (stage.id !== currentStageId) return stage;

        const isStageCompleted = true;

        if (isStageCompleted) {
          nextStageId = prevStages[index + 1]?.id ?? null;
        }

        return {
          ...stage,
          currentProgress: stage.totalMissions,
          status: "completed" as StageStatus,
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

  const handleSelectStage = (stageId: number) => {
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
    handleCloseMissionPanel,
    handleCloseQuizModal,
  };
};
