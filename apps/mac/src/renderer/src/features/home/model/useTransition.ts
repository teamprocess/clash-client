import type { TransitionResponse } from "@/entities/competition";

export const useTransition = (data: TransitionResponse | null) => {
  const maxActive = Math.max(
    data?.activeTime?.yesterdayActiveTime ?? 0,
    data?.activeTime?.todayActiveTime ?? 0
  );

  const maxContributors = Math.max(
    data?.contributors?.yesterdayContributors ?? 0,
    data?.contributors?.todayContributors ?? 0
  );

  return {
    transitionData: data,
    maxActive,
    maxContributors,
  };
};
