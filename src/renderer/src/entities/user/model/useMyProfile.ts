import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await authApi.getMyProfile();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
