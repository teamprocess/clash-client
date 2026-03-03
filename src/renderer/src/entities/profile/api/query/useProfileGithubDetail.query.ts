import { useQuery } from "@tanstack/react-query";
import { profileGithubDetailApi } from "@/entities/profile/api/profileGithubDetailApi";

export const useProfileGithubDetailQuery = (date: string) => {
  const { data } = useQuery({
    queryKey: ["profileGithubDetail", date],
    queryFn: () => profileGithubDetailApi.getProfileGithubDetail({ date }),
    enabled: Boolean(date),
  });

  return {
    data,
  };
};
