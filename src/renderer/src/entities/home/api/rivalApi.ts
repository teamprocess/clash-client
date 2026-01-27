import { UsersResponse } from "@/entities/home/model/useRival.types";
import { api, ApiResponse } from "@/shared/api";

export const risvalApi = {
  // 라이벌 후보 목록 조회 (모달)
  getRivalList: async () => {
    const result = await api.get<ApiResponse<UsersResponse>>(`/compete/rivals/available`);
    return result.data;
  },
};
