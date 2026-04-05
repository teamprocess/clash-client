import { useQuery } from "@tanstack/react-query";
import { announcementApi } from "@/entities/announcement/api/announcementApi";

export const announcementQueryKeys = {
  all: ["announcements"] as const,
  active: ["announcements", "active"] as const,
};

export const useActiveAnnouncementsQuery = (enabled = true) => {
  return useQuery({
    queryKey: announcementQueryKeys.active,
    queryFn: async () => {
      const response = await announcementApi.getActiveAnnouncements();
      return response.data?.announcements ?? [];
    },
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });
};
