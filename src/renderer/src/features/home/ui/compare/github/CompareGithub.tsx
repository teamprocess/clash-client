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
            <S.DateText>{yesterday.date}</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>커밋 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GithubInfoBox>
                <S.GitCommitIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>{yesterday.commit.count}</S.CountText>
                  <S.InfoSubtitle>commit</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>{yesterday.commit.representationRepo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+{yesterday.commit.addLines}</S.PlusText> /{" "}
                    <S.MinusText>-{yesterday.commit.removeLines}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>{yesterday.commit.firstCommit.slice(0, 10)}</S.TimeText> ·
                    마지막 커밋 <S.TimeText>{yesterday.commit.lastCommit.slice(0, 10)}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent>
            <S.InfoTitle>PR 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GithubInfoBox>
                <S.GitPRIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>{yesterday.pullRequest.count}</S.CountText>
                  <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>{yesterday.pullRequest.representationRepo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{yesterday.pullRequest.mergedCount}</S.TimeText> · Open{" "}
                    <S.TimeText>{yesterday.pullRequest.openCount}</S.TimeText> · Closed{" "}
                    <S.TimeText>{yesterday.pullRequest.closedCount}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>{yesterday.pullRequest.inReviewCount}</S.TimeText> · 승인{" "}
                    <S.TimeText>{yesterday.pullRequest.approvedCount}</S.TimeText> · 변경요청{" "}
                    <S.TimeText>{yesterday.pullRequest.requestCount}</S.TimeText>
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
                <span className="count">{yesterday.issue.count}</span>
                <span className="unit">Issues</span>
              </S.MainStat>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <S.MainStat>
                <S.ReviewIcon $width={2.25} />
                <span className="count">{yesterday.review.count}</span>
                <span className="unit">Review</span>
              </S.MainStat>
            </S.FooterItem>
          </S.GridFooter>
        </S.InfoContainer>
      </S.Content>

      {/* 분간 */}

      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>오늘</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>{today.date}</S.DateText>
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
                      <S.CountText>{today.commit.count}</S.CountText>
                      <S.InfoSubtitle>commit</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate yesterday={yesterday.commit.count} today={today.commit.count} />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>{today.commit.representationRepo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>{today.commit.addLines}</S.PlusText> /{" "}
                    <S.MinusText>-{today.commit.removeLines}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>{today.commit.firstCommit.slice(0, 10)}</S.TimeText> · 마지막
                    커밋 <S.TimeText>{today.commit.lastCommit.slice(0, 10)}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent>
            <S.InfoTitle>PR 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GrowthBox>
                <S.RateBox>
                  <S.GithubInfoBox>
                    <S.GitPRIcon />
                    <S.InfoSubtitleBox>
                      <S.CountText>{today.pullRequest.count}</S.CountText>
                      <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate
                    yesterday={yesterday.pullRequest.count}
                    today={today.pullRequest.count}
                  />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>{today.pullRequest.representationRepo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{today.pullRequest.mergedCount}</S.TimeText> · Open{" "}
                    <S.TimeText>{today.pullRequest.openCount}</S.TimeText> · Closed{" "}
                    <S.TimeText>{today.pullRequest.closedCount}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>{today.pullRequest.inReviewCount}</S.TimeText> · 승인{" "}
                    <S.TimeText>{today.pullRequest.approvedCount}</S.TimeText> · 변경요청{" "}
                    <S.TimeText>{today.pullRequest.requestCount}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
              </S.CalculateContainer>
            </S.CalculateBox>
          </S.InfoContent>
          <S.GridFooter>
            <S.FooterItem>
              <S.GroupTitle>이슈 수</S.GroupTitle>
              <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <S.GrowthBox>
                  <S.RateBox>
                    <S.MainStat>
                      <S.GitIssueIcon />
                      <span className="count">{today.issue.count}</span>
                      <span className="unit">Issues</span>
                    </S.MainStat>
                    <GrowthRate yesterday={yesterday.issue.count} today={today.issue.count} />
                  </S.RateBox>
                </S.GrowthBox>
              </div>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <S.GrowthBox>
                  <S.RateBox>
                    <S.MainStat>
                      <S.ReviewIcon $width={2.25} />
                      <span className="count">{today.review.count}</span>
                      <span className="unit">Reviews</span>
                    </S.MainStat>
                    <GrowthRate yesterday={yesterday.review.count} today={today.review.count} />
                  </S.RateBox>
                </S.GrowthBox>
              </div>
            </S.FooterItem>
          </S.GridFooter>
        </S.InfoContainer>
      </S.Content>
    </S.ContentBox>
  );
};
