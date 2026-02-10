import { api, ApiResponse } from "@/shared/api";
import { CompareResponse } from "@/entities/home/model/useCompare.types";

export const compareApi = {
  getCompare: async () => {
    const result = await api.get<ApiResponse<CompareResponse>>(
      `/compete/my/compare/yesterday/github`
    );
    return result.data;
  },
};
