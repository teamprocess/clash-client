import { useQuery } from "@tanstack/react-query";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";
import { normalizeMajorSectionsResponse } from "@/entities/roadmap/section/model/section.mapper";

export const sectionQueryKeys = {
  major: (major: MajorEnum | undefined) => ["sections", "major", major] as const,
};

export const useMajorSectionQuery = (major: MajorEnum | undefined) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: async () => {
      const response = await sectionApi.getMajorSection({ major });
      return normalizeMajorSectionsResponse(response);
    },
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
