import { useQuery } from "@tanstack/react-query";
import { profileGitHubDetailApi } from "../profileGitHubDetailApi";

export const profileGitHubDetailQueryKeys = {
  all: ["profileGitHubDetail"] as const,
  detail: (date: string | null) => [...profileGitHubDetailQueryKeys.all, date] as const,
};

export const useProfileGitHubDetailQuery = (date: string | null) => {
  const { data, isError, isFetching, isLoading, isPlaceholderData } = useQuery({
    queryKey: profileGitHubDetailQueryKeys.detail(date),
    queryFn: () => {
      if (!date) throw new Error("잔디를 선택하지 않았습니다.");
      return profileGitHubDetailApi.getProfileGitHubDetail({ date });
    },
    enabled: !!date,
    placeholderData: previousData => previousData,
  });

  return {
    data,
    isError,
    isFetching,
    isLoading,
    isPlaceholderData,
  };
};
