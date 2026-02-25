import { api, type ApiResponse } from "@/shared/api";
import type { MyUserNoticesResponse } from "@/entities/notice/model/notice.types";

export const noticeApi = {
  getMyNotices: async () => {
    const result = await api.get<ApiResponse<MyUserNoticesResponse>>("/users/me/notices");
    return result.data;
  },

  readNotice: async (noticeId: number) => {
    const result = await api.patch<ApiResponse<void>>(`/users/me/notices/${noticeId}/read`);
    return result.data;
  },
};
