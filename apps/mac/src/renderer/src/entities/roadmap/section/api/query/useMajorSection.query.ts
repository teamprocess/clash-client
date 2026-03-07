import { useQuery } from "@tanstack/react-query";
import { getAllSectionsResponse, MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";

export const sectionQueryKeys = {
  major: (major: MajorEnum) => ["sections", "major", major] as const,
};

const resolveSectionIconUrl = (icon?: string | null) => {
  const trimmedIcon = icon?.trim();

  if (!trimmedIcon) {
    return null;
  }

  if (
    trimmedIcon.startsWith("http://") ||
    trimmedIcon.startsWith("https://") ||
    trimmedIcon.startsWith("data:")
  ) {
    return trimmedIcon;
  }

  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    return trimmedIcon;
  }

  try {
    return new URL(trimmedIcon, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).toString();
  } catch {
    return trimmedIcon;
  }
};

export const useMajorSectionQuery = (major: MajorEnum) => {
  return useQuery({
    queryKey: sectionQueryKeys.major(major),
    queryFn: async (): Promise<getAllSectionsResponse> => {
      const response = await sectionApi.getMajorSection({ major: major! });

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "로드맵 목록을 불러오지 못했습니다.");
      }

      const serverData = response.data;

      return {
        sections: serverData.sections.map(s => ({
          id: String(s.id),
          title: s.title,
          category: String(s.category ?? s.categoryId ?? ""),
          icon: resolveSectionIconUrl(
            s.categoryImageUrl ??
              s.iconUrl ??
              s.iconURL ??
              s.icon_url ??
              s.icon ??
              s.imageUrl ??
              s.image_url ??
              s.image
          ),
          completed: s.completed,
          locked: s.locked,
        })),
        categories: (serverData.categories ?? []).map(c => String(c)),
      };
    },
    enabled: major != null && major !== MajorEnum.NONE,
  });
};
