import { useState } from "react";
import type {
  RankingsResponse,
  CategoryType,
  PeriodType,
} from "@/entities/home/model/useRanking.types";
import { useGetMyProfile } from "@/entities/user";
import { useRankingQuery } from "@/entities/home/api/query/useRanking.query";

export const rankingDropDownValue: Array<{ key: CategoryType; label: string }> = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const rankingPeriodDropDownValue: Array<{ key: PeriodType; label: string }> = [
  { key: "DAY", label: "오늘" },
  { key: "WEEK", label: "이번 주" },
  { key: "MONTH", label: "이번 달" },
  { key: "YEAR", label: "이번 시즌" },
];

export const useRankingDomain = () => {
  const [RankingDropdown, setRankingDropdown] = useState<CategoryType>("EXP");
  const [RankingPeriodDropdown, setRankingPeriodDropdown] = useState<PeriodType>("DAY");

  const { data: rankingResponse } = useRankingQuery(RankingDropdown, RankingPeriodDropdown);

  const userList: RankingsResponse = rankingResponse?.data ?? {
    category: RankingDropdown,
    period: RankingPeriodDropdown,
    rankings: [],
  };

  const { data: myProfile } = useGetMyProfile();
  const myUserId = myProfile?.id;

  const currentUserIndex = userList.rankings.findIndex(u => u.userId === myUserId);
  const currentUser = currentUserIndex !== -1 ? userList.rankings[currentUserIndex] : null;
  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;

  return {
    RankingDropdown,
    setRankingDropdown,
    RankingPeriodDropdown,
    setRankingPeriodDropdown,
    userList,
    currentUser,
    currentUserRank,
  };
};
