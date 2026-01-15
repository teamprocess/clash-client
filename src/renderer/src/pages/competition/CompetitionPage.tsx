import * as S from "./CompetitionPage.style";
import { useState } from "react";

type CompeteTab = "ME" | "RIVAL";

const data: { date: number; growth_rate: number }[] = [
  { date: 1, growth_rate: 31 },
  { date: 2, growth_rate: 41 },
  { date: 3, growth_rate: 23 },
  { date: 4, growth_rate: 12 },
  { date: 5, growth_rate: 25 },
  { date: 6, growth_rate: 7 },
  { date: 7, growth_rate: 12 },
  { date: 8, growth_rate: 9 },
  { date: 9, growth_rate: 11 },
  { date: 10, growth_rate: 12 },
  { date: 11, growth_rate: 19 },
  { date: 12, growth_rate: 21 },
];

const activeMaxCommit = Math.max(...data.map(m => m.growth_rate));

export const CompetitionPage = () => {
  const [activeTab, setActiveTab] = useState<CompeteTab>("ME");

  return (
    <S.Wrapper>
      <S.CompetitionTopBar>
        <S.WitchCompete $isActive={activeTab === "ME"} onClick={() => setActiveTab("ME")}>
          나와의 경쟁
        </S.WitchCompete>

        <S.WitchCompete $isActive={activeTab === "RIVAL"} onClick={() => setActiveTab("RIVAL")}>
          라이벌과의 경쟁
        </S.WitchCompete>
      </S.CompetitionTopBar>
      {activeTab === "ME" ? (
        <S.ContentArea>
          <S.GraphWrapper>
            <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
            <S.GraphBox>
              <S.Bars>
                {data.map(({ date, growth_rate }) => (
                  <S.BarWrapper key={date}>
                    <S.Bar $ratio={growth_rate / activeMaxCommit}>
                      <S.BallValue />
                    </S.Bar>
                    <S.BarValue>{growth_rate}%</S.BarValue>

                    <S.BarLabel>{date}월</S.BarLabel>
                  </S.BarWrapper>
                ))}
              </S.Bars>
            </S.GraphBox>
          </S.GraphWrapper>
          <S.Line />
          <S.GraphWrapper>
            <S.TtitleBox>
              <S.AnalyzeTitle>내 기록 비교</S.AnalyzeTitle>
              <S.SubText>각 기간 동안 기록한 스탯의 평균을 비교합니다.</S.SubText>
            </S.TtitleBox>
            <S.CompareContainer>
              <S.CompareBox>
                <S.TextBox>
                  <S.CompareBoxTitle>비교1</S.CompareBoxTitle>
                  <S.DateText>오늘</S.DateText>
                </S.TextBox>
                <S.GridContainer>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.EXPIcon />
                        <S.ExplainText>총 획득 EXP</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>412.9 EXP</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.RecordIcon />
                        <S.ExplainText>학습시간</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>4.2시간</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.SolvedAcIcon />
                        <S.ExplainText>
                          solved.ac
                          <br />
                          문제 해결 수
                        </S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>2.3 문제</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.GithubIcon />
                        <S.ExplainText>
                          Github
                          <br />
                          기여수
                        </S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>24.2</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                </S.GridContainer>
              </S.CompareBox>
              <S.CompareBox>
                <S.TextBox>
                  <S.CompareBoxTitle>비교2</S.CompareBoxTitle>
                  <S.DateText>오늘</S.DateText>
                </S.TextBox>
                <S.GridContainer>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.EXPIcon />
                        <S.ExplainText>총 획득 EXP</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>412.9 EXP</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.RecordIcon />
                        <S.ExplainText>학습시간</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>4.2시간</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.SolvedAcIcon />
                        <S.ExplainText>
                          solved.ac
                          <br />
                          문제 해결 수
                        </S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>2.3 문제</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.GithubIcon />
                        <S.ExplainText>
                          Github
                          <br />
                          기여수
                        </S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>24.2</S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                </S.GridContainer>
              </S.CompareBox>
            </S.CompareContainer>
          </S.GraphWrapper>
        </S.ContentArea>
      ) : (
        <div>라이벌 리스트 내용...</div>
      )}
    </S.Wrapper>
  );
};
