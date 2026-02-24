import { RivalApplyRequest, RivalUsersResponse } from "@/entities/home/model/useRival.types";
import { api, ApiResponse } from "@/shared/api";

interface ModifyRivalRequest {
  id: number;
}

export const rivalsApi = {
  // 라이벌 후보 목록 조회 (모달)
  getRivalList: async () => {
    const result = await api.get<ApiResponse<RivalUsersResponse>>(`/compete/rivals/available`);
    return result.data;
  },

  // 라이벌 신청
  postRivalApply: async (data: RivalApplyRequest) => {
    const result = await api.post<ApiResponse<RivalApplyRequest>>(`/compete/rivals/apply`, {
      ...data,
    });
    return result.data;
  },

  postRivalAccept: async (data: ModifyRivalRequest) => {
    const result = await api.post<ApiResponse<void>>(`/compete/rivals/accept`, {
      ...data,
    });
    return result.data;
  },

  postRivalReject: async (data: ModifyRivalRequest) => {
    const result = await api.post<ApiResponse<void>>(`/compete/rivals/reject`, {
      ...data,
    });
    return result.data;
  },

  postRivalDelete: async (id: number) => {
    const result = await api.delete(`/compete/rivals/remove/${id}`);
    return result.data;
  },
};
