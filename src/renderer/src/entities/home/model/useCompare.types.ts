interface CommitSummary {
  count: number;
  representationRepo: string;
  addLines: number;
  removeLines: number;
  firstCommit: string;
  lastCommit: string;
}

interface PullRequestSummary {
  count: number;
  representationRepo: string;
  mergedCount: number;
  openCount: number;
  closedCount: number;
  inReviewCount: number;
  approvedCount: number;
  requestCount: number;
}

interface CountType {
  count: number;
}

interface CompareType {
  date: string;
  commit: CommitSummary;
  pullRequest: PullRequestSummary;
  issue: CountType;
  review: CountType;
}

export interface CompareResponse {
  yesterday: CompareType;
  today: CompareType;
}
