import { RivalApplyRequest, RivalUsersResponse } from "@/entities/home/model/useRival.types";
import { api, ApiResponse } from "@/shared/api";

export const rivalsApi = {
  // 라이벌 후보 목록 조회 (모달)
  getRivalList: async () => {
    const result = await api.get<ApiResponse<RivalUsersResponse>>(`/compete/rivals/available`);
    return result.data;
  },

  // 라이벌 신청
  postRivalApply: async (data: RivalApplyRequest) => {
    const result = await api.post<ApiResponse>(`/compete/rivals/battles/apply`, { ...data });
    return result.data;
  },
};
