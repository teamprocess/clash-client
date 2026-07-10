import { useQuery } from "@tanstack/react-query";
import { profileGithubDetailApi } from "../profileGithubDetailApi";

export const profileGithubDetailQueryKeys = {
  all: ["profileGithubDetail"] as const,
  detail: (date: string | null) => [...profileGithubDetailQueryKeys.all, date] as const,
};

export const useProfileGithubDetailQuery = (date: string | null) => {
  const { data, isError, isFetching, isLoading, isPlaceholderData } = useQuery({
    queryKey: profileGithubDetailQueryKeys.detail(date),
    queryFn: () => {
      if (!date) throw new Error("잔디를 선택하지 않았습니다.");
      return profileGithubDetailApi.getProfileGithubDetail({ date });
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
