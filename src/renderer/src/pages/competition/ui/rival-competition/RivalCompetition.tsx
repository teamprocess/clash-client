import * as S from "./RivalCompetition.style";
import { getStatus } from "@/features/home/model/useHome";
import { useCompetition } from "@/pages/competition/model/useCompetition";

export const RivalCompetition = () => {
  const { rivalCompetition } = useCompetition();

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent id={"content-1"}>
          <S.RivalList>
            <S.Title>
              <S.TitleText>내 라이벌</S.TitleText>
            </S.Title>
            <S.Line />
            <S.ProfileWrapper>
              {rivalCompetition.RivalsData.data.my_rivals.map(user => (
                <S.ProfileContainer key={user.username}>
                  <S.ProfileContent>
                    <S.ProfileIcon />
                    <S.NameBox>
                      <S.ProfileName>{user.name}</S.ProfileName>
                      <S.ProfileMention>@{user.username}</S.ProfileMention>
                    </S.NameBox>
                    <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
                  </S.ProfileContent>
                  <S.PlayTime>
                    {getStatus(user.status) === "온라인" && (
                      <>
                        <S.UsingAppText>{user.using_app}</S.UsingAppText>
                        <S.Point>·</S.Point>
                      </>
                    )}
                    {user.active_time}
                  </S.PlayTime>
                </S.ProfileContainer>
              ))}
            </S.ProfileWrapper>
          </S.RivalList>
        </S.ListContent>
        <S.Content id={"content-2"}>
          <S.RivalCompareWrapper>
            <S.Title>
              <S.TitleText>라이벌과 비교</S.TitleText>
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
            </S.Title>
            <S.Line />
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
                              cy={rivalCompetition.getY(
                                point.growth_rate,
                                rivalCompetition.maxValue
                              )}
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
      </S.CompareContentBox>
      <S.ContentBox>
        <S.Content id={"content-3"}></S.Content>
      </S.ContentBox>
    </S.Container>
  );
};
