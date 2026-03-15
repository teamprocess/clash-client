export type ProfileGithubDetailRequest = {
  date: string;
};

export type ProfileGithubDetailData = {
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

export type ProfileGithubDetailResponse = ProfileGithubDetailData;
