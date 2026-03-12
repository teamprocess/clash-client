import { useMemo, useState } from "react";
import { GithubInfo } from "@/features/profile/ui/profile-tabs/github-info/GithubInfo";
import { GithubStreak } from "@/features/profile/ui/profile-tabs/github-streak/GithubStreak";
import { useProfileGithubDetailQuery } from "@/entities/profile/api/query/useProfileGithubDetail.query";

const formatKoreanDate = (ymd: string) => {
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${Number(y)}년 ${Number(m)}월 ${Number(d)}일`;
};

export const GithubActivityPanel = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fallbackCount, setFallbackCount] = useState<number>(0);

  const detailQuery = useProfileGithubDetailQuery(selectedDate);
  const detail = detailQuery.data?.data;

  const infoProps = useMemo(() => {
    if (!selectedDate) return null;

    const dateText = formatKoreanDate(selectedDate);

    return {
      dateText,
      totalContributions: detail?.contributionCount ?? fallbackCount,

      commits: detail?.commitsCount ?? 0,
      issues: detail?.issuesCount ?? 0,
      pullRequests: detail?.prCount ?? 0,
      reviews: detail?.reviewsCount ?? 0,

      topCommitRepo: detail?.topCommitRepo ?? "-",
      dailyAddedLines: detail?.additionLines ?? 0,
      dailyDeletedLines: detail?.deletionLines ?? 0,
    };
  }, [detail, selectedDate, fallbackCount]);

  return (
    <>
      <GithubStreak
        onSelectDate={(date, count) => {
          if (!date) {
            setSelectedDate(null);
            setFallbackCount(0);
            return;
          }

          setSelectedDate(date);
          setFallbackCount(count);
        }}
      />

      {!selectedDate || !infoProps ? (
        <div>날짜를 선택해주세요.</div>
      ) : (
        <GithubInfo {...infoProps} />
      )}
    </>
  );
};
