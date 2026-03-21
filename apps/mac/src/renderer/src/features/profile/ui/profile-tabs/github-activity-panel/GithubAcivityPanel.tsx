import { useMemo } from "react";
import { GithubInfo } from "@/features/profile/ui/profile-tabs/github-info/GithubInfo";
import { GithubStreak } from "@/features/profile/ui/profile-tabs/github-streak/GithubStreak";
import { useProfileGithubDetailQuery } from "@/entities/profile/api/query/useProfileGithubDetail.query";
import { useProfileGithubStreak } from "@/features/profile/model/useProfileTabs";
import * as S from "./GithubActivityPanel.style";

const formatKoreanDate = (ymd: string) => {
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${Number(y)}년 ${Number(m)}월 ${Number(d)}일`;
};

export const GithubActivityPanel = () => {
  const { paddedDaysForView, getLevel, selectedId, selectedDay, handleGrassClick } =
    useProfileGithubStreak();

  const selectedDate = typeof selectedDay?.id === "string" ? selectedDay.id : null;
  const fallbackCount = selectedDay?.count ?? 0;

  const detailQuery = useProfileGithubDetailQuery(selectedDate);
  const detail = detailQuery.data?.data;
  const matchedDetail = detail?.date === selectedDate ? detail : null;
  const displayDetail = matchedDetail ?? (detailQuery.isPlaceholderData && detail ? detail : null);

  const infoProps = useMemo(() => {
    if (!selectedDate) return null;

    const displayDate = displayDetail?.date ?? selectedDate;

    const dateText = formatKoreanDate(displayDate);

    return {
      dateText,
      totalContributions: displayDetail?.contributionCount ?? fallbackCount,

      commits: displayDetail?.commitsCount ?? 0,
      issues: displayDetail?.issuesCount ?? 0,
      pullRequests: displayDetail?.prCount ?? 0,
      reviews: displayDetail?.reviewsCount ?? 0,

      topCommitRepo: displayDetail?.topCommitRepo ?? "-",
      dailyAddedLines: displayDetail?.additionLines ?? 0,
      dailyDeletedLines: displayDetail?.deletionLines ?? 0,
    };
  }, [displayDetail, fallbackCount, selectedDate]);

  return (
    <>
      <GithubStreak
        paddedDaysForView={paddedDaysForView}
        getLevel={getLevel}
        selectedId={selectedId}
        onGrassClick={handleGrassClick}
      />

      {!selectedDate || !infoProps ? (
        <S.EmptyStateBox>
          <S.EmptyTitle>잔디를 선택하면 상세 정보를 확인할 수 있어요!</S.EmptyTitle>
          <S.EmptyDescription>
            원하는 날짜의 잔디를 클릭해서 활동 내역과 자세한 정보를 확인해보세요.
          </S.EmptyDescription>
        </S.EmptyStateBox>
      ) : (
        <GithubInfo
          {...infoProps}
          hasDetail={!!displayDetail}
          emptyTitle={
            detailQuery.isError
              ? "상세 정보를 불러오지 못했어요"
              : detailQuery.isFetching || detailQuery.isLoading
                ? "상세 정보를 불러오는 중이에요"
                : "상세 정보가 없어요"
          }
          emptyDescription={
            detailQuery.isError
              ? "잠시 후 다시 시도해보세요."
              : detailQuery.isFetching || detailQuery.isLoading
                ? "선택한 날짜의 Github 활동 정보를 가져오고 있어요."
                : "선택한 날짜의 상세 Github 활동 정보가 아직 없습니다."
          }
        />
      )}
    </>
  );
};
