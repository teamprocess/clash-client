import { useMemo } from "react";
import {
  type PreviewData,
  type GetSectionPreviewResponse,
} from "@/entities/roadmap/section/preview/model/preview.types";
import { useSectionPreviewQuery } from "@/entities/roadmap/section";

const transformPreviewData = (serverData: GetSectionPreviewResponse): PreviewData => {
  const sortedChapters = [...serverData.chapters].sort((a, b) => a.orderIndex - b.orderIndex);

  return {
    id: serverData.id,
    title: serverData.title,
    intro: serverData.description,
    steps: sortedChapters.map((chapter, index) => ({
      id: index + 1,
      tooltip: chapter.title,
      description:
        chapter.description?.trim() ||
        (chapter.totalMissions && chapter.totalMissions > 0
          ? `총 ${chapter.totalMissions}문제로 구성된 챕터입니다.`
          : "챕터 상세 설명은 챕터 화면에서 확인할 수 있어요."),
    })),
    targets: serverData.keyPoints,
  };
};

export const usePreview = (sectionId: number) => {
  const previewQuery = useSectionPreviewQuery(sectionId);
  const previewData = useMemo(
    () => (previewQuery.data ? transformPreviewData(previewQuery.data) : null),
    [previewQuery.data]
  );

  return {
    previewData,
    loading: previewQuery.isLoading,
    error: previewQuery.error instanceof Error ? previewQuery.error.message : null,
    totalSteps: previewData?.steps.length ?? 0,
  };
};
