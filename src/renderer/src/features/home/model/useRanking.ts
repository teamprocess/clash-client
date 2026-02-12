import {
  useRankingDomain,
  rankingDropDownValue,
  rankingPeriodDropDownValue,
} from "./useRankingDomain";
import { useRankingView } from "./useRankingView";
import { CategoryType } from "@/entities/home/model/useRanking.types";

const unitMap: Record<CategoryType, string> = {
  GITHUB: "개",
  ACTIVE_TIME: "",
  EXP: "포인트",
  SOLVED_AC: "개",
};

export const useRanking = () => {
  const domain = useRankingDomain();
  const view = useRankingView({ rankings: domain.userList.rankings });

  const unit = unitMap[domain.RankingDropdown];

  return {
    wrapperRef: view.wrapperRef,
    currentUserRef: view.currentUserRef,

    options: {
      rankingDropDownValue,
      rankingPeriodDropDownValue,
    },

    filters: {
      RankingDropdown: domain.RankingDropdown,
      setRankingDropdown: domain.setRankingDropdown,
      RankingPeriodDropdown: domain.RankingPeriodDropdown,
      setRankingPeriodDropdown: domain.setRankingPeriodDropdown,
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
  };
};
