import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

type MeData = {
  id: number;
  username: string;
  name: string;
  email: string;
  totalCookie: number;
  totalToken: number;
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<MeData>>("/users/me");
      return res.data.data;
    },
  });
};
