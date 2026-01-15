import * as S from "./CompareGithub.style";
import { GithubProps } from "@/features/home/model/useCompare";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";

export const Github = ({ yesterday, today }: GithubProps) => {
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
                  <S.RepositorieName>{yesterday.commit.representation_repo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+{yesterday.commit.add_lines}</S.PlusText> /{" "}
                    <S.MinusText>-{yesterday.commit.remove_lines}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>{yesterday.commit.first_commit}</S.TimeText> · 마지막 커밋{" "}
                    <S.TimeText>{yesterday.commit.last_commit}</S.TimeText>
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
                  <S.CountText>{yesterday.pull_request.count}</S.CountText>
                  <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>
                    {yesterday.pull_request.representation_repo}
                  </S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{yesterday.pull_request.merged_count}</S.TimeText> · Open{" "}
                    <S.TimeText>{yesterday.pull_request.open_count}</S.TimeText> · Closed{" "}
                    <S.TimeText>{yesterday.pull_request.closed_count}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>{yesterday.pull_request.in_review_count}</S.TimeText> ·
                    승인 <S.TimeText>{yesterday.pull_request.approved_count}</S.TimeText> · 변경요청{" "}
                    <S.TimeText>{yesterday.pull_request.request_count}</S.TimeText>
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
                  <S.RepositorieName>{today.commit.representation_repo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>{today.commit.add_lines}</S.PlusText> /{" "}
                    <S.MinusText>-{today.commit.remove_lines}</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>{today.commit.first_commit}</S.TimeText> · 마지막 커밋{" "}
                    <S.TimeText>{today.commit.last_commit}</S.TimeText>
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
                      <S.CountText>{today.pull_request.count}</S.CountText>
                      <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate
                    yesterday={yesterday.pull_request.count}
                    today={today.pull_request.count}
                  />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>{today.pull_request.representation_repo}</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>{today.pull_request.merged_count}</S.TimeText> · Open{" "}
                    <S.TimeText>{today.pull_request.open_count}</S.TimeText> · Closed{" "}
                    <S.TimeText>{today.pull_request.closed_count}</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>{today.pull_request.in_review_count}</S.TimeText> · 승인{" "}
                    <S.TimeText>{today.pull_request.approved_count}</S.TimeText> · 변경요청{" "}
                    <S.TimeText>{today.pull_request.request_count}</S.TimeText>
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
