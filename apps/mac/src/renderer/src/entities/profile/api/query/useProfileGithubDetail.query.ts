import { useQuery } from "@tanstack/react-query";
import { profileGithubDetailApi } from "@/entities/profile/api/profileGithubDetailApi";

export const useProfileGithubDetailQuery = (date: string | null) => {
  const { data } = useQuery({
    queryKey: ["profileGithubDetail", date],
    queryFn: () => {
      if (!date) throw new Error("잔디를 선택하지 않았습니다.");
      return profileGithubDetailApi.getProfileGithubDetail({ date });
    },
    enabled: !!date,
  });

  return {
    data,
  };
};
