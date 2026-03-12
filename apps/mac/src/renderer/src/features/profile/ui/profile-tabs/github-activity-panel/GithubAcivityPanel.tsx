import { useMemo, useState } from "react";
import { GithubInfo } from "@/features/profile/ui/profile-tabs/github-info/GithubInfo";
import { GithubStreak } from "@/features/profile/ui/profile-tabs/github-streak/GithubStreak";
import { useProfileGithubDetailQuery } from "@/entities/profile/api/query/useProfileGithubDetail.query";
import * as S from "./GithubActivityPanel.style";

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
        <S.EmptyStateBox>
          <S.EmptyTitle>잔디를 선택하면 상세 정보를 확인할 수 있어요!</S.EmptyTitle>
          <S.EmptyDescription>
            원하는 날짜의 잔디를 클릭해서 활동 내역과 자세한 정보를 확인해보세요.
          </S.EmptyDescription>
        </S.EmptyStateBox>
      ) : (
        <GithubInfo {...infoProps} />
      )}
    </>
  );
};
