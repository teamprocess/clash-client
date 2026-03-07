import { useQuery } from "@tanstack/react-query";
import { noticeApi } from "@/entities/notice/api/noticeApi";

export const noticeQueryKeys = {
  all: ["notices"] as const,
  unread: ["notices", "unread"] as const,
  allNotices: ["notices", "all"] as const,
};

export const useMyUnreadNoticesQuery = () => {
  return useQuery({
    queryKey: noticeQueryKeys.unread,
    queryFn: async () => {
      const response = await noticeApi.getMyNotices();
      return response.data?.notices ?? [];
    },
    staleTime: 0,
  });
};

export const useMyAllNoticesQuery = (enabled = true) => {
  return useQuery({
    queryKey: noticeQueryKeys.allNotices,
    queryFn: async () => {
      const response = await noticeApi.getMyAllNotices();
      return response.data?.notices ?? [];
    },
    staleTime: 0,
    enabled,
  });
};
