import { useEffect, useState } from "react";
import type { Stage, StageStatus } from "@/features/chapter/model/chapter.types";
import type { Node, NodeStatus } from "@/features/chapter/roadmapData";
import { roadmapNodes as initialRoadmapNodes } from "@/features/chapter/roadmapData";
import type { GetSectionDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { useSectionDetailsQuery } from "@/entities/roadmap/chapter/api/query/useSectionDetails.query";

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
  const { data: sectionDetails, isLoading, error } = useSectionDetailsQuery(sectionId);

  useEffect(() => {
    const applySectionDetails = async () => {
      if (!sectionDetails) return;

      const transformedStages = transformChapterData(sectionDetails);
      setStages(transformedStages);
      setSectionTitle(sectionDetails.sectionTitle);

      const currentChapter = transformedStages.find(stage => stage.status === "current");
      setCurrentStageId(currentChapter?.id ?? transformedStages[0]?.id ?? 1);

      setRoadmapNodes(
        initialRoadmapNodes.map((node, index) => {
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
    };

    void applySectionDetails();
  }, [sectionDetails]);

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
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
};
