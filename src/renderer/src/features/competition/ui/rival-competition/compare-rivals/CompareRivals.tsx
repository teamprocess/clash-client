import * as S from "./CompareRivals.style";
import { useCompareRival } from "@/features/competition/model/useCompareRivals";
import {
  CategoryType,
  PeriodType,
} from "@/entities/competition/model/rival-competition/compareRivals.types";
import { RivalCompetitionLineChart } from "@/features/competition/model/rival-compete-chart/RivalCompeteLineChart";
import { Select } from "@/shared/ui/select";

import { formatTime } from "@/shared/lib/formatTime";

export const RivalCompare = () => {
  const {
    compareRivals,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
    buildMultiLineData,
  } = useCompareRival();

  const totalData = compareRivals?.totalData ?? [];
  const chartData = buildMultiLineData(compareRivals?.totalData ?? []);

  const hasValidPoint = totalData.some(u => (u.dataPoint?.length ?? 0) > 0);

  const valueFormatter = competitionDropdown === "ACTIVE_TIME" ? formatTime : undefined;

  return (
    <S.Content>
      <S.RivalCompareWrapper>
        <S.TitleBox>
          <S.Title>라이벌과 비교</S.Title>
          <S.DropDownBox>
            <Select<PeriodType>
              value={competitionPeriodDropDown}
              options={competitionPeriodDropDownValue}
              onChange={setCompetitionPeriodDropDown}
            />
            <Select<CategoryType>
              value={competitionDropdown}
              options={competitionDropDownValue}
              onChange={setCompetitionDropdown}
            />
          </S.DropDownBox>
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
