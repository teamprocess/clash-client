import { useMemo } from "react";
import * as S from "./GithubInfo.style";

export type GithubInfoProps = {
  dateText: string;
  totalContributions: number;
  commits: number;
  issues: number;
  pullRequests: number;
  reviews: number;
  topRepoName: string;
  dailyAddedLines: number;
  dailyDeletedLines: number;
};

export const GithubInfo = ({
  dateText,
  totalContributions,
  commits,
  issues,
  pullRequests,
  reviews,
  topRepoName,
  dailyAddedLines,
  dailyDeletedLines,
}: GithubInfoProps) => {
  const stats = useMemo(
    () =>
      [
        { key: "commits", Icon: S.CommitIcon, count: commits, label: "Commits" },
        { key: "issues", Icon: S.IssueIcon, count: issues, label: "Issues" },
        { key: "prs", Icon: S.PullRequestsIcon, count: pullRequests, label: "Pull requests" },
        { key: "reviews", Icon: S.ReviewIcon, count: reviews, label: "Reviews" },
      ] as const,
    [commits, issues, pullRequests, reviews]
  );

  return (
    <S.ActiveContainer>
      <S.Title>
        <S.Date>
          <S.DateIcon />
          <S.DateText>{dateText}</S.DateText>
        </S.Date>

        <S.Total>
          <S.Number>{totalContributions.toLocaleString("ko-KR")}</S.Number>
          <S.TotalText>Contributions</S.TotalText>
        </S.Total>
      </S.Title>

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
              <S.MetaValue>{topRepoName}</S.MetaValue>
            </S.MetaText>
          </S.MetaRow>

          <S.HDivider />

          <S.MetaRow>
            <S.CodeIcon />
            <S.MetaText>
              <S.MetaLabel>하루 동안</S.MetaLabel>
              <S.Lines>
                <S.Plus>+{dailyAddedLines}</S.Plus>
                <S.Slash> / </S.Slash>
                <S.Minus>-{dailyDeletedLines}</S.Minus>
                <S.LinesUnit> lines</S.LinesUnit>
              </S.Lines>
            </S.MetaText>
          </S.MetaRow>

          <S.HDivider />
        </S.Info>
      </S.GithubBox>
    </S.ActiveContainer>
  );
};
