export type ProfileGitHubDetailRequest = {
  date: string;
};

export type ProfileGitHubDetailData = {
  date: string;
  contributionCount: number;
  contributionLevel: number;
  commitsCount: number;
  issuesCount: number;
  prCount: number;
  reviewsCount: number;
  additionLines: number;
  deletionLines: number;
  topCommitRepo: string;
};

export type ProfileGitHubDetailResponse = ProfileGitHubDetailData;
