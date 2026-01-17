import * as S from "./CompetitionPage.style";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";
import { useCompetition } from "@/pages/competition/model/useCompetition";

export const CompetitionPage = () => {
  const { withMyCompetition } = useCompetition();

  return (
    <S.Wrapper>
      <S.CompetitionTopBar>
        <S.WitchCompete
          $isActive={withMyCompetition.activeTab === "ME"}
          onClick={() => withMyCompetition.setActiveTab("ME")}
        >
          나와의 경쟁
        </S.WitchCompete>

        <S.WitchCompete
          $isActive={withMyCompetition.activeTab === "RIVAL"}
          onClick={() => withMyCompetition.setActiveTab("RIVAL")}
        >
          라이벌과의 경쟁
        </S.WitchCompete>
      </S.CompetitionTopBar>
      {withMyCompetition.activeTab === "ME" ? (
        <S.ContentArea>
          <S.GraphWrapper>
            <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
            <S.GraphBox>
              <S.Bars>
                {withMyCompetition.data.map(({ date, growth_rate }) => (
                  <S.BarWrapper key={date}>
                    <S.Bar $ratio={growth_rate / withMyCompetition.activeMaxCommit}>
                      <S.ValueHoveringBox>
                        <S.BallValue />
                        <S.BarValue>{growth_rate}%</S.BarValue>
                      </S.ValueHoveringBox>
                    </S.Bar>

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
                      <S.DataText>
                        {withMyCompetition.allData.nowMyCompareData[0].earned_exp} EXP
                      </S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.RecordIcon />
                        <S.ExplainText>학습시간</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.DataText>
                        {withMyCompetition.allData.nowMyCompareData[0].study_time} 시간
                      </S.DataText>
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
                      <S.DataText>0 문제</S.DataText>
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
                      <S.DataText>
                        {withMyCompetition.allData.nowMyCompareData[0].github_attributor}
                      </S.DataText>
                    </S.DataBoxing>
                  </S.GridBox>
                </S.GridContainer>
              </S.CompareBox>
              <S.CompareBox>
                <S.TextBox>
                  <S.CompareBoxTitle>비교2</S.CompareBoxTitle>
                  <S.SelectWrapper>
                    <S.Select
                      value={withMyCompetition.ActiveDropdown}
                      onChange={e => withMyCompetition.setActiveDropdown(e.target.value)}
                    >
                      {["어제", "일주일 전", "한달 전", "전 시즌"].map(option => (
                        <S.Option key={option} value={option}>
                          {option}
                        </S.Option>
                      ))}
                    </S.Select>
                    <S.ArrowIcon />
                  </S.SelectWrapper>
                </S.TextBox>
                <S.GridContainer>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.EXPIcon />
                        <S.ExplainText>총 획득 EXP</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.GrowthRateBox>
                        <S.DataText>
                          {withMyCompetition.allData.beforeMyCompareData[0].earned_exp} EXP
                        </S.DataText>
                        <GrowthRate
                          yesterday={withMyCompetition.allData.nowMyCompareData[0].earned_exp}
                          today={withMyCompetition.allData.beforeMyCompareData[0].earned_exp}
                        />
                      </S.GrowthRateBox>
                    </S.DataBoxing>
                  </S.GridBox>
                  <S.GridBox>
                    <S.DataBoxing>
                      <S.ImpressiveBox>
                        <S.RecordIcon />
                        <S.ExplainText>학습시간</S.ExplainText>
                      </S.ImpressiveBox>
                      <S.GrowthRateBox>
                        <S.DataText>
                          {withMyCompetition.allData.beforeMyCompareData[0].study_time} 시간
                        </S.DataText>
                        <GrowthRate
                          yesterday={withMyCompetition.allData.nowMyCompareData[0].study_time}
                          today={withMyCompetition.allData.beforeMyCompareData[0].study_time}
                        />
                      </S.GrowthRateBox>
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
                      <S.DataText>0 문제</S.DataText>
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
                      <S.GrowthRateBox>
                        <S.DataText>
                          {withMyCompetition.allData.beforeMyCompareData[0].github_attributor}
                        </S.DataText>
                        <GrowthRate
                          yesterday={
                            withMyCompetition.allData.nowMyCompareData[0].github_attributor
                          }
                          today={withMyCompetition.allData.beforeMyCompareData[0].github_attributor}
                        />
                      </S.GrowthRateBox>
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
