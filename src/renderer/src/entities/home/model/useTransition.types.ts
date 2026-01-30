interface ActiveTimeResponse {
  yesterdayActiveTime: number;
  todayActiveTime: number;
}

interface ContributorsResponse {
  yesterdayContributors: number;
  todayContributors: number;
}

export interface TransitionResponse {
  activeTime: ActiveTimeResponse;
  contributors: ContributorsResponse;
}
