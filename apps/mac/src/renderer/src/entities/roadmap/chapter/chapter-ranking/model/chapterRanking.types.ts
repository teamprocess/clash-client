export interface RankingUser {
  rank: number;
  completedChaptersCount: number;
  id: number;
  name: string;
  profileImage: string;
}

export interface GetChapterRankingsResponse {
  myRank: RankingUser;
  allRankers: RankingUser[];
}
