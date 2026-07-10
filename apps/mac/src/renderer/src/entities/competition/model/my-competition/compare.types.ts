type CommitSummary = {
  count: number;
  representationRepo: string;
  addLines: number;
  removeLines: number;
  firstCommit: string;
  lastCommit: string;
};

type PullRequestSummary = {
  count: number;
  representationRepo: string;
  mergedCount: number;
  openCount: number;
  closedCount: number;
  inReviewCount: number;
  approvedCount: number;
  requestCount: number;
};

type CountType = {
  count: number;
};

type CompareType = {
  date: string;
  commit: CommitSummary;
  pullRequest: PullRequestSummary;
  issue: CountType;
  review: CountType;
};

export type CompareResponse = {
  yesterday: CompareType | null;
  today: CompareType | null;
};
