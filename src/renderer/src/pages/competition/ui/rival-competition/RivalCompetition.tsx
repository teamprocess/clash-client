import * as S from "./RivalCompetition.style";
import { getStatus } from "@/features/home/model/useHome";
import { useCompetition } from "@/pages/competition/model/useCompetition";
import { useState } from "react";

export const RivalCompetition = () => {
  const { rivalCompetition } = useCompetition();

  const handleMakeBattle = () => {
    console.log("배틀 생성하기");
  };

  const [battleTargetIndex, setBattleTargetIndex] = useState<string | null>(null);

  const handleOpenDetail = (battleTargetIndex: string) => {
    setBattleTargetIndex(battleTargetIndex);
  };

  const battleRivals = rivalCompetition.rivalsTransCompareData.filter(
    rival => rival.username !== "me"
  );

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent id={"content-1"}>
          <S.RivalList>
            <S.TitleBox>
              <S.Title>내 라이벌</S.Title>
            </S.TitleBox>
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
        <S.Content id={"content-3"}>
          <S.BattleWrapper>
            <S.TitleBox>
              <S.BattleTextBox>
                <S.Title>배틀</S.Title>
                <S.SubText>배틀을 생성해 라이벌과 더 치열하게 경쟁할 수 있습니다.</S.SubText>
              </S.BattleTextBox>
              <S.MakeBattle onClick={handleMakeBattle}>배틀 생성하기</S.MakeBattle>
            </S.TitleBox>
            <S.Line />
            <S.BattleListContainer>
              {battleRivals.map(rival => (
                <S.BattleProfileBox
                  key={rival.username}
                  onClick={() => handleOpenDetail(rival.username)}
                >
                  <S.ProfileContent>
                    <S.NameBox style={{ gap: "0.75rem" }}>
                      <S.BattleName>vs {rival.name}</S.BattleName>
                      <S.DateBox>
                        <S.DateIcon />
                        <S.DateText>2026년 1월 13일까지</S.DateText>
                      </S.DateBox>
                    </S.NameBox>
                  </S.ProfileContent>

                  <S.DetailBox>
                    <S.DetailButton>상세내용보기</S.DetailButton>
                    <S.BackArrowIcon />
                  </S.DetailBox>
                </S.BattleProfileBox>
              ))}
            </S.BattleListContainer>

            {battleTargetIndex ? (
              <S.DetailWrapper>
                {(() => {
                  const rival = rivalCompetition.rivalsTransCompareData.find(
                    d => d.username === battleTargetIndex
                  );
                  const me = rivalCompetition.rivalsTransCompareData.find(d => d.username === "me");

                  if (!rival || !me) return null;

                  const total = rival.totalRate + me.totalRate;
                  const rivalPercent = total === 0 ? 50 : (rival.totalRate / total) * 100;
                  const myPercent = 100 - rivalPercent;

                  return (
                    <S.UpperHandContainer>
                      <S.UpperHandProfile>
                        <S.UpperHandProfileIcon />
                        <S.UpperHandName>{rival.name}</S.UpperHandName>
                      </S.UpperHandProfile>
                      <S.TransitionBox>
                        <S.UpperHandTransition>
                          <S.UpperHandBar $width={rivalPercent} $isRival>
                            {rivalPercent}%
                          </S.UpperHandBar>
                          <S.UpperHandBar $width={myPercent} $isRival={false} />
                        </S.UpperHandTransition>
                      </S.TransitionBox>
                      <S.UpperHandProfile>
                        <S.UpperHandProfileIcon />
                        <S.UpperHandName>나</S.UpperHandName>
                      </S.UpperHandProfile>
                    </S.UpperHandContainer>
                  );
                })()}
              </S.DetailWrapper>
            ) : null}
          </S.BattleWrapper>
        </S.Content>
      </S.ContentBox>
    </S.Container>
  );
};
