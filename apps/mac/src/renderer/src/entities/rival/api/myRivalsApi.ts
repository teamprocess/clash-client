import { api, type ApiResponse } from "@/shared/api";
import type { MyRivalsResponse } from "../model/myRivals.types";

export const myRivalsApi = {
  // 나의 라이벌 정보 가져오기
  getMyRivals: async () => {
    const result = await api.get<ApiResponse<MyRivalsResponse>>("/compete/rivals");
    return result.data;
  },
};
