import { useTransitionQuery, TransitionResponse } from "@/entities/home";

export const useTransition = () => {
  const { data } = useTransitionQuery();

  const transitionData: TransitionResponse | null = data?.data ?? null;

  const maxActive = Math.max(
    transitionData?.activeTime.yesterdayActiveTime ?? 0,
    transitionData?.activeTime.todayActiveTime ?? 0
  );

  const maxContributors = Math.max(
    transitionData?.contributors.yesterdayContributors ?? 0,
    transitionData?.contributors.todayContributors ?? 0
  );

  return {
    transitionData,
    maxActive,
    maxContributors,
  };
};
