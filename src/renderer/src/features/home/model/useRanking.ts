import { useRef, useState, useLayoutEffect } from "react";
import { RankingsResponse, CategoryType, PeriodType } from "@/entities/home/model/useRanking.types";
import { useGetMyProfile } from "@/entities/user";
import { useRankingQuery } from "@/entities/home/api/query/useRanking.query";

export const useRanking = () => {
  const rankingDropDownValue = [
    { key: "GITHUB", label: "Github" },
    { key: "EXP", label: "EXP" },
    { key: "ACTIVE_TIME", label: "총 학습 시간" },
  ];

  const rankingPeriodDropDownValue = [
    { key: "DAY", label: "오늘" },
    { key: "WEEK", label: "이번 주" },
    { key: "MONTH", label: "이번 달" },
    { key: "YEAR", label: "이번 시즌" },
  ];

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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef<HTMLDivElement>(null);

  const [stickyState, setStickyState] = useState<"top" | "bottom" | "none">("none");

  useLayoutEffect(() => {
    if (!wrapperRef.current || !currentUserRef.current) return;

    const handleScroll = () => {
      if (!wrapperRef.current || !currentUserRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const userRect = currentUserRef.current.getBoundingClientRect();

      if (userRect.top >= wrapperRect.bottom) {
        setStickyState("bottom");
        return;
      }
      if (userRect.bottom <= wrapperRect.top) {
        setStickyState("top");
        return;
      }
      setStickyState("none");
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
    };
  }, [userList.rankings]);

  return {
    RankingDropdown,
    setRankingDropdown,
    RankingPeriodDropdown,
    setRankingPeriodDropdown,
    rankingDropDownValue,
    rankingPeriodDropDownValue,
    wrapperRef,
    currentUserRef,
    userList,
    stickyState,
    currentUser,
    currentUserRank,
  };
};
