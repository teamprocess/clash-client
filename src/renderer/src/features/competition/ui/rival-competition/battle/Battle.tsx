import * as S from "./Battle.style";
import { useBattle } from "@/features/competition/model/useBattle";
import { Modal } from "@/shared/ui/modal/Modal";

export const Battle = () => {
  const { battle } = useBattle();

  return (
    <>
      <S.ContentBox>
        <S.Content id="content-3">
          <S.BattleWrapper>
            <S.TitleBox>
              <S.BattleTextBox>
                <S.Title>배틀</S.Title>
                <S.SubText>배틀을 생성해 라이벌과 더 치열하게 경쟁할 수 있습니다.</S.SubText>
              </S.BattleTextBox>
              <S.MakeBattle onClick={battle.openModal}>배틀 생성하기</S.MakeBattle>
            </S.TitleBox>
            <S.GaroLine />
            <S.BattleListContainer>
              {battle.battleRivals.map(rival => (
                <S.BattleProfileBox
                  key={rival.username}
                  onClick={() => battle.selectBattleTarget(rival.username)}
                >
                  <S.ProfileContent>
                    <S.NameBox style={{ gap: "0.75rem" }}>
                      <S.UpperHandJudge $type={battle.judgeUpperHand(rival.username)}>
                        {battle.judgeUpperHand(rival.username)}
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

            {battle.battleTargetUsername ? (
              <S.DetailWrapper>
                {(() => {
                  const rival = battle.battleRivals.find(
                    d => d.username === battle.battleTargetUsername
                  );
                  const me = battle.me;

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

                        <S.WarPeriodText>종료 2026년 1월 13일 · 3일 남음</S.WarPeriodText>
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
                          value={battle.competitionDropdown}
                          onChange={e => battle.setCompetitionDropdown(e.target.value)}
                        >
                          {battle.competitionDropDownValue.map(option => (
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
                        <S.AnalyzeName>{battle.selectedRival?.name}</S.AnalyzeName>
                        <S.AnalyzeName>나</S.AnalyzeName>
                      </S.AnalyzeContent>
                      <S.SeroLine />
                      <S.AnalyzeContent style={{ width: "100%" }}>
                        <S.AnalyzeBar $width={battle.rivalPercent} $isRival>
                          <S.AnalyzeLabel>{battle.rivalValue.toLocaleString()} EXP</S.AnalyzeLabel>
                        </S.AnalyzeBar>
                        <S.AnalyzeBar $width={battle.myPercent} $isRival={false}>
                          <S.AnalyzeLabel>{battle.myValue.toLocaleString()} EXP</S.AnalyzeLabel>
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
      {battle.isModalOpen ? (
        <Modal
          modalTitle={"배틀 생성하기"}
          width={21.625}
          height={34}
          isOpen={battle.isModalOpen}
          onClose={battle.closeModal}
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
                  {battle.battleRivals.map(user => (
                    <S.UserChoiceBox
                      key={user.name}
                      $isSelected={battle.rivalSelectedId === user.name}
                      onClick={() => battle.handleUserSelect(user.name)}
                    >
                      <S.ProfileContent style={{ height: "3rem" }}>
                        <S.ProfileIcon />
                        <S.ProfileTagBox>
                          <S.ProfileName>{user.name}</S.ProfileName>
                        </S.ProfileTagBox>
                      </S.ProfileContent>

                      {battle.rivalSelectedId === user.name ? (
                        <S.CheckedIcon />
                      ) : (
                        <S.UncheckedBox />
                      )}
                    </S.UserChoiceBox>
                  ))}
                </S.UserChoiceContainer>
              </div>
            </div>
            <S.BottomBox>
              <S.ButtonBox>
                <S.CloseButton onClick={battle.closeModal}>취소</S.CloseButton>
                {/* 임시로 저장해둔 handleModalClose, 추후 createBattle 함수 제작 예정 */}
                <S.OkayButton onClick={battle.closeModal}>배틀 신청</S.OkayButton>
              </S.ButtonBox>
            </S.BottomBox>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
