import { api, ApiResponse } from "@/shared/api";
import {
  CompareRivalsResponse,
  GetCompareRivalsRequest,
} from "@/entities/competition/model/rival-competition/compareRivals.types";

export const compareRivalsApi = {
  getCompareRivals: async (data: GetCompareRivalsRequest) => {
    const result = await api.get<ApiResponse<CompareRivalsResponse>>(
      `/compete/rivals/compare/category/${data.category}/period/${data.period}`
    );
    return result.data;
  },
};
