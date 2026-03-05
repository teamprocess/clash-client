import { api } from "./axios";
import type { ApiResponse } from "./types";

export interface CreateSocketTokenResponse {
  token: string;
  expiresInSeconds: number;
}

export const realtimeApi = {
  createSocketToken: async () => {
    const result = await api.post<ApiResponse<CreateSocketTokenResponse>>("/realtime/socket/token");
    return result.data;
  },
};
