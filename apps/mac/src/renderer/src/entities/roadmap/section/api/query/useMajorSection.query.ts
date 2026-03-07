import { useQuery } from "@tanstack/react-query";
import { getAllSectionsResponse, MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";

export const sectionQueryKeys = {
  major: (major: MajorEnum) => ["sections", "major", major] as const,
};

export const useMajorSectionQuery = (major: MajorEnum) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: async (): Promise<getAllSectionsResponse> => {
      const response = await sectionApi.getMajorSection({ major: major! });

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "로드맵 목록을 불러오지 못했습니다.");
      }

      return response.data;
    },
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
