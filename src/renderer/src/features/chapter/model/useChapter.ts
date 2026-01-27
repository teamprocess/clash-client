import { useEffect, useRef, useState } from "react";
import { Stage, Mission, StageStatus } from "@/features/chapter/mocks/missionData";
import {
  Node,
  NodeStatus,
  roadmapNodes as initialRoadmapNodes,
} from "@/features/chapter/roadmapData";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import {
  GetChapterDetailsRequest,
  GetSectionDetailsResponse,
} from "@/entities/roadmap/chapter/model/chapter.types";

const transformChapterData = (serverData: GetSectionDetailsResponse): Stage[] => {
  return serverData.chapters.map(chapter => {
    let status: StageStatus;

    if (chapter.id === serverData.currentChapterId) {
      status = "current";
    } else if (chapter.orderIndex < serverData.currentOrderIndex!) {
      status = "completed";
    } else {
      status = "locked";
    }

    return {
      id: chapter.id,
      orderIndex: chapter.orderIndex,
      title: chapter.title,
      status,
      currentProgress: chapter.completedMissions,
      totalMissions: chapter.totalMissions,
      missions: [],
    };
  });
};

export const useChapter = (sectionId: number) => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const [stages, setStages] = useState<Stage[]>([]);
  const [roadmapNodes, setRoadmapNodes] = useState<Node[]>(initialRoadmapNodes);
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [sectionTitle, setSectionTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const response = await chapterApi.getSectionDetails({ sectionId });

        if (response.success && response.data) {
          const transformedStages = transformChapterData(response.data);
          setStages(transformedStages);
          setSectionTitle(response.data.sectionTitle);

          const currentChapter = transformedStages.find(stage => stage.status === "current");
          setCurrentStageId(currentChapter?.id ?? transformedStages[0]?.id ?? 1);

          setRoadmapNodes(prev =>
            prev.map((node, index) => {
              if (index < transformedStages.length) {
                return {
                  ...node,
                  id: transformedStages[index].id,
                  orderIndex: index + 1,
                  status: transformedStages[index].status as NodeStatus,
                };
              }
              return node;
            })
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chapter data");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [sectionId]);

  const currentStage = stages.find(stage => stage.id === currentStageId) || {
    id: 0,
    title: "",
    status: "locked" as const,
    currentProgress: 0,
    totalMissions: 0,
    missions: [],
  };

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
    if (!chapterRef.current || loading) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, [loading]);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;

    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  });

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
            if (node.id === currentStageId) return { ...node, status: "completed" as NodeStatus };
            if (node.id === nextStageId) return { ...node, status: "current" as NodeStatus };
            return node;
          })
        );
      }

      return updated;
    });
  };

  const handleSelectStage = async (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    const node = roadmapNodes.find(n => n.id === stageId);
    if (!stage || !node || node.status === "locked") return;

    setCurrentStageId(stageId);

    await handleChapterClick({ chapterId: stageId });
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

  return {
    chapterRef,
    stages,
    roadmapNodes,
    currentStage,
    currentMission,
    modalOpen,
    loading,
    error,
    sectionTitle,
    setModalOpen,
    setCurrentMission,
    handleMissionClick,
    handleMissionComplete,
    handleSelectStage,
    handleChapterClick,
  };
};
