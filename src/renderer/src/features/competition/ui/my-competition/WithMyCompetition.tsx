import * as S from "./WithMyCompetition.style";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";
import { useMyCompetition } from "@/features/competition/model/useMyCompetition";
import { toLineChartData } from "@/features/competition/model/my-compete-chart/MyCompeteChartData";
import { MyCompetitionLineChart } from "@/features/competition/model/my-compete-chart/MyCompetitionLineChart";
import { CompareStandard, GrowthRateStandard } from "@/entities/competition";

export const WithMyCompetition = () => {
  const {
    dataPoints,
    myCompareData,
    competitionDropdown,
    setCompetitionDropdown,
    growthRateDropdown,
    setGrowthRateDropdown,
    growthRateDropDownValue,
    competitionDropDownValue,
    oneDecimal,
  } = useMyCompetition();

  const chartData = toLineChartData(dataPoints);

  return (
    <S.ContentArea>
      <S.GraphWrapper>
        <S.TitleBox style={{ justifyContent: "space-between" }}>
          <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
          <S.SelectWrapper>
            <S.Select
              value={growthRateDropdown}
              onChange={e => setGrowthRateDropdown(e.target.value as GrowthRateStandard)}
            >
              {growthRateDropDownValue.map(option => (
                <S.Option key={option.key} value={option.key}>
                  {option.label}
                </S.Option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.TitleBox>

        <S.ChartWrapper>
          <MyCompetitionLineChart data={chartData}></MyCompetitionLineChart>
        </S.ChartWrapper>
      </S.GraphWrapper>

      <S.Line />

      <S.GraphWrapper>
        <S.TitleBox>
          <S.AnalyzeTitle>내 기록 비교</S.AnalyzeTitle>
          <S.SubText>각 기간 동안 기록한 스탯의 평균을 비교합니다.</S.SubText>
        </S.TitleBox>

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
                  <S.DataText>{oneDecimal(myCompareData?.earnedExp)} EXP</S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.RecordIcon />
                    <S.ExplainText>학습시간</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>{oneDecimal(myCompareData?.studyTime)} 시간</S.DataText>
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
                  <S.DataText>{oneDecimal(myCompareData?.gitHubAttribution)}</S.DataText>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>
          </S.CompareBox>

          <S.CompareBox>
            <S.TextBox>
              <S.CompareBoxTitle>비교2</S.CompareBoxTitle>
              <S.SelectWrapper>
                <S.Select
                  value={competitionDropdown}
                  onChange={e => setCompetitionDropdown(e.target.value as CompareStandard)}
                >
                  {competitionDropDownValue.map(option => (
                    <S.Option key={option.key} value={option.key}>
                      {option.label}
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
                    <S.DataText>{oneDecimal(myCompareData?.earnedExp)} EXP</S.DataText>
                    <GrowthRate
                      yesterday={oneDecimal(myCompareData?.earnedExp)}
                      today={oneDecimal(myCompareData?.earnedExp)}
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
                    <S.DataText>{oneDecimal(myCompareData?.studyTime)} 시간</S.DataText>
                    <GrowthRate
                      yesterday={oneDecimal(myCompareData?.studyTime)}
                      today={oneDecimal(myCompareData?.studyTime)}
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
                    <S.DataText>{oneDecimal(myCompareData?.gitHubAttribution)}</S.DataText>
                    <GrowthRate
                      yesterday={oneDecimal(myCompareData?.gitHubAttribution)}
                      today={oneDecimal(myCompareData?.gitHubAttribution)}
                    />
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>
          </S.CompareBox>
        </S.CompareContainer>
      </S.GraphWrapper>
    </S.ContentArea>
  );
};
