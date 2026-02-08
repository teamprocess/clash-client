import { useEffect, useState } from "react";
import type { Stage, StageStatus } from "@/features/chapter/model/chapter.types";
import type { Node, NodeStatus } from "@/features/chapter/roadmapData";
import { roadmapNodes as initialRoadmapNodes } from "@/features/chapter/roadmapData";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { GetSectionDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";

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

const EMPTY_STAGE: Stage = {
  id: 0,
  orderIndex: 0,
  title: "",
  status: "locked",
  currentProgress: 0,
  totalMissions: 0,
  missions: [],
};

export const useChapterDomain = (sectionId: number) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [roadmapNodes, setRoadmapNodes] = useState<Node[]>(initialRoadmapNodes);
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [sectionTitle, setSectionTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const currentStage = stages.find(stage => stage.id === currentStageId) ?? EMPTY_STAGE;

  return {
    stages,
    setStages,
    roadmapNodes,
    setRoadmapNodes,
    currentStageId,
    setCurrentStageId,
    currentStage,
    sectionTitle,
    loading,
    error,
  };
};
