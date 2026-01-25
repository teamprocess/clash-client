import { api, ApiResponse } from "@/shared/api";
import { MyRivalsResponse } from "@/entities/competition/model/rival-competition/myRivals.types";

export const myRivalsApi = {
  getMyRivals: async () => {
    const result = await api.get<ApiResponse<MyRivalsResponse>>("/compete/rivals");
    return result.data;
  },
};
