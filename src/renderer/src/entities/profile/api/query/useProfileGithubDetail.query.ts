import { useQuery } from "@tanstack/react-query";
import { profileGithubDetailApi } from "@/entities/profile/api/profileGithubDetailApi";

export const useProfileGithubDetailQuery = (date: string) => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["profileGithubDetail", date],
    queryFn: () => profileGithubDetailApi.getProfileGithubDetail({ date }),
    enabled: Boolean(date),
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
