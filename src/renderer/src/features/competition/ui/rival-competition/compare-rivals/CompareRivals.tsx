import * as S from "./CompareRivals.style";
import { useCompareRival } from "@/features/competition/model/useCompareRivals";
import {
  CategoryType,
  PeriodType,
} from "@/entities/competition/model/rival-competition/compareRivals.types";
import { RivalCompetitionLineChart } from "@/features/competition/model/rival-compete-chart/RivalCompeteLineChart";
import { toLineChartData } from "@/features/competition/model/rival-compete-chart/RivalCompeteChartData";

export const RivalCompare = () => {
  const {
    compareRivals,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
  } = useCompareRival();

  return (
    <S.Content>
      <S.RivalCompareWrapper>
        <S.TitleBox>
          <S.Title>라이벌과 비교</S.Title>
          <S.DropDownBox>
            <S.SelectWrapper>
              <S.Select
                value={competitionPeriodDropDown}
                onChange={e => setCompetitionPeriodDropDown(e.target.value as PeriodType)}
              >
                {competitionPeriodDropDownValue.map(option => (
                  <S.Option key={option.key} value={option.key}>
                    {option.label}
                  </S.Option>
                ))}
              </S.Select>
              <S.ArrowIcon />
            </S.SelectWrapper>
            <S.SelectWrapper>
              <S.Select
                value={competitionDropdown}
                onChange={e => setCompetitionDropdown(e.target.value as CategoryType)}
              >
                {competitionDropDownValue.map(option => (
                  <S.Option key={option.key} value={option.key}>
                    {option.label}
                  </S.Option>
                ))}
              </S.Select>
              <S.ArrowIcon />
            </S.SelectWrapper>
          </S.DropDownBox>
        </S.TitleBox>
        <S.GaroLine />
        {compareRivals?.totalData.map(item => (
          <S.ChartWrapper key={item.id}>
            <RivalCompetitionLineChart dataPoint={toLineChartData(item.dataPoint).dataPoint} />
          </S.ChartWrapper>
        ))}
      </S.RivalCompareWrapper>
    </S.Content>
  );
};
