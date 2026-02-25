import * as S from "./CompareGithub.style";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";
import { CompareResponse } from "@/entities/home/model/useCompare.types";

export const Github = ({ today, yesterday }: CompareResponse) => {
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
                  <S.CountText>{yesterday?.commit.count ?? 0}</S.CountText>
                  <S.InfoSubtitle>Commit</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>
                    {yesterday?.commit.representationRepo ??
                      "현재 최다 커밋 레포지토리가 없습니다."}
                  </S.RepositorieName>
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
                  <S.CountText>{yesterday?.pullRequest.count ?? 0}</S.CountText>
                  <S.InfoSubtitle>Pull Request</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>
                    {yesterday?.pullRequest.representationRepo ??
                      "현재 최다 PR 레포지토리가 없습니다."}
                  </S.RepositorieName>
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
                <span className="count">{yesterday?.issue.count ?? 0}</span>
                <span className="unit">Issues</span>
              </S.MainStat>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <S.MainStat>
                <S.ReviewIcon $width={2.25} />
                <span className="count">{yesterday?.review.count ?? 0}</span>
                <span className="unit">Review</span>
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
                      <S.CountText>{today?.commit.count ?? 0}</S.CountText>
                      <S.InfoSubtitle>Commit</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate
                    yesterday={yesterday?.commit.count ?? 0}
                    today={today?.commit.count ?? 0}
                  />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>
                    {today?.commit.representationRepo ?? "현재 최다 커밋 레포지토리가 없습니다."}
                  </S.RepositorieName>
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
                      <S.CountText>{today?.pullRequest.count ?? 0}</S.CountText>
                      <S.InfoSubtitle>Pull Request</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate
                    yesterday={yesterday?.pullRequest.count ?? 0}
                    today={today?.pullRequest.count ?? 0}
                  />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>
                    {today?.pullRequest.representationRepo ?? "현재 최다 PR 레포지토리가 없습니다."}
                  </S.RepositorieName>
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
                      <span className="count">{today?.issue.count ?? 0}</span>
                      <span className="unit">Issues</span>
                    </S.MainStat>
                    <GrowthRate
                      yesterday={yesterday?.issue.count ?? 0}
                      today={today?.issue.count ?? 0}
                    />
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
                      <span className="count">{today?.review.count ?? 0}</span>
                      <span className="unit">Reviews</span>
                    </S.MainStat>
                    <GrowthRate
                      yesterday={yesterday?.review.count ?? 0}
                      today={today?.review.count ?? 0}
                    />
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
