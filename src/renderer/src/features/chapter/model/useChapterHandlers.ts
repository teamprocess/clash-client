import type { Dispatch, SetStateAction } from "react";
import type { Stage, Mission, StageStatus } from "@/features/chapter/model/chapter.types";
import type { Node, NodeStatus } from "@/features/chapter/roadmapData";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { GetChapterDetailsRequest } from "@/entities/roadmap/chapter/model/chapter.types";

interface UseChapterHandlersParams {
  stages: Stage[];
  setStages: Dispatch<SetStateAction<Stage[]>>;
  roadmapNodes: Node[];
  setRoadmapNodes: Dispatch<SetStateAction<Node[]>>;
  currentStageId: number;
  setCurrentStageId: Dispatch<SetStateAction<number>>;
  currentStage: Stage;
  setCurrentMission: Dispatch<SetStateAction<Mission | null>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setMissionModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useChapterHandlers = ({
  stages,
  setStages,
  roadmapNodes,
  setRoadmapNodes,
  currentStageId,
  setCurrentStageId,
  currentStage,
  setCurrentMission,
  setModalOpen,
  setMissionModalOpen,
}: UseChapterHandlersParams) => {
  const handleCloseQuizModal = () => {
    setModalOpen(false);
    setCurrentMission(null);
  };

  const handleMissionClick = (missionId: number) => {
    const mission = currentStage.missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    setCurrentMission(mission);
    setModalOpen(true);
  };

  const handleMissionComplete = (missionId: number) => {
    setStages(prevStages => {
      let nextStageId: number | null = null;

      const updated = prevStages.map((stage, index) => {
        if (stage.id !== currentStageId) return stage;

        const updatedMissions = stage.missions.map(m =>
          m.id === missionId ? { ...m, completed: true } : m
        );

        const completedCount = updatedMissions.filter(m => m.completed).length;
        const isStageCompleted = completedCount === stage.totalMissions;

        if (isStageCompleted) {
          nextStageId = prevStages[index + 1]?.id ?? null;
        }

        const nextStatus: StageStatus = isStageCompleted ? "completed" : stage.status;

        return {
          ...stage,
          missions: updatedMissions,
          currentProgress: completedCount,
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

  const handleChapterClick = async (data: GetChapterDetailsRequest) => {
    try {
      const result = await chapterApi.getChapterDetails({
        chapterId: data.chapterId,
      });
      if (result.success) {
        const chapter = result.data;
        if (chapter == null) return;
        setStages(prev =>
          prev.map(stage => {
            if (stage.id != chapter.chapterId) return stage;
            return {
              ...stage,
              missions: chapter.missions,
            } as Stage;
          })
        );
      }
    } catch (error: unknown) {
      console.error("미션 정보를 불러오는데 실패했습니다.", error);
    }
  };

  const handleSelectStage = async (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;

    setCurrentStageId(stageId);
    setMissionModalOpen(true);

    await handleChapterClick({ chapterId: stageId });
  };

  return {
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
    handleCloseQuizModal,
  };
};
