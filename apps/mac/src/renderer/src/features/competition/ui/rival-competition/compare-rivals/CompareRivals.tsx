import * as S from "./CompareRivals.style";
import { useCompareRivals } from "@/features/competition/model/useCompareRivals";
import type { CategoryType, PeriodType } from "@/entities/competition";
import { Select } from "@/shared/ui";
import { formatTime } from "@/shared/lib";
import { RivalCompetitionLineChart } from "./RivalCompeteLineChart";

export const RivalCompare = () => {
  const {
    compareRivals,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriod,
    setCompetitionPeriod,
    competitionDropdownOptions,
    competitionPeriodOptions,
    buildMultiLineData,
  } = useCompareRivals();

  const totalData = compareRivals?.totalData ?? [];
  const chartData = buildMultiLineData(compareRivals?.totalData ?? []);

  const hasValidPoint = totalData.some(u => (u.dataPoint?.length ?? 0) > 0);

  const valueFormatter = competitionDropdown === "ACTIVE_TIME" ? formatTime : undefined;

  return (
    <S.Content>
      <S.RivalCompareWrapper>
        <S.TitleBox>
          <S.Title>라이벌과 비교</S.Title>
          <S.DropdownBox>
            <Select<PeriodType>
              aria-label="라이벌 비교 기간"
              value={competitionPeriod}
              options={competitionPeriodOptions}
              onChange={setCompetitionPeriod}
            />
            <Select<CategoryType>
              aria-label="라이벌 비교 항목"
              value={competitionDropdown}
              options={competitionDropdownOptions}
              onChange={setCompetitionDropdown}
            />
          </S.DropdownBox>
        </S.TitleBox>

        <S.GaroLine />

        {hasValidPoint ? (
          <S.ChartWrapper>
            <RivalCompetitionLineChart chartData={chartData} valueFormatter={valueFormatter} />
          </S.ChartWrapper>
        ) : (
          <S.DetailWrapper>
            <S.DefaultBattleBox>
              <S.DefaultBattleText>
                죄송합니다. 현재 {competitionDropdown}에 관한 데이터가 없습니다.
              </S.DefaultBattleText>
            </S.DefaultBattleBox>
          </S.DetailWrapper>
        )}
      </S.RivalCompareWrapper>
    </S.Content>
  );
};
