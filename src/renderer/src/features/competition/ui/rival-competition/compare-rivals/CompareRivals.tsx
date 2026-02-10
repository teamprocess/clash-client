import * as S from "./CompareRivals.style";
import { useCompareRival } from "@/features/competition/model/useCompareRivals";
import {
  CategoryType,
  PeriodType,
} from "@/entities/competition/model/rival-competition/compareRivals.types";
import { RivalCompetitionLineChart } from "@/features/competition/model/rival-compete-chart/RivalCompeteLineChart";
import { Select } from "@/shared/ui/select/Select";

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

  const chartData = buildMultiLineData(compareRivals?.totalData ?? []);

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
        <S.ChartWrapper>
          <RivalCompetitionLineChart chartData={chartData} />
        </S.ChartWrapper>
      </S.RivalCompareWrapper>
    </S.Content>
  );
};
