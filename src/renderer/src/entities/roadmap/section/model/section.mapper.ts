import type { ApiResponse } from "@/shared/api";
import type { getAllSectionsResponse, getAllSectionsServerResponse } from "./section.types";

export const normalizeMajorSectionsResponse = (
  response: ApiResponse<getAllSectionsServerResponse>
): ApiResponse<getAllSectionsResponse> => {
  const rawData = response.data;
  const rawSections = rawData?.sections ?? [];
  const rawCategories = rawData?.categories ?? null;

  const normalizedSections = rawSections.map(section => {
    const category = section.category ?? section.categoryId ?? "0";

    return {
      id: String(section.id),
      title: section.title,
      category: String(category),
      completed: section.completed,
      locked: section.locked,
    };
  });

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
