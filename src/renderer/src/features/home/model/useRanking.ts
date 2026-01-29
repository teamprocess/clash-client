import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { RankingsResponse, CategoryType, PeriodType } from "@/entities/home/model/useRanking.types";
import { rankingApi } from "@/entities/home/api/rankingApi";
import { authApi } from "@/entities/user";
import axios from "axios";

export const useRanking = () => {
  const [userList, setUserList] = useState<RankingsResponse>({
    category: "EXP",
    period: "WEEK",
    rankings: [],
  });

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

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await rankingApi.getRanking({
          category: RankingDropdown,
          period: RankingPeriodDropdown,
        });
        if (!response.data) return;
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRanking();
  }, [RankingDropdown, RankingPeriodDropdown]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef<HTMLDivElement>(null);

  const [myUserId, setMyUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const result = await authApi.getMyProfile();

        if (result.success && result.data) {
          setMyUserId(result.data.id);
        } else {
          console.error("내 정보 조회 실패:", result.message);
        }
      } catch (error: unknown) {
        console.error("내 정보 조회 실패:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.message ||
            "내 정보 조회 중 오류가 발생했습니다.";
          console.error(errorMessage);
        }
      }
    };

    fetchMyProfile();
  }, []);

  const currentUserIndex = userList.rankings.findIndex(u => u.userId === myUserId);

  const currentUser = currentUserIndex !== -1 ? userList.rankings[currentUserIndex] : null;

  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;

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
