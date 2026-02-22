import { api, ApiResponse } from "@/shared/api";
import {
  getAllSectionsResponse,
  getMajorSectionRequest,
} from "@/entities/roadmap/section/model/section.types";

const normalizeMajorSectionsResponse = (
  response: ApiResponse<unknown>
): ApiResponse<getAllSectionsResponse> => {
  const rawData = response.data as {
    sections?: Array<{
      id?: string | number;
      title?: string;
      category?: string | number;
      categoryId?: string | number;
      completed?: boolean;
      locked?: boolean;
    }>;
    categories?: Array<string | number>;
  } | null;

  const rawSections = rawData?.sections ?? [];
  const normalizedSections = rawSections
    .map(section => {
      const category = section.category ?? section.categoryId ?? "0";
      const id = section.id;
      const title = section.title;

      if (id == null || title == null) return null;

      return {
        id: String(id),
        title: String(title),
        category: String(category),
        completed: Boolean(section.completed),
        locked: Boolean(section.locked),
      };
    })
    .filter((section): section is getAllSectionsResponse["sections"][number] => section != null);

  const normalizedCategories =
    rawData?.categories && rawData.categories.length > 0
      ? rawData.categories.map(category => String(category))
      : Array.from(new Set(normalizedSections.map(section => section.category)));

  return {
    ...response,
    data: {
      sections: normalizedSections,
      categories: normalizedCategories,
    },
  };
};

export const sectionApi = {
  // 전공별 섹션 조회
  getMajorSection: async (data: getMajorSectionRequest) => {
    const result = await api.get<ApiResponse<unknown>>("/sections", {
      params: data,
    });
    return normalizeMajorSectionsResponse(result.data);
  },
};
