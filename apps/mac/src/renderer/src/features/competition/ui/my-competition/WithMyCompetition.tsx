import * as S from "./WithMyCompetition.style";
import { GrowthRate, Select, MyCompetitionLineChart } from "@/shared/ui";
import { useMyCompetition } from "@/features/competition/model/useMyCompetition";
import { toLineChartData } from "@/shared/ui/my-compete-chart/formatMyCompeteChartData";
import { CompareStandard, GrowthRateStandard } from "@/entities/competition";
import { formatTime } from "@/shared/lib";

export const WithMyCompetition = () => {
  const {
    dataPoints,
    todayData,
    compareData,
    competitionDropdown,
    setCompetitionDropdown,
    growthRateDropdown,
    setGrowthRateDropdown,
    growthRateDropDownValue,
    competitionDropDownValue,
    roundOneDecimal,
  } = useMyCompetition();

  const chartData = toLineChartData(dataPoints);

  return (
    <S.ContentArea>
      <S.GraphWrapper>
        <S.TitleBox $justify="space-between">
          <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
          <Select<GrowthRateStandard>
            value={growthRateDropdown}
            options={growthRateDropDownValue}
            onChange={setGrowthRateDropdown}
          />
        </S.TitleBox>

        <S.ChartWrapper>
          <MyCompetitionLineChart dataPoint={chartData.dataPoint} />
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
              <S.CompareBoxTitle>이전의 활동량</S.CompareBoxTitle>
              <Select<CompareStandard>
                value={competitionDropdown}
                options={competitionDropDownValue}
                onChange={setCompetitionDropdown}
              />
            </S.TextBox>

            <S.GridContainer>
              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.EXPIcon />
                    <S.ExplainText>총 획득 EXP</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>{roundOneDecimal(compareData?.earnedExp)} EXP</S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.RecordIcon />
                    <S.ExplainText>학습시간</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>{formatTime(roundOneDecimal(compareData?.studyTime))}</S.DataText>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>

            <S.GridBox>
              <S.DataBoxing>
                <S.ImpressiveBox>
                  <S.GithubIcon />
                  <S.ExplainText>Github</S.ExplainText>
                </S.ImpressiveBox>
                <S.GrowthRateBox $direction="row" $gap="2rem">
                  <S.DataText>
                    <S.SubText>Commit</S.SubText>
                    {roundOneDecimal(compareData?.commitCount)}개
                  </S.DataText>
                  <S.DataText>
                    <S.SubText>Contributions</S.SubText>
                    {roundOneDecimal(compareData?.gitHubAttribution)}개
                  </S.DataText>
                </S.GrowthRateBox>
              </S.DataBoxing>
            </S.GridBox>
          </S.CompareBox>

          <S.CompareBox>
            <S.TextBox>
              <S.CompareBoxTitle>오늘의 활동량</S.CompareBoxTitle>
              <S.DateText>오늘</S.DateText>
            </S.TextBox>

            <S.GridContainer>
              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.EXPIcon />
                    <S.ExplainText>총 획득 EXP</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.GrowthRateBox>
                    <S.DataText>{roundOneDecimal(todayData?.earnedExp)} EXP</S.DataText>
                    <GrowthRate
                      yesterday={roundOneDecimal(compareData?.earnedExp)}
                      today={roundOneDecimal(todayData?.earnedExp)}
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
                    <S.DataText>{formatTime(roundOneDecimal(todayData?.studyTime))}</S.DataText>
                    <GrowthRate
                      studyState={true}
                      yesterday={roundOneDecimal(compareData?.studyTime)}
                      today={roundOneDecimal(todayData?.studyTime)}
                    />
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>

            <S.GridBox>
              <S.DataBoxing>
                <S.ImpressiveBox>
                  <S.GithubIcon />
                  <S.ExplainText>Github</S.ExplainText>
                </S.ImpressiveBox>

                <S.GrowthRateBox $direction="row" $gap="2rem">
                  <S.GithubCompareBox>
                    <S.SubText>Commit</S.SubText>
                    <S.StatCompareRow>
                      <S.DataText>{roundOneDecimal(todayData?.commitCount)}개</S.DataText>
                      <GrowthRate
                        yesterday={roundOneDecimal(compareData?.commitCount)}
                        today={roundOneDecimal(todayData?.commitCount)}
                      />
                    </S.StatCompareRow>
                  </S.GithubCompareBox>

                  <S.GithubCompareBox>
                    <S.SubText>Contributions</S.SubText>
                    <S.StatCompareRow>
                      <S.DataText>{roundOneDecimal(todayData?.gitHubAttribution)}개</S.DataText>
                      <GrowthRate
                        yesterday={roundOneDecimal(compareData?.gitHubAttribution)}
                        today={roundOneDecimal(todayData?.gitHubAttribution)}
                      />
                    </S.StatCompareRow>
                  </S.GithubCompareBox>
                </S.GrowthRateBox>
              </S.DataBoxing>
            </S.GridBox>
          </S.CompareBox>
        </S.CompareContainer>
      </S.GraphWrapper>
    </S.ContentArea>
  );
};
