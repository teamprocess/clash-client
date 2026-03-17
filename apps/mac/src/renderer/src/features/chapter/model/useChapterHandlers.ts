import { useRef, type Dispatch, type SetStateAction } from "react";
import type { Stage, Mission, StageStatus } from "@/features/chapter/model/chapter.types";
import { useQueryClient } from "@tanstack/react-query";
import type { GetChapterDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "@/entities/roadmap/chapter/api/query/chapterQueryKeys";

type StageOverride = Partial<Pick<Stage, "status" | "currentProgress">>;

type UseChapterHandlersParams = {
  stages: Stage[];
  setStageOverrides: Dispatch<SetStateAction<Record<number, StageOverride>>>;
  currentStageId: number;
  currentStageTitle: string;
  setCurrentStageId: Dispatch<SetStateAction<number>>;
  currentStageMissions: Mission[];
  setCurrentMission: Dispatch<SetStateAction<Mission | null>>;
  setCurrentMissionStageTitle: Dispatch<SetStateAction<string | null>>;
  setMissionModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const useChapterHandlers = ({
  stages,
  setStageOverrides,
  currentStageId,
  currentStageTitle,
  setCurrentStageId,
  currentStageMissions,
  setCurrentMission,
  setCurrentMissionStageTitle,
  setMissionModalOpen,
}: UseChapterHandlersParams) => {
  const queryClient = useQueryClient();
  const isOpeningMissionRef = useRef(false);

  const openMission = (mission: Mission) => {
    setMissionModalOpen(true);
    setCurrentMissionStageTitle(currentStageTitle);
    setCurrentMission(mission);
  };

  const handleCloseQuizModal = () => {
    setCurrentMission(null);
    setCurrentMissionStageTitle(null);
  };

  const handleCloseMissionPanel = () => {
    setCurrentMission(null);
    setCurrentMissionStageTitle(null);
    setMissionModalOpen(false);
  };

  const handleMissionClick = (missionId: number) => {
    if (isOpeningMissionRef.current) return;

    const mission = currentStageMissions.find(m => m.id === missionId);
    if (!mission) return;

    isOpeningMissionRef.current = true;
    openMission(mission);
    isOpeningMissionRef.current = false;
  };

  const handleStartCurrentStageMission = () => {
    const mission = currentStageMissions[0];
    if (!mission || isOpeningMissionRef.current) return;

    isOpeningMissionRef.current = true;
    openMission(mission);
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

    const currentStageIndex = stages.findIndex(stage => stage.id === currentStageId);
    const currentStage = currentStageIndex >= 0 ? stages[currentStageIndex] : null;
    const nextStageId = currentStageIndex >= 0 ? (stages[currentStageIndex + 1]?.id ?? null) : null;

    if (!currentStage) {
      return;
    }

    setStageOverrides(prev => {
      const nextOverrides: Record<number, StageOverride> = {
        ...prev,
        [currentStageId]: {
          ...prev[currentStageId],
          currentProgress: currentStage.totalMissions,
          status: "completed" as StageStatus,
        },
      };

      if (nextStageId !== null) {
        nextOverrides[nextStageId] = {
          ...prev[nextStageId],
          status: "current" as StageStatus,
        };
      }

      return nextOverrides;
    });

    if (nextStageId !== null) {
      setCurrentStageId(nextStageId);
    }
  };

  const handleSelectStage = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage || stage.status === "locked") return;

    setCurrentStageId(stageId);
    setCurrentMissionStageTitle(null);
    setMissionModalOpen(true);
  };

  return {
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
    handleStartCurrentStageMission,
    handleCloseMissionPanel,
    handleCloseQuizModal,
  };
};
