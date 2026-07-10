import { api, type ApiResponse } from "@/shared/api";
import type { CompareResponse } from "../../../model/my-competition/compare.types";

export const compareApi = {
  getCompare: async () => {
    const result = await api.get<ApiResponse<CompareResponse>>(
      `/compete/my/compare/yesterday/github`
    );
    return result.data;
  },
};
