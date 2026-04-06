import { useMemo } from "react";
import * as S from "./GithubInfo.style";
import { Tooltip } from "@/shared/ui";
import { getCountLabel } from "@/shared/lib";

export type GithubInfoProps = {
  dateText?: string | null;
  totalContributions?: number | null;
  commits: number;
  issues: number;
  pullRequests: number;
  reviews: number;
  topCommitRepo: string;
  dailyAddedLines: number;
  dailyDeletedLines: number;
  showSummary?: boolean;
  hasDetail?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const GithubInfo = ({
  dateText,
  totalContributions,
  commits,
  issues,
  pullRequests,
  reviews,
  topCommitRepo,
  dailyAddedLines,
  dailyDeletedLines,
  showSummary = true,
  hasDetail = true,
  emptyTitle = "잔디를 눌러 상세정보를 확인해보세요",
  emptyDescription = "스트릭(잔디)에서 날짜를 선택하면 커밋/이슈/PR 등의 상세 활동이 표시돼요.",
}: GithubInfoProps) => {
  const stats = useMemo(
    () =>
      [
        {
          key: "commits",
          Icon: S.CommitIcon,
          count: commits,
          label: getCountLabel(commits, "Commit", "Commits"),
        },
        {
          key: "issues",
          Icon: S.IssueIcon,
          count: issues,
          label: getCountLabel(issues, "Issue", "Issues"),
        },
        {
          key: "prs",
          Icon: S.PullRequestsIcon,
          count: pullRequests,
          label: getCountLabel(pullRequests, "Pull request", "Pull requests"),
        },
        {
          key: "reviews",
          Icon: S.ReviewIcon,
          count: reviews,
          label: getCountLabel(reviews, "Review", "Reviews"),
        },
      ] as const,
    [commits, issues, pullRequests, reviews]
  );

  const repoText = topCommitRepo?.trim() || "레포지토리 정보가 없습니다.";

  if (!hasDetail) {
    return (
      <S.ActiveContainer>
        {showSummary && dateText && typeof totalContributions === "number" && (
          <S.Title>
            <S.Date>
              <S.DateIcon />
              <S.DateText>{dateText}</S.DateText>
            </S.Date>

            <S.Total>
              <S.Number>{totalContributions.toLocaleString("ko-KR")}</S.Number>
              <S.TotalText>
                {getCountLabel(totalContributions, "Contribution", "Contributions")}
              </S.TotalText>
            </S.Total>
          </S.Title>
        )}

        <S.EmptyBox>
          <S.EmptyTitle>{emptyTitle}</S.EmptyTitle>
          <S.EmptyDesc>{emptyDescription}</S.EmptyDesc>
        </S.EmptyBox>
      </S.ActiveContainer>
    );
  }

  return (
    <S.ActiveContainer>
      {showSummary && dateText && typeof totalContributions === "number" && (
        <S.Title>
          <S.Date>
            <S.DateIcon />
            <S.DateText>{dateText}</S.DateText>
          </S.Date>

          <S.Total>
            <S.Number>{totalContributions.toLocaleString("ko-KR")}</S.Number>
            <S.TotalText>
              {getCountLabel(totalContributions, "Contribution", "Contributions")}
            </S.TotalText>
          </S.Total>
        </S.Title>
      )}

      <S.GithubBox>
        <S.Github>
          {stats.map(item => (
            <S.Stat key={item.key}>
              <item.Icon />
              <S.StatTextGroup>
                <S.StatCount>{item.count}</S.StatCount>
                <S.StatLabel>{item.label}</S.StatLabel>
              </S.StatTextGroup>
            </S.Stat>
          ))}
        </S.Github>

        <S.Info>
          <S.MetaRow>
            <S.FireIcon />
            <S.MetaText>
              <S.MetaLabel>최다 커밋 레포지토리</S.MetaLabel>

              <Tooltip
                content={repoText}
                position="top"
                maxWidth="20rem"
                wrapperStyle={{ flex: 1, minWidth: 0 }}
              >
                <S.MetaValue>{repoText}</S.MetaValue>
              </Tooltip>
            </S.MetaText>
          </S.MetaRow>

          <S.MetaRow>
            <S.CodeIcon />
            <S.MetaText>
              <S.MetaLabel>하루 동안</S.MetaLabel>
              <S.Lines>
                <S.Plus>+{dailyAddedLines}</S.Plus>
                <S.Slash>/</S.Slash>
                <S.Minus>-{dailyDeletedLines}</S.Minus>
                <S.LinesUnit>lines</S.LinesUnit>
              </S.Lines>
            </S.MetaText>
          </S.MetaRow>
        </S.Info>
      </S.GithubBox>
    </S.ActiveContainer>
  );
};
