import { useQuery } from "@tanstack/react-query";
import { noticeApi } from "@/entities/notice/api/noticeApi";

export const noticeQueryKeys = {
  all: ["notices"] as const,
};

export const useMyNoticesQuery = () => {
  return useQuery({
    queryKey: noticeQueryKeys.all,
    queryFn: async () => {
      const response = await noticeApi.getMyNotices();
      return response.data?.notices ?? [];
    },
    staleTime: 0,
  });
};
