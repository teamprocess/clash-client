import { useMemo, useState } from "react";
import type { Stage, StageStatus } from "@/features/chapter/model/chapter.types";
import type { NodeStatus } from "@/features/chapter/roadmapData";
import { roadmapNodes as initialRoadmapNodes } from "@/features/chapter/roadmapData";
import type {
  GetSectionDetailsResponse,
  SectionChapter,
} from "@/entities/roadmap/chapter/model/chapter.types";
import { useSectionDetailsQuery } from "@/entities/roadmap/chapter/api/query/useSectionDetails.query";

type NormalizedSectionChapter = {
  stageId: number;
  serverChapterId: number | null;
  title: string;
  orderIndex: number;
  completedMissions: number;
  totalMissions: number;
  description: string | null;
};

const resolveServerChapterId = (chapter: SectionChapter) => {
  if (typeof chapter.id === "number" && chapter.id > 0) {
    return chapter.id;
  }

  if (typeof chapter.chapterId === "number" && chapter.chapterId > 0) {
    return chapter.chapterId;
  }

  return null;
};

const normalizeChapters = (chapters: SectionChapter[]): NormalizedSectionChapter[] =>
  [...chapters]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((chapter, index) => {
      const serverChapterId = resolveServerChapterId(chapter);

      return {
        stageId: serverChapterId ?? -(index + 1),
        serverChapterId,
        title: chapter.title,
        orderIndex: chapter.orderIndex,
        completedMissions: Math.max(chapter.completedMissions ?? 0, 0),
        totalMissions: Math.max(chapter.totalMissions ?? 0, 0),
        description: chapter.description ?? null,
      };
    });

const isChapterCompleted = (chapter: NormalizedSectionChapter) =>
  chapter.totalMissions > 0 && chapter.completedMissions >= chapter.totalMissions;

const resolveCurrentChapterId = (
  serverData: GetSectionDetailsResponse,
  chapters: NormalizedSectionChapter[]
) => {
  const hasValidCurrentChapter =
    typeof serverData.currentChapterId === "number" &&
    serverData.currentChapterId > 0 &&
    chapters.some(chapter => chapter.serverChapterId === serverData.currentChapterId);

  if (hasValidCurrentChapter) {
    return (
      chapters.find(chapter => chapter.serverChapterId === serverData.currentChapterId)?.stageId ??
      null
    );
  }

  return (
    chapters.find(chapter => !isChapterCompleted(chapter))?.stageId ?? chapters[0]?.stageId ?? null
  );
};

const resolveCurrentOrderIndex = (
  serverData: GetSectionDetailsResponse,
  chapters: NormalizedSectionChapter[],
  currentChapterId: number | null
) => {
  if (typeof serverData.currentOrderIndex === "number" && serverData.currentOrderIndex >= 0) {
    return serverData.currentOrderIndex;
  }

  return chapters.find(chapter => chapter.stageId === currentChapterId)?.orderIndex ?? -1;
};

const resolveChapterStatus = (
  chapter: NormalizedSectionChapter,
  currentChapterId: number | null,
  currentOrderIndex: number
): StageStatus => {
  if (chapter.stageId === currentChapterId) {
    return "current";
  }

  if (isChapterCompleted(chapter) || chapter.orderIndex < currentOrderIndex) {
    return "completed";
  }

  return "locked";
};

const transformChapterData = (serverData: GetSectionDetailsResponse): Stage[] => {
  const chapters = normalizeChapters(serverData.chapters);
  const currentChapterId = resolveCurrentChapterId(serverData, chapters);
  const currentOrderIndex = resolveCurrentOrderIndex(serverData, chapters, currentChapterId);

  return chapters.map(chapter => ({
    id: chapter.stageId,
    orderIndex: chapter.orderIndex,
    title: chapter.title,
    status: resolveChapterStatus(chapter, currentChapterId, currentOrderIndex),
    currentProgress: chapter.completedMissions,
    totalMissions: chapter.totalMissions,
    missions: [],
  }));
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

type StageOverride = Partial<Pick<Stage, "status" | "currentProgress">>;

const isStageCompleted = (stage: Stage, override?: StageOverride) => {
  const resolvedStatus = override?.status ?? stage.status;

  if (resolvedStatus === "completed") {
    return true;
  }

  const progress = override?.currentProgress ?? stage.currentProgress;

  return stage.totalMissions > 0 && progress >= stage.totalMissions;
};

export const useChapterDomain = (sectionId: number) => {
  const [stageOverrides, setStageOverrides] = useState<Record<number, StageOverride>>({});
  const [currentStageIdOverride, setCurrentStageId] = useState<number>(0);
  const { data: sectionDetails, isLoading, error } = useSectionDetailsQuery(sectionId);

  const baseStages = useMemo(
    () => (sectionDetails ? transformChapterData(sectionDetails) : []),
    [sectionDetails]
  );

  const stages = useMemo(
    () =>
      baseStages.map(stage => {
        const override = stageOverrides[stage.id];
        return override ? { ...stage, ...override } : stage;
      }),
    [baseStages, stageOverrides]
  );

  const roadmapNodes = useMemo(
    () =>
      initialRoadmapNodes.slice(0, stages.length).map((node, index) => ({
        ...node,
        id: stages[index].id,
        orderIndex: stages[index].orderIndex,
        status: stages[index].status as NodeStatus,
      })),
    [stages]
  );

  const fallbackStageId =
    stages.find(stage => stage.status === "current")?.id ??
    [...stages].reverse().find(stage => stage.status === "completed")?.id ??
    stages[0]?.id ??
    EMPTY_STAGE.id;

  const currentStageId = stages.some(stage => stage.id === currentStageIdOverride)
    ? currentStageIdOverride
    : fallbackStageId;

  const currentStage = stages.find(stage => stage.id === currentStageId) ?? EMPTY_STAGE;
  const completedChapters = stages.filter(stage =>
    isStageCompleted(stage, stageOverrides[stage.id])
  ).length;
  const totalChapters = sectionDetails?.totalChapters ?? baseStages.length;

  return {
    stages,
    setStageOverrides,
    roadmapNodes,
    currentStageId,
    setCurrentStageId,
    currentStage,
    sectionCompleted: Boolean(sectionDetails?.completed),
    sectionTitle: sectionDetails?.sectionTitle ?? "",
    completedChapters,
    totalChapters,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
};
