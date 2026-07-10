import * as S from "./WithMyCompetition.style";
import { GrowthRate, Select } from "@/shared/ui";
import { useMyCompetition } from "@/features/competition/model/useMyCompetition";
import type { AnalyzeCategory, CompareStandard, GrowthRateStandard } from "@/entities/competition";
import { formatTime } from "@/shared/lib";
import { MyCompetitionLineChart } from "./MyCompetitionLineChart";
import { toLineChartData } from "./formatMyCompeteChartData";

export const WithMyCompetition = () => {
  const {
    dataPoints,
    todayData,
    compareData,
    competitionDropdown,
    setCompetitionDropdown,
    competitionDropdownOptions,
    growthRatePeriod,
    setGrowthRatePeriod,
    growthRatePeriodOptions,
    growthRateCategory,
    setGrowthRateCategory,
    growthRateCategoryOptions,
    roundOneDecimal,
  } = useMyCompetition();

  const chartData = toLineChartData(dataPoints);

  return (
    <S.ContentArea>
      <S.AnalyzeSection>
        <S.TitleBox $justify="space-between">
          <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
          <S.GrowthControlBox>
            <Select<AnalyzeCategory>
              aria-label="성장도 분석 항목"
              value={growthRateCategory}
              options={growthRateCategoryOptions}
              onChange={setGrowthRateCategory}
            />
            <Select<GrowthRateStandard>
              aria-label="성장도 분석 기간"
              value={growthRatePeriod}
              options={growthRatePeriodOptions}
              onChange={setGrowthRatePeriod}
            />
          </S.GrowthControlBox>
        </S.TitleBox>

        <S.ChartWrapper>
          <MyCompetitionLineChart dataPoint={chartData.dataPoint} category={growthRateCategory} />
        </S.ChartWrapper>
      </S.AnalyzeSection>

      <S.Line />

      <S.CompareSection>
        <S.TitleBox>
          <S.AnalyzeTitle>내 기록 비교</S.AnalyzeTitle>
          <S.SubText>각 기간 동안 기록한 스탯의 평균을 비교합니다.</S.SubText>
        </S.TitleBox>

        <S.CompareContainer>
          <S.CompareBox>
            <S.TextBox>
              <S.CompareBoxTitle>이전의 활동량</S.CompareBoxTitle>
              <Select<CompareStandard>
                aria-label="기록 비교 기간"
                width={10}
                value={competitionDropdown}
                options={competitionDropdownOptions}
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
                  <S.GitHubIcon />
                  <S.ExplainText>GitHub</S.ExplainText>
                </S.ImpressiveBox>
                <S.GrowthRateBox $direction="row" $gap="2rem">
                  <S.DataText>
                    <S.SubText>Commit</S.SubText>
                    {roundOneDecimal(compareData?.commitCount)}개
                  </S.DataText>
                  <S.DataText>
                    <S.SubText>Contribution</S.SubText>
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
                  <S.GitHubIcon />
                  <S.ExplainText>GitHub</S.ExplainText>
                </S.ImpressiveBox>

                <S.GrowthRateBox $direction="row" $gap="2rem">
                  <S.GitHubCompareBox>
                    <S.SubText>Commit</S.SubText>
                    <S.StatCompareRow>
                      <S.DataText>{roundOneDecimal(todayData?.commitCount)}개</S.DataText>
                      <GrowthRate
                        yesterday={roundOneDecimal(compareData?.commitCount)}
                        today={roundOneDecimal(todayData?.commitCount)}
                      />
                    </S.StatCompareRow>
                  </S.GitHubCompareBox>

                  <S.GitHubCompareBox>
                    <S.SubText>Contribution</S.SubText>
                    <S.StatCompareRow>
                      <S.DataText>{roundOneDecimal(todayData?.gitHubAttribution)}개</S.DataText>
                      <GrowthRate
                        yesterday={roundOneDecimal(compareData?.gitHubAttribution)}
                        today={roundOneDecimal(todayData?.gitHubAttribution)}
                      />
                    </S.StatCompareRow>
                  </S.GitHubCompareBox>
                </S.GrowthRateBox>
              </S.DataBoxing>
            </S.GridBox>
          </S.CompareBox>
        </S.CompareContainer>
      </S.CompareSection>
    </S.ContentArea>
  );
};
