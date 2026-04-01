import * as S from "./CompareGithub.style";
import { GrowthRate, Tooltip } from "@/shared/ui";
import { CompareResponse } from "@/entities/home/model/useCompare.types";
import { getCountLabel } from "@/shared/lib";

const renderRepositoryName = (
  name: string | null | undefined,
  emptyText: "현재 최다 커밋 레포지토리가 없습니다." | "현재 최다 PR 레포지토리가 없습니다."
) => {
  const repositoryText = name ?? emptyText;

  return (
    <Tooltip
      content={repositoryText}
      position="top"
      maxWidth="100rem"
      wrapperStyle={{ flex: 1, maxWidth: "100%", minWidth: 0 }}
    >
      <S.RepositoryName>{repositoryText}</S.RepositoryName>
    </Tooltip>
  );
};

export const Github = ({ today, yesterday }: CompareResponse) => {
  const yesterdayCommitCount = yesterday?.commit.count ?? 0;
  const yesterdayPullRequestCount = yesterday?.pullRequest.count ?? 0;
  const yesterdayIssueCount = yesterday?.issue.count ?? 0;
  const yesterdayReviewCount = yesterday?.review.count ?? 0;

  const todayCommitCount = today?.commit.count ?? 0;
  const todayPullRequestCount = today?.pullRequest.count ?? 0;
  const todayIssueCount = today?.issue.count ?? 0;
  const todayReviewCount = today?.review.count ?? 0;

  return (
    <S.ContentBox>
      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>어제</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>{yesterday?.date}</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>커밋 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GithubInfoBox>
                <S.GitCommitIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>{yesterdayCommitCount}</S.CountText>
                  <S.InfoSubtitle>
                    {getCountLabel(yesterdayCommitCount, "Commit", "Commits")}
                  </S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText $fitContent>최다 커밋 레포지토리</S.ExplainText>
                  {renderRepositoryName(
                    yesterday?.commit.representationRepo,
                    "현재 최다 커밋 레포지토리가 없습니다."
                  )}
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+{yesterday?.commit.addLines ?? 0}</S.PlusText> /{" "}
                    <S.MinusText>-{yesterday?.commit.removeLines ?? 0}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫 커밋{" "}
                    <S.TimeText>{yesterday?.commit.firstCommit?.slice(11, 16) ?? 0}</S.TimeText> ·
                    마지막 커밋{" "}
                    <S.TimeText>{yesterday?.commit.lastCommit?.slice(11, 16) ?? 0}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>

          <S.InfoContent $mb="1rem">
            <S.InfoTitle>PR 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GithubInfoBox>
                <S.GitPRIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>{yesterdayPullRequestCount}</S.CountText>
                  <S.InfoSubtitle>
                    {getCountLabel(yesterdayPullRequestCount, "Pull Request", "Pull Requests")}
                  </S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText $fitContent>최다 PR 레포지토리</S.ExplainText>
                  {renderRepositoryName(
                    yesterday?.pullRequest.representationRepo,
                    "현재 최다 PR 레포지토리가 없습니다."
                  )}
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{yesterday?.pullRequest.mergedCount ?? 0}</S.TimeText> · Open{" "}
                    <S.TimeText>{yesterday?.pullRequest.openCount ?? 0}</S.TimeText> · Closed{" "}
                    <S.TimeText>{yesterday?.pullRequest.closedCount ?? 0}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>

          <S.GridFooter>
            <S.FooterItem>
              <S.GroupTitle>이슈 수</S.GroupTitle>
              <S.MainStat>
                <S.GitIssueIcon />
                <span className="count">{yesterdayIssueCount}</span>
                <span className="unit">
                  {getCountLabel(yesterdayIssueCount, "Issue", "Issues")}
                </span>
              </S.MainStat>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <S.MainStat>
                <S.ReviewIcon $width={2.25} />
                <span className="count">{yesterdayReviewCount}</span>
                <span className="unit">
                  {getCountLabel(yesterdayReviewCount, "Review", "Reviews")}
                </span>
              </S.MainStat>
            </S.FooterItem>
          </S.GridFooter>
        </S.InfoContainer>
      </S.Content>

      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>오늘</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>{today?.date}</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>커밋 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GrowthBox>
                <S.RateBox>
                  <S.GithubInfoBox>
                    <S.GitCommitIcon />
                    <S.InfoSubtitleBox>
                      <S.CountText>{todayCommitCount}</S.CountText>
                      <S.InfoSubtitle>
                        {getCountLabel(todayCommitCount, "Commit", "Commits")}
                      </S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate yesterday={yesterdayCommitCount} today={todayCommitCount} />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText $fitContent>최다 커밋 레포지토리</S.ExplainText>
                  {renderRepositoryName(
                    today?.commit.representationRepo,
                    "현재 최다 커밋 레포지토리가 없습니다."
                  )}
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+{today?.commit.addLines ?? 0}</S.PlusText> /{" "}
                    <S.MinusText>-{today?.commit.removeLines ?? 0}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫 커밋 <S.TimeText>{today?.commit.firstCommit?.slice(11, 16) ?? 0}</S.TimeText>{" "}
                    · 마지막 커밋{" "}
                    <S.TimeText>{today?.commit.lastCommit?.slice(11, 16) ?? 0}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>

          <S.InfoContent $mb="1rem">
            <S.InfoTitle>PR 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GrowthBox>
                <S.RateBox>
                  <S.GithubInfoBox>
                    <S.GitPRIcon />
                    <S.InfoSubtitleBox>
                      <S.CountText>{todayPullRequestCount}</S.CountText>
                      <S.InfoSubtitle>
                        {getCountLabel(todayPullRequestCount, "Pull Request", "Pull Requests")}
                      </S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate yesterday={yesterdayPullRequestCount} today={todayPullRequestCount} />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText $fitContent>최다 PR 레포지토리</S.ExplainText>
                  {renderRepositoryName(
                    today?.pullRequest.representationRepo,
                    "현재 최다 PR 레포지토리가 없습니다."
                  )}
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{today?.pullRequest.mergedCount ?? 0}</S.TimeText> · Open{" "}
                    <S.TimeText>{today?.pullRequest.openCount ?? 0}</S.TimeText> · Closed{" "}
                    <S.TimeText>{today?.pullRequest.closedCount ?? 0}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>

          <S.GridFooter>
            <S.FooterItem>
              <S.GroupTitle>이슈 수</S.GroupTitle>
              <S.FooterCenter>
                <S.GrowthBox>
                  <S.RateBox>
                    <S.MainStat>
                      <S.GitIssueIcon />
                      <span className="count">{todayIssueCount}</span>
                      <span className="unit">
                        {getCountLabel(todayIssueCount, "Issue", "Issues")}
                      </span>
                    </S.MainStat>
                    <GrowthRate yesterday={yesterdayIssueCount} today={todayIssueCount} />
                  </S.RateBox>
                </S.GrowthBox>
              </S.FooterCenter>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <S.FooterCenter>
                <S.GrowthBox>
                  <S.RateBox>
                    <S.MainStat>
                      <S.ReviewIcon $width={2.25} />
                      <span className="count">{todayReviewCount}</span>
                      <span className="unit">
                        {getCountLabel(todayReviewCount, "Review", "Reviews")}
                      </span>
                    </S.MainStat>
                    <GrowthRate yesterday={yesterdayReviewCount} today={todayReviewCount} />
                  </S.RateBox>
                </S.GrowthBox>
              </S.FooterCenter>
            </S.FooterItem>
          </S.GridFooter>
        </S.InfoContainer>
      </S.Content>
    </S.ContentBox>
  );
};
