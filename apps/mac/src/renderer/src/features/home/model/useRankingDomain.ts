import { useState } from "react";
import {
  useRankingQuery,
  type CategoryType,
  type PeriodType,
  type RankingsResponse,
} from "@/entities/ranking";
import { useGetMyProfile } from "@/entities/user";

export const rankingDropdownOptions: { key: CategoryType; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "GitHub" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const rankingPeriodOptions: { key: PeriodType; label: string }[] = [
  { key: "DAY", label: "오늘" },
  { key: "WEEK", label: "이번 주" },
  { key: "MONTH", label: "이번 달" },
  { key: "SEASON", label: "이번 시즌" },
];

export const useRankingDomain = () => {
  const [rankingCategory, setRankingCategory] = useState<CategoryType>("EXP");
  const [rankingPeriod, setRankingPeriod] = useState<PeriodType>("DAY");

  const { data: rankingResponse } = useRankingQuery(rankingCategory, rankingPeriod);

  const userList: RankingsResponse = rankingResponse?.data ?? {
    category: rankingCategory,
    period: rankingPeriod,
    rankings: [],
  };

  const { data: myProfile } = useGetMyProfile();
  const myUserId = myProfile?.id;

  const currentUserIndex = userList.rankings.findIndex(u => u.userId === myUserId);
  const currentUser = currentUserIndex !== -1 ? userList.rankings[currentUserIndex] : null;
  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;

  return {
    rankingCategory,
    setRankingCategory,
    rankingPeriod,
    setRankingPeriod,
    userList,
    currentUser,
    currentUserRank,
  };
};
