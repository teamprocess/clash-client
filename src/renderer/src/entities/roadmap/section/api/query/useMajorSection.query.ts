import { useQuery } from "@tanstack/react-query";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";
import type { ApiResponse } from "@/shared/api";
import type {
  getAllSectionsResponse,
  getAllSectionsServerResponse,
} from "@/entities/roadmap/section/model/section.types";

export const sectionQueryKeys = {
  major: (major: MajorEnum | undefined) => ["sections", "major", major] as const,
};

const transformMajorSectionsResponse = (
  response: ApiResponse<getAllSectionsServerResponse>
): ApiResponse<getAllSectionsResponse> => {
  const rawData = response.data;
  const rawSections = rawData?.sections ?? [];
  const rawCategories = rawData?.categories ?? null;

  const sections = rawSections.map(section => {
    const category = section.category ?? section.categoryId ?? "0";

    return {
      id: String(section.id),
      title: section.title,
      category: String(category),
      completed: section.completed,
      locked: section.locked,
    };
  });

  const categories =
    rawCategories && rawCategories.length > 0
      ? rawCategories.map(category => String(category))
      : Array.from(new Set(sections.map(section => section.category)));

  return {
    ...response,
    data: {
      sections,
      categories,
    },
  };
};

export const useMajorSectionQuery = (major: MajorEnum | undefined) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: async () => {
      const response = await sectionApi.getMajorSection({ major });
      return transformMajorSectionsResponse(response);
    },
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
