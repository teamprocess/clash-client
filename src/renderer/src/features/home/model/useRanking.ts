import {
  useRankingDomain,
  rankingDropDownValue,
  rankingPeriodDropDownValue,
} from "./useRankingDomain";
import { useRankingView } from "./useRankingView";

export const useRanking = () => {
  const domain = useRankingDomain();
  const view = useRankingView({ rankings: domain.userList.rankings });

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
  };
};
