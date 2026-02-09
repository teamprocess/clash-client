type ActiveTimeResponse = {
  yesterdayActiveTime: number;
  todayActiveTime: number;
};

type ContributorsResponse = {
  yesterdayContributors: number;
  todayContributors: number;
};

export type TransitionResponse = {
  activeTime: ActiveTimeResponse;
  contributors: ContributorsResponse;
};
