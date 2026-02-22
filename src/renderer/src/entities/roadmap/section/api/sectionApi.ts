import { api, ApiResponse } from "@/shared/api";
import {
  getAllSectionsResponse,
  getMajorSectionRequest,
} from "@/entities/roadmap/section/model/section.types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const asString = (value: unknown): string | null => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return null;
};

const asBoolean = (value: unknown): boolean => (typeof value === "boolean" ? value : false);

const normalizeMajorSectionsResponse = (
  response: ApiResponse<unknown>
): ApiResponse<getAllSectionsResponse> => {
  const rawData = response.data;
  const rawSections = isRecord(rawData) && Array.isArray(rawData.sections) ? rawData.sections : [];
  const rawCategories =
    isRecord(rawData) && Array.isArray(rawData.categories) ? rawData.categories : null;

  const normalizedSections = rawSections
    .map(section => {
      if (!isRecord(section)) return null;

      const id = asString(section.id);
      const title = asString(section.title);
      const category = asString(section.category ?? section.categoryId) ?? "0";

      if (id == null || title == null) return null;

      return {
        id,
        title,
        category,
        completed: asBoolean(section.completed),
        locked: asBoolean(section.locked),
      };
    })
    .filter((section): section is getAllSectionsResponse["sections"][number] => section != null);

  const normalizedCategories =
    rawCategories && rawCategories.length > 0
      ? rawCategories.map(category => String(category))
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
