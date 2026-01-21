import * as S from "./RivalCompetition.style";
import { getStatus } from "@/features/home/model/useHome";
import { useCompetition } from "@/pages/competition/model/useCompetition";
import { WarPeriodText } from "./RivalCompetition.style";
import { Modal } from "@/shared/ui/modal/Modal";
import React from "react";

interface User {
  id: number;
  name: string;
  mention: string;
  point: number;
}

export const RivalCompetition = () => {
  const { rivalCompetition } = useCompetition();

  const userList: User[] = [
    { id: 1, name: "멧돼지", mention: "seunga_418", point: 4219 },
    { id: 2, name: "채근영", mention: "chaeyn", point: 2147483647 },
    { id: 3, name: "한승환", mention: "h.7xn", point: 3074 },
    { id: 4, name: "권대형", mention: "gorani", point: 2126 },
    { id: 5, name: "김민수", mention: "mins_k", point: 1980 },
    { id: 6, name: "박지훈", mention: "park.jh", point: 1875 },
    { id: 7, name: "이서연", mention: "seoyeon_lee", point: 1760 },
    { id: 8, name: "정우진", mention: "wj_jung", point: 1698 },
    { id: 9, name: "최윤아", mention: "yuna_c", point: 1584 },
    { id: 10, name: "오현준", mention: "ohj_dev", point: 1490 },
    { id: 11, name: "강도윤", mention: "doyoon_k", point: 1375 },
    { id: 12, name: "조상철", mention: "sir0n", point: -2147483648 },
    { id: 13, name: "문태현", mention: "taehyun_m", point: 1190 },
    { id: 14, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 15, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 16, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 17, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 18, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 19, name: "유지호", mention: "jiho_y", point: 1085 },
  ];

  const [rivalSelectedId, setRivalSelectedId] = React.useState<string | null>(null);

  const handleUserSelect = (name: string) => {
    // 이미 선택된 사람을 클릭하면 선택 해제
    if (rivalSelectedId === name) {
      setRivalSelectedId(null);
    } else {
      // 클릭한 사람만 선택
      setRivalSelectedId(name);
    }
  };

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent id="content-1">
          <S.RivalList>
            <S.TitleBox>
              <S.Title>내 라이벌</S.Title>
            </S.TitleBox>
            <S.GaroLine />
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
        <S.Content id="content-2">
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
        <S.Content id="content-3">
          <S.BattleWrapper>
            <S.TitleBox>
              <S.BattleTextBox>
                <S.Title>배틀</S.Title>
                <S.SubText>배틀을 생성해 라이벌과 더 치열하게 경쟁할 수 있습니다.</S.SubText>
              </S.BattleTextBox>
              <S.MakeBattle onClick={rivalCompetition.handleMakeBattle}>배틀 생성하기</S.MakeBattle>
            </S.TitleBox>
            <S.GaroLine />
            <S.BattleListContainer>
              {rivalCompetition.battleRivals.map(rival => (
                <S.BattleProfileBox
                  key={rival.username}
                  onClick={() => rivalCompetition.handleOpenDetail(rival.username)}
                >
                  <S.ProfileContent>
                    <S.NameBox style={{ gap: "0.75rem" }}>
                      <S.UpperHandJudge $type={rivalCompetition.judgeUpperHand(rival.username)}>
                        {rivalCompetition.judgeUpperHand(rival.username)}
                      </S.UpperHandJudge>
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

            {rivalCompetition.battleTargetIndex ? (
              <S.DetailWrapper>
                {(() => {
                  const rival = rivalCompetition.rivalsTransCompareData.find(
                    d => d.username === rivalCompetition.battleTargetIndex
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
                          <S.UpperHandBar
                            $width={rivalPercent}
                            $isRival
                            style={{ justifyContent: "flex-start" }}
                          >
                            <S.PercentText>{Math.round(rivalPercent)}%</S.PercentText>
                          </S.UpperHandBar>

                          <S.UpperHandBar
                            $width={myPercent}
                            $isRival={false}
                            style={{ justifyContent: "flex-end" }}
                          >
                            <S.PercentText>{Math.round(myPercent)}%</S.PercentText>
                          </S.UpperHandBar>
                        </S.UpperHandTransition>

                        <WarPeriodText>종료 2026년 1월 13일 · 3일 남음</WarPeriodText>
                      </S.TransitionBox>
                      <S.UpperHandProfile>
                        <S.UpperHandProfileIcon />
                        <S.UpperHandName>나</S.UpperHandName>
                      </S.UpperHandProfile>
                    </S.UpperHandContainer>
                  );
                })()}
                <S.GaroLine />
                <S.DetailAnalyzeContainer>
                  <S.TitleBox>
                    <S.AnalyzeText>세부 분석</S.AnalyzeText>
                    <S.DropDownBox>
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
                  <S.AnalyzeBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1.5rem",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <S.AnalyzeContent>
                        <S.AnalyzeName>{rivalCompetition.selectedRival?.name}</S.AnalyzeName>
                        <S.AnalyzeName>나</S.AnalyzeName>
                      </S.AnalyzeContent>
                      <S.SeroLine />
                      <S.AnalyzeContent style={{ width: "100%" }}>
                        <S.AnalyzeBar $width={rivalCompetition.rivalPercent} $isRival>
                          <S.AnalyzeLabel>
                            {rivalCompetition.rivalValue.toLocaleString()} EXP
                          </S.AnalyzeLabel>
                        </S.AnalyzeBar>
                        <S.AnalyzeBar $width={rivalCompetition.myPercent} $isRival={false}>
                          <S.AnalyzeLabel>
                            {rivalCompetition.myValue.toLocaleString()} EXP
                          </S.AnalyzeLabel>
                        </S.AnalyzeBar>
                      </S.AnalyzeContent>
                    </div>
                  </S.AnalyzeBox>
                </S.DetailAnalyzeContainer>
              </S.DetailWrapper>
            ) : (
              <S.DetailWrapper>
                <S.DefaultBattleBox>
                  <S.FireIcon />
                  <S.DefaultBattleText>
                    위 배틀을 선택하여 배틀의 상세 내용을 확인해보세요!
                  </S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            )}
          </S.BattleWrapper>
        </S.Content>
      </S.ContentBox>
      {rivalCompetition.isModalOpen ? (
        <Modal
          modalTitle={"배틀 생성하기"}
          width={21.625}
          height={34}
          isOpen={rivalCompetition.isModalOpen}
          onClose={rivalCompetition.handleModalClose}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <S.SearchBox>
                  <S.SearchUsers placeholder={"이름 또는 아이디 검색"} />
                  <S.SearchIconBox>
                    <S.SearchIcon />
                  </S.SearchIconBox>
                </S.SearchBox>
                <S.UserChoiceContainer>
                  {userList.map(user => (
                    <S.UserChoiceBox
                      key={user.name}
                      $isSelected={rivalSelectedId === user.name} // ✅ 한 명만 선택
                      onClick={() => handleUserSelect(user.name)}
                    >
                      <S.ProfileContent style={{ height: "3rem" }}>
                        <S.ProfileIcon />
                        <S.ProfileTagBox>
                          <S.ProfileName>{user.name}</S.ProfileName>
                          <S.ProfileMention>@{user.mention}</S.ProfileMention>
                        </S.ProfileTagBox>
                      </S.ProfileContent>

                      {rivalSelectedId === user.name ? <S.CheckedIcon /> : <S.UncheckedBox />}
                    </S.UserChoiceBox>
                  ))}
                </S.UserChoiceContainer>
              </div>
            </div>
            <S.BottomBox>
              <S.ButtonBox>
                <S.CloseButton onClick={rivalCompetition.handleModalClose}>취소</S.CloseButton>
                {/* 임시로 저장해둔 handleModalClose, 추후 createBattle 함수 제작 예정 */}
                <S.OkayButton onClick={rivalCompetition.handleModalClose}>배틀 신청</S.OkayButton>
              </S.ButtonBox>
            </S.BottomBox>
          </div>
        </Modal>
      ) : null}
    </S.Container>
  );
};
