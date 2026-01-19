import * as S from "./RivalCompetition.style";
import { getStatus } from "@/features/home/model/useHome";
import { useCompetition } from "@/pages/competition/model/useCompetition";

export const RivalCompetition = () => {
  const { rivalCompetition } = useCompetition();
  const CHART_PADDING_TOP = 10;
  const CHART_PADDING_BOTTOM = 10;
  const CHART_HEIGHT = 100;
  const CHART_WIDTH = 100;

  const COLORS: Record<string, string> = {
    seunga_418: "#2F80ED",
    king_of_code: "#27AE60",
    jandi_lover: "#EB5757",
    algo_master: "#F2C94C",
    me: "#FFFFFF",
  };

  const getMaxValue = (data: typeof rivalCompetition.rivalsTransCompareData) =>
    Math.max(...data.flatMap(r => r.rate.map(v => v.growth_rate)));

  const getX = (index: number, total: number) => {
    const gap = CHART_WIDTH / (total - 1);
    return index * gap;
  };

  const getY = (value: number, max: number) => {
    const usableHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;

    return CHART_HEIGHT - CHART_PADDING_BOTTOM - (value / max) * usableHeight;
  };

  const makeLinePath = (rates: { growth_rate: number }[], max: number) =>
    rates
      .map((r, i) => {
        const x = getX(i, rates.length);
        const y = getY(r.growth_rate, max);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const maxValue = getMaxValue(rivalCompetition.rivalsTransCompareData);

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent id={"content-1"}>
          <S.RivalList>
            <S.Title>내 라이벌</S.Title>
            <S.Line />
            <S.ProfileWrapper>
              {rivalCompetition.RivalsData.data.my_rivals.map(user => (
                <>
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
                </>
              ))}
            </S.ProfileWrapper>
          </S.RivalList>
        </S.ListContent>
        <S.Content id={"content-2"}>
          <S.RivalCompareWrapper>
            <S.Title>
              <p>라이벌과 비교</p>
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
              <S.Svg viewBox="0 0 100 100" preserveAspectRatio="none">
                {rivalCompetition.rivalsTransCompareData.map(rival => {
                  const isMe = rival.username === "me";
                  return (
                    <S.LineGroup key={rival.username}>
                      <S.LinePath
                        d={makeLinePath(rival.rate, maxValue)}
                        stroke={COLORS[rival.username]}
                        $isMe={isMe}
                      />
                      {rival.rate.map((point, idx) => (
                        <S.Dot
                          key={point.date}
                          cx={getX(idx, rival.rate.length)}
                          cy={getY(point.growth_rate, maxValue)}
                          fill={COLORS[rival.username]}
                          $isMe={isMe}
                        />
                      ))}
                    </S.LineGroup>
                  );
                })}
              </S.Svg>
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
