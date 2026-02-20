import * as S from "./WithMyCompetition.style";
import { GrowthRate } from "@/features/home/ui/compare/growth-rate/GrowthRate";
import { useMyCompetition } from "@/features/competition/model/useMyCompetition";
import { toLineChartData } from "@/features/competition/model/my-compete-chart/MyCompeteChartData";
import { MyCompetitionLineChart } from "@/features/competition/model/my-compete-chart/MyCompetitionLineChart";
import { CompareStandard, GrowthRateStandard } from "@/entities/competition";
import { Select } from "@/shared/ui/select";
import { formatTime } from "@/shared/lib";
import { useMemo } from "react";

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
    oneDecimal,
  } = useMyCompetition();

  const chartData = toLineChartData(dataPoints);

  const fullChartData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    const fullMonths = Array.from({ length: 12 }, (_, i) => {
      const month = currentMonth - 11 + i;
      const normalized = month <= 0 ? month + 12 : month;
      return `${normalized}월`;
    });

    const labels = chartData.dataPoint.labels;
    const values = fullMonths.map(label => {
      const index = labels.indexOf(label);
      return index !== -1 ? Math.round(Number(chartData.dataPoint.values[index])) : 0;
    });

    return { labels: fullMonths, values };
  }, [chartData]);

  return (
    <S.ContentArea>
      <S.GraphWrapper>
        <S.TitleBox style={{ justifyContent: "space-between" }}>
          <S.AnalyzeTitle>내 성장도 분석</S.AnalyzeTitle>
          <Select<GrowthRateStandard>
            value={growthRateDropdown}
            options={growthRateDropDownValue}
            onChange={setGrowthRateDropdown}
          />
        </S.TitleBox>

        <S.ChartWrapper>
          <MyCompetitionLineChart dataPoint={fullChartData} />
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
                  <S.DataText>{oneDecimal(compareData?.earnedExp)} EXP</S.DataText>
                </S.DataBoxing>
              </S.GridBox>

              <S.GridBox>
                <S.DataBoxing>
                  <S.ImpressiveBox>
                    <S.RecordIcon />
                    <S.ExplainText>학습시간</S.ExplainText>
                  </S.ImpressiveBox>
                  <S.DataText>{formatTime(oneDecimal(compareData?.studyTime))}</S.DataText>
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
                    <S.DataText>{oneDecimal(compareData?.gitHubAttribution)}개</S.DataText>
                  </S.GrowthRateBox>
                </S.DataBoxing>
              </S.GridBox>
            </S.GridContainer>
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
                    <S.DataText>{oneDecimal(todayData?.earnedExp)} EXP</S.DataText>
                    <GrowthRate
                      yesterday={oneDecimal(compareData?.earnedExp)}
                      today={oneDecimal(todayData?.earnedExp)}
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
                    <S.DataText>{formatTime(oneDecimal(todayData?.studyTime))}</S.DataText>
                    <GrowthRate
                      studyState={true}
                      yesterday={oneDecimal(compareData?.studyTime)}
                      today={oneDecimal(todayData?.studyTime)}
                    />
                  </S.GrowthRateBox>
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
                    <S.DataText>{oneDecimal(todayData?.gitHubAttribution)}개</S.DataText>
                    <GrowthRate
                      yesterday={oneDecimal(compareData?.gitHubAttribution)}
                      today={oneDecimal(todayData?.gitHubAttribution)}
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
