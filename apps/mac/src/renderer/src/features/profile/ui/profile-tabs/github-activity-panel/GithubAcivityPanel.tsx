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

const formatLocalYmd = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const GithubActivityPanel = () => {
  const { daysForView, paddedDaysForView, getLevel, selectedId, selectedDay, handleGrassClick } =
    useProfileGithubStreak();

  const selectedDate = typeof selectedDay?.id === "string" ? selectedDay.id : null;
  const fallbackCount = selectedDay?.count ?? 0;
  const latestDay = daysForView[daysForView.length - 1] ?? null;
  const initialDate =
    typeof latestDay?.id === "string" ? latestDay.id : formatLocalYmd(new Date());
  const initialContributions = latestDay?.count ?? 0;

  const detailQuery = useProfileGithubDetailQuery(selectedDate);
  const detail = detailQuery.data?.data;
  const matchedDetail = detail?.date === selectedDate ? detail : null;
  const displayDetail = matchedDetail ?? (detailQuery.isPlaceholderData && detail ? detail : null);

  const infoProps = useMemo(() => {
    const displayDate = displayDetail?.date ?? selectedDate ?? initialDate;

    const dateText = formatKoreanDate(displayDate);

    return {
      dateText,
      totalContributions:
        displayDetail?.contributionCount ??
        (selectedDate ? fallbackCount : initialContributions),

      commits: displayDetail?.commitsCount ?? 0,
      issues: displayDetail?.issuesCount ?? 0,
      pullRequests: displayDetail?.prCount ?? 0,
      reviews: displayDetail?.reviewsCount ?? 0,

      topCommitRepo: displayDetail?.topCommitRepo ?? "-",
      dailyAddedLines: displayDetail?.additionLines ?? 0,
      dailyDeletedLines: displayDetail?.deletionLines ?? 0,
    };
  }, [displayDetail, fallbackCount, initialContributions, initialDate, selectedDate]);

  const emptyTitle = !selectedDate
    ? "잔디를 선택하면 상세 정보를 확인할 수 있어요!"
    : detailQuery.isError
      ? "상세 정보를 불러오지 못했어요"
      : detailQuery.isFetching || detailQuery.isLoading
        ? "상세 정보를 불러오는 중이에요"
        : "상세 정보가 없어요";

  const emptyDescription = !selectedDate
    ? "원하는 날짜의 잔디를 클릭해서 활동 내역과 자세한 정보를 확인해보세요."
    : detailQuery.isError
      ? "잠시 후 다시 시도해보세요."
      : detailQuery.isFetching || detailQuery.isLoading
        ? "선택한 날짜의 Github 활동 정보를 가져오고 있어요."
        : "선택한 날짜의 상세 Github 활동 정보가 아직 없습니다.";

  return (
    <S.Panel>
      <S.StreakSection>
        <GithubStreak
          paddedDaysForView={paddedDaysForView}
          getLevel={getLevel}
          selectedId={selectedId}
          onGrassClick={handleGrassClick}
        />
      </S.StreakSection>

      <S.InfoSection>
        <GithubInfo
          {...infoProps}
          hasDetail={Boolean(selectedDate && displayDetail)}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </S.InfoSection>
    </S.Panel>
  );
};
