import { useQuery } from "@tanstack/react-query";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";

export const sectionQueryKeys = {
  major: (major: MajorEnum | undefined) => ["sections", "major", major] as const,
};

export const useMajorSectionQuery = (major: MajorEnum | undefined) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: () => sectionApi.getMajorSection({ major }),
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
