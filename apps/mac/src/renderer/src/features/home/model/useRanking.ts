import { useRankingDomain, rankingDropdownOptions, rankingPeriodOptions } from "./useRankingDomain";
import { useRankingView } from "./useRankingView";
import type { CategoryType } from "@/entities/ranking";
import { formatTime } from "@/shared/lib";

const unitMap: Record<CategoryType, string> = {
  GITHUB: "점",
  ACTIVE_TIME: "",
  EXP: "EXP",
  SOLVED_AC: "개",
};

export const useRanking = () => {
  const domain = useRankingDomain();
  const view = useRankingView({ rankings: domain.userList.rankings });

  const unit = unitMap[domain.rankingCategory];

  const formatActiveRankingPoint = (value: number) => {
    if (domain.rankingCategory === "ACTIVE_TIME") {
      return formatTime(value);
    }
    return value.toLocaleString();
  };

  return {
    wrapperRef: view.wrapperRef,
    currentUserRef: view.currentUserRef,

    options: {
      rankingDropdownOptions,
      rankingPeriodOptions,
    },

    filters: {
      rankingCategory: domain.rankingCategory,
      setRankingCategory: domain.setRankingCategory,
      rankingPeriod: domain.rankingPeriod,
      setRankingPeriod: domain.setRankingPeriod,
    },

    domain: {
      userList: domain.userList,
      currentUser: domain.currentUser,
      currentUserRank: domain.currentUserRank,
    },

    view: {
      stickyState: view.stickyState,
    },

    unit,
    formatActiveRankingPoint,
  };
};
