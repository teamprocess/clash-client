import { api, type ApiResponse } from "@/shared/api";
import type { TransitionResponse } from "../../../model/my-competition/transition.types";

export const transitionApi = {
  getTransition: async () => {
    const result = await api.get<ApiResponse<TransitionResponse>>("/compete/my/compare/yesterday");
    return result.data;
  },
};
