import * as S from "./CompareRivals.style";
import { useCompetition } from "@/pages/competition/model/useCompetition";

export const RivalCompare = () => {
  const { rivalCompetition } = useCompetition();

  return (
    <S.Content>
      <S.RivalCompareWrapper>
        <S.TitleBox>
          <S.Title>라이벌과 비교</S.Title>
          <S.DropDownBox>
            <S.SelectWrapper>
              <S.Select
                value={rivalCompetition.competitionPeriodDropDown}
                onChange={e => rivalCompetition.setCompetitionPeriodDropDown(e.target.value)}
              >
                {rivalCompetition.competitionPeriodDropDownValue.map(option => (
                  <S.Option key={option.key} value={option.key}>
                    {option.label}
                  </S.Option>
                ))}
              </S.Select>
              <S.ArrowIcon />
            </S.SelectWrapper>
            <S.SelectWrapper>
              <S.Select
                value={rivalCompetition.competitionDropdown}
                onChange={e => rivalCompetition.setCompetitionDropdown(e.target.value)}
              >
                {rivalCompetition.competitionDropDownValue.map(option => (
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
                width={rivalCompetition.chartWidth}
                height="100%"
                viewBox={`0 0 ${rivalCompetition.chartWidth} ${rivalCompetition.CHART_HEIGHT + 10}`}
                preserveAspectRatio="none"
              >
                {rivalCompetition.rivalsTransCompareData.map(rival => {
                  const isMe = rival.username === "me";
                  return (
                    <S.LineGroup key={rival.username}>
                      <S.LinePath
                        d={rivalCompetition.makeLinePath(rival.rate, rivalCompetition.maxValue)}
                        stroke={rivalCompetition.COLORS[rival.username]}
                        $isMe={isMe}
                      />
                      {rival.rate.map((point, idx) => (
                        <S.Dot
                          key={point.date}
                          cx={rivalCompetition.getX(idx)}
                          cy={rivalCompetition.getY(point.growth_rate, rivalCompetition.maxValue)}
                          fill={rivalCompetition.COLORS[rival.username]}
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
