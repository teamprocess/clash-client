import * as S from "./GithubInfo.style";
import CommitImg from "@/pages/profile/assets/Commit.svg?url";
import IssueImg from "@/pages/profile/assets/Issue.svg?url";
import PullRequestsImg from "@/pages/profile/assets/PullRequests.svg?url";
import DateImg from "@/pages/profile/assets/Date.svg?url";
import FireImg from "@/pages/profile/assets/Fire.svg?url";
import CodeImg from "@/pages/profile/assets/Code.svg?url";
import ReviewImg from "@/pages/profile/assets/Review.svg?url";

type GithubInfoProps = {
  dateText?: string;
  totalContributions?: number;
  commits?: number;
  issues?: number;
  pullRequests?: number;
  reviews?: number;
  topRepoName?: string;
  dailyAddedLines?: number;
  dailyDeletedLines?: number;
};

export const GithubInfo = ({
  dateText = "2026년 2월 2일",
  totalContributions = 1333,
  commits = 12,
  issues = 3,
  pullRequests = 5,
  reviews = 2,
  topRepoName = "TeamProcess",
  dailyAddedLines = 420,
  dailyDeletedLines = 180,
}: GithubInfoProps) => {
  const stats = [
    { key: "commits", icon: CommitImg, alt: "커밋", count: commits, label: "Commits" },
    { key: "issues", icon: IssueImg, alt: "이슈", count: issues, label: "Issues" },
    {
      key: "prs",
      icon: PullRequestsImg,
      alt: "풀리퀘",
      count: pullRequests,
      label: "Pull requests",
    },
    { key: "reviews", icon: ReviewImg, alt: "리뷰", count: reviews, label: "Reviews" },
  ] as const;

  return (
    <S.ActiveContainer>
      <S.Title>
        <S.Date>
          <S.Icon src={DateImg} alt="날짜" />
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
              <S.StatIcon src={item.icon} alt={item.alt} />
              <S.StatTextGroup>
                <S.StatCount>{item.count}</S.StatCount>
                <S.StatLabel>{item.label}</S.StatLabel>
              </S.StatTextGroup>
            </S.Stat>
          ))}
        </S.Github>

        <S.Info>
          <S.MetaRow>
            <S.MetaIcon src={FireImg} alt="최다 커밋 레포지토리" />
            <S.MetaText>
              <S.MetaLabel>최다 커밋 레포지토리</S.MetaLabel>
              <S.MetaValue>{topRepoName}</S.MetaValue>
            </S.MetaText>
          </S.MetaRow>

          <S.HDivider />

          <S.MetaRow>
            <S.MetaIcon src={CodeImg} alt="하루 동안 변경 라인" />
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
