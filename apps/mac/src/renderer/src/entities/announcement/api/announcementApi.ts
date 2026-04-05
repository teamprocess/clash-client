import { api, type ApiResponse } from "@/shared/api";
import type { ActiveAnnouncementsResponse } from "@/entities/announcement/model/announcement.types";

export const announcementApi = {
  getActiveAnnouncements: async () => {
    const result = await api.get<ApiResponse<ActiveAnnouncementsResponse>>("/announcements/active");
    return result.data;
  },
};
