import * as S from "./TransitionPage.style";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface LineProps {
  $width?: number;
}

export interface ArrowDegProps {
  $deg?: number;
}

interface GrowthRateProps {
  type: "commit" | "pr" | "issue" | "review" | "rate" | "solved" | "class";
}

const statsData = {
  yesterday: {
    commit: 12,
    pr: 5,
    issue: 3,
    review: 2,
    rate: 201,
    solved: 3,
    class: 3,
  },
  today: {
    commit: 22,
    pr: 8,
    issue: 3,
    review: 1,
    rate: 206,
    solved: 5,
    class: 3,
  },
};

export const TransitionPage = () => {
  const [CompareDropdown, setCompareDropdown] = useState("Github");

  return (
    <S.Wrapper>
      <S.Container>
        <S.TopPositionBox>
          <S.TitleBox>
            <Link to="/">
              <S.BackArrowIcon />
            </Link>
            <S.Title>어제와 비교</S.Title>
          </S.TitleBox>
          <S.SelectWrapper>
            <S.Select value={CompareDropdown} onChange={e => setCompareDropdown(e.target.value)}>
              {["Github", "solved.ac"].map(option => (
                <S.Option key={option} value={option}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.TopPositionBox>
        {CompareDropdown === "Github" ? <Github /> : <SolvedAc />}
      </S.Container>
    </S.Wrapper>
  );
};

export const GrowthRate = ({ type }: GrowthRateProps) => {
  const yesterday = statsData.yesterday[type];
  const today = statsData.today[type];

  const diff = today - yesterday;

  const isIncreased = diff > 0;
  const isDecreased = diff < 0;
  const isSame = diff === 0;

  return (
    <S.GrowthWrapper>
      <S.GrowthValue $status={isIncreased ? "up" : isDecreased ? "down" : "same"}>
        {isSame ? (
          "-"
        ) : (
          <>
            {isIncreased ? (
              <S.GrowthRateArrowIcon $deg={180} />
            ) : (
              <S.GrowthRateArrowIcon $deg={0} />
            )}
            {Math.abs(diff)}
          </>
        )}
      </S.GrowthValue>
    </S.GrowthWrapper>
  );
};

export const Github = () => {
  return (
    <S.ContentBox>
      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>어제</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>2025년 12월 21일</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>커밋 수</S.InfoTitle>
            <S.CalculateBox>
              <S.GithubInfoBox>
                <S.GitCommitIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>12</S.CountText>
                  <S.InfoSubtitle>commit</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>TeamProcess</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+420</S.PlusText> / <S.MinusText>-180</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>10:21</S.TimeText> · 마지막 커밋{" "}
                    <S.TimeText>23:48</S.TimeText>
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
                  <S.CountText>5</S.CountText>
                  <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.GithubInfoBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>TeamProcess</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>4</S.TimeText> · Open <S.TimeText>1</S.TimeText> · Closed{" "}
                    <S.TimeText>0</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>3</S.TimeText> · 승인 <S.TimeText>2</S.TimeText> ·
                    변경요청 <S.TimeText>1</S.TimeText>
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
                <span className="count">3</span>
                <span className="unit">Issues</span>
              </S.MainStat>
            </S.FooterItem>
            <S.HeightLine />
            <S.FooterItem>
              <S.GroupTitle>리뷰 수</S.GroupTitle>
              <S.MainStat>
                <S.ReviewIcon $width={2.25} />
                <span className="count">2</span>
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
            <S.DateText>2025년 12월 22일</S.DateText>
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
                      <S.CountText>22</S.CountText>
                      <S.InfoSubtitle>commit</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate type="commit" />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 커밋 레포지토리</S.ExplainText>
                  <S.RepositorieName>TeamProcess</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.CodeIcon />
                  <S.CodeGap>
                    하루 동안 <S.PlusText>+420</S.PlusText> / <S.MinusText>-180</S.MinusText> lines
                  </S.CodeGap>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.TimeIcon />
                  <S.ExplainText>
                    첫커밋 <S.TimeText>10:21</S.TimeText> · 마지막 커밋{" "}
                    <S.TimeText>23:48</S.TimeText>
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
                      <S.CountText>8</S.CountText>
                      <S.InfoSubtitle>Pull request</S.InfoSubtitle>
                    </S.InfoSubtitleBox>
                  </S.GithubInfoBox>
                  <GrowthRate type="pr" />
                </S.RateBox>
              </S.GrowthBox>
              <S.CalculateContainer>
                <S.CalculateInfoBox>
                  <S.FireIcon />
                  <S.ExplainText>최다 PR 레포지토리</S.ExplainText>
                  <S.RepositorieName>TeamProcess</S.RepositorieName>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.StatusIcon />
                  <S.ExplainText>
                    Merged <S.TimeText>4</S.TimeText> · Open <S.TimeText>1</S.TimeText> · Closed{" "}
                    <S.TimeText>0</S.TimeText>
                  </S.ExplainText>
                </S.CalculateInfoBox>
                <S.WidthLine />
                <S.CalculateInfoBox>
                  <S.ReviewIcon $width={1.25} />
                  <S.ExplainText>
                    리뷰 요청 <S.TimeText>3</S.TimeText> · 승인 <S.TimeText>2</S.TimeText> ·
                    변경요청 <S.TimeText>1</S.TimeText>
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
                      <span className="count">3</span>
                      <span className="unit">Issues</span>
                    </S.MainStat>
                    <GrowthRate type="issue" />
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
                      <span className="count">1</span>
                      <span className="unit">Reviews</span>
                    </S.MainStat>
                    <GrowthRate type="review" />
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

export const SolvedAc = () => {
  return (
    <S.ContentBox>
      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>어제</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>2025년 12월 21일</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>점수</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>201</S.CountText>
                  <S.InfoSubtitle>rate</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent>
            <S.InfoTitle>해결한 문제 수</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>3</S.CountText>
                  <S.InfoSubtitle>solved</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent style={{ border: "none" }}>
            <S.InfoTitle>클래스</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>3</S.CountText>
                  <S.InfoSubtitle>class</S.InfoSubtitle>
                </S.InfoSubtitleBox>
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
        </S.InfoContainer>
      </S.Content>

      {/* 분간 */}

      <S.Content>
        <S.SubtitleBox>
          <S.Subtitle>오늘</S.Subtitle>
          <S.DateBox>
            <S.DateIcon />
            <S.DateText>2025년 12월 22일</S.DateText>
          </S.DateBox>
        </S.SubtitleBox>
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>점수</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>206</S.CountText>
                  <S.InfoSubtitle>rate</S.InfoSubtitle>
                </S.InfoSubtitleBox>
                <GrowthRate type="rate" />
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent>
            <S.InfoTitle>해결한 문제 수</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>5</S.CountText>
                  <S.InfoSubtitle>solved</S.InfoSubtitle>
                </S.InfoSubtitleBox>
                <GrowthRate type="solved" />
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
          <S.InfoContent style={{ border: "none" }}>
            <S.InfoTitle>클래스</S.InfoTitle>
            <S.CalculateBox>
              <S.SolvedInfoBox>
                <S.SolvedAcIcon />
                <S.InfoSubtitleBox>
                  <S.CountText>3</S.CountText>
                  <S.InfoSubtitle>class</S.InfoSubtitle>
                </S.InfoSubtitleBox>
                <GrowthRate type="class" />
              </S.SolvedInfoBox>
            </S.CalculateBox>
          </S.InfoContent>
        </S.InfoContainer>
      </S.Content>
    </S.ContentBox>
  );
};
