import { useQuery } from "@tanstack/react-query";
import { getAllSectionsResponse, MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";

export const sectionQueryKeys = {
  major: (major: MajorEnum | undefined) => ["sections", "major", major] as const,
};

export const useMajorSectionQuery = (major: MajorEnum | undefined) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: async (): Promise<getAllSectionsResponse> => {
      const response = await sectionApi.getMajorSection({ major });

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "로드맵 목록을 불러오지 못했습니다.");
      }

      const serverData = response.data;

      return {
        sections: serverData.sections.map(s => ({
          id: String(s.id),
          title: s.title,
          category: String(s.category ?? s.categoryId ?? ""),
          completed: s.completed,
          locked: s.locked,
        })),
        categories: (serverData.categories ?? []).map(c => String(c)),
      };
    },
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
