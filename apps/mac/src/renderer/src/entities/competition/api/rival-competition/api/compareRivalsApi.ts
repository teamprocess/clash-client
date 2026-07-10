import { api, type ApiResponse } from "@/shared/api";
import type {
  CompareRivalsResponse,
  GetCompareRivalsRequest,
} from "../../../model/rival-competition/compareRivals.types";

export const compareRivalsApi = {
  getCompareRivals: async (data: GetCompareRivalsRequest) => {
    const result = await api.get<ApiResponse<CompareRivalsResponse>>(
      `/compete/rivals/compare/category/${data.category}/period/${data.period}`
    );
    return result.data;
  },
};
