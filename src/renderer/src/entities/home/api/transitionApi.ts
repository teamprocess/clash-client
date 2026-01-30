import { api, ApiResponse } from "@/shared/api";
import { TransitionResponse } from "@/entities/home/model/useTransition.types";

export const transitionApi = {
  getTransition: async () => {
    const result = await api.get<ApiResponse<TransitionResponse>>("/compete/my/compare/yesterday");
    return result.data;
  },
};
