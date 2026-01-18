import { useEffect, useRef, useState } from "react";
import { Stage, Mission, StageStatus } from "@/features/chapter/mocks/missionData";
import { roadmapNodes as initialRoadmapNodes } from "@/features/chapter/roadmapData";

export const useChapter = (initialStages: Stage[]) => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [roadmapNodes, setRoadmapNodes] = useState(initialRoadmapNodes);
  const [currentStageId, setCurrentStageId] = useState<number>(1);

  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentStage = stages.find(stage => stage.id === currentStageId)!;

  const handleMissionClick = (missionId: number) => {
    const mission = currentStage.missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    setCurrentMission(mission);
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const container = chapterRef.current;
    const child = container.childNodes.item(0) as HTMLDivElement;

    const scrolledSize = container.scrollTop + container.offsetHeight;
    const canScroll = scrolledSize <= container.scrollHeight - child.offsetWidth;

    if (!canScroll) {
      container.scrollTo(
        container.scrollWidth,
        container.scrollHeight - container.offsetHeight - child.offsetWidth
      );
    }
  };

  useEffect(() => {
    if (!chapterRef.current) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;

    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        setCurrentStageId(nextStageId);
        setRoadmapNodes(prev =>
          prev.map(node => {
            if (node.id === currentStageId) return { ...node, status: "completed" as const };
            if (node.id === nextStageId) return { ...node, status: "current" as const };
            return node;
          })
        );
      }

      return updated;
    });
  };

  const handleSelectStage = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;

    setCurrentStageId(stageId);
  };

  return {
    chapterRef,
    stages,
    roadmapNodes,
    currentStage,
    currentMission,
    modalOpen,
    setModalOpen,
    setCurrentMission,
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
  };
};
