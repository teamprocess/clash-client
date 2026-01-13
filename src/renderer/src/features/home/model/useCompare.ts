import { useState } from "react";

// ComparePage 데이터 GET
export const statsData = {
  data: {
    yesterday: {
      date: "2026-01-12",
      commit: {
        count: 12,
        representation_repo: "TeamProcess",
        add_lines: 420,
        remove_lines: 180,
        first_commit: "10:21",
        last_commit: "23:48",
      },
      pull_request: {
        count: 5,
        representation_repo: "TeamProcess",
        merged_count: 4,
        open_count: 1,
        closed_count: 0,
        in_review_count: 3,
        approved_count: 2,
        request_count: 1,
      },
      issue: {
        count: 3,
      },
      review: {
        count: 2,
      },
    },
    today: {
      date: "2026-01-13",
      commit: {
        count: 32,
        representation_repo: "MainSystem",
        add_lines: 850,
        remove_lines: 320,
        first_commit: "9:15",
        last_commit: "18:30",
      },
      pull_request: {
        count: 8,
        representation_repo: "MainSystem",
        merged_count: 6,
        open_count: 2,
        closed_count: 0,
        in_review_count: 4,
        approved_count: 4,
        request_count: 0,
      },
      issue: {
        count: 3,
      },
      review: {
        count: 1,
      },
    },
  },
  message: "어제와 비교한 유저의 깃허브 정보 조회를 성공적으로 완료 했습니다.",
  success: true,
};

// 증감률 함수
export interface GrowthRateProps {
  yesterday: number;
  today: number;
}

export const getGrowthInfo = (yesterday: number, today: number) => {
  const diff = today - yesterday;

  if (diff > 0) return { status: "up", deg: 180, value: diff };
  if (diff < 0) return { status: "down", deg: 0, value: Math.abs(diff) };
  return { status: "same", deg: null, value: "-" };
};

export const useCompare = () => {
  const [compareDropdown, setCompareDropdown] = useState("Github");

  return {
    compare: {
      compareDropdown,
      setCompareDropdown,
      statsData: statsData,
    },
    github: {
      yesterday: statsData.data.yesterday,
      today: statsData.data.today,
    },
    // solved-ac: {
    //   statsData: statsData.data,
    // },
  };
};

export type CompareReturn = ReturnType<typeof useCompare>;
export type CompareProps = CompareReturn["compare"];
export type GithubProps = CompareReturn["github"];
// export type SolvedAcProps = CompareReturn["solved-ac"];
