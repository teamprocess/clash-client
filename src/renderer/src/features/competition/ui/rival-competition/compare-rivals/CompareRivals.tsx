import * as S from "./CompareRivals.style";
import { useCompareRival } from "@/features/competition/model/useCompareRivals";

export const RivalCompare = () => {
  const { compareRivals } = useCompareRival();

  return (
    <S.Content>
      <S.RivalCompareWrapper>
        <S.TitleBox>
          <S.Title>라이벌과 비교</S.Title>
          <S.DropDownBox>
            <S.SelectWrapper>
              <S.Select
                value={compareRivals.competitionPeriodDropDown}
                onChange={e => compareRivals.setCompetitionPeriodDropDown(e.target.value)}
              >
                {compareRivals.competitionPeriodDropDownValue.map(option => (
                  <S.Option key={option.key} value={option.key}>
                    {option.label}
                  </S.Option>
                ))}
              </S.Select>
              <S.ArrowIcon />
            </S.SelectWrapper>
            <S.SelectWrapper>
              <S.Select
                value={compareRivals.competitionDropdown}
                onChange={e => compareRivals.setCompetitionDropdown(e.target.value)}
              >
                {compareRivals.competitionDropDownValue.map(option => (
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
        <S.GraphBox>
          <S.ScrollArea>
            <S.GraphInner style={{ width: "100%" }}>
              <S.Svg
                width={compareRivals.chartWidth}
                height="100%"
                viewBox={`0 0 ${compareRivals.chartWidth} ${compareRivals.CHART_HEIGHT + 10}`}
                preserveAspectRatio="none"
              >
                {compareRivals.rivalsTransCompareData.map(rival => {
                  const isMe = rival.username === "me";
                  return (
                    <S.LineGroup key={rival.username}>
                      <S.LinePath
                        d={compareRivals.makeLinePath(rival.rate, compareRivals.maxValue)}
                        stroke={compareRivals.COLORS[rival.username]}
                        $isMe={isMe}
                      />
                      {rival.rate.map((point, idx) => (
                        <S.Dot
                          key={point.date}
                          cx={compareRivals.getX(idx)}
                          cy={compareRivals.getY(point.growth_rate, compareRivals.maxValue)}
                          fill={compareRivals.COLORS[rival.username]}
                          $isMe={isMe}
                        />
                      ))}
                    </S.LineGroup>
                  );
                })}
              </S.Svg>
            </S.GraphInner>
          </S.ScrollArea>
        </S.GraphBox>
      </S.RivalCompareWrapper>
    </S.Content>
  );
};
